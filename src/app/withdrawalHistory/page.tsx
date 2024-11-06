"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";

const WithdrawalPage = () => {
  const { tokenObject } = useToken();
  const { data, isLoading } = useGetUserDetailQuery(tokenObject?.user_id);



  // Extract withdrawals from the data
  

  const LoaderModal = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-10 p-4 sm:p-6 flex justify-center items-start">
      <LoaderModal isLoading={isLoading} />
      <div className="w-full sm:w-[80%] mt-[60px] sm:mt-[100px] mx-auto rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg relative z-10">
        <h1 className="flex gap-4 text-2xl sm:text-3xl font-extrabold text-purple-500 mb-4 sm:mb-6">
          <Icon
            icon="hugeicons:bitcoin-withdraw"
            className="text-purple-500 text-4xl"
          />
          Withdrawals
        </h1>

        {/* Withdrawals Table */}
        <div className="overflow-x-auto">
          {data?.withdrawals && data?.withdrawals.length > 0 ? (
            <table className="min-w-full bg-black shadow-md rounded-lg">
              <thead>
                <tr>
                  
                  <th className="px-4 py-2 bg-purple-100 text-left">Amount</th>
                  <th className="px-4 py-2 bg-purple-100 text-left">Wallet</th>
                  <th className="px-4 py-2 bg-purple-100 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    
                    <td className="px-4 py-2 border-t">${withdrawal.amount}</td>
                    <td className="px-4 py-2 border-t">
                      {withdrawal.wallet_address ||
                        "No wallet address provided"}
                    </td>
                    <td
                      className={`px-4 py-2 border-t capitalize ${
                        withdrawal.payment_status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {withdrawal.payment_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-600">
              No withdrawals found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;
