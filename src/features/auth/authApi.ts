import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/AxiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: {
          username: body.username,
          password: body.password,
          expiresInMins: 30,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getMe: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    refreshToken: builder.mutation<any, { refreshToken?: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        data: {
          refreshToken: body?.refreshToken,
          expiresInMins: 30,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useRefreshTokenMutation } =
  authApi;
