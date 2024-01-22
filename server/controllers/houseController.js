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
