"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { FaTimes } from "react-icons/fa";
import {
  useGetUserDetailQuery,
  useWithdrawalMutation,
} from "@/utils/apiRoutes/apiEndpoint";
import { showErrorMessage } from "@/utils/functions";
import { useToken } from "@/utils/customHooks";

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
  const [formData, setFormData] = useState({
    amount: 10,
    wallet_address: "",
  });
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");
  const { tokenObject } = useToken();
  const { data: userDetails } = useGetUserDetailQuery(tokenObject?.user_id);
  const [withdrawal, { isLoading, isSuccess, isError, error }] =
    useWithdrawalMutation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate the form data
  if (formData.wallet_address.length > 200) {
    setWalletError("wallet address too long")
  } else if (formData.amount < 10){
    setAmountError("Minimum withdrawal is $10")
  } else{
    // Construct the payload
    const payload = {
      data: {
        amount: formData.amount,
        wallet_address: formData.wallet_address,
      },
    };
  
  
    try {
      await withdrawal(payload).unwrap(); // Call mutation with correct structure
      setIsSuccessModalOpen(true); // Show success modal after successful withdrawal
    } catch {
      console.log("an error occurred while submitting your request")
    }
  }

};


  const isWithdrawable = parseFloat(userDetails?.balance ?? "0") >= 10;

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

          {error && <p className="text-red-500">{showErrorMessage(error)}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                Wallet Address
              </label>
              <input
                type="text"
                value={formData?.wallet_address}
                onChange={(e) =>
                  setFormData({ ...formData, wallet_address: e.target.value })
                }
                className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                required
              />
              <p>{walletError}</p>
            </div>
            <div>
              <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                Amount
              </label>
              <input
                type="number"
                value={formData?.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                required
              />
              <p>{amountError}</p>
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
      {isLoading && (
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
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Success!
            </h2>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-purple-500 hover:text-red-500"
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
