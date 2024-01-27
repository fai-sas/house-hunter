/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const validator = require('validator')

const HouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the house name'],
    },
    address: {
      type: String,
      required: [true, 'Please provide the house address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide the city'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide the number of bedrooms'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide the number of bathrooms'],
    },
    roomSize: {
      type: String,
      required: [true, 'Please provide the room size'],
    },
    picture: {
      type: String,
      required: [true, 'Please provide a picture URL or file path'],
    },
    availabilityDate: {
      type: Date,
      required: [true, 'Please provide the availability date'],
    },
    rentPerMonth: {
      type: Number,
      required: [true, 'Please provide the rent per month'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a valid phone number'],
      validate: {
        validator: function (value) {
          return /^(\+8801[1-9]\d{8})$/g.test(value)
        },
        message:
          'Please provide a valid Bangladesh phone number (+8801XXXXXXXXX)',
      },
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('House', HouseSchema)
