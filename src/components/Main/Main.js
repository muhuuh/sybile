import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import supabase from "../../Supabase/supabase";
import { useDispatch } from "react-redux";
import { paymentActions } from "../store/payment-slice";

function Main() {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          .insert([{ storage_url: storageUrl }])
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
        }

        setIsUploading(false);
        navigate("/main/payment");
      } else {
        setErrorMessage("Please upload a CSV or XLSX file.");
      }
    },
    [navigate]
  );

  /*          //simulate a successful upload, remove afterwards
          setTimeout(() => {
            setIsUploading(false);
            console.log(formData.get("file"));
            navigate("/main/payment");
          }, 1500);
          */

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
            <button className="mt-4 bg-teal-600 text-gray-200 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200">
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
