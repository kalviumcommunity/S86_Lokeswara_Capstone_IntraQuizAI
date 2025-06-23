import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import SkeletonChart from "../components/SkeletonCard";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const { quizHistory } = []

  const [loading, setLoading] = useState(true);



  const cardClasses =
    "p-5 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-1 hover:scale-[1.02] bg-white dark:bg-[#1c2541] text-gray-900 dark:text-blue-200";

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#0a0f2c] text-gray-900 dark:text-white">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 space-y-8 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 dark:from-[#0a0f2c] dark:via-[#131a44] dark:to-[#1b235f] overflow-y-auto transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-300 drop-shadow-sm transition-transform duration-300 hover:scale-105">
          Dashboard Overview
        </h1>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Score Over Time */}
          <div className={cardClasses}>
            <h2 className="text-lg font-semibold mb-4">📈 Score Over Time</h2>
            {loading ? <SkeletonChart /> : <ScoreLineChart data={quizHistory} />}
          </div>

          {/* Topic Distribution */}
          <div className={cardClasses}>
            <h2 className="text-lg font-semibold mb-4">🧠 Topic Distribution</h2>
            {loading ? <SkeletonChart /> : <TopicPieChart />}
          </div>

          {/* Accuracy by Category */}
          <div className={`md:col-span-2 ${cardClasses}`}>
            <h2 className="text-lg font-semibold mb-4">🎯 Accuracy by Category</h2>
            {loading ? <SkeletonChart /> : <AccuracyBarChart data={quizHistory} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
