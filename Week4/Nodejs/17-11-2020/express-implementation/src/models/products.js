const connection = require('../configs/db')

const products = {
    getProduct:()=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM products", (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    getProductById:(id)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM products WHERE id = ?",id, (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    insertProduct:(data)=>{
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO products SET ?",data,(error,results)=>{
                if(!error){
                    resolve('added data successfully')
                }else{
                    reject(error)
                }
            })
        })
    },
    deleteProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM products WHERE id = ?",id,(error,results)=>{
                if(!error){
                    resolve('data has been deleted')
                }else{
                    reject(error)
                }
            })
        })
    },
    editProduct:(id,data)=>{
        return new Promise((resolve,reject)=>{
            const {name,description,price} = data
            const query = "UPDATE products SET name = ?, description = ?, price = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?"
            const params = [name,description,price,id]
            connection.query(query,params,(error,results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    }
}
module.exports = products