"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import VideoComponent from "@/components/VideoComponent";
import VideoList from "@/components/VideoList";
import LoadingComponent from "@/components/LoadingComponent";
import { Video } from "@/utils/types";
import {
  useGetVideoListQuery,
  useGetUserDetailQuery,
} from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";

const VideosPage: React.FC = () => {
  const { tokenObject } = useToken();
  const router = useRouter();

  // Fetch user details
  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
    isError: isUserError,
  } = useGetUserDetailQuery(tokenObject?.user_id);

  // Fetch video list
  

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Check package status
  const hasActivePackage =
    userDetails?.active_package?.payment_status === "Active";
  const hasPendingPackage =
    userDetails?.active_package?.payment_status === "Pending";

  if (userLoading) {
    return <LoadingComponent />;
  }



  if (hasActivePackage){
    return (
      <div className="mt-[100px] px-4 lg:px-0 mb-[100px]">
        <div className="max-w-6xl mx-auto bg-black/10 backdrop-blur rounded-3xl p-10 shadow-2xl border">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 tracking-wide animate-fade-in">
            Video Tasks
          </h2>

          <VideoList
            setSelectedVideo={setSelectedVideo}
            setShowModal={setShowModal}
            userLoading={userLoading}
            isUserError={isUserError}
            userError={userError}
          />
        </div>

        {/* Video modal */}
        {showModal && selectedVideo && (
          <VideoComponent
            selectedVideo={selectedVideo}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    );
  } else if(hasPendingPackage){
    return(
      <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-black rounded-lg p-8 shadow-lg flex flex-col items-center w-[400px]">
              <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
                You have a pending package. Please wait while we verify your
                payment.
              </p>
              <button
                onClick={() => router.push("/profile")} // Redirect to the profile page
                className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
    )
  } else{
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-black rounded-lg p-8 shadow-lg flex flex-col items-center w-[400px]">
          <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
            You have no active package. Click Buy to purchase a package.
          </p>
          <button
            onClick={() => router.push("/packages")} // Redirect to the packages page
            className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Buy
          </button>
        </div>
      </div>
    )
  }
}

export default VideosPage;
