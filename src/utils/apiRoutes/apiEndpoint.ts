import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  VideosAPIResponse,
  UserDetails,
  CounterInterface,
  ApiResponseUserInterface,
  ApiResponseWithdrawalInterface,
} from "../types";
import { accessTokenGenerator } from "../functions";
import Cookies from "js-cookie";
import { BASE_URL } from "@/config";

export const apiEndpoints = createApi({
  tagTypes: [
    "userDetails",
    "videoList",
    "adminCounter",
    "adminAllUser",
    "adminInactiveUsers",
    "adminActiveUsers",
    "adminPendingPackage",
    "adminPendingInvestment",
    "adminPendingWithdrawal", // Add the new tag
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (build) => ({
    getUserDetail: build.query<UserDetails, number | undefined>({
      query: (id) => ({
        url: `user/detail/${id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["userDetails"],
    }),

    // Admin endpoints
    getAdminCounter: build.query<CounterInterface, void>({
      query: () => ({
        url: `admins/user-count`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminCounter"],
    }),
    getAdminAllUser: build.query<ApiResponseUserInterface, number>({
      query: (page: number) => ({
        url: `admins/all-user?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminAllUser"],
    }),
    getAdminPendingUsers: build.query<ApiResponseUserInterface, number>({
      query: (page: number) => ({
        url: `admins/pending-user?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminPendingPackage"],
    }),
    getAdminPendingInvestmentUser: build.query<
      ApiResponseUserInterface,
      number
    >({
      query: (page: number) => ({
        url: `admins/pending-investment-user?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminPendingInvestment"],
    }),
    getAdminInactiveUser: build.query<ApiResponseUserInterface, number>({
      query: (page: number) => ({
        url: `admins/inactive-user?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminInactiveUsers"],
    }),
    getAdminActiveUser: build.query<ApiResponseUserInterface, number>({
      query: (page: number) => ({
        url: `admins/active-user?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminActiveUsers"],
    }),

    // Fetch admin pending withdrawals
    getAdminPendingWithdrawals: build.query<
      ApiResponseWithdrawalInterface,
      number
    >({
      query: (page: number) => ({
        url: `admins/all-withdrawal?page=${page}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["adminPendingWithdrawal"], // New tag
    }),

    // Fetching Video List
    getVideoList: build.query<VideosAPIResponse, void>({
      query: () => ({
        url: `tasks/task-list/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      providesTags: ["videoList"],
    }),

    buyInvestment: build.mutation<any, any>({
      query: ({ data }: { data: FormData }) => ({
        url: "investments/investment-create/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      invalidatesTags: ["userDetails"],
    }),

    buyPackage: build.mutation<any, any>({
      query: ({ data }: { data: FormData }) => ({
        url: "packages/package-create/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      invalidatesTags: ["userDetails"],
    }),

    withdrawal: build.mutation<any, any>({
      query: ({
        data,
      }: {
        data: {
          amount: Number;
          username: string;
          wallet_address: string;
        };
      }) => ({
        url: "withdrawals/withdrawal-create/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
        },
      }),
      invalidatesTags: ["userDetails"],
    }),

    submitVideo: build.mutation({
      query: ({ id }: { id: number }) => ({
        url: `tasks/task-submit/${id}/`,
        method: "PUT",
        body: { id },
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["userDetails", "videoList"],
    }),

    readNotification: build.mutation({
      query: ({ id }: { id: string }) => ({
        url: `user/read-notification/${id}/`,
        method: "PUT",
        body: {},
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["userDetails"],
    }),

    handleLogin: build.mutation<any, any>({
      query: ({ data }: { data: any }) => ({
        url: "user/login/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: { refresh: string; access: string }) => {
        Cookies.set("access-token", response.access, { expires: 1 });
        Cookies.set("refresh-token", response.refresh, { expires: 25 });
        window.location.href = "/profile";
      },
    }),

    // Admin Post Requests
    adminApprovePendingPackage: build.mutation<any, any>({
      query: ({
        userId,
        actionType,
      }: {
        userId: number;
        actionType: string;
      }) => ({
        url: `admins/admin-package-action/${userId}/`,
        method: "PUT",
        body: { action_type: actionType },
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [
        "adminCounter",
        "adminPendingInvestment",
        "adminPendingPackage",
        "adminAllUser",
        "adminActiveUsers",
        "adminInactiveUsers",
      ],
    }),

    adminApprovePendingInvestment: build.mutation<any, any>({
      query: ({
        userId,
        actionType,
      }: {
        userId: number;
        actionType: string;
      }) => ({
        url: `admins/admin-investment-action/${userId}/`,
        method: "PUT",
        body: { action_type: actionType },
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [
        "adminCounter",
        "adminPendingInvestment",
        "adminPendingPackage",
        "adminAllUser",
        "adminActiveUsers",
        "adminInactiveUsers",
      ],
    }),
    adminApprovePendingWithdrawal: build.mutation<any, any>({
      query: ({ id, actionType }: { id: number; actionType: string }) => ({
        url: `admins/admin-withdrawal-action/${id}/`,
        method: "PUT",
        body: { action_type: actionType },
        headers: {
          Authorization: `Bearer ${accessTokenGenerator()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["adminPendingWithdrawal"],
    }),
  }),
});

export const {
  // Get Endpoints
  useGetUserDetailQuery,
  useGetVideoListQuery,

  // Admin get endpoints
  useGetAdminCounterQuery,
  useGetAdminAllUserQuery,
  useGetAdminPendingUsersQuery,
  useGetAdminPendingInvestmentUserQuery,
  useGetAdminActiveUserQuery,
  useGetAdminInactiveUserQuery,
  useGetAdminPendingWithdrawalsQuery, // New hook for fetching pending withdrawals

  // Post Endpoints
  useBuyInvestmentMutation,
  useBuyPackageMutation,
  useHandleLoginMutation,
  useSubmitVideoMutation,
  useReadNotificationMutation,
  useWithdrawalMutation,

  // Admin Post endpoints
  useAdminApprovePendingPackageMutation,
  useAdminApprovePendingInvestmentMutation,
  useAdminApprovePendingWithdrawalMutation,
} = apiEndpoints;
