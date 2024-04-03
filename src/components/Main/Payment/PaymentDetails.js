import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentActions, updatePaymentInfo } from "../../store/payment-slice";

const PaymentDetails = ({ closeModal }) => {
  const paymentDetails = useSelector((state) => state.paymnent.paymentDetails);
  const [requestId, setRequestId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const dispatch = useDispatch();

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
    };

    dispatch(paymentActions.updatePaymentDetails(updatedPaymentDetails));
    dispatch(updatePaymentInfo(updatedPaymentDetails));
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
    // Overlay div with semi-transparent background to focus attention on the modal
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      {/* Modal content with modern styling */}
      <div
        className="bg-gray-100 p-12 rounded-lg shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-teal-700 tracking-wider mb-8">
          Make a Payment
        </h2>
        <input
          type="text"
          placeholder="Request ID"
          className="form-input px-4 py-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your USDT Address"
          className="form-input px-4 py-1 mt-4 block w-full border-gray-300 rounded-md shadow-sm"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <p className="mt-10 text-gray-600">
          Amount to pay (USDT):{" "}
          <span className="font-medium text-gray-800 ml-4">{amountToPay}</span>
        </p>
        <div className="mt-2 text-gray-600">
          Send payment to:{" "}
          <span className="font-medium text-gray-800 ml-4">
            {shortPaymentAddress}
          </span>
          <button
            onClick={() => copyToClipboard(paymentAddress)}
            className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Copy
          </button>
        </div>

        <button
          onClick={handlePaymentSubmission}
          className="mt-12 bg-teal-600 text-gray-200 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200"
        >
          Submit Payment Info
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
