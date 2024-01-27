import { apiSlice } from '../api/apiSlice'

export const singleHousesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleHouses: builder.query({
      query: (id) => `/house/${id}`,
      providesTags: (result, error, arg) => [
        {
          type: 'SingleHouse',
          id: arg,
        },
      ],
    }),
  }),
})

export const { useGetSingleHousesQuery } = singleHousesApi
