import { useState } from 'react'
import axios from 'axios'

const FileUploadForm = () => {
  const url = '/api/v1/products'
  const [name, setName] = useState('computer')
  const [price, setPrice] = useState(150.99)
  const [image, setImage] = useState(null)

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0]
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`${url}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImage(src)
    } catch (error) {
      setImage(null)
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const product = { name, price, image }
      await axios.post(url, product)
      fetchProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProducts = async () => {
    try {
      const {
        data: { products },
      } = await axios.get(url)
      // Render products in your React component as needed
      console.log(products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className='form file-form' onSubmit={handleSubmit}>
        <h4>File Upload</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            className='form-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input
            type='number'
            id='price'
            className='form-input'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='image' className='form-label'>
            Image
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
          />
        </div>
        <button type='submit' className='btn btn-block'>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default FileUploadForm
