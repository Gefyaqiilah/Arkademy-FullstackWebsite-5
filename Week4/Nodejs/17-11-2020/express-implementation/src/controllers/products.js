const { json } = require('body-parser')
const modelProducts = require('../models/products')

const {getProduct,insertProduct,deleteProduct,editProduct,getProductById} = modelProducts

const products ={
    getProducts:(req,res)=>{
    // promise, waiting until getProduct send a promise, res or rej
    getProduct()
    .then(results=>{
        res.json(results)
    })
    .catch(error=>{
        res.json(error)
    })
    },
    getProductsById:(req,res)=>{
    const idProduct = req.params.idProduct
    // promise, waiting until getProduct send a promise, res or rej
    getProductById(idProduct)
    .then(results=>{
        res.json(results)
    })
    .catch(error=>{
        res.json(error)
    })
    },
    insertProducts:(req,res)=>{
        const {name, description, price}= req.body
        const data = {
            name,
            description,
            price,
            createdAt:new Date(),
            updatedAt:new Date()
        }
        insertProduct(data)
        .then(results=>{
            res.send(results)
        })
        .catch(error=>{
            res.json(error)
        })
    },
    deleteProducts:(req,res)=>{
        const idProduct = req.params.idProduct
        deleteProduct(idProduct)
        .then(results=>{
            res.send(`data with number id ${idProduct} has been deleted`)
        })
        .catch(error=>{
            res.json(error)
        })
    },
    editProducts:(req,res)=>{
        const idProduct = req.params.idProduct
        const {name,description,price} = req.body
        const data = {
            name,
            description,
            price
        }
        editProduct(idProduct,data)
        .then(results=>{
            res.json(results)
        })
        .catch(error=>{
            res.send(error)
        })
    }
}
module.exports = products