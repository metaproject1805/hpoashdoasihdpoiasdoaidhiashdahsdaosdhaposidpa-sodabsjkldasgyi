"use client";
import React, { useEffect, useState } from "react";
import { Video } from "@/utils/types";
import { useSubmitVideoMutation } from "@/utils/apiRoutes/apiEndpoint";
import { MiniLoader } from "./LoadingComponent";
import Image from "next/image";


interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelectVideo }) => {
  const [
    submitVideo,
    { isError: isSubmitError, error: submitError, isSuccess: isSubmitSuccess },
  ] = useSubmitVideoMutation();

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [watched, setWatched] = useState(false);

  const generateThumbnail = (videoSrc: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoSrc;
    videoElement.crossOrigin = "anonymous";
    videoElement.currentTime = 5;

    videoElement.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL("image/png"));
      }
    });
  };

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    if (!watched) {
      if ((duration > 30 && currentTime >= 30) || currentTime >= duration) {
        setWatched(true);
        setSubmitVisible(true);
      }
    }
  };

  const handleSubmit = async () => {
    submitVideo({ id: video.id });
    setSubmitVisible(false);
  };

  useEffect(() => {
    generateThumbnail(video.file);
  }, [video.file]);

  return (
    <div
      className="backdrop-blur dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform size-80 hover:scale-[1.02] duration-300 flex flex-col items-center justify-center border-2 border-purple-400"
      onClick={() => onSelectVideo(video)}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="Video Thumbnail"
          width={200}
          height={180}
          className="object-cover size-full max-h-full rounded-xl"
        />
      ) : (
        <div className="w-[200px] h-[180px] flex items-center justify-center">
          <MiniLoader />
        </div>
      )}
    </div>
  );
};

export default VideoCard;
