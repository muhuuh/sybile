import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentDetails = ({ closeModal }) => {
  const paymentDetails = useSelector((state) => state.paymnent.user);
  const [requestId, setRequestId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const paymentAddress = "YOUR_PAYMENT_ADDRESS";
  const dispatch = useDispatch();

  const handlePaymentSubmission = async () => {
    // Here, send the requestId and userAddress to your backend or Supabase for tracking
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
          Send payment to:{" "}
          <span className="font-medium text-gray-800 ml-4">
            {paymentAddress}
          </span>
        </p>
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
