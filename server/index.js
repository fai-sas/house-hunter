/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

//express
const express = require('express')
const app = express()

//rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5001

app.get('/', (req, res) => {
  res.send('house hunter is running...')
})

app.listen(port, () => {
  console.log(`house hunter is listening to port ${port}`)
})
