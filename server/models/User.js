/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  phoneNumber: {
    type: String, // Change type to String
    required: [true, 'Please provide a valid phone number'],
    validate: {
      validator: function (value) {
        return /^(\+8801[1-9]\d{8})$/g.test(value)
      },
      message:
        'Please provide a valid Bangladesh phone number (+8801XXXXXXXXX)',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['house owner', 'house renter'],
    default: 'house renter',
  },
})

module.exports = mongoose.model('User', UserSchema)
