import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config";
import { WALLET_ID } from "../config";
import { showErrorMessage } from "@/utils/functions";
import { useBuyPackageMutation } from "@/utils/apiRoutes/apiEndpoint";

interface CombinedModalProps {
  selectedPackage: {
    level: string;
    price: string;
    status: string;
  } | null;
  closeModal: () => void;
}

const CombinedModal: React.FC<CombinedModalProps> = ({
  selectedPackage,
  closeModal,
}) => {
  const [buyPackage, { isLoading, error, isError, isSuccess }] = useBuyPackageMutation();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    level: "",
    price: "",
    payment_slip: null as File | null,
  });

  const token = Cookies.get("access-token");

  useEffect(() => {
    if (selectedPackage && isSecondModalOpen) {
      setFormData({
        level: selectedPackage.level,
        price: selectedPackage.price,
        payment_slip: null,
      });
    }
  }, [selectedPackage, isSecondModalOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WALLET_ID);
    //setSuccess(true);
  };

  const handleProceed = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingModalOpen(true);

    // Create a FormData object
    const data = new FormData();
    data.append("level", formData.level);
    data.append("price", formData.price);
    if (formData.payment_slip) {
    
      data.append("payment_slip", formData.payment_slip);

    }

      buyPackage({data: data});


      setIsProcessingModalOpen(false);
      setIsSecondModalOpen(false);
      setIsThirdModalOpen(true);
    
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
              Transfer to the following wallet address:
            </p>
            <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg mb-6 text-center text-[14px] font-mono text-purple-400 border border-gray-300 shadow-sm flex items-center justify-between">
              <span>{WALLET_ID}</span>

              <Icon
                icon="mdi:clipboard-text-outline"
                className="text-pink-400 text-2xl cursor-pointer"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-white/90 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={closeModals}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Payment Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Package Level
                </label>
                <input
                  type="text"
                  value={formData.level}
                  readOnly
                  className="mt-1 mb-2 block w-full p-4 border text-pink-400 border-gray-300 bg-black bg-opacity-50 rounded-lg shadow-sm capitalize"
                />
              </div>
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Price (USDT)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  readOnly
                  className="mt-1 block mb-2 w-full p-4 border text-pink-400 bg-black bg-opacity-50 border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label className="block text-lg mb-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Payment Slip
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block mb-2 w-full p-4 border  text-pink-400 border-gray-300 rounded-lg shadow-sm"
                  accept=".jpg,.jpeg,.png"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 bg-gradient-to-r from-pink-400 to-purple-600 rounded-lg font-semibold text-white shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Processing Modal */}
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

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-white/90 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={closeModals}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Success
            </h2>
            <p className="text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              Your form has been successfully submitted!
            </p>
            <div className="flex justify-center">
              <Icon
                icon="mdi:check-circle-outline"
                className=" bg-clip-text text-gradient-to-r from-pink-400 to-purple-600 text-5xl"
                aria-label="Success"
              />
            </div>
          </div>
        </div>
      )}

      {/* {setSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
          <div className="bg-white/90 rounded-3xl p-8 max-w-md mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative">
            <button
              className="absolute top-2 right-2 text-purple-400 hover:text-purple-600 transition-colors duration-300"
              onClick={() => {
                setSuccess(false);
                closeModal();
              }}
            >
              <Icon icon="mdi:close-circle" className="text-4xl" />
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-green-400">
              Success{" "}
            </h2>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CombinedModal;
