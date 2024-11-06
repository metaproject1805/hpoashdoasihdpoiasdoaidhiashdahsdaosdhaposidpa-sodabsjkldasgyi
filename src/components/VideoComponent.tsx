"use client";
import React, { useEffect, useState } from "react";
import { Video } from "@/utils/types";
import {
  useGetVideoListQuery,
  useSubmitVideoMutation,
} from "@/utils/apiRoutes/apiEndpoint";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import { showErrorMessage } from "@/utils/functions";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";




const VideoComponent: React.FC = () => {
  const {data, isLoading, isError, error} = useGetVideoListQuery()
  const [submitVideo, {isError:isSubmitError, error:submitError, isSuccess:isSubmitSuccess } ] = useSubmitVideoMutation()

  // const [videos, setVideos] = useState<Video[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<{
    [key: number]: boolean;
  }>({});
  const [submitVisible, setSubmitVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: string }>({});

  // Handle the time update logic for video submission visibility
  const handleTimeUpdate = (
    videoId: number,
    currentTime: number,
    duration: number
  ) => {
    if (!watchedVideos[videoId]) {
      if (duration > 30 && currentTime >= 30) {
        setWatchedVideos((prev) => ({ ...prev, [videoId]: true }));
        setSubmitVisible((prev) => ({ ...prev, [videoId]: true }));
      } else if (duration <= 30 && currentTime >= duration) {
        setWatchedVideos((prev) => ({ ...prev, [videoId]: true }));
        setSubmitVisible((prev) => ({ ...prev, [videoId]: true }));
      }
    }
  };

  

  // Handle video submission
  const handleSubmit = async (videoId: number) => {

    submitVideo({id:videoId});
      setSubmitVisible((prev) => ({ ...prev, [videoId]: false }));
      setShowModal(true);
      setSelectedVideo(null);
  };

  const generateThumbnail = (videoId: number, videoSrc: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoSrc;
    videoElement.crossOrigin = "anonymous"; // Ensure CORS is handled

    videoElement.addEventListener("loadeddata", () => {
      videoElement.currentTime = 5; // Set time for thumbnail capture
    });

    videoElement.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL("image/png");
        setThumbnails((prev) => ({ ...prev, [videoId]: thumbnailDataUrl }));
      }
    });

    // Trigger thumbnail generation
    videoElement.load();
  };

  useEffect(() => {
    // Generate thumbnails for each video
    data?.results.forEach((video) => {
      generateThumbnail(video.id, video.file);
    });
  }, [data]);

  if (isLoading) {
    return (
      <LoadingComponent/>
    );
  } else if (isError){
    return (
      <ErrorComponent error={error} />
    );
  } else{
    return (
      <div className="max-w-6xl min-h-screen mx-auto bg-black/10 backdrop-blur rounded-3xl p-10 shadow-2xl mt-16 m-4 transition-colors duration-500">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600  tracking-wide animate-fade-in">
          Video Tasks
        </h2>

        {/* Video Grid */}
        <div className="flex gap-8 flex-row flex-wrap justify-center">
          {data?.results && data.results.length > 0 ? (
            data?.results.map((video) => (
              <div
                key={video.id}
                className="backdrop-blur dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform size-80 hover:scale-[1.02] duration-300 flex flex-col items-center justify-center"
                onClick={() => {
                  setSelectedVideo(video); // Fixed: Set selected video for modal display
                }}
              >
                {/* Display thumbnail if available, otherwise show loading state */}
                {thumbnails[video.id] ? (
                  <Image
                    src={thumbnails[video.id]}
                    alt="Video Thumbnail"
                    width={200}
                    height={180}
                    className="object-cover size-full max-h-full rounded-xl"
                  />
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-xl text-gray-500 dark:text-gray-300">
              No videos available
            </p>
          )}
        </div>

        {/* Modal for video playback */}
        {selectedVideo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 md:mt-0 mt-[-240px] z-50">
            <div className="dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur m-4 w-[400px] relative">
              <button
                onClick={() => {
                  setSelectedVideo(null); // Fixed: Reset selected video on modal close
                  setShowModal(false); // Fixed: Close modal on close button click
                }}
                className="absolute top-2 right-2 text-purple-500  hover:text-red-500 transition"
              >
                <FaTimes />
              </button>

              <video
                id={`video-${selectedVideo.id}`}
                className="w-full h-[80%] flex justify-center items-center object-cover"
                controls
                onTimeUpdate={(e) => {
                  const currentTime = e.currentTarget.currentTime;
                  const duration = e.currentTarget.duration;
                  handleTimeUpdate(selectedVideo.id, currentTime, duration);
                }}
                onEnded={() => {
                  const videoElement = document.getElementById(
                    `video-${selectedVideo.id}`
                  ) as HTMLVideoElement;
                  if (videoElement) {
                    handleTimeUpdate(
                      selectedVideo.id,
                      videoElement.duration,
                      videoElement.duration
                    );
                  }
                }}
              >
                <source src={selectedVideo.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {submitVisible[selectedVideo.id] && (
                <div className="p-4 flex justify-center">
                  <button
                    onClick={() => handleSubmit(selectedVideo.id)}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal for messages */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black md:mt-0 mt-[-290px] bg-opacity-50 z-50">
              <div className="bg-black p-6 rounded-lg flex items-center text-center  justify-center shadow-lg max-w-lg w-[300px] h-[200px] relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-purple-500 hover:text-red-500 transition"
                >
                  <FaTimes />
                </button>
                <p className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
                  {isSubmitSuccess
                    ? "Video submitted successfully!"
                    : isSubmitError?
                    showErrorMessage(submitError)
                    :
                    "Loading..."
                  }
                </p>
              </div>
            </div>
          )}
      </div>
    );
  }

};

export default VideoComponent;
