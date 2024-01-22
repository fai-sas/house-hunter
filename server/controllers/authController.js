/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const register = async (req, res) => {
  const { email, name, phoneNumber, password, role } = req.body

  const emailAlreadyExists = await User.findOne({ email })

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError(
      'Email already exists, please choose another email id'
    )
  }

  const user = await User.create({ email, name, phoneNumber, password, role })

  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
