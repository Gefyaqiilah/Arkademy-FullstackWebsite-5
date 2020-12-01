require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// import router
const usersRoute = require('./src/routers/usersRoute')
const usersHelpers = require('./src/helpers/usersHelpers')
const transfersRoute = require('./src/routers/transfersRoute')
const topUpRoute = require('./src/routers/topUpRoute')
const PORT = process.env.PORT

// CORS
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// grouping end-point
app.use('/users', usersRoute)
app.use('/transfers', transfersRoute)
app.use('/topup', topUpRoute)

app.use('/photo',express.static('./uploads'))

// bisa disini pakai next biar masuk ke route selanjutnya kebawah
// kalau dimiasalkan ada yang next dengan error   
app.use('*', (req, res) => {
  usersHelpers.response(res, null, { status: 'failed', statusCode: 404 }, { message: 'Sorry API endpoint Not Found' })
})
// error handling (tanpa route '') kalau misalkan ada yang pakai next (berisi error) maka bakal dijalankan route ini
app.use((err, req, res, next) => {
  usersHelpers.response(res, null, { status: err.status, statusCode: err.statusCode }, { message: err.message })
})

app.listen(PORT, () => console.log('Express server running on port : ' + PORT))
