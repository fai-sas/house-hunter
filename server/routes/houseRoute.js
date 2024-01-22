/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require('../middlewares/authentication')

const {
  createHouse,
  getAllHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('house owner')], createHouse)
  .get(getAllHouse)

router
  .route('/:id')
  .get(getSingleHouse)
  .patch([authenticateUser, authorizePermissions('house owner')], updateHouse)
  .delete([authenticateUser, authorizePermissions('house owner')], deleteHouse)

module.exports = router
