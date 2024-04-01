import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";

const PaymentMain = () => {
  const navigate = useNavigate();
  const assignedId = useSelector((state) => state.paymnent.user.assignedId);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const mainDataPoints = useSelector((state) => state.visuals.mainDataPoints); // Replace with actual data points from your state

  console.log("mainDataPoints");
  console.log(analysisDone);
  console.log(paymentMade);
  console.log(assignedId);
  // If payment and analysis are both done, we navigate to the details page
  if (paymentMade && analysisDone) {
    navigate("/main/analysis");
  }

  // Render a different message depending on whether the analysis is done or not
  const message = analysisDone
    ? "Your analysis is complete! Here are three key data points:"
    : "Your analysis is underway. You have been assigned the following ID: ";

  // This will hold your three main data points coming from the Redux store or any other source.

  return (
    <div className="min-h-screen p-8 bg-darkBgGray">
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-4 tracking-wider">
          Payment and Analysis
        </h1>
        <p className="mb-3 text-gray-200 text-lg mt-6">{message}</p>
        {!analysisDone && (
          <p className="mb-3 text-xl text-gray-200">{assignedId}</p>
        )}
        {!analysisDone && (
          <div className="mt-12">
            <LoadingSpinner />
          </div>
        )}

        {analysisDone && (
          <div>
            {/* Example rendering of data points, replace with actual content */}
            <div className="my-10">
              <div className="text-gray-200">
                Total number of{" "}
                <span className="text-teal-500">sybile addresses found</span>:{" "}
                {mainDataPoints.sybileAddrNbr}
              </div>
              <div className="text-gray-200">
                Total number of sybile{" "}
                <span className="text-teal-500">clusters found</span>:{" "}
                {mainDataPoints.sybileClusterNbr}
              </div>

              <div className="text-gray-200">
                Among all, the{" "}
                <span className="text-teal-500">biggest cluster</span>:{" "}
                {mainDataPoints.biggestCluster}
              </div>
            </div>
            <button
              onClick={() => navigate("/main/payment/details")} // Replace with your actual payment flow trigger
              className="mt-4 bg-teal-600 text-gray-200 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
            >
              Pay to see more details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMain;
