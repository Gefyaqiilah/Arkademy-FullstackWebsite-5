const {searchRoleId} = require('../models/usersModel')
const usersHelpers = require('../helpers/usersHelpers')
function authorization (req,res,next) {
  const id = req.user.id
  searchRoleId(id)
  .then(results=>{
    const roleId = results[0].roleId
    console.log(roleId);
    if(roleId===1){
      next()
    }else{
      usersHelpers.response(res, null, { status: 'forbidden', statusCode: 400 }, {message: "Sorry, You don't have permission to access this endpoint"})
    }
  })
  .catch()
}

module.exports = authorization