import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { WALLET_ID } from "../config";
import { useBuyInvestmentMutation } from "@/utils/apiRoutes/apiEndpoint";
import { showErrorMessage } from "@/utils/functions";

interface CombinedModalProps {
  selectedPackage: {
    duration: string;
  } | null;
  closeModal: () => void;
}

const CombinedModal: React.FC<CombinedModalProps> = ({
  selectedPackage,
  closeModal,
}) => {
  const [buyInvestment, { isLoading, error, isError, isSuccess }] =
    useBuyInvestmentMutation();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [err, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    duration: "",
    price: "",
    payment_slip: null as File | null,
    wallet_id: "",
  });

  useEffect(() => {
    if (selectedPackage && isSecondModalOpen) {
      setFormData({
        duration: selectedPackage.duration,
        price: "",
        payment_slip: null,
        wallet_id: "",
      });
    }
  }, [selectedPackage, isSecondModalOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ID);
  };

  const handleProceed = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (Number(formData.price) < 100) {
      setError("The minimum amount is $100.");
      return;
    }

    setIsProcessingModalOpen(true);

    // Create a FormData object
    const data = new FormData();
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("wallet_id", formData?.wallet_id);
    if (formData.payment_slip) {
      data.append("payment_slip", formData.payment_slip);
    }
    setIsThirdModalOpen(true);

    buyInvestment({ data: data });
    setIsSecondModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      payment_slip: file,
    });
  };

  const closeModals = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(false);
    setIsThirdModalOpen(false);
    setIsProcessingModalOpen(false);
    closeModal();
    setError(null);
  };


  return (
    <>
      {isFirstModalOpen && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-white/90 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={closeModals}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Payment Instructions
            </h2>
            <p className="text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Please follow the instructions below to ensure a successful
              transaction: <br /> Wallet Type: Please make sure to transfer the funds
              strictly to the TRC20 wallet address Below:
            </p>
            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg mb-6 text-center text-[14px] font-mono text-purple-900 border border-gray-300 shadow-sm flex items-center justify-between">
              <span>{WALLET_ID}</span>

              <Icon
                icon="mdi:clipboard-text-outline"
                className="text-purple-400 text-2xl cursor-pointer"
                onClick={copyToClipboard}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleProceed}
                className="py-3 px-6 text-white bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg font-semibold shadow-md"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50  p-4">
          <div className="bg-white/90 h-screen mt-[100px] rounded-3xl p-8 max-w-lg mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={closeModals}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Payment Details
            </h2>

            {/* Display error message */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  readOnly
                  className="mt-1 mb-2 block w-full p-4 border border-gray-300 text-pink-400 bg-black bg-opacity-50 rounded-lg shadow-sm capitalize"
                />
              </div>
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Price (USDT)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target?.value })
                  }
                  className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                  min="100"
                  required
                />
                {err && <p className="text-red-500">{err}</p>}
              </div>

              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={formData?.wallet_id}
                  onChange={(e) => {
                    setFormData({ ...formData, wallet_id: e.target?.value });
                    console.log(e.target.value);
                  }}
                  className="mt-1 block mb-2 w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Payment Slip
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  required
                  className="mt-1 mb-2 block w-full p-4 border bg-black text-pink-400 bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 text-white bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg font-semibold shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-black rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Processing...
            </h2>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Please wait while we process your request.
            </p>
          </div>
        </div>
      )}
      {isError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-black rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={closeModals}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Error
            </h2>

            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              {showErrorMessage(error)}
            </p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="fixed inset-0 bg-black  backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-black rounded-3xl p-8 max-w-lg mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Success!
            </h2>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Your payment has been processed successfully.
            </p>
            <button
              onClick={closeModals}
              className="mt-4 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-purple-400 rounded-lg font-semibold shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CombinedModal;
