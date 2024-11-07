"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../config";
import backgroundImage from "../../public/Log.jpg";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ActivationModalProps {
  onClose: () => void;
  keyPhase: string | undefined;
}

const LoaderModal = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center">
      <div className="loader mb-4"></div>
      <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-semibold">
        Activating...
      </span>
    </div>
  </div>
);

const SuccessModal = ({ onClose }: { onClose: () => void}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-black p-8 rounded-lg shadow-lg max-w-sm w-full mx-4 md:mx-0">
      <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-center">
        Activation Successful!
      </h3>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 font-medium text-center">
        Your account has been successfully activated.
      </p>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-150"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ActivationModal: React.FC<ActivationModalProps> = ({ onClose, keyPhase}) => {
  const [phases, setPhases] = useState({
    phase1: "",
    phase2: "",
    phase3: "",
    phase4: "",
    phase5: "",
    phase6: "",
  });
  const [error, setError] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true); // Control modal visibility
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Success state
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("access-token");

    if (!accessToken) {
      // Redirect to login page if no token
      router.push("/profile");
    } else {
      const decoded = jwt.decode(accessToken) as JwtPayload | null;

      // Check if decoded token is valid and not a string
      if (decoded && typeof decoded !== "string" && !decoded.active) {
        setIsModalVisible(true);
      } else {
        // Hide modal if user is active
        setIsModalVisible(false);
      }
    }
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/"); // Redirect to login page
        onClose(); // Call the onClose handler passed as a prop
      }, 3000); // Wait for 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isSuccess, router, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPhases((prevPhases) => ({
      ...prevPhases,
      [id]: value,
    }));
  };

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loader modal
    try {
      const accessToken = Cookies.get("access-token");
      if (!accessToken) {
        setError("No access token found");
        setIsLoading(false);
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/user/pass-key-activate/`,
        phases,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the bearer token
          },
        }
      );
      if (response.status === 200) {
        // Extract new tokens from the response
        Cookies.set("access-token", response.data.access_token, { expires: 7 }); // Set expiration as needed
        Cookies.set("refresh-token", response.data.refresh_token, {
          expires: 7,
        });

        setIsSuccess(true); // Show success modal
        setError("");
      } else {
        setError("Activation failed");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || "Activation failed";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false); // Hide loader modal
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    onClose(); // Call the onClose handler passed as a prop
  };

  if (!isModalVisible) return null; // Do not render modal if it's not visible

  return (
    <>
      <div
        className="mt-[50px] bg-cover bg-center bg-opacity-50 flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="rounded-lg shadow-lg p-8 w-full max-w-md relative">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Activate Your Account
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="bg-black p-8 rounded-xl shadow-lg w-full sm:w-[500px] lg:w-[70%] xl:w-[60%] mx-auto mt-6">
            <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600  mb-4">
              Your Activation Keys Are:
            </p>
            <div className="flex flex-wrap text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
              {keyPhase?.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 border border-gray-300 px-3 py-2 rounded-md mr-3 mb-3 shadow-sm transition-all hover:bg-purple-100"
                >
                  <span className="font-bold text-purple-700">
                    {index + 1}.
                  </span>
                  <span className="ml-2 text-sm">{word}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleActivation}>
            {Object.keys(phases).map((phaseKey) => (
              <div className="mb-2" key={phaseKey}>
                <label
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
                  htmlFor={phaseKey}
                >
                  {phaseKey.charAt(0).toUpperCase() + phaseKey.slice(1)}
                </label>
                <input
                  id={phaseKey}
                  type="text" // Always show text input
                  value={(phases as any)[phaseKey]}
                  onChange={handleInputChange}
                  required
                  maxLength={15}
                  className="w-full px-3 py-1 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2 mt-6  bg-gradient-to-r from-pink-400 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Activate
            </button>
          </form>
        </div>
      </div>
      {isLoading && <LoaderModal />} {/* Show loader modal when loading */}
      {isSuccess && <SuccessModal onClose={closeModal} />}{" "}
      {/* Show success modal when activation is successful */}
    </>
  );
};

export default ActivationModal;
