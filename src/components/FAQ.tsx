// src/components/FAQ.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react"; // Import Iconify
import faqs from "../Data/FaqData"; // Import FAQ data

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle FAQ open/close
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-10 p-6 rounded-lg shadow-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-semibold text-purple-400">
                {faq.question}
              </h3>
              <Icon
                icon="mdi:chevron-down"
                className={`text-purple-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                width="24"
                height="24"
              />
            </div>
            <div
              className={`mt-2 overflow-hidden transition-max-height duration-300 ${
                openIndex === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <p className="text-purple-200">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
