import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PaymentDetails from "./PaymentDetails";

const PaymentMain = () => {
  const navigate = useNavigate();
  const requestId = useSelector((state) => state.paymnent.user.request_id);
  const paymentMade = useSelector((state) => state.paymnent.user.paymentMade);
  const analysisDone = useSelector((state) => state.paymnent.user.analysisDone);
  const paymentSent = useSelector((state) => state.paymnent.paymentSent);
  const dataAnalysis = useSelector((state) => state.visuals.dataAnalysis);
  const [openModal, setOpenModal] = useState(false);
  const [estimatedMcap, setEstimatedMcap] = useState("");

  console.log("mainDataPoints");
  console.log(analysisDone);
  console.log(paymentMade);
  console.log(requestId);
  console.log(dataAnalysis);

  // Navigate when both payment and analysis are done
  useEffect(() => {
    if (paymentMade && analysisDone) {
      navigate("/main/analysis");
    }
  }, [paymentMade, analysisDone, navigate]);

  const computeFinancialLoss = () => {
    const sybilTokenPercentage = dataAnalysis.sybiledTokenPercentage / 100;
    return (estimatedMcap * sybilTokenPercentage).toLocaleString();
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const message = analysisDone
    ? "Your analysis is complete! Here are three key data points:"
    : "Your analysis is underway. Please stay on this page and don't refresh.";

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold text-indogoDye mb-4 tracking-wider">
          Payment and Analysis
        </h1>
        <p className="mb-3 text-gray-800 text-lg mt-6 font-light tracking-wider">
          {message}
        </p>
        {!analysisDone && (
          <>
            <div className="mt-12">
              <LoadingSpinner />
              <p className="text-xl text-gray-700 mt-12">
                Please make sure to save the below ID. It is your access code to
                retrieve your analysis.
              </p>
              <p className="mt-3 text-xl text-gray-200">{requestId}</p>
            </div>
          </>
        )}

        {analysisDone && (
          <div className="flex flex-col">
            <div className=" my-10 mx-auto max-w-6xl w-1/3 bg-white rounded-lg shadow-lg border py-10 px-32">
              <div className="text-gray-700">
                Total number of{" "}
                <span className="text-honoluluBlue">
                  Sybile addresses found
                </span>
                : {dataAnalysis.totalSybilAddresses}
              </div>
              <div className="text-gray-700">
                Total number of{" "}
                <span className="text-honoluluBlue">
                  Sybil Addresses Percentage
                </span>
                : {dataAnalysis.sybilAddressPercentage}%
              </div>
              <div className="text-gray-700">
                Total{" "}
                <span className="text-honoluluBlue">
                  Sybil Token Percentage
                </span>
                : {dataAnalysis.sybiledTokenPercentage}%
              </div>
              <div className="col-span-2 mt-10 text-lg">
                <div className="text-center">
                  <input
                    type="text"
                    placeholder="Estimated MCAP at launch"
                    className="border-2 border-gray-200 px-2 py-1 rounded text-sm font-light w-52 tracking-wider mb-4"
                    value={estimatedMcap.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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

              {!paymentSent ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-honoluluBlue text-gray-200 px-4 py-2 mt-10 shadow-lg rounded ml-2 hover:bg-salmon hover:text-gray-800 transition duration-200"
                >
                  Pay to see more details
                </button>
              ) : (
                <div className="mt-10">
                  <LoadingSpinner />
                  <p className=" text-gray-700 mt-4">
                    Thanks for sending your payment!
                  </p>
                  <p className="text-light text-gray-700 ">
                    We are monitoring your payment and will refresh
                    automatically the page after 3 confirmation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {openModal && <PaymentDetails closeModal={closeModalHandler} />}
      </div>
    </div>
  );
};

export default PaymentMain;
