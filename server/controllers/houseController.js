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

// city, bedrooms, bathrooms, room size, availability,  rent per month

const getAllHouse = async (req, res) => {
  try {
    const {
      search,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      availabilityDate,
      rentPerMonth,
      sort,
    } = req.query

    const queryObject = {}

    if (search) {
      queryObject.$or = [{ city: { $regex: search, $options: 'i' } }]
    }

    if (city) {
      queryObject.city = city
    }

    if (bedrooms) {
      queryObject.bedrooms = Number(bedrooms)
    }

    if (bathrooms) {
      queryObject.bathrooms = Number(bathrooms)
    }

    if (roomSize) {
      queryObject.roomSize = roomSize
    }

    if (availabilityDate) {
      queryObject.availabilityDate = { $gte: new Date(availabilityDate) }
    }

    if (rentPerMonth) {
      const [minRent, maxRent] = rentPerMonth.split('-').map(Number)
      queryObject.rentPerMonth = { $gte: minRent, $lte: maxRent }
    }

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'rentPerMonth',
      'z-a': '-rentPerMonth',
    }

    const sortKey = sortOptions[sort] || sortOptions.newest

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const houses = await House.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit)

    if (houses.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'No houses found based on the query.' })
    }

    const totalHouse = await House.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalHouse / limit)

    res.status(StatusCodes.OK).json({
      totalHouse,
      numOfPages,
      currentPage: page,
      houses,
    })
  } catch (error) {
    console.error(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
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

  const house = await House.findOne({ _id: houseId })

  if (!house) {
    throw new CustomError.NotFoundError(`No house with id : ${houseId}`)
  }

  await house.remove()

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
