import React, { useState } from "react";
import PaginationButtons from "./PaginationButtons"; // Assuming you have this component
import TableHeader from "./TableHeader"; // You can customize the table header for withdrawals
import {
  useGetAdminPendingWithdrawalsQuery,
  useAdminApprovePendingWithdrawalMutation,
} from "@/utils/apiRoutes/apiEndpoint"; // Adjust the paths as necessary
import ErrorComponent from "../ErrorComponent";
import { MiniLoader } from "../LoadingComponent";

const Withdrawal = ({
  tab,

}: {
  tab: string;

}) => {
  const [page, setPage] = useState(1);
  const {
    data: withdrawalDetails,
    isLoading,
    isError,
    error,
  } = useGetAdminPendingWithdrawalsQuery(page); // Fetching the withdrawals data
  const [adminApprovePendingWithdrawal, { isLoading: isApproving }] =
    useAdminApprovePendingWithdrawalMutation();


  if (isLoading) {
    return <MiniLoader />;
  } else if (isError) {
    return <ErrorComponent error={error} />;
  } else {
    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full shadow-md rounded-lg overflow-hidden">
            <TableHeader tab="Withdrawal" type="Withdrawal"/> {/* Customize your table headers */}
            <tbody>
              {withdrawalDetails && withdrawalDetails.results.length > 0 ? (
                withdrawalDetails.results.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td className="py-2 px-4 border-t">
                      {withdrawal.username || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {withdrawal.email || "No Email address"}
                    </td>
                    <td className="py-2 px-4 border-t">
                      {withdrawal.wallet_address || "No wallet address"}
                    </td>
                    <td className="py-2 px-4 border-t">{withdrawal.amount}</td>
                    <td className="py-2 px-4 border-t capitalize">
                      {withdrawal.payment_status}
                    </td>
                    <td className="py-2 px-4 border-t">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                        onClick={() =>
                          adminApprovePendingWithdrawal({
                            id: withdrawal.id,
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
                          adminApprovePendingWithdrawal({
                            id: withdrawal.id,
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
                  <td colSpan={6} className="text-center py-4">
                    No pending withdrawals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PaginationButtons
          next={withdrawalDetails?.next}
          prev={withdrawalDetails?.previous}
          setPage={setPage}
          isLoading={isLoading}
        />
      </>
    );
  }
};

export default Withdrawal;
