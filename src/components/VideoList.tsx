import React from 'react'
import VideoCard from "@/components/VideoCard";
import { useGetVideoListQuery } from "@/utils/apiRoutes/apiEndpoint";
import { Video } from "@/utils/types";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";


export default function VideoList({
  setSelectedVideo,
  setShowModal,
  userLoading,
  isUserError,
  userError,
}: {
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userLoading: boolean;
  isUserError: boolean;
  userError: any

}) {
  const {
    data: videoData,
    isLoading: videosLoading,
    isError: videosError,
    error: videosErrorMessage,
  } = useGetVideoListQuery();

  // Loading or error handling
  if (userLoading || videosLoading) {
    return <LoadingComponent />;
  }

  if (isUserError || videosError) {
    return <ErrorComponent error={userError || videosErrorMessage} />;
  }

  return (
    <div className="flex gap-8 flex-row flex-wrap justify-center h-screen overflow-scroll">
      {videoData?.results && videoData.results.length > 0 ? (
        videoData.results.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelectVideo={(video) => {
              setSelectedVideo(video);
              setShowModal(true);
            }}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-xl text-gray-500 dark:text-gray-300">
          All tasks done! See you tomorrow!
        </p>
      )}
    </div>
  );
}
