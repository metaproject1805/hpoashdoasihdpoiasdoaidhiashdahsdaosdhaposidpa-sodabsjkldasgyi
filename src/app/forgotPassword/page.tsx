"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Icon } from "@iconify/react";
import { BASE_URL } from "../../config";
import backgroundImage from "../../../public/Log.jpg";
import Link from "next/link";

interface FormErrors {
  key1: string;
  key2: string;
  key3: string;
  key4: string;
  key5: string;
  key6: string;
  password: string;
  confirmPassword: string;
}

const LoaderModal = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
    <div className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center">
      <div className="loader mb-4"></div>
      <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
        Resetting Password...
      </span>
    </div>
  </div>
);

const SuccessModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center">
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-lg font-semibold mb-4">
        {message}
      </p>
    </div>
  </div>
);

const ForgotPasswordPage = () => {
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [key3, setKey3] = useState("");
  const [key4, setKey4] = useState("");
  const [key5, setKey5] = useState("");
  const [key6, setKey6] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    key1: "",
    key2: "",
    key3: "",
    key4: "",
    key5: "",
    key6: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const errors: FormErrors = {
      key1: "",
      key2: "",
      key3: "",
      key4: "",
      key5: "",
      key6: "",
      password: "",
      confirmPassword: "",
    };

    // Check key fields
    if (!key1) errors.key1 = "Key 1 is required.";
    if (!key2) errors.key2 = "Key 2 is required.";
    if (!key3) errors.key3 = "Key 3 is required.";
    if (!key4) errors.key4 = "Key 4 is required.";
    if (!key5) errors.key5 = "Key 5 is required.";
    if (!key6) errors.key6 = "Key 6 is required.";

    // Check password matching
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Check password length and complexity
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const symbolPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercasePattern = /[a-z]/;

    if (!uppercasePattern.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    }
    if (!numberPattern.test(password)) {
      errors.password = "Password must contain at least one number.";
    }
    if (!symbolPattern.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }
    if (!lowercasePattern.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    // Prepare request body
    const requestBody = {
      phase1: key1,
      phase2: key2,
      phase3: key3,
      phase4: key4,
      phase5: key5,
      phase6: key6,
      password,
      confirm_password: confirmPassword,
    };

    setIsLoading(true);

    try {
      console.log(
        "Sending request to:",
        `${BASE_URL}/api/user/reset-password/`
      );

      const response = await axios.post(
        `${BASE_URL}/api/user/reset-password/`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password successfully reset.");
        setError("");
        setShowSuccessModal(true);
        setFormErrors({
          key1: "",
          key2: "",
          key3: "",
          key4: "",
          key5: "",
          key6: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/login");
        }, 3000); // 3 seconds
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.detail || "Reset failed.";
        setError(errorMessage);
      } else {
        setError("Network error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg mt-[-20px] lg:mt-10 relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          Reset Your Password
        </h2>
        <form onSubmit={handleActivation}>
          {["key1", "key2", "key3", "key4", "key5", "key6"].map(
            (key, index) => (
              <div className="mb-2" key={index}>
                <label
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-"
                  htmlFor={key}
                >
                  {`Key ${index + 1}`}
                </label>
                <input
                  id={key}
                  type="text"
                  value={eval(key)}
                  onChange={(e) => {
                    switch (key) {
                      case "key1":
                        setKey1(e.target.value);
                        break;
                      case "key2":
                        setKey2(e.target.value);
                        break;
                      case "key3":
                        setKey3(e.target.value);
                        break;
                      case "key4":
                        setKey4(e.target.value);
                        break;
                      case "key5":
                        setKey5(e.target.value);
                        break;
                      case "key6":
                        setKey6(e.target.value);
                        break;
                    }
                  }}
                  maxLength={15}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    formErrors[key as keyof FormErrors] ? "border-red-500" : ""
                  }`}
                />
                {formErrors[key as keyof FormErrors] && (
                  <p className="text-red-500 text-sm">
                    {formErrors[key as keyof FormErrors]}
                  </p>
                )}
              </div>
            )
          )}
          <div className="mb-2 relative">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                formErrors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-0 pr-3 flex items-center"
            >
              <Icon
                icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                className="w-5 h-5 text-pink-400"
              />
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
          <div className="mb-2 relative">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                formErrors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-8 right-0 pr-3 flex items-center"
            >
              <Icon
                icon={showConfirmPassword ? "mdi:eye" : "mdi:eye-off"}
                className="w-5 h-5 text-pink-400"
              />
            </button>
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex px-4 py-2 justify-center items-center bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded"
          >
            Reset Password
          </button>
        </form>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-bold"
          >
            Login Here
          </Link>
          .
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      {isLoading && <LoaderModal />}
      {showSuccessModal && (
        <SuccessModal
          message={success}
          onClose={() => {
            setShowSuccessModal(false);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
