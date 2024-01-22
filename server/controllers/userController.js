/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} = require('../utils')

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find().select('-password')

  res.status(StatusCodes.OK).json({ users, nbHits: users.length })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')

  if (!user) {
    throw new CustomError.NotFoundError(
      `No user found with id : ${req.params.id}`
    )
  }

  checkPermissions(req.user, user._id)

  res.status(StatusCodes.OK).json({ user })
}

module.exports = {
  getAllUsers,
  getSingleUser,
}
