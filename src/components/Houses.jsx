/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import { useGetHousesQuery } from '../features/houses/housesApi'
import House from './House'
import { MdArrowBack, MdArrowForward, MdBook } from 'react-icons/md'

const Houses = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    bedrooms: [],
    bathrooms: '',
    roomSize: '',
    availabilityDate: '',
    rentPerMonth: '',
  })
  const [bedroomOptions, setBedroomOptions] = useState([])

  const {
    data: house,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetHousesQuery({ page, search, limit, ...filters })

  const bedRoomsOptions = house?.houses
    .map((bedroom) => bedroom.bedrooms)
    .flat()

  console.log(bedRoomsOptions)

  // Handle change in limit
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit)
    // Reset the page to 1 when the limit changes
    setPage(1)
  }

  const handleSearch = (e) => {
    if (isLoading) return
    setSearch(e.target.value)
  }

  const houses = house?.houses

  useEffect(() => {
    if (houses) {
      // Extract unique bedroom options from the houses across all pages
      const options = Array.from(
        new Set(houses.flatMap((house) => house.bedrooms))
      )
      setBedroomOptions(options)
    }
  }, [houses])

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!isLoading && isError) {
    return (
      <>
        <h1>There was an error occurred</h1>
        {error.status === 404 && <p>No houses matched the search criteria</p>}
        <div className='flex mt-4'>
          <input
            type='text'
            placeholder='Search by city'
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div>
          {bedroomOptions.map((option) => (
            <label key={option}>
              <input
                type='checkbox'
                value={option}
                checked={filters.bedrooms.includes(option)}
                onChange={(e) =>
                  handleFilterChange(
                    'bedrooms',
                    e.target.checked
                      ? [...filters.bedrooms, option]
                      : filters.bedrooms.filter((bedroom) => bedroom !== option)
                  )
                }
              />
              {option}
            </label>
          ))}
        </div>
      </>
    )
  }

  if (!isLoading && !isError && houses?.length === 0) {
    return <h1>No house found </h1>
  }

  // if (!isLoading && !isError && houses?.length > 0) {
  if (!isLoading && !isError && houses !== undefined) {
    const numPages = house?.numOfPages
    const numButtonsToShow = Math.min(numPages, 5)

    const startPage = Math.max(
      1,
      Math.min(
        page - Math.floor(numButtonsToShow / 2),
        numPages - numButtonsToShow + 1
      )
    )
    const endPage = Math.min(startPage + numButtonsToShow - 1, numPages)

    return (
      <>
        <section className='container p-8 mx-auto '>
          {/* Dropdown for selecting items per page */}
          {/* <div className='py-8'>
            <label>Items per page:</label>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div> */}
          <div>
            {houses?.map((house) => {
              return <House key={house.id} house={house} />
            })}
          </div>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <MdArrowBack />
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === house?.numOfPages}
          >
            <MdArrowForward />
          </button>
          <h1>{`${page} / ${house?.numOfPages}`}</h1>

          {/*  */}

          <div className='flex mt-4'>
            <input
              type='text'
              placeholder='Search by city'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              type='text'
              placeholder='Filter by bedrooms'
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            />
          </div>
          <div>
            {bedroomOptions.map((option) => (
              <label key={option}>
                <input
                  type='checkbox'
                  value={option}
                  checked={filters.bedrooms.includes(option)}
                  onChange={(e) =>
                    handleFilterChange(
                      'bedrooms',
                      e.target.checked
                        ? [...filters.bedrooms, option]
                        : filters.bedrooms.filter(
                            (bedroom) => bedroom !== option
                          )
                    )
                  }
                />
                {option}
              </label>
            ))}
          </div>

          {/* Show message if there's an error and it's a 404 */}
          {error?.status === 404 && (
            <p>No houses matched the search criteria</p>
          )}

          {numPages > 1 && (
            <div className='flex items-center justify-center mt-4'>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`p-2 mx-2 focus:outline-none rounded-md ${
                  page === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
                disabled={page === 1}
              >
                <MdArrowBack className='text-lg' />
              </button>
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                  key={startPage + index}
                  onClick={() => setPage(startPage + index)}
                  className={`p-2 mx-2 focus:outline-none rounded-md ${
                    page === startPage + index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-indigo-500 hover:bg-indigo-100'
                  }`}
                >
                  {startPage + index}
                </button>
              ))}
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, numPages))}
                className={`p-2 mx-2 focus:outline-none rounded-md ${
                  page === numPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
                disabled={page === numPages}
              >
                <MdArrowForward className='text-lg' />
              </button>
            </div>
          )}

          {/*  */}
        </section>
      </>
    )
  }
}
export default Houses
