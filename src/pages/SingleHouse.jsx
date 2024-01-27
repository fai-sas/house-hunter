/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom'
import { useGetSingleHousesQuery } from '../features/singleHouse/singleHouseApi'

const SingleHouse = () => {
  const { id } = useParams()
  const { data: singleHouse, isLoading, isError } = useGetSingleHousesQuery(id)
  // console.log(house)
  return (
    <h1 className='container p-8 mx-auto text-4xl font-bold '>
      SingleHouse : {singleHouse?.house?.id}
    </h1>
  )
}
export default SingleHouse
