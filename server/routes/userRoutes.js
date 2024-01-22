/* eslint-disable no-undef */

const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require('../middlewares/authentication')

const { getAllUsers, getSingleUser } = require('../controllers/userController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('house owner'), getAllUsers)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
