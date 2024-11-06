import React from "react";

export default function TableHeader({
  tab,
  type,
}: {
  tab: string;
  type?: string;
}) {
  return (
    <thead>
      <tr>
        {/* Conditionally render table headers based on type */}
        {type === "Withdrawal" ? (
          <>
            <th className="py-2 px-4">Wallet Address</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </>
        ) : (
          <>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">
              {type === "Investment" ? "Plan" : "Level"}
            </th>
          </>
        )}

        {/* Conditionally render "Payment Slip" and "Action" columns for specific tabs */}
        {(tab === "PendingPackage" || tab === "PendingInvestment") &&
          type !== "Withdrawal" && (
            <>
              <th className="py-2 px-4">Payment Slip</th>
              <th className="py-2 px-4">Action</th>
            </>
          )}
      </tr>
    </thead>
  );
}
