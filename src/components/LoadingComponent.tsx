import React from "react";

export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
    </div>
  );
}

export function MiniLoader() {
  return (
    <div className="flex justify-center content-center mt-6">
      <div className="animate-spin rounded-full size-8 border-t-4 border-purple-500"></div>
    </div>
  );
}
