import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid credentials");
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#1a2259] to-[#0d133b]">
      <div className="w-full max-w-md bg-[#1c254b] text-white rounded-2xl shadow-xl p-8 space-y-6 border border-blue-700">
        <h2 className="text-3xl font-extrabold text-center text-blue-300 drop-shadow-sm">
          Login to IntraQuiz
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-300 hover:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Please wait...
              </span>
            ) : (
              "Login"
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

        {/* Signup link */}
        <p className="text-center text-sm text-blue-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:underline hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
