import React, { useEffect } from "react";
import VisualMain from "../Visual/VisualMain";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
  fetchNetworkAnalysis,
} from "../../store/visuals-slice";

const AnalysisMain = () => {
  //TODOadd search function to have requestID even we we arrive directly here withou dropping new csv file
  //const requestId = useSelector((state) => state.paymnent.user.request_id);
  const requestId = "6bb337cc-a664-4bc8-8544-c1f511307282";
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);
  const dataAnalysis = useSelector((state) => state.visuals.dataAnalysis);
  const networkAnalysis = useSelector((state) => state.visuals.networkAnalysis);
  const sybileAddresseAnalysis = useSelector(
    (state) => state.visuals.sybileAddresseAnalysis
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentMade && analysisDone && requestId) {
      dispatch(fetchNetworkAnalysis(requestId));
      dispatch(fetchDataAnalysis(requestId));
      dispatch(fetchAddressAnalysis(requestId));
    }
  }, [paymentMade, analysisDone, requestId, dispatch]);

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
    <div className="min-h-screen bg-darkBgGray p-8">
      <h1 className="text-3xl text-center text-teal-600 mb-6">Analytics</h1>

      <div className="text-gray-200 mt-4">
        <h2 className="text-2xl mb-4">Main findings</h2>
        {dataAnalysis && (
          <>
            <p>
              Total Users: {dataAnalysis.executiveSummary.totalParticipants}
            </p>
            <p>
              Total Sybil Addresses:{" "}
              {dataAnalysis.executiveSummary.totalSybilAddresses}
            </p>
            <p>
              Sybil Percentage: {dataAnalysis.executiveSummary.sybilPercentage}%
            </p>
            <p>
              Sybil Token Percentage:{" "}
              {dataAnalysis.executiveSummary.sybilTokenPercentage}%
            </p>
            <p>
              Financial Loss: $
              {dataAnalysis.executiveSummary.financialLoss.toLocaleString()}
            </p>
            <p>
              Addresses accounting for 80% sybil-attacked tokens:{" "}
              {dataAnalysis.executiveSummary.topSybilAddresses}
            </p>
            <p>
              Top 3 sybile clusters:{" "}
              {dataAnalysis.executiveSummary.mostActiveClusters.totalAddresses}{" "}
              addresses claimed{" "}
              {
                dataAnalysis.executiveSummary.mostActiveClusters
                  .claimedPercentage
              }
              % of Sybil-attacked tokens
            </p>
          </>
        )}

        {/* Additional sections can be similarly detailed */}
      </div>
      <button onClick={downloadAddressesAsCSV} className="button-class">
        Download Addresses as CSV
      </button>
      <VisualMain />

      <div className="mt-6">
        <button
          onClick={() => {
            /* logic to download the full report as a PDF or document */
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
        >
          Download Full Report
        </button>
      </div>
    </div>
  );
};

export default AnalysisMain;
