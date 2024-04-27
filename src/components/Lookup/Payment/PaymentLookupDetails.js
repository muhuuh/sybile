import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  paymentLookupActions,
  updatePaymentInfo,
} from "../../store/payment-lookup-slice";
import CopyIcon from "../../UI/Icons/CopyIcon";
import QuestionIcon from "../../UI/Icons/QuestionIcon";

const PaymentLookupDetails = ({ closeModal, paymentAddress }) => {
  const paymentDetails = useSelector((state) => state.paymnent.paymentDetails);
  const [userAddress, setUserAddress] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const dispatch = useDispatch();

  console.log("paymentDetails");
  console.log(paymentDetails);

  const shortPaymentAddress = `${paymentAddress.slice(
    0,
    6
  )}...${paymentAddress.slice(-6)}`;
  const amountToPay = 599; //TODO needs to be computed

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

  const handlePaymentSubmission = async () => {
    const updatedPaymentDetails = {
      ...paymentDetails,
      addressPayer: userAddress,
      minValue: amountToPay,
    };

    dispatch(paymentLookupActions.updatePaymentDetails(updatedPaymentDetails));
    dispatch(updatePaymentInfo(updatedPaymentDetails));
    dispatch(paymentLookupActions.updatePaymentSent(true));

    closeModal();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-100 p-12 rounded-lg shadow-xl max-w-md w-full mx-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center items-center">
          {" "}
          <h2 className="text-2xl underline decoration-salmon font-semibold text-indogoDye tracking-wider text-center">
            Get Analysis Detail
          </h2>
          <button
            onClick={() => {
              setShowExplanation(!showExplanation);
            }}
            className="ml-2  text-indogoDye"
          >
            <QuestionIcon />
          </button>
        </div>
        {showExplanation && (
          <p className="font-light text-sm my-4">
            Enter the address with which you will pay, and send the exact amount
            displayed to the address shared below. Once the payment is received,
            the page will automatically refresh - or use you ID to find the
            analysis once it is ready.
          </p>
        )}
        <div className="text-sm font-light mt-8">
          <label htmlFor="requestId" className="block">
            Your request ID
          </label>
          <input
            id="requestId"
            type="text"
            className="form-input px-4 py-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-600"
            value={paymentDetails.request_id}
            readOnly
          />
        </div>

        <div className="mt-4 text-sm font-ligh">
          <label htmlFor="userAddress" className="block text-sm font-light">
            Your USDT Payment Address
          </label>
          <input
            id="userAddress"
            type="text"
            className="form-input px-4 py-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-gray-600"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          />
        </div>

        <p className="mt-10 text-gray-600">
          Amount to pay:{" "}
          <span className="font-medium text-indogoDye">{amountToPay}</span> USDT
        </p>
        <div className="mt-2 text-gray-600">
          Send payment to:{" "}
          <span className="font-medium text-indogoDye">
            {shortPaymentAddress}
          </span>
          <button
            onClick={() => copyToClipboard(paymentAddress)}
            className="ml-2 text-indogoDye hover:text-salmon "
          >
            <CopyIcon />
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={handlePaymentSubmission}
            className="bg-honoluluBlue text-gray-200 px-4 py-2 mt-10 shadow-lg rounded ml-2 hover:bg-salmon hover:text-gray-800 transition duration-200"
          >
            Submit Payment Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentLookupDetails;
