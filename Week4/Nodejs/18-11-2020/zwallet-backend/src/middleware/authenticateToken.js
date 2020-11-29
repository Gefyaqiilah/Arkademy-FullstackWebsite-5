const jwt = require('jsonwebtoken')
const usersHelpers = require('../helpers/usersHelpers')
function authenticateToken (req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token);

  if(token === null) return usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message: 'token cannot be empty'})

  jwt.verify(token,process.env.ACCESS_TOKEN,(error,user)=>{
    if(!error){
      req.user = user
      next()
    }else{
      usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, error)    }
  })
}
module.exports = authenticateToken