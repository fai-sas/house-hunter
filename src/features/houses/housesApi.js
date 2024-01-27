import { apiSlice } from '../api/apiSlice'

export const housesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouses: builder.query({
      query: () => `/house`,
    }),
  }),
})

export const { useGetHousesQuery } = housesApi
