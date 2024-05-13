// src/PredictiveAnalysis.js
import React, { useState } from "react";

const PredictiveAnalysis = () => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadUrl =
    "https://sgtpfbliixxaqtnajnek.supabase.co/storage/v1/object/public/sybile/lookup/0.2693419080812771.csv";

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold mb-4">Predictive Analysis</h4>
      <p className="text-gray-700 mb-6">
        Predictive analysis focuses on forecasting future trends by identifying
        patterns in current and historical data.
      </p>
      <a
        href={downloadUrl}
        onClick={handleDownload}
        download
        className={`tracking-wider shadow-lg px-4 py-2 rounded-md transition duration-200 ${
          downloaded
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800"
        }`}
        style={{ pointerEvents: downloaded ? "none" : "auto" }}
      >
        Download Report
      </a>
      {downloaded && (
        <svg
          className="w-6 h-6 ml-2 inline-block text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default PredictiveAnalysis;
