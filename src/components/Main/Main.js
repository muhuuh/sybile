import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

function Main() {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setErrorMessage(""); // Clear previous errors

      if (file) {
        // Check the file type
        if (file.type === "text/csv" || file.name.endsWith(".xlsx")) {
          setIsUploading(true);

          const formData = new FormData();
          formData.append("file", file);

          // Uncomment when backend is ready
          /*
          fetch('/api/upload', { // Replace with your actual backend endpoint
            method: 'POST',
            body: formData,
          })
          .then(response => response.json())
          .then(data => {
            setIsUploading(false);
            navigate('/main/analysis');
          })
          .catch(error => {
            setIsUploading(false);
            setErrorMessage('An error occurred while uploading the file.');
            console.error(error);
          });
          */

          //simulate a successful upload, remove afterwards
          setTimeout(() => {
            setIsUploading(false);
            console.log(formData.get("file"));
            navigate("/main/analysis");
          }, 1500);
        } else {
          setErrorMessage("Please upload a CSV or XLSX file.");
        }
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
    <main className="min-h-screen p-8  bg-darkBgGray">
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-4 tracking-wider">
          Reward your users, and not airdrop farmers
        </h1>
        <p className="text-gray-200 mb-6">
          Leverage Machine Learning and AI to filter out sybile attackers from
          your airdrop
        </p>
      </div>
      <section className="max-w-6xl mx-auto bg-lightBgGray rounded-lg shadow-md p-8 mt-20">
        <p className="text-center pb-4 px-24 text-gray-200">
          Get your sybile attacker analysis with custom confidence band,
          interactive visualisation, and more.
        </p>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed ${
            isUploading ? "border-gray-300" : "border-teal-400"
          } rounded-md py-16 mb-4`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <LoadingSpinner />
              <p className="text-gray-500">Uploading...</p>
            </div>
          ) : (
            <p className="text-teal-600">
              {isDragActive
                ? "Drop the files here ..."
                : "Drag 'n' drop a CSV or Excel file "}
            </p>
          )}
          {!isUploading && (
            <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md">
              Upload addresses
            </button>
          )}
          {errorMessage && (
            <div className="text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-300">
          Need help to gather all addresses that need to be analyzed?{" "}
          <a href="#" className="text-teal-600 hover:underline">
            Contact us!
          </a>
        </p>
      </section>
    </main>
  );
}

export default Main;
