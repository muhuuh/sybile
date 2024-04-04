import React, { useEffect } from "react";
import VisualMain from "../Visual/VisualMain";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
  fetchNetworkAnalysis,
} from "../../store/visuals-slice";

const AnalysisMain = () => {
  const requestId = useSelector((state) => state.paymnent.user.request_id);
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);

  const dispatch = useDispatch();

  // Mock data, replace with your actual data fetching logic
  const reportData = {
    executiveSummary: {
      totalSybilAddresses: 863,
      totalParticipants: 15086,
      sybilPercentage: 5.7,
      sybilTokenPercentage: 8.9,
      financialLoss: 2803194.82,
      topSybilAddresses: 84,
      topSybilPercentage: 80,
      mostActiveClusters: {
        totalClusters: 3,
        totalAddresses: 9,
        claimedTokens: 5338149,
        claimedPercentage: 33.1,
      },
    },
    initialFindings: {
      totalAddresses: 15086,
      totalClaimedENA: 16122198,
      sybilClaimedENA: 1612198,
      potentialSavingsENA: 4061707,
      largestCluster: {
        addressCount: 33,
        claimedENA: 91403,
      },
    },
    detailedAnalysis: {
      sybilAttackDistribution: {
        averageClaimedENA: 18659,
        standardDeviation: 101718,
        medianClaimedENA: 1888,
      },
      sybileAmount: {
        perAddressAverage: 18659,
        perAddressMedian: 1888,
        perClusterAverage: 45414,
        perClusterMedian: 7372,
      },
      topClaimers: {
        topAddressClaimedENA: 1740000,
        topClusters: [
          {
            clusterId: 1862,
            claimedENA: 2217086,
            percentageOfTotalClaimed: 13.7,
          },
        ],
      },
      clusterInsights: {
        averageClusterSize: 2.43,
      },
    },
  };

  useEffect(() => {
    if (paymentMade && analysisDone && requestId) {
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
        <p>Total Users: {reportData.executiveSummary.totalParticipants}</p>
        <p>
          Total Sybil Addresses:{" "}
          {reportData.executiveSummary.totalSybilAddresses}
        </p>

        <p>Sybil Percentage: {reportData.executiveSummary.sybilPercentage}%</p>
        <p>
          Sybil Token Percentage:{" "}
          {reportData.executiveSummary.sybilTokenPercentage}%
        </p>
        <p>
          Financial Loss: $
          {reportData.executiveSummary.financialLoss.toLocaleString()}
        </p>
        <p>
          Addresses accounting for 80% sybil-attacked tokens:{" "}
          {reportData.executiveSummary.topSybilAddresses}
        </p>
        <p>
          Top 3 sybile clusters:{" "}
          {reportData.executiveSummary.mostActiveClusters.totalAddresses}{" "}
          addresses claimed{" "}
          {reportData.executiveSummary.mostActiveClusters.claimedPercentage}% of
          Sybil-attacked tokens
        </p>

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
