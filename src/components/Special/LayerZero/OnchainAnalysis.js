import React, { useState } from "react";
import FileTable from "./FileTable";

const OnchainAnalysis = () => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadUrl =
    "https://sgtpfbliixxaqtnajnek.supabase.co/storage/v1/object/public/sybile/lookup/0.2693419080812771.csv";

  const handleDownload = () => {
    setDownloaded(true);
  };

  return (
    <div className="text-center max-w-6xl mx-auto bg-white rounded-lg border-gray-200 border shadow-lg p-8 mt-10">
      <h4 className="text-xl font-semibold mb-4">Onchain Analysis</h4>
      <p className="text-gray-700 mb-4 px-10">
        The on-chain analysis studies transaction data to detect suspicious
        activity and anomalous behavior that typically indicates non-organic
        user activity (i.e. airdrop farmers). Depending on how sophisticated and
        experienced these users are, they will use different methods to cover
        their tracks.
      </p>
      <p className="text-gray-700 mb-12 px-10">
        Our onchain analysis aims to catch all airdrop farmers, from beginners
        to expert, by covering a wide range of activity patterns (see table
        description column), for each of which you can download a specifc report
        that let's you further finetune the exact KPI threshold in case you want
        them stricter. You can also directly download the merged report without
        duplicate addresses.
      </p>

      <a
        href={downloadUrl}
        onClick={handleDownload}
        download
        className={`tracking-wider shadow-lg px-4 py-2 rounded-md transition duration-200 ${
          downloaded
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800"
        }`}
        style={{ pointerEvents: downloaded ? "none" : "auto" }}
      >
        Download merged reports
      </a>
      {downloaded && (
        <svg
          className="w-6 h-6 ml-2 inline-block text-green-500"
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
      <FileTable />
    </div>
  );
};

export default OnchainAnalysis;
