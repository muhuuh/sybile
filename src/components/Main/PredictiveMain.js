import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import supabase from "../../Supabase/supabase";
import { useDispatch } from "react-redux";
import { paymentActions } from "../store/payment-slice";
import SearchAnalysis from "./Analysis/SearchAnalysis";

function PredictiveMain() {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newRequest, setNewRequest] = useState(true);
  const [confidenceInterval, setConfidenceInterval] = useState("95");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //---------------handle file drop from user----------
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setErrorMessage("");

      if (file && (file.type === "text/csv" || file.name.endsWith(".xlsx"))) {
        setIsUploading(true);

        const fileExtension = file.name.split(".").pop();
        const filePath = `uploads/${Math.random()}.${fileExtension}`;

        let { error: uploadError, data: fileData } = await supabase.storage
          .from("sybile")
          .upload(filePath, file);

        if (uploadError) {
          setIsUploading(false);
          setErrorMessage("Failed to upload file.");
          console.error(uploadError);
          return;
        }

        const projectUrl = "https://sgtpfbliixxaqtnajnek.supabase.co";
        const storageUrl = `${projectUrl}/storage/v1/object/public/sybile/${filePath}`;

        let { data: insertData, error: insertError } = await supabase
          .from("uploads")
          .insert([{ storage_url: storageUrl, confidence: confidenceInterval }])
          .select("id");

        console.log("Insert response:", insertData, insertError);

        if (insertError) {
          console.error(
            "Failed to insert storage URL into uploads table",
            insertError
          );
        } else if (insertData && insertData.length > 0) {
          const newRequestId = insertData[0].id;
          // Dispatch actions to update request_id in Redux store
          dispatch(
            paymentActions.updatePaymentData({ request_id: newRequestId })
          );
          dispatch(
            paymentActions.updatePaymentDetails({ request_id: newRequestId })
          );
          dispatch(paymentActions.updateConfidence(confidenceInterval));
        }

        setIsUploading(false);
        navigate("/main/payment");
      } else {
        setErrorMessage("Please upload a CSV or XLSX file.");
      }
    },
    [navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return (
    <main className=" px-8  bg-gray-100">
      <div className="text-center mt-6">
        <h1 className="text-xl font-bold  text-indogoDye underline decoration-salmon mb-4 tracking-wider">
          Predictive Analysis
        </h1>
        <div className="flex justify-center">
          <p className="text-gray-800 font-light  w-1/2 mb-6">
            Share the list of your users, and this analysis will run an analysis
            to detect sybil clusters on the whole user base, independently
            whether users are already known as sybil attackers. This consists of
            the most in-depth and accurate analysis and detcts also unknown
            sybil attackers and their clusters
          </p>
        </div>
      </div>
      <div className="text-center mt-2 tracking-wider">
        <button
          onClick={() => {
            setNewRequest(true);
          }}
          className={`${
            newRequest
              ? "bg-argentinianBlue text-gray-800"
              : "bg-honoluluBlue text-gray-200"
          } px-4 py-2 rounded-l shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
        >
          New Request
        </button>
        <button
          onClick={() => {
            setNewRequest(false);
          }}
          className={`${
            !newRequest
              ? "bg-argentinianBlue text-gray-800"
              : "bg-honoluluBlue text-gray-200"
          } px-4 py-2 rounded-r shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
        >
          Search Analysis
        </button>
      </div>

      {newRequest && (
        <section className="max-w-6xl mx-auto bg-white rounded-lg border-gray-200 border shadow-lg p-8 mt-10">
          <p className="text-center pb-4 px-24 text-gray-700 font-light">
            Get your sybile attacker analysis with custom confidence band,
            interactive visualisation, and more.
          </p>
          <div className="text-center">
            <label htmlFor="confidenceInterval" className="font-light text-sm">
              Select your confidence interval:
            </label>
            <select
              id="confidenceInterval"
              value={confidenceInterval}
              onChange={(e) => setConfidenceInterval(e.target.value)}
              className="border-2 border-gray-300 px-2 ml-2 mb-4 rounded font-light text-sm"
            >
              <option value="90">90%</option>
              <option value="95">95%</option>
              <option value="99">99%</option>
            </select>
          </div>
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center border-2 border-dashed ${
              isUploading ? "border-gray-300" : "border-honoluluBlue"
            } rounded-md py-16 mb-4`}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <LoadingSpinner />
                <p className="text-gray-500">Uploading...</p>
              </div>
            ) : (
              <p className="text-gray-700 font-light">
                {isDragActive
                  ? "Drop the files here ..."
                  : "Drag 'n' drop a CSV or Excel file "}
              </p>
            )}
            {!isUploading && (
              <button className="mt-4 tracking-wider shadow-lg bg-honoluluBlue text-gray-200 px-4 py-2 rounded-md hover:bg-salmon hover:text-gray-800 transition duration-200">
                Upload addresses
              </button>
            )}
            {errorMessage && (
              <div className="text-red-700">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 font-light">
            Need help to gather all addresses that need to be analyzed?{" "}
            <a
              href="#"
              className="text-honoluluBlue hover:underline decoration-salmon tracking-wider font-bold"
            >
              Contact us!
            </a>
          </p>
        </section>
      )}
      {!newRequest && <SearchAnalysis />}
    </main>
  );
}

export default PredictiveMain;
