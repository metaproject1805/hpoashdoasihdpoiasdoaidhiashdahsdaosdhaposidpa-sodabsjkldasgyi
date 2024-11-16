// components/VideoComponent.tsx
"use client";
import React from "react";
import { Video } from "@/utils/types";
import { FaTimes } from "react-icons/fa";

interface VideoComponentProps {
  selectedVideo: Video;
  onClose: () => void;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  selectedVideo,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        <video className="w-full h-auto" controls>
          <source src={selectedVideo.file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoComponent;
