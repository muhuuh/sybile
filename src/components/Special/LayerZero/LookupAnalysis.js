// src/LookupAnalysis.js
import React, { useState } from "react";

const LookupAnalysis = () => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadUrl =
    "https://sgtpfbliixxaqtnajnek.supabase.co/storage/v1/object/public/sybile/lookup/0.2693419080812771.csv";

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="text-center max-w-6xl mx-auto bg-white rounded-lg border-gray-200 border shadow-lg p-8 mt-10">
      <h4 className="text-xl font-semibold mb-4">Lookup Analysis</h4>
      <p className="text-gray-700 mb-12">
        Lookup analysis offers detailed cross-checking of data points to verify
        identities and detect patterns of suspicious behavior.
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

export default LookupAnalysis;
