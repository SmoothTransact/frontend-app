// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UseSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const accessToken = localStorage.getItem("token");

// console.log("access Token query", accessToken);

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // headers: { Authorization: `Bearer ${accessToken}` },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/signout",
        method: "GET",
      }),
    }),

    forgotpassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetpassword: builder.mutation({
      query: (userData) => ({
        url: "auth/reset-password",
        method: "POST",
        body: userData,
      }),
    }),
    getallclients: builder.mutation({
      query: () => ({
        url: "clients",
        method: "GET",
        // headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useGetallclientsMutation,
} = api;
