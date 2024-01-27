/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: 'http://localhost:5001/api/v1',
    // prepareHeaders: async (headers, { getState, endpoint }) => {
    //   const token = getState()?.auth?.accessToken
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
})
