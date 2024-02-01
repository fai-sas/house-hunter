/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// const { StatusCodes } = require('http-status-codes')
// const cloudinary = require('cloudinary').v2
// const fs = require('fs')

// const uploadProductImage = async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: 'Image file is missing' })
//     }

//     const result = await cloudinary.uploader.upload(
//       req.files.image.tempFilePath,
//       { use_filename: true, folder: 'file-upload' }
//     )

//     console.log(req.files, req.files.image)

//     fs.unlinkSync(req.files.image.tempFilePath)

//     return res
//       .status(StatusCodes.OK)
//       .json({ image: { src: result.secure_url } })
//   } catch (error) {
//     console.error(error)
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: 'Internal Server Error' })
//   }
// }

// module.exports = { uploadProductImage }

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// UPDATED CODE BELOW

// const { StatusCodes } = require('http-status-codes')
// const cloudinary = require('cloudinary').v2
// const fs = require('fs')

// const uploadProductImage = async (req, res) => {
//   try {
//     if (!req.files || !req.files.image) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: 'Images are missing' })
//     }

//     const imagePromises = req.files.image.map(async (imageFile) => {
//       const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
//         use_filename: true,
//         folder: 'file-upload',
//       })

//       fs.unlinkSync(imageFile.tempFilePath)

//       return { src: result.secure_url }
//     })

//     const image = await Promise.all(imagePromises)

//     return res.status(StatusCodes.OK).json({ image })
//   } catch (error) {
//     console.error(error)
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: 'Internal Server Error' })
//   }
// }

// module.exports = { uploadProductImage }

const { StatusCodes } = require('http-status-codes')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImage = async (req, res) => {
  try {
    if (!req.files || (!Array.isArray(req.files.image) && !req.files.image)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Images are missing' })
    }

    let imageFiles = Array.isArray(req.files.image)
      ? req.files.image
      : [req.files.image]

    const imagePromises = imageFiles.map(async (imageFile) => {
      const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        use_filename: true,
        folder: 'file-upload',
      })

      fs.unlinkSync(imageFile.tempFilePath)

      return { src: result.secure_url }
    })

    const images = await Promise.all(imagePromises)

    return res.status(StatusCodes.OK).json({ images })
  } catch (error) {
    console.error(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Internal Server Error' })
  }
}

module.exports = { uploadProductImage }
