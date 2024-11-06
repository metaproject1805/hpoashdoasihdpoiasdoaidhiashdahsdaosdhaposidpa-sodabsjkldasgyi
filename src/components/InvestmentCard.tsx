"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { investmentPlans } from "@/Data/investmentData"; // Assuming investmentPlans is an array of investment plans from a local file
import { useToken } from "@/utils/customHooks";
import ErrorComponent from "./ErrorComponent";
import { InvestmentPlanInterface, UserDetails } from "@/utils/types";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";
import LoadingComponent from "./LoadingComponent";

// Function to determine the color theme for each plan based on index and lock status
const getColorTheme = (index: number, isLocked: boolean) => {
  if (isLocked) return "from-gray-600 to-gray-900"; // Darker tone for locked plans
  return index % 2 === 0
    ? "from-blue-100 to-blue-200" // Alternating light blue theme
    : "from-pink-100 to-pink-200"; // Alternating pink theme
};

const InvestmentCard: React.FC<{
  openModal: (val: InvestmentPlanInterface) => void; // Function to open modal with plan details
}> = ({ openModal }) => {
  const { tokenObject } = useToken();
  const { data, isLoading, error } = useGetUserDetailQuery(tokenObject?.user_id);
  const level = data?.partnership_level || 0
  const planLevel = data?.investment?.level || 0
  const payment_status = data?.investment?.payment_status || null
  

  // Determine if the current plan is locked based on user's investment level
  const isLocked = (investLevel: number, availableTo?: string): boolean => {
    const isPartnershipLevelLow =
      level < 2 && availableTo !== undefined; // Check if availableTo exists and partnership level is less than 2
    const hasActivePackage =
      planLevel === investLevel &&
      payment_status === "Active"; // Check for active package

    // Lock the plan if conditions are met
    return (
      (isPartnershipLevelLow ||
        (planLevel !== investLevel && planLevel !== 0)) &&
      !hasActivePackage
    );
  };

  // Determine if the plan is active (plan level matches and payment is active)
  const isActive = (investLevel: number) =>
    planLevel === investLevel && payment_status === "Active";

  // Determine if the plan is pending (plan level matches but payment is pending)
  const isPending = (investLevel: number) =>
    planLevel === investLevel && payment_status === "Pending";

  if (isLoading) {
    return <LoadingComponent />;
  } else if (error) {
    return <ErrorComponent error={error} />;
  } else {
    return (
      <div className="mt-[100px] px-4 lg:px-0">
        {/* Main container for the page */}
        <div className="max-w-6xl mx-auto bg-black/10 backdrop-blur rounded-3xl p-10 shadow-2xl border border-blue-200">
          <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 tracking-wide animate-fade-in">
            Welcome to Investment
          </h1>
          <p className="text-center text-xl font-medium text-purple-600 mb-10 animate-fade-in">
            Select the perfect plan to invest and start earning daily profits
            today!
          </p>

          {/* Investment Plans Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {investmentPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 shadow-xl border ${
                  isLocked(plan.level, plan.availableTo)
                    ? "text-gray-600 border-gray-500"
                    : "hover:text-gray-600 hover:scale-105 hover:shadow-2xl border-blue-300 hover:border-blue-500"
                } transition-all hover:bg-gradient-to-r ${getColorTheme(
                  index,
                  isLocked(plan.level, plan.availableTo)
                )}`}
              >
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
                  {plan.plan}
                </h2>
                <p className="text-lg mb-4">
                  <Icon
                    icon="fa:dollar"
                    className="inline-block mr-2 text-blue-500"
                  />
                  <strong>Daily Profit:</strong> {plan.dailyProfit}
                </p>
                <p className="text-lg mb-4">
                  <Icon
                    icon="fa:dollar"
                    className="inline-block mr-2 text-green-500"
                  />
                  <strong>Minimum Investment:</strong> {plan.minInvestment}
                </p>
                <p className="text-lg mb-4">
                  <Icon
                    icon="lets-icons:calendar-duotone"
                    className="inline-block mr-2 text-purple-600"
                  />
                  <strong>Periodic Principal & Interest:</strong>{" "}
                  {plan.periodicInterest}
                </p>
                {plan.availableTo && (
                  <p className="text-lg text-blue-600 mt-4">
                    <Icon
                      icon="clarity:shield-check-line"
                      className="inline-block mr-2 text-green-500"
                    />
                    <strong>Available to:</strong> {plan.availableTo}
                  </p>
                )}
                {plan.duration && (
                  <p className="text-lg mb-4">
                    <Icon
                      icon="mdi:calendar-range"
                      className="inline-block mr-2 text-yellow-500"
                    />
                    <strong>Investment Duration:</strong> {plan.duration}
                  </p>
                )}

                {/* Invest Now Button */}
                <button
                  onClick={() => {
                    if (
                      !isLocked(plan.level, plan.availableTo) &&
                      !isActive(plan.level) &&
                      !isPending(plan.level)
                    ) {
                      openModal(plan); // Open modal only if it's "Invest Now"
                    }
                  }}
                  className={`mt-6 py-2 px-4 rounded-full shadow-lg transition duration-300 ${
                    isLocked(plan.level, plan.availableTo)
                      ? "bg-gray-400 cursor-not-allowed text-gray-600"
                      : isActive(plan.level)
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white cursor-not-allowed"
                      : isPending(plan.level)
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-400 to-purple-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={
                    isLocked(plan.level) ||
                    isActive(plan.level) ||
                    isPending(plan.level)
                  }
                >
                  {isActive(plan.level)
                    ? "Active"
                    : isPending(plan.level)
                    ? "Pending"
                    : isLocked(plan.level, plan.availableTo)
                    ? "Locked"
                    : "Invest Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default InvestmentCard;
