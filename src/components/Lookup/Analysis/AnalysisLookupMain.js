import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
} from "../../store/analysis-lookup-slice";
import QuestionIcon from "../../UI/Icons/QuestionIcon";

const AnalysisLookupMain = () => {
  const [showMcapExplanation, setShowMcapExplanation] = useState(false);
  const requestId = useSelector(
    (state) => state.paymnentLookup.user.request_id
  );

  //const requestId = "5c5d85cd-98e1-48e4-8081-3746416571cb";
  const analysisDone = useSelector(
    (state) => state.paymnentLookup.user.analysisDone
  );
  const paymentMade = useSelector(
    (state) => state.paymnentLookup.user.paymentMade
  );
  /*
  const requestValid = useSelector(
    (state) => state.analysisLookup.requestValid
  );
  */
  const requestValid = true; //TODO remove when analysis is really done
  const dataAnalysis = useSelector(
    (state) => state.analysisLookup.dataAnalysis
  );
  const sybileAddresseAnalysis = useSelector(
    (state) => state.analysisLookup.sybileAddresseAnalysis
  );
  const [estimatedMcap, setEstimatedMcap] = useState("3000000");
  const dispatch = useDispatch();

  console.log("dataAnalysis lookup");
  console.log(dataAnalysis);
  console.log(sybileAddresseAnalysis);

  useEffect(() => {
    if (paymentMade && analysisDone && requestId) {
      dispatch(fetchDataAnalysis(requestId));
      dispatch(fetchAddressAnalysis(requestId));
    }
  }, [paymentMade, analysisDone, requestId, dispatch]);

  const computeFinancialLoss = () => {
    const sybilTokenPercentage = dataAnalysis.sybilAddressPercentage / 100;
    return (estimatedMcap * sybilTokenPercentage).toLocaleString();
  };

  const downloadAddressesAsCSV = () => {
    const addresses = sybileAddresseAnalysis;

    // Check if addresses is an array and has items
    if (!Array.isArray(addresses) || addresses.length === 0) {
      console.error("No addresses data to download.");
      return; // Stop the function if no data is available
    }

    // Convert array of strings (addresses) to CSV format
    const header = "sybil_addresses";
    const rows = addresses.join("\n");
    const csv = [header, rows].join("\n");

    // Create a Blob and download the file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "manyme_lookupAnalysis_sybileAddresses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onMcapExplanationHandler = () => {
    setShowMcapExplanation(!showMcapExplanation);
  };

  return (
    <div
      className="min-h-screen  p-8"
      style={{
        background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
      }}
    >
      <h1 className="text-3xl font-bold text-indogoDye mb-4 tracking-wider text-center">
        Lookup Analysis
      </h1>
      {requestValid && (
        <div>
          <div className="flex justify-center text-gray-200 mt-16">
            {dataAnalysis && (
              <div className="w-2/3">
                <div className="bg-white p-6 rounded shadow">
                  <div className="text-xl text-center font-bold underline decoration-salmon text-indogoDye mb-8 tracking-wider">
                    Insights Overview
                  </div>
                  <div className="text-gray-700  grid grid-cols-2 gap-4">
                    <ul className="list-disc pl-5">
                      <li>Total Users: {dataAnalysis.totalUsers}</li>
                      <li>
                        Total Sybil Addresses:{" "}
                        {dataAnalysis.totalSybilAddresses}
                      </li>
                    </ul>
                    <ul className="list-disc pl-5">
                      <li>
                        Sybil Address Percentage:{" "}
                        {dataAnalysis.sybilAddressPercentage}%
                      </li>
                      <li>
                        {" "}
                        Top 3 sybile clusters:{" "}
                        {dataAnalysis.topSybileClusters.totalAddresses}{" "}
                        addresses claimed{" "}
                        {dataAnalysis.topSybileClusters.claimedPercentage}% of
                        Sybil-attacked tokens
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-gray-700 mt-10 text-lg">
                  <div className="flex flex-col justify-center text-center">
                    <label className="font-light">
                      Enter your estimated Marketcap ($) at launch
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Estimated MCAP at launch"
                        className="border-2 text-center border-gray-200 px-2 py-1 rounded text-sm font-light w-52 tracking-wider mb-4"
                        value={estimatedMcap.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                        onChange={(e) =>
                          setEstimatedMcap(e.target.value.replace(/,/g, ""))
                        }
                      />
                    </div>
                    {estimatedMcap && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="flex flex-row items-center text-center">
                          In total, the{" "}
                          <span className="font-bold text-indogoDye tracking-wider mx-1">
                            financial loss{" "}
                          </span>{" "}
                          due to the detected sybil attack amounts to: $
                          <span className="font-bold underline text-indogoDye">
                            {computeFinancialLoss()}
                          </span>
                          <button
                            onClick={onMcapExplanationHandler}
                            className="ml-2"
                          >
                            <QuestionIcon />
                          </button>
                        </p>
                        {showMcapExplanation && (
                          <div className="mt-2 font-light text-sm w-96">
                            Financial impat is a rough estimation based on the
                            entered marketcap and the percentage of sybil
                            addresses, assuming sybil attackers receive on avg
                            the same amount of tokens that other users
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={downloadAddressesAsCSV}
              className="bg-honoluluBlue text-gray-200 px-4 py-2 shadow-lg rounded ml-2 hover:bg-salmon hover:text-gray-800 transition duration-200"
            >
              Download Sybile Addresses
            </button>
          </div>
        </div>
      )}
      {!requestValid && (
        <div className="text-center">
          <div className="text-xl text-red-700">Sorry</div>
          <div className="text-gray-200">
            It looks like your analysis is not ready yet or you have used an
            invalid request ID
          </div>
          <div className="text-gray-200">Please try again in 5 mins</div>
          <div className="text-gray-200">
            If the error message pertains, either contact us or raise a new
            request
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisLookupMain;
