import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0f2c] text-white px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Intra</span>
            <span className="text-blue-400">Quiz</span>
          </h1>
          <p className="text-sm text-gray-300">
            Elevate learning through AI-generated quizzes designed to spark curiosity, improve retention, and make knowledge interactive and fun.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Quiz", path: "/quiz" },
              { name: "History", path: "/history" },
            ].map(({ name, path }, idx) => (
              <li key={idx}>
                <Link
                  to={path}
                  className="hover:text-blue-400 transition-all duration-300 inline-block hover:translate-x-1"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-300 mb-4">Connect With Us</h2>
          <p className="text-sm text-gray-300 mb-4">
            Follow our journey and stay up-to-date with updates, tips, and insights.
          </p>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-transform duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-300 mb-4">Get In Touch</h2>
          <p className="text-sm text-gray-300">
            We'd love to hear from you. For feedback, support, or partnership inquiries, reach us at:
            <br />
            <a
              href="mailto:support@intraquiz.com"
              className="text-blue-400 hover:underline"
            >
              support@intraquiz.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-blue-800 pt-6 text-center text-sm text-blue-300">
        <p>© {new Date().getFullYear()} IntraQuiz. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-500">
          Crafted with 💙 & AI to ignite learning, curiosity, and collaboration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
