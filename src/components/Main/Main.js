import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Main() {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload
    const file = acceptedFiles[0];
    console.log(file);
    // Add logic too process csv file (send to backend)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Reward your users, and not airdrop farmers
        </h1>
        <p className="text-gray-700 mb-6">
          Leverage Machine Learning and AI to filter out sybile attackers from
          your airdrop
        </p>
      </div>
      <section className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-teal-400 rounded-md py-16 mb-4"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-teal-600">Drop the files here ...</p>
          ) : (
            <p className="text-teal-600">
              Drag 'n' drop a CSV file here, or click to select a file
            </p>
          )}
          <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md">
            Upload addresses (csv file)
          </button>
        </div>
        <p className="text-sm text-gray-500">
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
