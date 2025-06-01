import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
password: {
  type: String,
  select: false,
  required: function () {
    return !this.googleId;
  },
},
   googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

  quizHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ],
  profilePicture: {
    type: String,
    default: "https://example.com/default-avatar.png", // Default profile picture
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
