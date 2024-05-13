// src/OnchainAnalysis.js
import React from "react";

const OnchainAnalysis = () => {
  const downloadUrl =
    "https://sgtpfbliixxaqtnajnek.supabase.co/storage/v1/object/public/sybile/lookup/onchain_analysis.csv"; // Replace with your URL

  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold mb-4">Onchain Analysis</h4>
      <p className="text-gray-700 mb-6">
        On-chain analysis studies blockchain transaction data to detect
        suspicious activity and anomalous behavior.
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

export default OnchainAnalysis;
