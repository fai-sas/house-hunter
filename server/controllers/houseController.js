/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const House = require('../models/House')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')

const createHouse = async (req, res) => {
  req.body.user = req.user.userId

  const house = await House.create(req.body)

  res.status(StatusCodes.CREATED).json({ house })
}

const getAllHouse = async (req, res) => {
  const houses = await House.find({})
  res.status(StatusCodes.OK).json({ count: houses.length, houses })
}

const getSingleHouse = async (req, res) => {
  const { id: houseId } = req.params

  const house = await House.findOne({ _id: houseId })

  if (!house) {
    throw new CustomError.NotFoundError(`No house with id : ${houseId}`)
  }

  res.status(StatusCodes.OK).json({ house })
}

const updateHouse = async (req, res) => {
  const { id: houseId } = req.params

  const house = await House.findOneAndUpdate({ _id: houseId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!house) {
    throw new CustomError.NotFoundError(`No house with id : ${houseId}`)
  }

  res.status(StatusCodes.OK).json({ house })
}

const deleteHouse = async (req, res) => {
  const { id: houseId } = req.params

  const house = await Product.findOne({ _id: houseId })

  if (!house) {
    throw new CustomError.NotFoundError(`No house with id : ${houseId}`)
  }

  await product.remove()

  res.status(StatusCodes.OK).json({ msg: ' Success! House Removed' })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No Files Uploaded')
  }

  const houseImage = req.files.image

  if (!houseImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image')
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please Upload Image smaller than 1MB '
    )
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads' + `${productImage.name}`
  )

  await productImage.mv('imagePath')

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  createHouse,
  getAllHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  uploadImage,
}
