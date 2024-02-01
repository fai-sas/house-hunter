/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

//express
const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

//rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//database
const connectDB = require('./db/connect')

//router
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const HouseRouter = require('./routes/houseRoute')

//middleware
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app.use(express.static('./public'))
app.use(morgan('tiny'))
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
)
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 5001

app.get('/', (req, res) => {
  res.send('house hunter is running...')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/house', HouseRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
