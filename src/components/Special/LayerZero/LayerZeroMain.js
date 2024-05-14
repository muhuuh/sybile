// src/LandingPage.js
import React, { useState } from "react";
import PredictiveAnalysis from "./PredictiveAnalysis";
import LookupAnalysis from "./LookupAnalysis";
import OnchainAnalysis from "./OnchainAnalysis";
import supabase from "../../../Supabase/supabase";
import LoadingSpinner from "../../UI/LoadingSpinner";

const LayerZeroMain = () => {
  const [activeAnalysis, setActiveAnalysis] = useState("predictive");
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleCodeSubmit = async () => {
    setIsUploading(true);
    const { data, error } = await supabase
      .from("invite_codes")
      .select("redeemed")
      .eq("code", accessCode)
      .single();

    if (error) {
      setError("Failed to validate code. Please try again.");
      return;
    }

    if (data && !data.redeemed) {
      setIsAuthenticated(true);
      setIsUploading(false);
    } else {
      setError("Invalid access code.");
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen p-8 mx-auto text-center"
        style={{
          background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
        }}
      >
        <h1 className="text-3xl font-bold text-indogoDye mb-2 tracking-wider">
          LayerZero Sybil Analysis
        </h1>
        <h1 className="text-xl text-gray-700 tracking-wider font-bold mb-6 mt-14">
          Enter Access Code
        </h1>
        <input
          type="text"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="text-center p-2 border border-gray-300 rounded focus:border-gray-500 focus:outline-none"
          placeholder="Access Code"
        />
        <button
          onClick={handleCodeSubmit}
          className="ml-2 bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800 tracking-wider py-2 px-4 rounded"
        >
          Submit
        </button>

        {isUploading ? (
          <div className="flex flex-col items-center">
            <LoadingSpinner />
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          ""
        )}
        {error && <p className="text-red-700 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <main
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
      }}
    >
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-indogoDye mb-2 tracking-wider nb-3">
            LayerZero Sybil Analysis
          </h1>
          <h2 className="text-gray-800  text-lg mb-10">Main Insights</h2>
          <p className="text-lg text-gray-800 mb-10">
            In-depth analysis of Sybil trends and the impact on the LayerZero
            network. Discover how each type of analysis provides unique insights
            into predictive, lookup, and on-chain characteristics.
          </p>
        </div>

        <h3 className="text-2xl font-semibold mb-2">Analysis Details</h3>
        <div className="mb-6">
          Please select the Analysis you would like to deep dive on
        </div>
        <div className="flex justify-center space-x-2 mb-8">
          <button
            className={`tracking-wider ${
              activeAnalysis === "predictive"
                ? "bg-argentinianBlue text-gray-800"
                : "bg-honoluluBlue text-gray-200"
            } px-4 py-2 rounded-l shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
            onClick={() => setActiveAnalysis("predictive")}
          >
            Predictive
          </button>
          <button
            className={`tracking-wider ${
              activeAnalysis === "lookup"
                ? "bg-argentinianBlue text-gray-800"
                : "bg-honoluluBlue text-gray-200"
            } px-4 py-2  shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
            onClick={() => setActiveAnalysis("lookup")}
          >
            Lookup
          </button>
          <button
            className={`tracking-wider ${
              activeAnalysis === "onchain"
                ? "bg-argentinianBlue text-gray-800"
                : "bg-honoluluBlue text-gray-200"
            } px-4 py-2 rounded-r shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
            onClick={() => setActiveAnalysis("onchain")}
          >
            Onchain
          </button>
        </div>

        <div className="mt-8">{renderActiveAnalysis()}</div>
      </div>
    </main>
  );
};

export default LayerZeroMain;
