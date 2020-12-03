const jwt = require('jsonwebtoken')
const usersHelpers = require('../helpers/usersHelpers')
function authenticateToken (req,res,next) {
  console.log('auth');
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token === null) return usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message: 'Token cannot be empty'})
  
  jwt.verify(token,process.env.ACCESS_TOKEN,(error,user)=>{
    if(!error){
      req.user = user
      next()
    }else{
      if(error.name === 'TokenExpiredError'){
        usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message:'Token expired'})   
      }else if (error.name === 'JsonWebTokenError'){
        usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message: 'Invalid Token'})   
      }
     }
  })
}
module.exports = authenticateToken