import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import supabase from "../../Supabase/supabase";
import { useDispatch } from "react-redux";
import SearchAnalysis from "../Main/Analysis/SearchAnalysis";
import { paymentLookupActions } from "../store/payment-lookup-slice";
import QuestionIcon from "../UI/Icons/QuestionIcon";

function LookupMain() {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newRequest, setNewRequest] = useState(true);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const [requestId, setRequestId] = useState("");
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
        const filePath = `lookup/${Math.random()}.${fileExtension}`;

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
          .from("lookup_uploads")
          .insert([{ storage_url: storageUrl }])
          .select("id");

        console.log("Insert response:", insertData, insertError);

        if (insertError) {
          console.error(
            "Failed to insert storage URL into uploads table",
            insertError
          );
          setFileUploaded(false);
        } else if (insertData && insertData.length > 0) {
          const newRequestId = insertData[0].id;
          setRequestId(insertData[0].id);
          // Dispatch actions to update request_id in Redux store
          dispatch(
            paymentLookupActions.updatePaymentData({ request_id: newRequestId })
          );
          dispatch(
            paymentLookupActions.updatePaymentDetails({
              request_id: newRequestId,
            })
          );
          setFileUploaded(true);
        }

        setIsUploading(false);
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 2000);

        //navigate("/main/payment/lookup");
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

  //------------- Handle Analysis call ---------
  const onGetAnalysisHandler = () => {
    if (fileUploaded) {
      //TODO call external analysis function
      /*
      performLookupAnalysis(requestId).catch((error) => {
        console.error("Error during lookup analysis:", error);
      });
      */
      navigate("/main/payment/lookup");
    }
  };

  //-----------handle UI ---------------

  const onExplanationHandler = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <main className=" px-8  ">
      <div className="text-center mt-6">
        <div className="flex justify-center gap-x-2">
          <h1 className="text-xl font-bold underline decoration-salmon text-indogoDye mb-4 tracking-wider">
            Lookup Analysis
          </h1>
          <button
            onClick={onExplanationHandler}
            className="mb-3 text-indogoDye"
          >
            <QuestionIcon />
          </button>
        </div>

        {showExplanation && (
          <div className="flex justify-center">
            <p className="text-gray-800 font-light  w-1/2 mb-6">
              This analysis will crosscheck your list of users with our list of
              known sybil attackers from our database and research. This
              analysis will not find all sybil attackers but will provide
              quickly a first good impression of the scale of the sybil attack
            </p>
          </div>
        )}
      </div>
      <div className="text-center mt-2 tracking-wider">
        <button
          onClick={() => {
            setNewRequest(true);
          }}
          className={`${
            newRequest
              ? "bg-argentinianBlue text-gray-800"
              : "bg-gradient-honolulu text-gray-200"
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
              : "bg-gradient-honolulu text-gray-200"
          } px-4 py-2 rounded-r shadow-lg ml-2 hover:bg-argentinianBlue hover:text-gray-800 transition duration-200`}
        >
          Search Analysis
        </button>
      </div>

      {newRequest && (
        <section className="max-w-6xl mx-auto bg-white rounded-lg border-gray-200 border shadow-lg p-8 mt-10">
          <p className="text-center pb-4 px-24 text-gray-700 font-light">
            Compare your list of users with our known sybil attackers
          </p>

          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center border-2 border-dashed ${
              isDragActive ? "bg-gray-100" : "bg-white"
            } ${
              isUploading ? "border-gray-300" : "border-honoluluBlue"
            } rounded-md py-16 mx- mb-4 transition-colors duration-300`}
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
              <div className="flex flex-row items-center gap-x-4">
                <button className="mt-4 tracking-wider shadow-lg bg-honoluluBlue text-gray-200 px-4 py-2 rounded-md hover:bg-salmon hover:text-gray-800 transition duration-200">
                  Upload addresses
                </button>
                {fileUploaded && (
                  <svg
                    className="w-6 h-6 mt-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
            )}
            {showSnackbar && (
              <div className="text-center">
                <div className="  text-green-600 px-4 py-2 rounded">
                  File uploaded successfully!
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="text-red-700">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <button
              disabled={!fileUploaded}
              className={`mt-4 tracking-wider shadow-lg px-4 py-2 rounded-md transition duration-200 ${
                fileUploaded
                  ? "bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={onGetAnalysisHandler}
            >
              Get Analysis
            </button>
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

export default LookupMain;
