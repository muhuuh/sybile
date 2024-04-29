import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ManyMe?",
      answer:
        "ManyMe is a platform designed to secure and optimize token airdrops across blockchain networks by preventing Sybil attacks.",
    },
    {
      question: "How does ManyMe work?",
      answer:
        "It employs advanced statistical analysis and AI technologies to analyze transaction data, identifying Sybil clusters and distinguishing valuable users.",
    },
    {
      question: "What are Sybil attacks?",
      answer:
        "Sybil attacks involve users creating numerous fake digital identities to unfairly gain more tokens during distributions.",
    },
    {
      question: "What blockchain chains are supported by ManyMe?",
      answer:
        "ManyMe supports various EVM (Ethereum Virtual Machine) compatible chains.",
    },
    {
      question:
        "What are the key features of ManyMe's Sybil attack mitigation?",
      answer:
        "The platform offers features like the Lookup module for identifying Sybil attackers and the Predictive module for forecasting potential Sybil behaviors.",
    },
    {
      question:
        "What steps does ManyMe suggest for treating identified Sybil clusters?",
      answer:
        "Details on how to handle Sybil clusters can be explored further in their specific documentation section.",
    },
    {
      question: "What is ManyMe's roadmap for future development?",
      answer:
        "ManyMe's development roadmap outlines their planned enhancements and future directions.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main
      style={{
        background: "linear-gradient(to bottom right, #f7f7f7, #f0f8f9)",
      }}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-blue-100"
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indogoDye mb-2 tracking-wider">
            FAQ
          </h1>
          <p className="text-gray-600 text-lg">
            Leverage Machine Learning and AI to filter out Sybil attackers from
            your airdrop
          </p>
          <p className="text-md mb-8 mt-4 italic">
            For more detailed information, please refer to the{" "}
            <a
              href="https://many-me.gitbook.io/manyme/"
              className="text-blue-600 hover:text-blue-800 hover:underline visited:text-purple-600"
            >
              ManyMe GitBook
            </a>
            .
          </p>
        </div>
        <ul className="space-y-3">
          {faqs.map((faq, index) => (
            <li
              key={index}
              className={`p-4 bg-white rounded-lg shadow-lg cursor-pointer ${
                openIndex === index ? "ring-2 ring-indigoDye" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="flex justify-between items-center font-semibold text-lg text-gray-700">
                {faq.question}
                <span className="text-lg font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </h2>
              <p
                className={`text-gray-600 mt-2 transition-max-height duration-500 ease-in-out ${
                  openIndex === index ? "max-h-40" : "max-h-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Faq;
