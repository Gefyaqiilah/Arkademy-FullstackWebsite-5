require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// import router
const routerUsers = require('./src/routers/usersRoute')
const usersHelpers = require('./src/helpers/usersHelpers')
const PORT = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// grouping end-point
app.use('/users', routerUsers)

// error handling
app.use('*', (req, res) => {
  usersHelpers.response(res, null, {status:'failed',statusCode:404}, { message: 'Sorry API endpoint Not Found' })
})
app.listen(PORT, () => console.log('Express server running on port : ' + PORT))
