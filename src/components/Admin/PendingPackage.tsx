import React, { useState } from "react";
import PaginationButtons from "./PaginationButtons";
import TableHeader from "./TableHeader";
import { useAdminApprovePendingPackageMutation, useGetAdminPendingUsersQuery } from "@/utils/apiRoutes/apiEndpoint";
import ErrorComponent from "../ErrorComponent";
import { MiniLoader } from "../LoadingComponent";

const PendingPackage = ({
  tab,
  setSelectedImage,
  setIsModalOpen,
}: {
  tab: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [page, setPage] = useState(1);
  const {
    data: userDetails,
    isLoading, 
    isError,
    error,
  } = useGetAdminPendingUsersQuery(page);
  const [adminApprovePendingPackage, {isLoading:isApproving}] = useAdminApprovePendingPackageMutation()

  const handleViewImage = (imageUrl: string | null) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };


  if (isLoading) {
    return <MiniLoader/>
  } else if(isError){
    return <ErrorComponent error={error} />;
  } else{
    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full shadow-md rounded-lg overflow-hidden">
            <TableHeader tab={tab} />
            <tbody>
              {userDetails && userDetails.results.length > 0 ? (
                userDetails?.results.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-t capitalize">
                      {user.username}
                    </td>
                    <td className="py-2 px-4 border-t">{user.email}</td>
                    <td className="py-2 px-4 border-t capitalize">
                      {user?.active_package?.payment_status || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-t capitalize">
                      {user?.active_package?.level || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {user?.active_package.payment_slip ? (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                          onClick={() =>
                            handleViewImage(user?.active_package.payment_slip)
                          }
                        >
                          View Image
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-2 px-4 border-t">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                        onClick={() =>
                          adminApprovePendingPackage({
                            userId: user.id,
                            actionType: "approve",
                          })
                        }
                        disabled={isApproving}
                      >
                        {isApproving ? "...loading" : "Approve"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        onClick={() =>
                          adminApprovePendingPackage({
                            userId: user.id,
                            actionType: "reject",
                          })
                        }
                        disabled={isApproving}
                      >
                        {isApproving ? "...loading" : "Decline"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PaginationButtons
          next={userDetails?.next}
          prev={userDetails?.previous}
          setPage={setPage}
          isLoading={isLoading}
        />
      </>
    );
  }
};

export default PendingPackage;
