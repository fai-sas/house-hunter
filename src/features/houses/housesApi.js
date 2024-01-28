/* eslint-disable no-unused-vars */
import { apiSlice } from '../api/apiSlice'

export const housesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouses: builder.query({
      // query: ({ page }) => `/house?page=${page}`,
      // query: ({ page, ...params }) =>
      //   `/house?page=${page}${getQueryString(params)}`,
      query: ({ city, bedrooms, availability, page, search, limit }) => {
        let url = `/house?city=${city}&bedrooms=${bedrooms}&availability=${availability}&page=${page}&limit=${limit}`

        if (search) {
          url = `${url}&search=${search}`
        }

        return url
      },
    }),
  }),
})

// function getQueryString(params) {
//   const queryString = Object.entries(params)
//     .map(([key, value]) =>
//       value ? `&${key}=${encodeURIComponent(value)}` : ''
//     )
//     .join('')

//   return queryString ? `?${queryString.slice(1)}` : ''
// }

export const { useGetHousesQuery } = housesApi
