const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const port = 3000
const routerProducts = require('./src/routers/products')

// using morgan
app.use(morgan('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parsing body request
app.use(bodyParser.json())
// create router
app.use('/products',routerProducts)

app.listen(port,()=>console.log('Express Server running at port : '+port))