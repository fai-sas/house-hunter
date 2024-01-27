/* eslint-disable no-unused-vars */

import { useGetHousesQuery } from '../features/houses/housesApi'
import House from './House'

const Houses = () => {
  const { data: house, isLoading, isError } = useGetHousesQuery()
  const houses = house?.houses

  let content = null

  if (isLoading) {
    content = <h1>Loading...</h1>
  }

  if (!isLoading && isError) {
    content = <h1>There was an error occurred </h1>
  }

  if (!isLoading && !isError && houses?.length === 0) {
    content = <h1>No house found </h1>
  }

  if (!isLoading && !isError && houses?.length > 0) {
    content = houses?.map((house) => {
      return <House key={house.id} house={house} />
    })
  }

  return <div>{content}</div>
}
export default Houses
