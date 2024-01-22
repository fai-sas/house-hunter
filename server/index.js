/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

require('dotenv').config()
require('express-async-errors')

//express
const express = require('express')
const app = express()

//rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//database
const connectDB = require('./db/connect')

const port = process.env.PORT || 5001

app.get('/', (req, res) => {
  res.send('house hunter is running...')
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
