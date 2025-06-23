import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/authSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        setIsOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-[#0a0f2c] text-black dark:text-white shadow-md fixed top-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-500 tracking-wide">
          Intra<span className="text-black dark:text-white">Quiz</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/quiz" className="hover:text-blue-400 transition">Test Yourself</Link>
          <Link to="/support" className="hover:text-blue-400 transition">Support</Link>

          {!user ? (
            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:text-blue-400 transition"
              >
                <FaUserCircle size={22} />
                <span className="capitalize">{user.name.split(" ")[0]}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1c1c2e] text-black dark:text-white rounded-md shadow-lg py-2 text-sm z-50">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#2a2a3f]" onClick={() => setShowDropdown(false)}>
                    Dashboard
                  </Link>
                  <Link to="/profile-settings" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#2a2a3f]" onClick={() => setShowDropdown(false)}>
                    Profile Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-[#2a2a3f]">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        
        </div>

        {/* Mobile Toggle */}
        <div
          className="md:hidden text-2xl text-blue-400 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0f2c] px-6 pb-4 text-black dark:text-white text-sm animate-fade-down space-y-2">
          <Link to="/" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Home</Link>
          <Link to="/quiz" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Test Yourself</Link>
          <Link to="/support" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Support</Link>
          {!user ? (
            <Link to="/login" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Login</Link>
          ) : (
            <>
              <Link to="/dashboard" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Dashboard</Link>
              <Link to="/profile-settings" onClick={toggleMenu} className="block py-2 hover:text-blue-400">Profile Settings</Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="block w-full text-left py-2 hover:text-blue-400">Logout</button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
