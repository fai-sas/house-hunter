/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState } from 'react'
import { useAddHouseMutation } from '../features/houses/housesApi'

const AddHouse = () => {
  const url = 'http://localhost:5001/api/v1/house'
  const [addHouse, { data: house, isLoading, isSuccess, isError }] =
    useAddHouseMutation()

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    bedrooms: 0,
    bathrooms: 0,
    roomSize: '',
    image: '',
    availabilityDate: '',
    rentPerMonth: 0,
    phoneNumber: '',
    description: '',
  })

  const handleImageChange = async (e) => {
    const imageFiles = e.target.files

    if (!imageFiles || imageFiles.length === 0) {
      // Handle the case when no files are selected
      return
    }

    const formData = new FormData()

    // Append each file to the FormData object
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('image', imageFiles[i])
    }

    try {
      const {
        data: { images },
      } = await axios.post(`${url}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Handle the response, update your state, etc.
      console.log(images)
    } catch (error) {
      // Handle errors
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addHouse(formData)
    console.log(formData)
  }

  return (
    <div className='max-w-md p-4 mx-auto mt-8 bg-white rounded shadow-lg'>
      <h2 className='mb-4 text-2xl font-bold'>Add House</h2>
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              House Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='address'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
        </div>

        {/* Second Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label
              htmlFor='city'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              City
            </label>
            <input
              type='text'
              id='city'
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='bedrooms'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Bedrooms
            </label>
            <input
              type='number'
              id='bedrooms'
              name='bedrooms'
              value={formData.bedrooms}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
        </div>

        {/* Third Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label
              htmlFor='bathrooms'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Bathrooms
            </label>
            <input
              type='number'
              id='bathrooms'
              name='bathrooms'
              value={formData.bathrooms}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='roomSize'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Room Size
            </label>
            <input
              type='text'
              id='roomSize'
              name='roomSize'
              value={formData.roomSize}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
        </div>

        {/* Add your file upload input for the image field here */}
        {/* <div className='form-row'>
          <label htmlFor='image' className='form-label'>
            Image
          </label>
          <input
            type='file'
            required
            id='image'
            accept='image/*'
            onChange={handleImageChange}
            className='form-input'
          />
        </div> */}

        <div className='form-row'>
          <label htmlFor='image' className='form-label'>
            Images
          </label>
          <input
            type='file'
            required
            id='image'
            accept='image/*'
            onChange={handleImageChange}
            multiple // Allow multiple file selection
            className='form-input'
          />
        </div>

        {/* Fourth Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label
              htmlFor='availabilityDate'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Availability Date
            </label>
            <input
              type='date'
              id='availabilityDate'
              name='availabilityDate'
              value={formData.availabilityDate}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='rentPerMonth'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Rent Per Month
            </label>
            <input
              type='number'
              id='rentPerMonth'
              name='rentPerMonth'
              value={formData.rentPerMonth}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
        </div>

        {/* Fifth Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='mb-4'>
            <label
              htmlFor='phoneNumber'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Phone Number
            </label>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              pattern='(\+8801[1-9]\d{8})'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-600'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            ></textarea>
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none'
          >
            Add House
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddHouse
