"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "../../public/back2.jpg";
import { Icon } from "@iconify/react";
import AllUser from "./Admin/AllUser";
import InactiveUser from "./Admin/InactiveUsers";
import ActiveUser from "./Admin/ActiveUsers";
import PendingPackage from "./Admin/PendingPackage";
import PendingInvestment from "./Admin/PendingInvestment";
import Withdrawal from "./Admin/Withdrawal";
import { showErrorMessage } from "@/utils/functions";
import { useGetAdminCounterQuery } from "@/utils/apiRoutes/apiEndpoint";

const AdminPage = () => {
  let token = "jj";
  const {
    data: userCount,
    isLoading,
    isError,
    error,
  } = useGetAdminCounterQuery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<
    | "All"
    | "PendingPackage"
    | "PendingInvestment"
    | "Inactive"
    | "Active"
    | "Withdrawal"
  >("All");

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
  const ImageModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
  }> = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen || !imageUrl) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full">
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={onClose}
          >
            <Icon
              icon="mdi:close-circle"
              className="text-purple-400 text-5xl"
              aria-label="close"
            />
          </button>
          <div className="flex h-[600px] justify-center">
            <Image
              src={imageUrl}
              alt="Payment Slip"
              className="object-cover size-auto"
              width={600} // Replace with actual width
              height={400} // Replace with actual height
            />
          </div>
        </div>
      </div>
    );
  };

  const LoaderModal = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        {showErrorMessage(error)}
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <LoaderModal isLoading={isLoading} />
      <div className="w-full max-w-[90%] sm:max-w-[70%] mt-[100px] backdrop-blur-lg bg-black bg-opacity-10 p-8 rounded-3xl shadow-2xl text-center mx-auto transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-4xl font-extrabold mb-6 text-white tracking-wider">
          User Statistics
        </h1>
        <div className="flex justify-center items-center sm:h-auto sm:items-start">
          <div className="grid grid-cols-2 gap-4 mb-6 sm:flex sm:justify-center sm:items-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-500 text-white flex justify-center items-center rounded-full text-2xl font-bold">
                {userCount?.all_user}
              </div>
              <p className="mt-2 text-center text-sm text-white font-semibold">
                All Users
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-yellow-500 text-white flex justify-center items-center rounded-full text-2xl font-bold">
                {userCount?.pending_approval}
              </div>
              <p className="mt-2 text-center text-sm text-white font-semibold">
                Pending Approval
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-red-500 text-white flex justify-center items-center rounded-full text-2xl font-bold">
                {userCount?.inactive_users}
              </div>
              <p className="mt-2 text-center text-sm text-white font-semibold">
                Inactive Users
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-500 text-white flex justify-center items-center rounded-full text-2xl font-bold">
                {userCount?.active_users}
              </div>
              <p className="mt-2 text-center text-sm text-white font-semibold">
                Active Users
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center mt-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "All"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setTab("All")}
          >
            All Users
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "PendingPackage"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500"
            }`}
            onClick={() => setTab("PendingPackage")}
          >
            Pending Package
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "PendingInvestment"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-500"
            }`}
            onClick={() => setTab("PendingInvestment")}
          >
            Pending Investment
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "Inactive"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500"
            }`}
            onClick={() => setTab("Inactive")}
          >
            Inactive Users
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "Active"
                ? "bg-green-500 text-white"
                : "bg-white text-green-500"
            }`}
            onClick={() => setTab("Active")}
          >
            Active Users
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              tab === "Withdrawal"
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-500"
            }`}
            onClick={() => setTab("Withdrawal")}
          >
            Withdrwawal Request
          </button>
        </div>

        {tab === "All" ? (
          <AllUser tab={tab} />
        ) : tab === "PendingPackage" ? (
          <PendingPackage
            tab={tab}
            setIsModalOpen={setIsModalOpen}
            setSelectedImage={setSelectedImage}
          />
        ) : tab === "PendingInvestment" ? (
          <PendingInvestment
            tab={tab}
            setIsModalOpen={setIsModalOpen}
            setSelectedImage={setSelectedImage}
          />
        ) : tab === "Inactive" ? (
          <InactiveUser tab={tab} />
        ) : tab === "Active" ? (
          <ActiveUser tab={tab} />
        ) : (
          <Withdrawal tab={tab} />
        )}
      </div>

      {/* Modal for viewing image */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />

      <div className=" mt-0 mb-[50px] md:mt-[30px]">
        <Link
          href="https://metatask-backend.ibgyzs.easypanel.host/admin/tasks/task/add/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white rounded-full transition-all duration-300 font-bold shadow-lg flex items-center gap-2"
        >
          <Icon icon="cib:addthis" className="text-xl" />
          Add Videos
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
