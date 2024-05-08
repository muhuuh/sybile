// src/LandingPage.js
import React, { useState } from "react";
import PredictiveAnalysis from "./PredictiveAnalysis";
import LookupAnalysis from "./LookupAnalysis";
import OnchainAnalysis from "./OnchainAnalysis";

const LayerZeroMain = () => {
  const [activeAnalysis, setActiveAnalysis] = useState("predictive");

  const renderActiveAnalysis = () => {
    switch (activeAnalysis) {
      case "predictive":
        return <PredictiveAnalysis />;
      case "lookup":
        return <LookupAnalysis />;
      case "onchain":
        return <OnchainAnalysis />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-2">LayerZero Sybil Analysis</h1>
        <h2 className="text-xl text-gray-600 mb-6">Main Insights</h2>
        <p className="text-lg text-gray-800 mb-10">
          In-depth analysis of Sybil trends and the impact on the LayerZero
          network. Discover how each type of analysis provides unique insights
          into predictive, lookup, and on-chain characteristics.
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Analysis Details</h3>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md ${
            activeAnalysis === "predictive"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveAnalysis("predictive")}
        >
          Predictive Analysis
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeAnalysis === "lookup"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveAnalysis("lookup")}
        >
          Lookup Analysis
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeAnalysis === "onchain"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveAnalysis("onchain")}
        >
          Onchain Analysis
        </button>
      </div>

      <div className="mt-8">{renderActiveAnalysis()}</div>
    </div>
  );
};

export default LayerZeroMain;
