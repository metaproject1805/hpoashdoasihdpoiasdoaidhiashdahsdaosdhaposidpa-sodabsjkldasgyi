import React, { useState} from "react";
import PaginationButtons from "./PaginationButtons";
import TableHeader from "./TableHeader";
import { useGetAdminActiveUserQuery } from "@/utils/apiRoutes/apiEndpoint";
import ErrorComponent from "../ErrorComponent";
import {MiniLoader} from "../LoadingComponent";

const ActiveUser = ({
  tab,
}: {
  tab:string;
}) => {
  const [page, setPage] = useState(1);
  const {data:userDetails, isLoading, isError, error} = useGetAdminActiveUserQuery(page)

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

export default ActiveUser;
