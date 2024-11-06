"use client"
import React, { useState } from "react";
import InvestmentCard from "@/components/InvestmentCard";
import CombinedModal from "../../Modal/investmentModal"; // Update import to use CombinedModal
import { InvestmentPlanInterface } from "@/utils/types";

const InvestmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<InvestmentPlanInterface | null>(null);

  // Function to open modal with the selected package
  const openModal = (investmentData: InvestmentPlanInterface) => {
    setSelectedPackage(investmentData);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null); // Reset selected package
  };

  return (
    <div>
      {/* Add grid class here */}
      <InvestmentCard openModal={openModal} />

      {/* Modal Component */}
      {isModalOpen && (
        <CombinedModal
          selectedPackage={selectedPackage} // Pass selectedPackage instead of plan
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default InvestmentPage;
