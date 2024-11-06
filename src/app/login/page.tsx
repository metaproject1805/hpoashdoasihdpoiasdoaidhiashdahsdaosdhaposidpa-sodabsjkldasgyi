"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import backgroundImage from "../../../public/Log.jpg";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useHandleLoginMutation } from "@/utils/apiRoutes/apiEndpoint";
import { showErrorMessage } from "@/utils/functions";

const LoaderModal = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-center">
      <div className="loader mb-4"></div>
      <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
        Logging in...
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
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-lg font-semibold mb-4 capitalize">
        {message}!
      </p>
    </div>
  </div>
);

const Login = () => {
  const [handleLogin, { error, isError, isLoading, isSuccess }] =
    useHandleLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format.";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!validateForm()) return;

    const requestBody = {
      email,
      password,
    };
    handleLogin({ data: requestBody });
  };
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg mt-[-20px] lg:mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          Login to MetaTask
        </h2>
        {isError && (<p className="text-red-500 text-center mb-4">{showErrorMessage(error)}</p>)}
        <form onSubmit={handleUserLogin}>
          <div className="mb-4">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600  mb-2"
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
          <div className="mb-6 relative">
            <label
              className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600  mb-2"
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
              className="absolute top-10 right-0 pr-3 flex items-center"
            >
              <Icon
                icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                className="w-5 h-5 text-pink-400"
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 font-semibold"
            >
              Register here
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/forgotPassword"
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 font-semibold"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <LoaderModal />}
      {showSuccessModal && (
        <SuccessModal
          message="Login successful"
          onClose={() => {
            setShowSuccessModal(false);
            router.push("/");
          }}
        />
      )}
    </div>
  );
};

export default Login;
