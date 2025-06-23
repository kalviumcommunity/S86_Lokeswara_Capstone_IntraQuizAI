import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseUrl}/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#1a2259] to-[#0d133b]">
      <div className="w-full max-w-md bg-[#1c254b] text-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-700">
        <h2 className="text-3xl font-extrabold text-center text-blue-300 drop-shadow-sm">
          Sign Up for IntraQuiz
        </h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-[#0d133b] text-white border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#0d133b] text-white border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#0d133b] text-white border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Please wait...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
          <span className="flex-1 border-b border-gray-500"></span>
          OR
          <span className="flex-1 border-b border-gray-500"></span>
        </div>

        {/* Google OAuth Button */}
        <a
          href={`http://localhost:5000/iq/googleauth/google`}
          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 text-center block"
        >
          Continue with Google
        </a>

        {/* Login Link */}
        <p className="text-center text-sm text-blue-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline hover:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
