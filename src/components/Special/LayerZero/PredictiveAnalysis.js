// src/PredictiveAnalysis.js
import React from "react";

const PredictiveAnalysis = () => {
  const downloadUrl =
    "https://your-supabase-url/predictive-analysis-report.pdf"; // Replace with your URL

  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold mb-4">Predictive Analysis</h4>
      <p className="text-gray-700 mb-6">
        Predictive analysis focuses on forecasting future trends by identifying
        patterns in current and historical data.
      </p>
      <a
        href={downloadUrl}
        download
        className="tracking-wider shadow-lg px-4 py-2 rounded-md transition duration-200 bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800 "
      >
        Download Report
      </a>
    </div>
  );
};

export default PredictiveAnalysis;
