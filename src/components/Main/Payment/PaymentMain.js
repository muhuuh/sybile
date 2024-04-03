import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PaymentDetails from "./PaymentDetails";

const PaymentMain = () => {
  const navigate = useNavigate();
  const requestId = useSelector((state) => state.paymnent.user.request_id);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const mainDataPoints = useSelector((state) => state.visuals.mainDataPoints);
  const [openModal, setOpenModal] = useState(false);

  console.log("mainDataPoints");
  console.log(analysisDone);
  console.log(paymentMade);
  console.log(requestId);
  // If payment and analysis are both done, we navigate to the details page
  if (paymentMade && analysisDone) {
    navigate("/main/analysis");
  }

  const closeModalHandler = () => {
    setOpenModal(false);
  };

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
          <p className="mb-3 text-xl text-gray-200">{requestId}</p>
        )}
        {!analysisDone && (
          <div className="mt-12">
            <LoadingSpinner />
          </div>
        )}

        {analysisDone && (
          <div className="flex flex-col">
            {/* Example rendering of data points, replace with actual content */}
            <div className=" my-10 mx-auto max-w-6xl  bg-lightBgGray rounded-lg shadow-md py-10 px-32">
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
              <button
                onClick={() => setOpenModal(true)}
                className="mt-16 mx-auto bg-teal-600 text-gray-200 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
              >
                Pay to see more details
              </button>
            </div>
          </div>
        )}
        {openModal && <PaymentDetails closeModal={closeModalHandler} />}
      </div>
    </div>
  );
};

export default PaymentMain;
