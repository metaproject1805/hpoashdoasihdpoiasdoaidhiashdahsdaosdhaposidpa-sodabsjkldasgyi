import axios from "axios";
import Cookies from "js-cookie";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { UserNotificationInterface } from "@/utils/types";

type ErrorData = {
  detail?: string;
  message?: string;
};

// Type guard to check if error is a FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error === "object" && "data" in error;
};

// Type guard to check if error data contains the expected detail or message properties
const isErrorData = (data: any): data is ErrorData => {
  return typeof data === "object" && (data?.detail || data?.message);
};

export const showErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  const defaultMessage = "Internal server error";

  // Check if the error is a FetchBaseQueryError and has a data field
  if (isFetchBaseQueryError(error) && isErrorData(error.data)) {
    const { detail, message } = error.data;
    if (detail) {
      return JSON.stringify(detail);
    } else if (message) {
      return JSON.stringify(message);
    }
  }

  return defaultMessage;
};

export function accessTokenGenerator() {
  const token = Cookies.get("access-token");

  if (!token) {
    return undefined;
    // throw new Error("No access token found");
  }
  return token;
}
export function homeTokenValidator() {
  const token = Cookies.get("access-token");
  if (!token) {
    return false;
  }
  return true;
}

export function errorMessageHandler<T extends string | null | undefined>(
  err: unknown,
  fallbackMessage: T = "Unable to process your request at the moment. Please try again" as T
): T {
  // Check if the error is an Axios error
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Return the error message from the response if available
      return (err.response.data?.message || fallbackMessage) as T;
    } else if (err.request) {
      // Return a custom message if the request was made but no response received
      return "No response received from the server." as T;
    } else {
      // Return the error message if it's a request setup issue
      return (err.message || fallbackMessage) as T;
    }
  } else if (err instanceof Error) {
    // Handle any other types of errors (non-Axios errors)
    return (err.message || fallbackMessage) as T;
  }

  // Return the fallback message for unknown error types
  return fallbackMessage;
}

export const getNotificationClass = (
  type: UserNotificationInterface["type"]
) => {
  switch (type) {
    case "Success":
      return "border-green-500 bg-gradient-to-r from-green-100 to-green-50 text-green-700";
    case "Warning":
      return "border-yellow-500 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700";
    case "Error":
      return "border-red-500 bg-gradient-to-r from-red-100 to-red-50 text-red-700";
    case "Info":
      return "border-blue-500 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700";
    default:
      return "";
  }
};
