"use client";
import React, { useState } from "react";
import { Video } from "@/utils/types";
import { FaTimes } from "react-icons/fa";
import { useSubmitVideoMutation } from "@/utils/apiRoutes/apiEndpoint";
import { showErrorMessage } from "@/utils/functions";

interface VideoComponentProps {
  selectedVideo: Video;
  onClose: () => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  selectedVideo,
  onClose,
}) => {
  const [watched, setWatched] = useState(false);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [
    submitVideo,
    {
      isError: isSubmitError,
      error: submitError,
      isSuccess: isSubmitSuccess,
      isLoading,
    },
  ] = useSubmitVideoMutation();

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    if (!watched) {
      if ((duration > 30 && currentTime >= 30) || currentTime >= duration) {
        setWatched(true);
        setSubmitVisible(true);
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedVideo.id) {
      await submitVideo({ id: selectedVideo.id });
      setSubmitVisible(false);
      setShowModal(true);

      // Close the modal after showing the success message
      if (isSubmitSuccess) {
        setTimeout(() => {
          onClose(); // Close the VideoComponent
        }, 3000); // Adjust the delay as needed
      }
    }
  };

  const getErrorMessage = (error: any) => {
    if ("status" in error) {
      return `Error: ${error.status} - ${error.data}`;
    }
    if ("message" in error) {
      return error.message;
    }
    return "An unknown error occurred.";
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 h-screen bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
          <div className="fixed inset-0 flex items-center justify-center bg-black md:mt-0 mt-[-290px] bg-opacity-50 z-50">
            <div className="bg-black p-6 rounded-lg flex items-center text-center justify-center shadow-lg max-w-lg w-[300px] h-[200px] relative">
              <button
                onClick={() => {
                  setShowModal(false);
                  onClose();
                }}
                className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
              <p className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                {isLoading
                  ? "Submitting"
                  : isSubmitSuccess
                  ? "Video submitted successfully!"
                  : isSubmitError
                  ? showErrorMessage(submitError)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
      <div className="bg-gray-400 rounded-3xl p-8 max-w-lg mx-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        <video
          className="w-full h-auto"
          controls
          onTimeUpdate={(e) =>
            handleTimeUpdate(
              e.currentTarget.currentTime,
              e.currentTarget.duration
            )
          }
        >
          <source src={selectedVideo.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {submitVisible && (
          <div className="p-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-pink-400 to-purple-800 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
