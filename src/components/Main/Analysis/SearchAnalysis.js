import React, { useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import {
  fetchAddressAnalysis,
  fetchDataAnalysis,
  fetchNetworkAnalysis,
} from "../../store/visuals-slice";
import { useNavigate } from "react-router-dom";

const SearchAnalysis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [requestId, setRequestId] = useState("");

  const handleFetchAnalysis = async () => {
    if (requestId) {
      setIsFetching(true);
      await Promise.all([
        dispatch(fetchNetworkAnalysis(requestId)),
        dispatch(fetchDataAnalysis(requestId)),
        dispatch(fetchAddressAnalysis(requestId)),
      ]);
      setIsFetching(false);
      navigate("/main/analysis");
    } else {
      setErrorMessage(
        "There was an error when looking for this request. Please check again the request ID. "
      );
    }
  };
  return (
    <div className="mt-24 text-center">
      <input
        type="text"
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
        placeholder="Enter request ID"
        className="text-gray-700 w-96 p-2 pl-6 rounded-l shadow-md"
      />
      <button
        onClick={handleFetchAnalysis}
        className="bg-honoluluBlue text-gray-200 px-4 py-2 shadow-lg rounded-r ml-2 hover:bg-salmon hover:text-gray-800 transition duration-200"
      >
        Fetch Analysis
      </button>
      {isFetching && (
        <div className="flex flex-col items-center mt-10">
          <LoadingSpinner />
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-700">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SearchAnalysis;
