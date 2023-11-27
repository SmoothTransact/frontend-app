// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signupPersonal: builder.mutation({
      query: (userData) => ({
        url: "auth/signup/personal",
        method: "POST",
        body: userData,
      }),
    }),
    signupBusiness: builder.mutation({
      query: (userData) => ({
        url: "auth/signup/business",
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
  }),
});

export const {
  useLoginMutation,
  // useSignupMutation,
  useLogoutMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useSignupBusinessMutation,
  useSignupPersonalMutation,
} = api;
