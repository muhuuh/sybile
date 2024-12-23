import React, { useEffect, useState } from "react";
import LookupMain from "./Lookup/LookupMain";
import PredictiveMain from "./Main/PredictiveMain";

const LandingPage = () => {
  const [showPredictive, setShowPredictive] = useState(false);
  const fixedTitle = "Reward your users, and not airdrop farmers";
  const [magicName, setMagicName] = useState("");

  const toggle = () => {
    setShowPredictive(!showPredictive);
  };
  /*

  useEffect(() => {
    setMagicName(fixedTitle);
  }, []);
  const name = useTypewriter(magicName);

  */

  return (
    <main
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
      }}
    >
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold text-indogoDye mb-2 tracking-wider">
          {fixedTitle || " "}
        </h1>
        <p className="text-gray-800  text-lg mb-10">
          Leverage Machine Learning and AI to filter out sybile attackers from
          your airdrop
        </p>
      </div>
      <div className="flex flex-row justify-center items-center mb-8">
        <div className="font-light">Basic</div>
        <label className="flex flex-row justify-center items-center cursor-pointer px-2">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only "
              checked={showPredictive}
              onChange={toggle}
            />
            <div
              className={`block w-14 h-8 rounded-full ${
                showPredictive ? "bg-argentinianBlue" : "bg-salmon"
              }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
                showPredictive && "transform translate-x-full"
              }`}
            ></div>
          </div>
        </label>
        <div className="font-light ">Advanced</div>
      </div>
      {showPredictive ? <PredictiveMain /> : <LookupMain />}
    </main>
  );
};

export default LandingPage;
