"use client";
import VideoComponent from "@/components/VideoComponent";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import { useRouter } from "next/navigation";
import { useToken } from "@/utils/customHooks";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";

export default function Page() {
  const {tokenObject} = useToken()
  const {
    data: userDetails,
    isLoading,
    error,
    isError,
  } = useGetUserDetailQuery(tokenObject?.user_id);
  const router = useRouter(); // Using router for navigation 

  // Check active package payment status
  const hasActivePackage =
    userDetails?.active_package?.payment_status === "Active";

  const hasPendingPackage =
    userDetails?.active_package?.payment_status === "Pending";


if (isLoading) {
    return <LoadingComponent/>
  } else if(isError){
    return <ErrorComponent error={error} />;
  } else{
    return (
      <div>
        {hasActivePackage ? (
          <VideoComponent />
        ) : hasPendingPackage ? (
          <div className="fixed inset-0 flex justify-center items-center ">
            {/* Full screen overlay */}
            <div className="bg-black rounded-lg p-8 shadow-lg flex flex-col items-center w-[400px]">
              {/* Modal container with flex */}
              <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
                You have a pending package, Please wait while we Verify Your
                Payment
              </p>
              <button
                onClick={() => router.push("/profile")} // Redirect to the home page
                className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 flex justify-center items-center ">
            {/* Full screen overlay */}
            <div className="bg-black rounded-lg p-8 shadow-lg flex flex-col items-center w-[400px]">
              {/* Modal container with flex */}
              <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-4">
                You have no active package, Click Buy to buy a package
              </p>
              <button
                onClick={() => router.push("/packages")} // Redirect to the packages page
                className="mt-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Buy
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
