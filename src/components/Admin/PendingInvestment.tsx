import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponseUserInterface } from "@/utils/types";
import PaginationButtons from "./PaginationButtons";
import { errorMessageHandler } from "@/utils/functions";
import TableHeader from "./TableHeader";
import {
  useGetAdminPendingInvestmentUserQuery,
  useAdminApprovePendingInvestmentMutation,
} from "@/utils/apiRoutes/apiEndpoint";
import ErrorComponent from "../ErrorComponent";
import { MiniLoader } from "../LoadingComponent";

const PendingInvestment = ({
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
  } = useGetAdminPendingInvestmentUserQuery(page);
  const [adminApprovePendingInvestment, { isLoading: isApproving }] =
    useAdminApprovePendingInvestmentMutation();


  const handleViewImage = (imageUrl: string | null) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleButtonAction = async (userId: number, action: string) => {
    let endpoint = `${"BASE_URL"}/api/admins/admin-investment-action/${userId}/`
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
            <TableHeader tab={tab} type="Investment" />
            <tbody>
              {userDetails && userDetails.results.length > 0 ? (
                userDetails?.results.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-t capitalize">
                      {user.username}
                    </td>
                    <td className="py-2 px-4 border-t">{user.email}</td>
                    <td className="py-2 px-4 border-t capitalize">
                      {user?.investment?.payment_status || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-t capitalize">
                      {user?.investment?.duration || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {user?.investment.payment_slip ? (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                          onClick={() =>
                            handleViewImage(user?.investment.payment_slip)
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
                          adminApprovePendingInvestment({
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
                          adminApprovePendingInvestment({
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

export default PendingInvestment;
