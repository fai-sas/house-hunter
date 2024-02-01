/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express')
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require('../middlewares/authentication')
const { uploadProductImage } = require('../controllers/uploadsController')

const {
  createHouse,
  getAllHouse,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  uploadImage,
} = require('../controllers/houseController')

router.route('/').post(createHouse).get(getAllHouse)
// .post([authenticateUser, authorizePermissions('house owner')], createHouse)

// upload image router should be before router based on IDs
router.route('/uploads').post(uploadProductImage)
// .post([authenticateUser, authorizePermissions('house owner')], uploadImage)

router
  .route('/:id')
  .get(getSingleHouse)
  .patch([authenticateUser, authorizePermissions('house owner')], updateHouse)
  .delete([authenticateUser, authorizePermissions('house owner')], deleteHouse)

module.exports = router
