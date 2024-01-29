/* eslint-disable no-unused-vars */

import { apiSlice } from '../api/apiSlice'
import { userLoggedIn } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          localStorage.setItem(
            'auth',
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            })
          )

          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          )
        } catch (err) {
          // do nothing
        }
      },
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled

          localStorage.setItem(
            'auth',
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            })
          )

          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            })
          )
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
