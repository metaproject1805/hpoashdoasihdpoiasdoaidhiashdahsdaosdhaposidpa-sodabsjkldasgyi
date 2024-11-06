import React from "react";

function PaginationButtons({
  setPage,
  next,
  prev,
  isLoading,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  next: string | null | undefined;
  prev: string | null | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="flex justify-between mt-4 mb-12 w-full">
      {prev && (
        <button
          onClick={() => {
            setPage((prev) => (prev = 1 ? 1 : prev + 1));
            console.log("Previous clicked");
          }}
          className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-md mr-2 disabled:bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "...Loading..." : "Previous"}
        </button>
      )}

      {next && (
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
            console.log("Next clicked");
          }}
          className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded-md ml-2 disabled:bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "...Loading..." : "Next"}
        </button>
      )}
    </div>
  );
}

export default PaginationButtons;
