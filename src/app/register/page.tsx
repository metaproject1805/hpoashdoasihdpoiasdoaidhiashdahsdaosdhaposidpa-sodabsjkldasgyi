"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import backgroundImage from "../../../public/Log.jpg";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "@/config";
import { errorMessageHandler } from "@/utils/functions";

const LoaderModal = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center">
      <div className="loader mb-4"></div>
      <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 text-center">
        Registering...
      </span>
    </div>
  </div>
);

const RegisterPage = ({ searchParams }: { searchParams: { ref: string } }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [refCode, setRefCode] = useState<string>(searchParams.ref || "");
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string>("");
  const [copy, setCopy] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

const validateForm = (): boolean => {
  const errors: {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  const usernamePattern = /^(?!.*__)[a-zA-Z0-9](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^\w\s]/.test(password);
  const isMinLength = password.length >= 8;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Invalid email format.";
  } else if (email.length > 30){
    errors.email = "password too long"
  }

  if (!username) {
    errors.username = "Username must be 3-12 characters, alphanumeric, with underscores allowed but not at the start, end, or consecutively.";
  } else if (!usernamePattern.test(username)){
    errors.username = "Invalid username."
  } else if  (username.length > 12){
    errors.username = "username too long"
  } else if (username.length < 3){
    errors.username = "username too short"
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length > 15){
    errors.password = "password too long"
  }else {
    if (!hasLowercase) {
      errors.password = "Password must include at least one lowercase letter.";
    } else if (!hasUppercase) {
      errors.password = "Password must include at least one uppercase letter.";
    } else if (!hasNumber) {
      errors.password = "Password must include at least one number.";
    } else if (!hasSpecialChar) {
      errors.password = "Password must include at least one special character.";
    } else if (!isMinLength) {
      errors.password = "Password must be at least 8 characters long.";
    }
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const requestBody = new URLSearchParams();
    requestBody.append("ref_code", refCode);
    requestBody.append("email", email);
    requestBody.append("username", username);
    requestBody.append("password", password);
    requestBody.append("confirm_password", confirmPassword);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/register/`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setIsModalOpen(true);
        setError("");
      } else {
        setError("Registration failed");
        setSuccess("");
      }
    } catch (err) {
      const message = errorMessageHandler(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(success);
    setCopy(true);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg mt-[-20px] lg:mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 ">
          Register With MetaTask
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
              htmlFor="refCode"
            >
              Referral Code (optional)
            </label>
            <input
              id="refCode"
              type="text"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
              htmlFor="email"
            >
              Email
              {formErrors.email && (
                <span className="text-red-500 text-sm ml-2">
                  {formErrors.email}
                </span>
              )}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                formErrors.email ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
              htmlFor="username"
            >
              Username
              {formErrors.username && (
                <span className="text-red-500 text-sm ml-2">
                  {formErrors.username}
                </span>
              )}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                formErrors.username ? "border-red-500" : ""
              }`}
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
              htmlFor="password"
            >
              Password
              {formErrors.password && (
                <span className="text-red-500 text-sm ml-2">
                  {formErrors.password}
                </span>
              )}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10 ${
                formErrors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-0 pr-3 flex items-center ${
                formErrors.password ? "top-16" : "top-10"
              }`}
            >
              <Icon
                icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                className="w-5 h-5 text-pink-400"
              />
            </button>
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
              {formErrors.confirmPassword && (
                <span className="text-red-500 text-sm ml-2">
                  {formErrors.confirmPassword}
                </span>
              )}
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 bg-black text-pink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10 ${
                formErrors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-0 pr-3 flex items-center ${
                formErrors.confirmPassword ? "top-10" : "top-10"
              }`}
            >
              <Icon
                icon={showConfirmPassword ? "mdi:eye" : "mdi:eye-off"}
                className="w-5 h-5 text-pink-400"
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Register
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
      </div>
      {isLoading && <LoaderModal />} {/* Show loader modal when loading */}
      {/* Modal for success message */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-black p-8 rounded-lg shadow-xl max-w-sm w-full mx-4 md:mx-0">
            {copy ? (
              <div className=" bg-black p-6 rounded-lg flex items-center text-center  justify-center shadow-lg max-w-lg w-[300px] h-[200px] relative">
                <button
                  onClick={() => setCopy(false)}
                  className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
                >
                  <FaTimes />
                </button>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  Activation Keys Copied!
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-center">
                  Registration Successful!
                </h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 font-medium text-center">
                  Important: These 6 words are your profile activation keys.
                  Once you close this modal, they won&apos;t appear again.
                  Please make sure to write them down or copy before closing.
                </p>
                <ol className="list-decimal list-inside text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 px-4">
                  {success.split(" ").map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ol>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2  transition duration-150"
                  >
                    <Icon icon="mdi:clipboard-outline" className="mr-2" />
                    Copy Keys
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
