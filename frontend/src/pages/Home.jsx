import React from "react";
import { Link } from "react-router-dom";
import headImage from "../assets/head.png";


const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#0a0f2c] dark:via-[#131a44] dark:to-[#1b235f] text-gray-900 dark:text-white transition-colors duration-700">

            <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white drop-shadow-md mb-6">
                    Discover <span className="text-blue-600 dark:text-blue-400">Smart Quizzing</span> with AI
                </h1>

                <p className="text-lg md:text-xl text-gray-700 dark:text-blue-200 max-w-2xl mb-8">
                    Personalize your learning. Generate quizzes on any topic. Analyze your
                    performance. All in one intuitive platform.
                </p>

                <Link to="/quiz">
                    <button className="px-10 py-4 bg-blue-600 dark:bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-12">
                        🚀 Test your Self
                    </button>
                </Link>


                <div className="relative w-full max-w-md">
                    <img
                        src={headImage}
                        alt="AI Quiz Preview"
                        className="w-full h-auto rounded-3xl transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 dark:bg-blue-900 opacity-30 blur-3xl pointer-events-none"></div>
                </div>

            </div>

            <div className="bg-gray-100 dark:bg-[#0e1436] py-20 px-6 transition-colors duration-700">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-blue-300">
                        ✨ Why Choose IntraQuiz?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            title="💡 AI-Powered Questions"
                            description="Get custom quizzes instantly from any topic using cutting-edge AI."
                        />
                        <FeatureCard
                            title="📊 Track & Improve"
                            description="View detailed quiz history, scores, and growth charts to level up."
                        />
                        <FeatureCard
                            title="⚙️ Fast & Responsive"
                            description="Enjoy a seamless experience on any device—fast, fluid, and beautiful."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#f8fafc] dark:bg-[#121a3a] py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-blue-600 dark:text-blue-300">⚙️ How It Works</h2>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <StepCard
                            icon="📝"
                            title="Enter a Topic"
                            description="Type in what you want to learn about. Math, science, history—you name it."
                        />
                        <StepCard
                            icon="⚡"
                            title="Generate Quizzes"
                            description="AI instantly creates questions with multiple-choice options and answers."
                        />
                        <StepCard
                            icon="📈"
                            title="Track Progress"
                            description="Check scores, retry questions, and see your performance improve."
                        />
                    </div>
                </div>
            </div>


            <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-[#1b235f] dark:to-[#0a0f2c] py-16 px-6 text-center text-white">
                <h2 className="text-3xl font-semibold mb-4">📬 Stay Updated</h2>
                <p className="mb-6 text-blue-100">Subscribe to receive updates, tips, and feature releases!</p>
                <form className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded-full w-full md:w-2/3 focus:outline-none text-gray-900 dark:text-white bg-white dark:bg-[#1c254b] border border-gray-300 dark:border-blue-400 placeholder-gray-500 dark:placeholder-blue-300"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-100 dark:bg-blue-500 text-blue-800 dark:text-white font-semibold rounded-full hover:bg-blue-200 dark:hover:bg-blue-600 transition-all"
                    >
                        Subscribe
                    </button>

                </form>
            </div>


            <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-[#1b235f] dark:via-[#0e1436] dark:to-[#0a0f2c] py-16 text-center transition-colors duration-700">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                    Ready to Boost Your Knowledge?
                </h3>
                <p className="text-blue-200 mb-8">
                    Start now and experience the smartest way to learn through quizzes.
                </p>
                <Link to="/quiz">
                    <button className="px-10 py-4 bg-blue-600 dark:bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-12">
                        🧠 Generate Your First Quiz
                    </button>
                </Link>
            </div>
        </div>
    );
};

const FeatureCard = ({ title, description }) => (
    <div className="bg-white dark:bg-[#1c254b] p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out border border-blue-700 dark:border-blue-400">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-blue-200">{description}</p>
    </div>
);

const StepCard = ({ icon, title, description }) => (
    <div className="relative bg-white dark:bg-[#1b2545] p-8 rounded-2xl shadow-lg w-full max-w-md text-left">
        <div className="absolute -top-6 left-4 text-4xl">{icon}</div>
        <h4 className="text-xl font-bold mb-2 pl-10 text-blue-800 dark:text-blue-300">{title}</h4>
        <p className="text-gray-700 dark:text-blue-200 pl-10">{description}</p>
    </div>
);

export default Home;
