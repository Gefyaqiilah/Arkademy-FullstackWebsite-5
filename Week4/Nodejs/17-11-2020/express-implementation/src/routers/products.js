const express = require('express')
const router = express.Router()
const productsController = require('../controllers/products')

const {getProducts,insertProducts,deleteProducts,editProducts,getProductsById}= productsController

router
    .get('/',getProducts)
    .get('/:idProduct',getProductsById)
    .post('/',insertProducts)
    .delete('/:idProduct',deleteProducts)
    .patch('/:idProduct',editProducts)

module.exports = router