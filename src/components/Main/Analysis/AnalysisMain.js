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

  console.log("dataAnalysis");
  console.log(dataAnalysis);
  console.log(networkAnalysis);
  console.log(sybileAddresseAnalysis);
  console.log(requestId);

  useEffect(() => {
    if (paymentMade && analysisDone && requestId) {
      console.log("get data");
      dispatch(fetchNetworkAnalysis(requestId));
      dispatch(fetchDataAnalysis(requestId));
      dispatch(fetchAddressAnalysis(requestId));
    }
  }, [paymentMade, analysisDone, requestId, dispatch]);

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
      <VisualMain />
      {/* Option to download the detailed report */}
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
