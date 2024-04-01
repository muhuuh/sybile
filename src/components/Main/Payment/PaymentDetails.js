import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentDetails = () => {
  const paymentDetails = useSelector((state) => state.paymnent.user);
  const dispatch = useDispatch();

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
    <div>
      <div>Payment Details</div>
    </div>
  );
};

export default PaymentDetails;
