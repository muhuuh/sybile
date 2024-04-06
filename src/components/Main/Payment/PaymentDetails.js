import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentActions, updatePaymentInfo } from "../../store/payment-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

const PaymentDetails = ({ closeModal }) => {
  const paymentDetails = useSelector((state) => state.paymnent.paymentDetails);
  const [userAddress, setUserAddress] = useState("");
  const dispatch = useDispatch();

  console.log("paymentDetails");
  console.log(paymentDetails);

  const paymentAddress = "0x851dB07Ac4c422010F5dD2a904EC470D660b15e5";
  const shortPaymentAddress = `${paymentAddress.slice(
    0,
    6
  )}...${paymentAddress.slice(-6)}`;
  const amountToPay = 1000; //TODO needs to be computed

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

    dispatch(paymentActions.updatePaymentDetails(updatedPaymentDetails));
    dispatch(updatePaymentInfo(updatedPaymentDetails));
    dispatch(paymentActions.updatePaymentSent(true));

    closeModal();
  };

  // Call this function when payment was succesfull
  /*
  const handleUpdateAnalysis = () => {
    dispatch(updateAnalysisRequest(paymentDetails))
      .unwrap()
      .then((response) => {
        // Handle the success case
      })
      .catch((error) => {
        // Handle the error case
      });
  };
*/
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-100 p-12 rounded-lg shadow-xl max-w-md w-full mx-4 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-indogoDye tracking-wider mb-8 text-center">
          Make a Payment
        </h2>
        <div className="text-sm font-light">
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
            Your USDT Address
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
            className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-sm font-light hover:bg-gray-300 transition duration-200"
          >
            Copy
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

export default PaymentDetails;
