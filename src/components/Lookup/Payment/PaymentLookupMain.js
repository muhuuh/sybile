import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PaymentLookupDetails from "./PaymentLookupDetails";
import { subscribeToSupabaseLookup } from "../../../Supabase/subscribeSupabase";
import supabase from "../../../Supabase/supabase";
import CopyIcon from "../../UI/Icons/CopyIcon";
import QuestionIcon from "../../UI/Icons/QuestionIcon";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
} from "../../store/analysis-lookup-slice";

const PaymentLookupMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestId = useSelector(
    (state) => state.paymnentLookup.user.request_id
  );
  const paymentMade = useSelector(
    (state) => state.paymnentLookup.user.paymentMade
  );
  const analysisDone = useSelector(
    (state) => state.paymnentLookup.user.analysisDone
  );
  const paymentSent = useSelector((state) => state.paymnentLookup.paymentSent);
  const dataAnalysis = useSelector(
    (state) => state.analysisLookup.dataAnalysis
  );
  const [openModal, setOpenModal] = useState(false);
  const [estimatedMcap, setEstimatedMcap] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [showAnalysisExplanation, setShowAnalysisExplanation] = useState(false);
  const [showMcapExplanation, setShowMcapExplanation] = useState(false);
  const paymentAddress = "0x896F5E5FD6e281020d8ef81856B3756dA561cBa0";

  console.log("mainDataPoints");
  console.log(analysisDone);
  console.log(paymentMade);
  console.log(requestId);
  console.log(dataAnalysis);

  //handle unsubscription
  useEffect(() => {
    // Subscribe to realtime updates, passing the requestId
    const sub = subscribeToSupabaseLookup(dispatch, requestId);
    setSubscription(sub);

    return () => {
      if (sub) {
        supabase.removeChannel(sub); // Unsubscribe when the component unmounts
      }
    };
  }, [dispatch, requestId]);

  const handleFetchAnalysis = async () => {
    await Promise.all([
      dispatch(fetchDataAnalysis(requestId)),
      dispatch(fetchAddressAnalysis(requestId)),
    ]);
  };

  //fetch analysis data from database once it gets updated to update redux store
  useEffect(() => {
    if (analysisDone) {
      handleFetchAnalysis();
    }
  }, [analysisDone, handleFetchAnalysis]);

  // Navigate when both payment and analysis are done
  useEffect(() => {
    if (paymentMade && analysisDone) {
      navigate("/main/analysis/lookup");
    }
  }, [paymentMade, analysisDone, navigate]);

  const computeFinancialLoss = () => {
    const sybilTokenPercentage = dataAnalysis.sybiledTokenPercentage / 100;
    return (estimatedMcap * sybilTokenPercentage).toLocaleString();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  //-----------handle UI ---------------

  const onAnalysisExplanationHandler = () => {
    setShowAnalysisExplanation(!showAnalysisExplanation);
  };
  const onMcapExplanationHandler = () => {
    setShowMcapExplanation(!showMcapExplanation);
  };

  const message = analysisDone ? (
    <div className="mb-3 ">
      <span className=" text-gray-800 text-lg  font-light tracking-wider">
        Your Lookup Analysis is complete!
      </span>
      <button
        onClick={onAnalysisExplanationHandler}
        className="mt-10 ml-2 text-indogoDye"
      >
        <QuestionIcon />
      </button>
    </div>
  ) : (
    <p className="text-xl text-gray-700 mt-12">
      Your analysis is underway. Please{" "}
      <span className=" ">stay on this page</span> and don't refresh.
    </p>
  );

  return (
    <div
      className="min-h-screen p-8 "
      style={{
        background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
      }}
    >
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
                Make sure to save the below ID. It is your{" "}
                <span className="font-bold text-indogoDye">access code</span> to
                retrieve your analysis.
              </p>
              <div className="text-center gap-x-2 mt-6">
                <span className="mt-3 text-xl text-indogoDye hover:text-salmon font-bold">
                  {requestId}
                </span>
                <button
                  onClick={() => copyToClipboard(requestId)}
                  className="  text-salmon px-2 "
                >
                  <div className="">
                    <CopyIcon />
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {analysisDone && (
          <div className="flex flex-col">
            <div className="flex justify-center">
              {showAnalysisExplanation && (
                <div className="font-light w-2/3 text-center">
                  Please find below general insights based on our database of
                  known sybil attacker addresses. Be aware, attackers not yet
                  saved in our database will not be flaged. For the complete
                  analysis, please chose the predictive analysis{" "}
                </div>
              )}
            </div>
            <div className=" my-10 mx-auto max-w-6xl w-1/2 bg-white rounded-lg shadow-lg border py-10 px-32">
              <h1 className="text-lg font-bold underline decoration-salmon text-indogoDye mb-4 tracking-wider">
                Lookup Analysis
              </h1>
              <p className="font-light mb-4">
                Based only on known sybil attackers, your list of users
                contains:{" "}
              </p>
              <div className="text-gray-700">
                Total <span className="text-honoluluBlue">Sybil clusters</span>:{" "}
                {dataAnalysis.sybiledTokenPercentage}%
              </div>
              <div className="text-gray-700">
                Total number of{" "}
                <span className="text-honoluluBlue">Sybile addresses</span>:{" "}
                {dataAnalysis.totalSybilAddresses}
              </div>
              <div className="text-gray-700">
                Total number of{" "}
                <span className="text-honoluluBlue">
                  Sybil Addresses Percentage
                </span>
                : {dataAnalysis.sybilAddressPercentage}%
              </div>

              <div className="col-span-2 mt-10 text-lg">
                <div className="text-center">
                  <div>
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
                    <button
                      onClick={onMcapExplanationHandler}
                      className="ml-2 text-indogoDye"
                    >
                      <QuestionIcon />
                    </button>
                  </div>
                  {showMcapExplanation && (
                    <p className="font-light text-sm mb-4">
                      Enter your launch mcap to estimate the financial impact
                      sybil attacker would have on your protocol
                    </p>
                  )}
                  {estimatedMcap && (
                    <p className="text-center">
                      In total, the{" "}
                      <span className="font-bold text-indogoDye tracking-wider">
                        financial loss
                      </span>{" "}
                      due to the detected sybil attack amounts to: $
                      <span className="font-bold underline text-salmon">
                        {computeFinancialLoss()}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {!paymentSent ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-honoluluBlue text-gray-200 px-4 py-2 mt-6 shadow-lg rounded ml-2 hover:bg-salmon hover:text-gray-800 transition duration-200"
                >
                  Pay to see more details
                </button>
              ) : (
                <div className="mt-6">
                  <LoadingSpinner />
                  <p className=" text-indogoDye font-bold mt-4">
                    Thanks for your interest!
                  </p>
                  <p className="text-light text-gray-700 mt-2">
                    Remember to send your payment to{" "}
                    <span className="font-light text-sm italic">
                      {paymentAddress}
                    </span>{" "}
                    using your address you have shared
                  </p>
                  <p className="text-light text-gray-700 mt-2">
                    We are monitoring your payment and will
                    <span className="font-bold text-salmon">
                      {" "}
                      refresh automatically
                    </span>{" "}
                    the page after onchain confirmation
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {openModal && (
          <PaymentLookupDetails
            closeModal={closeModalHandler}
            paymentAddress={paymentAddress}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentLookupMain;
