import React, { useState } from "react";

const FileTable = () => {
  const files = [
    {
      description: "coefficient variance of minutes < 30% and tx count >10",
      url: "your-download-url-here",
    },
    {
      description: "coefficient variance of value < 30% & tx count > 10",
      url: "your-download-url-here",
    },
    {
      description: "avg min between tx < 20 & tx count above 30",
      url: "your-download-url-here",
    },
    {
      description: "transaction count >25 & average value < 10$",
      url: "your-download-url-here",
    },
    {
      description:
        "percentage of days with tx > 90% & active trading days > 20",
      url: "your-download-url-here",
    },
    {
      description: "avg tx per contract <=3 & tx count > 30",
      url: "your-download-url-here",
    },
    {
      description: "avg tx per chain <=3 & tx count > 30",
      url: "your-download-url-here",
    },
    {
      description:
        "active trading days > 30 & avg tx per day < 5 & pct day with tx > 75%",
      url: "your-download-url-here",
    },
  ];

  const [downloaded, setDownloaded] = useState(Array(files.length).fill(false));

  const handleDownload = (index) => {
    const newDownloaded = [...downloaded];
    newDownloaded[index] = true;
    setDownloaded(newDownloaded);
  };

  return (
    <div className="max-w-2xl mx-auto  p-8 mt-4">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-light">
                <p className="text-gray-900 whitespace-no-wrap">
                  {file.description}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex flex-row">
                  <a
                    href={file.url}
                    onClick={() => handleDownload(index)}
                    download
                    className={`tracking-wider shadow-lg px-4 py-2 rounded-md transition duration-200 ${
                      downloaded[index]
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-honoluluBlue text-gray-200 hover:bg-salmon hover:text-gray-800"
                    }`}
                    style={{
                      pointerEvents: downloaded[index] ? "none" : "auto",
                    }}
                  >
                    Download
                  </a>
                  {downloaded[index] && (
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
