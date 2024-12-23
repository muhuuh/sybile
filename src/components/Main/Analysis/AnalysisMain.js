import React, { useEffect, useState } from "react";
import VisualMain from "../Visual/VisualMain";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
  fetchNetworkAnalysis,
} from "../../store/visuals-slice";

const AnalysisMain = () => {
  const requestId = useSelector((state) => state.paymnent.user.request_id);
  //const requestId = "6bb337cc-a664-4bc8-8544-c1f511307282";
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);
  const requestValid = useSelector((state) => state.visuals.requestValid);
  const dataAnalysis = useSelector((state) => state.visuals.dataAnalysis);
  const networkAnalysis = useSelector((state) => state.visuals.networkAnalysis);
  const [estimatedMcap, setEstimatedMcap] = useState("");

  const sybileAddresseAnalysis = useSelector(
    (state) => state.visuals.sybileAddresseAnalysis
  );
  const dispatch = useDispatch();

  console.log("dataAnalysis");
  console.log(dataAnalysis);

  useEffect(() => {
    if (paymentMade && analysisDone && requestId) {
      dispatch(fetchNetworkAnalysis(requestId));
      dispatch(fetchDataAnalysis(requestId));
      dispatch(fetchAddressAnalysis(requestId));
    }
  }, [paymentMade, analysisDone, requestId, dispatch]);

  const computeFinancialLoss = () => {
    const sybilTokenPercentage = dataAnalysis.sybiledTokenPercentage / 100;
    return (estimatedMcap * sybilTokenPercentage).toLocaleString();
  };

  const downloadAddressesAsCSV = () => {
    const addresses = sybileAddresseAnalysis;

    // Check if addresses is an array and has items
    if (!Array.isArray(addresses) || addresses.length === 0) {
      console.error("No addresses data to download.");
      return; // Stop the function if no data is available
    }

    // Convert JSON to CSV
    const header = Object.keys(addresses[0]).join(",");
    const rows = addresses.map((obj) => Object.values(obj).join(","));
    const csv = [header, ...rows].join("\n");

    // Create a Blob and download the file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sybileAddresses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-indogoDye mb-4 tracking-wider text-center">
        Analytics
      </h1>
      {requestValid && (
        <div>
          <div className="flex justify-center text-gray-200 mt-16">
            {dataAnalysis && (
              <div className="text-gray-700 grid grid-cols-2 gap-4">
                <ul className="list-disc pl-5">
                  <li>Total Users: {dataAnalysis.totalUsers}</li>
                  <li>
                    Total Sybil Addresses: {dataAnalysis.totalSybilAddresses}
                  </li>
                  <li>
                    Sybil Address Percentage:{" "}
                    {dataAnalysis.sybilAddressPercentage}%
                  </li>
                </ul>
                <ul className="list-disc pl-5">
                  <li>
                    Sybiled Token Percentage:{" "}
                    {dataAnalysis.sybiledTokenPercentage}%
                  </li>

                  <li>
                    Addresses accounting for 80% sybil-attacked tokens:{" "}
                    {dataAnalysis.addressesAccountingForTopSybil}
                  </li>
                  <li>
                    {" "}
                    Top 3 sybile clusters:{" "}
                    {dataAnalysis.topSybileClusters.totalAddresses} addresses
                    claimed {dataAnalysis.topSybileClusters.claimedPercentage}%
                    of Sybil-attacked tokens
                  </li>
                </ul>
                <div className="col-span-2 mt-6 text-lg">
                  <div className="text-center">
                    <input
                      type="text"
                      placeholder="Estimated MCAP at launch"
                      className="border-2 border-gray-200 px-2 py-1 rounded text-sm font-light w-52 tracking-wider mb-4"
                      value={estimatedMcap.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                      onChange={(e) =>
                        setEstimatedMcap(e.target.value.replace(/,/g, ""))
                      }
                    />
                    {estimatedMcap && (
                      <p className="text-center">
                        In total, the{" "}
                        <span className="font-bold tracking-wider">
                          financial loss
                        </span>{" "}
                        due to the detected sybil attack amounts to: $
                        <span className="font-bold underline">
                          {computeFinancialLoss()}
                        </span>
                      </p>
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
          <VisualMain networkAnalysis={networkAnalysis} />
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

export default AnalysisMain;
