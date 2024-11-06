"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ActivationModal from "@/Modal/ActivationModal";
import { useRouter } from "next/navigation";
import { FRONTBASE_URL } from "@/config";
import Link from "next/link";
import { Icon } from "@iconify/react";
import WithdrawalModal from "@/Modal/withdrawalModal";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const ProfilePage = ({
  token,
  active,
  id,
}: {
  token: string;
  active: boolean;
  id: number;
}) => {
  const { tokenObject } = useToken();
  const { data:userDetails, isLoading, isError, error } = useGetUserDetailQuery(tokenObject?.user_id);
  const router = useRouter();
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
      if (!active) {
        setShowActivateModal(true);
      }
    }, [active])

  const handleActivateClose = () => {
    setShowActivateModal(false);
  };

  const handleReferralModalClose = () => {
    setShowReferralModal(false);
  };

  const handleCopyReferral = () => {
    if (userDetails) {
      const referralLink = `${FRONTBASE_URL}/register?ref=${userDetails.ref_code}`;
      navigator.clipboard.writeText(referralLink);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openModal = () => {
    setShowWithdrawalModal(true);
  };
  const handleCloseModal = () => setShowWithdrawalModal(false);

  const handleLogout = () => {
    Cookies.remove("access-token");
    router.push("/login");
  };

  if(isLoading){
    return <LoadingComponent />;
  } else if(isError){
    return <ErrorComponent error={error} />;
  } else{
    return (
      <div className="min-h-screen p-6 bg-black bg-opacity-10 text-purple-600">
        {" "}
        <WithdrawalModal
          isOpen={showWithdrawalModal}
          onClose={handleCloseModal}
        />
        {showActivateModal && <ActivationModal onClose={handleActivateClose} keyPhase={userDetails?.security_phase} />}
        {!showActivateModal && userDetails && (
          <div>
            <div className="bg-black bg-opacity-10 shadow-lg rounded-xl p-8 max-w-2xl mx-auto mt-10">
              <h1 className="text-3xl font-bold text-center text-purple-600 mb-6 capitalize">
                Welcome, {userDetails.username}!
              </h1>
  
              <div className="space-y-4 text-lg text-purple-600">
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Email:</strong>
                  <span>{userDetails.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Balance:</strong>
                  <span>${userDetails.balance}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Weekly Salary:</strong>
                  <span>${userDetails.weekly_salary}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Partnership Level:</strong>
                  <span>{userDetails.partnership_level}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Package:</strong>
                  <span>
                    {userDetails?.active_package?.payment_status} $
                    {userDetails?.active_package?.price}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Investment Package:</strong>
                  <span>
                    {userDetails?.investment?.payment_status}(
                    {userDetails?.investment?.duration || "N/A"})
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Investment Capital:</strong>
                  <span>${userDetails?.investment?.price}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Investment Days Remaining:</strong>
                  <span>{userDetails?.investment?.days_remaining || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <strong>Referral Code:</strong>
                  <span>{userDetails.ref_code}</span>
                </div>
  
                <div className="flex justify-between pb-2">
                  <strong>Referral Bonus:</strong>
                  <span>${userDetails.ref_bonus}</span>
                </div>
              </div>
            </div>
  
            {/* Button for Referral Link */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowReferralModal(true)}
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="mdi:link-variant" className="text-xl" />
                View Referral Link
              </button>
            </div>
  
            {/* Button for Referral Page */}
            <div className="flex justify-center mt-6">
              <Link
                href="/referral"
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="healthicons:referral" className="text-xl" />
                View Referrals
              </Link>
            </div>
  
            {/* Button for Notification*/}
            <div className="flex justify-center mt-6">
              <Link
                href="/notification"
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="mdi:bell-outline" className="text-xl" />
                Notifications
              </Link>
            </div>
  
            {/* Button for Withdrawal*/}
            <div className="flex justify-center mt-6">
              <button
                onClick={openModal}
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="hugeicons:bitcoin-withdraw"  className="text-xl" />
                Withdrawal
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <Link
                href="/withdrawalHistory"
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
                
              >
                <Icon icon="uil:money-withdrawal"  className="text-xl" />
                Withdrawal History
              </Link>
            </div>
            {/* Button for Forgot password*/}
            <div className="flex justify-center mt-6">
              <Link
                href="/forgotPassword"
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="mdi:password" className="text-xl" />
                Forgot Password
              </Link>
            </div>
  
            {/* Button for Logout */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLogout}
                className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
              >
                <Icon icon="mdi:logout" className="text-xl" />
                Logout
              </button>
            </div>
          </div>
        )}
        {/* Referral Link Modal */}
        {showReferralModal && userDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">
                Share Your Referral Link
              </h2>
              <p className="mb-4 text-purple-400">
                Click the button below to copy your referral link and share it
                with others:
              </p>
              <div className="flex justify-between items-center bg-black bg-blur bg-opacity-10 p-4 rounded-lg mb-4 shadow-inner">
                <span className="text-white text-sm">
                  {`${FRONTBASE_URL}/register?ref=${userDetails.ref_code}`}
                </span>
                <div className="flex items-center">
                  <Icon
                    icon="mdi:clipboard-text"
                    onClick={handleCopyReferral}
                    className="  text-purple-400 text-[30px] cursor-pointer"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  />
                </div>
              </div>
              {copied && (
                <p className="text-green-500 text-sm mb-4 text-center">
                  Referral Link Copied!
                </p>
              )}
  
              <button
                onClick={handleReferralModalClose}
                className="py-2 px-6 bg-purple-500 text-white rounded-full transition-all duration-300 font-bold shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ProfilePage;
