// PackagesPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import backgroundImage from "../../../public/Log.jpg";
import { Icon } from "@iconify/react";
import { packages } from "../../Data/packageData";
import Modal from "../../Modal/packageModal";
import { PackageCardProps } from "@/utils/types";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";

// Utility function for color theme based on package index
const getColorTheme = (
  index: number,
  isLocked: boolean,
  isComingSoon: boolean
) => {
  if (isLocked || isComingSoon) return "from-gray-600 to-gray-900"; // Darker tone for locked or coming soon packages
  if (index <= 2) return "from-blue-500 to-teal-400"; // First three: cool tones
  if (index <= 5) return "from-orange-500 to-red-400"; // Second three: warm tones
  return "from-purple-500 to-pink-500"; // Third three: purple-pink tones
};
const PackagesPage: React.FC = () => {
  const { tokenObject } = useToken();
  const { data } = useGetUserDetailQuery(
    tokenObject?.user_id
  );

  const package_level = data?.active_package?.level || null; // Set user's package level
  const package_status = data?.active_package?.payment_status || null;

  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user data

  const openModal = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
      className="bg-center bg-cover min-h-screen flex flex-col items-center py-16"
    >
      <h1 className="sm:text-3xl text-4xl text-white mb-12 shadow-lg bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-4 rounded-lg">
        Choose Your Package
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-7xl px-4">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.star}
            {...pkg}
            index={index}
            payment_status={package_status || ""}
            userLevel={package_level} 
            selectedPackage={selectedPackage} 
            openModal={openModal}
          />
        ))}
      </div>

      {selectedPackage && (
        <Modal selectedPackage={selectedPackage} closeModal={closeModal} />
      )}
    </div>
  );
};

const PackageCard: React.FC<PackageCardProps> = ({
  star,
  level,
  price,
  earnings,
  viewingIncome,
  dailyIncome,
  payment_status,
  days,
  status,
  index,
  userLevel,
  openModal,
  selectedPackage, // Add this prop to track the selected package
}) => {
  const isLocked = userLevel !== level && userLevel !== null; // Lock if user's level is less than package level
  const isActive = userLevel === level && payment_status === "Active"; // Active package
  const isPending = userLevel === level && payment_status === "Pending";
  const isComingSoon = status === "coming soon"; // Coming soon packages


  return (
    <div
      className={`bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-8 shadow-xl transition-all duration-500 ease-in-out transform ${
        !isLocked &&
        !isComingSoon &&
        "hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
      } ${isLocked || isComingSoon || isPending ? "opacity-70" : ""}`} // Add opacity for pending status
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {star} star ⭐️ package
        </h2>
        <Icon icon="mdi:star-circle" className="text-yellow-400 text-4xl" />
      </div>

      <p className="text-3xl font-extrabold mb-2">
        <span
          className={`bg-gradient-to-r ${getColorTheme(
            index,
            isLocked,
            isComingSoon
          )} px-4 py-2 rounded-lg shadow-lg text-white`}
        >
          {price} USDT
        </span>
      </p>

      <p className="text-gray-400 mt-4">
        <span className="font-medium">{earnings}</span> earnings daily
      </p>
      <p className="text-gray-400">
        Viewing Income: <span className="font-medium">{viewingIncome}</span>
      </p>
      <p className="text-gray-400">
        Makes <span className="font-medium">{dailyIncome}</span> daily for{" "}
        {days} days
      </p>

      {isComingSoon && (
        <p className="mt-4 text-red-400 font-semibold text-lg">Coming soon</p>
      )}

      <div className="mt-6">
        <button
          onClick={() =>
            !isLocked &&
            !isComingSoon &&
            !isPending &&
            !isActive &&
            openModal({ level, price, status })
          } // Prevent click if locked, coming soon, pending, or active
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
            isActive
              ? "bg-green-500 text-white cursor-default" // Active package styling
              : isPending
              ? "bg-yellow-500 text-white cursor-default" // Pending package styling
              : isComingSoon || isLocked
              ? "bg-gray-500 cursor-not-allowed" // Locked or Coming Soon package styling
              : `bg-gradient-to-r ${getColorTheme(
                  index,
                  isLocked,
                  isComingSoon
                )} hover:opacity-90 text-white shadow-md hover:shadow-lg`
          }`}
        >
          {isActive
            ? "Active"
            : isPending
            ? "Pending" // Show "Pending" for pending packages
            : isComingSoon
            ? "Locked"
            : isLocked
            ? "Locked"
            : "Open Package"}
        </button>
      </div>
    </div>
  );
};

// Main PackagesPage component

export default PackagesPage;
