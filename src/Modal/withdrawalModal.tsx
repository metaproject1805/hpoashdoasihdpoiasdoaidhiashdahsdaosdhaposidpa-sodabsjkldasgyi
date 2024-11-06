"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { UserDetails } from "@/utils/types";
import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "@/config";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DecodedToken {
  user_id: string;
  exp: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  // State variables
  const [formData, setFormData] = useState({ amount: 0, wallet_address: "" });
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const accessToken = Cookies.get("access-token");

  // Decode JWT and set user ID
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

  // Fetch user details based on user ID
  const fetchUserDetails = useCallback(async () => {
    if (!userId) return; // Prevent execution if userId is not available

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
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, accessToken]); // Add userId and accessToken as dependencies

  useEffect(() => {
    fetchUserDetails(); // Call fetchUserDetails
  }, [fetchUserDetails]); // Only depend on fetchUserDetails

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount
    if (
      formData.amount <= 0 ||
      formData.amount > parseFloat(userDetails?.balance ?? "0")
    ) {
      setError("Invalid withdrawal amount.");
      return;
    }

    setIsProcessingModalOpen(true);

    try {
      // Send withdrawal request to the API
      const response = await axios.post(
        `${BASE_URL}/api/withdrawals/withdrawal-create/`,
        {
          amount: formData.amount,
          wallet_address: formData.wallet_address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check response status (you can adjust this according to your API's response)
      if (response.status === 200) {
        setIsSuccessModalOpen(true); // Show success modal
      } else {
        setError("Failed to process withdrawal. Please try again.");
      }
    } catch (error) {
      // Handle error during API call
      setError("Failed to process withdrawal. Please try again.");
    } finally {
      setIsProcessingModalOpen(false);
    }
  };

  const closeModals = () => {
    setIsProcessingModalOpen(false);
    setIsSuccessModalOpen(false);
    onClose(); // Close the original modal too
  };

  const isWithdrawable = parseFloat(userDetails?.balance ?? "0") > 50;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
      {/* Check if the balance is sufficient for withdrawal */}
      {isWithdrawable ? (
        <div className="relative bg-black p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
            Withdrawal Details
          </h2>
          <button
            className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
            onClick={onClose}
          >
            <Icon icon="mdi:close-circle" className="text-4xl" />
          </button>

          <p className="mt-4 text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6">
            Please enter your wallet address and amount to withdraw.
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                Wallet Address
              </label>
              <input
                type="text"
                value={formData.wallet_address}
                onChange={(e) =>
                  setFormData({ ...formData, wallet_address: e.target.value })
                }
                className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                Amount
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="py-3 px-6 text-white bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg font-semibold shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-black p-6 rounded-lg flex items-center text-center  justify-center shadow-lg max-w-lg w-[300px] h-[200px] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Your balance is insufficient to make a withdrawal.
          </p>
        </div>
      )}

      {/* Processing Modal */}
      {isProcessingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Processing...
            </h2>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Please wait while we process your request.
            </p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-black rounded-3xl p-8 max-w-lg mx-auto shadow-2xl relative">
            {" "}
            {/* Add relative positioning here */}
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Success!
            </h2>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-purple-500 hover:text-red-500" // Keep this absolute for positioning within the relative parent
            >
              <FaTimes />
            </button>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Your Withdrawal Request has been successfully sent.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalModal;
