// Pages/VideosPage.tsx
"use client";
import React, { useState } from "react";
import VideoComponent from "@/components/VideoComponent";
import VideoCard from "@/components/VideoCard";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { Video } from "@/utils/types";
import { useGetVideoListQuery } from "@/utils/apiRoutes/apiEndpoint";

const VideosPage: React.FC = () => {
  const { data, isLoading, isError, error } = useGetVideoListQuery();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };
 if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <ErrorComponent error={error} />;
  } else {
  return (
    <div className="mt-[100px] px-4 lg:px-0 mb-[100px]">
      <div className="max-w-6xl mx-auto bg-black/10 backdrop-blur rounded-3xl p-10 shadow-2xl border">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 tracking-wide animate-fade-in">
          Video Tasks
        </h2>

        <div className="flex gap-8 flex-row flex-wrap justify-center h-screen overflow-scroll">
          {data?.results && data.results.length > 0 ? (
            data.results.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelectVideo={handleSelectVideo}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-xl text-gray-500 dark:text-gray-300">
              No videos available
            </p>
          )}
        </div>
      </div>

      {/* Conditionally render the VideoComponent Modal */}
      {showModal && selectedVideo && (
        <VideoComponent
          selectedVideo={selectedVideo}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}}

export default VideosPage;
