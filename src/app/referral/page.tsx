"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { BASE_URL, FRONTBASE_URL } from "@/config";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";


interface UserDetails {
  ref_code: string;
}

interface DecodedToken {
  user_id: string;
  exp: number;
}

interface ActivePackage {
  level: string;
  payment_status: string;
}

interface Referral {
  username: string;
  active: boolean;
  active_package: ActivePackage | null;
}

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [copied, setCopied] = useState(false);

  const accessToken = Cookies.get("access-token");

  // Decode JWT and set userId
  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwt.decode(accessToken) as DecodedToken;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < currentTime) {
          console.error("Token has expired");
          setError("Session expired. Please log in again.");
          return;
        }

        setUserId(decoded.user_id);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setError("Invalid token. Please log in again.");
      }
    }
  }, [accessToken]);

  // Fetch referrals
  useEffect(() => {
    const fetchReferrals = async () => {
      if (userId && accessToken) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/user/detail/${userId}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setUserDetails(response.data);
          setReferrals(response.data.referred || []);
        } catch (error) {
          console.error("Error fetching referrals:", error);
          setError("Failed to fetch referral data.");
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    fetchReferrals();
  }, [userId, accessToken]);

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



  const LoaderModal = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  };

  if (loading || error){
    return(
    <div className="p-4">
      {loading && <LoaderModal isLoading={loading} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    )
  } else{
    return (
      <div className="p-4">
        {referrals && referrals.length >= 1 ? (
          <div className="bg-black bg-opacity-10 shadow-lg rounded-xl p-8 max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Referrals</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-left">
                    <th className="px-6 py-4 text-sm font-medium">Username</th>
                    <th className="px-6 py-4 text-sm font-medium">Active</th>
                    <th className="px-6 py-4 text-sm font-medium">
                      Package Level
                    </th>
                    <th className="px-6 py-4 text-sm font-medium">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {referral.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span
                          className={`px-3 py-1 inline-flex leading-5 font-semibold rounded-full ${
                            referral.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {referral.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {referral.active_package
                          ? referral.active_package.level
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {referral.active_package
                          ? referral.active_package.payment_status
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 max-w-2xl mx-auto mt-10 transition-all duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-4 text-center text-purple-600">
              Referrals
            </h2>
            <div className="bg-white/10 shadow-lg rounded-lg p-6 border border-gray-200">
              <p className="text-center text-purple-600 mb-4 font-medium text-lg">
                No referrals yet. Kindly generate your referral link and share
                it to start referring people.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowReferralModal(true)}
                  className="py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2 transform hover:scale-105"
                >
                  <Icon icon="mdi:link-variant" className="text-xl" />
                  View Referral Link
                </button>
              </div>
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
}