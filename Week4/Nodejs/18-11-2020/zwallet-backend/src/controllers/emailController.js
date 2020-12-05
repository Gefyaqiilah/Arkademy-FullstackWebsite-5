const createError = require('http-errors')
const sendEmail = require('../helpers/sendEmail')
const emailModel = require('../models/emailModel')
const responseHelpers = require('../helpers/responseHelpers')

class Controller {

  sendEmailVerification (req,res,next) {
    const email = req.body.email
    const name = req.body.name
    console.log('masuk send')
    if(!email||!name){
      const error = new createError(404, 'Forbidden: message and email cannot be empty')
      return next(error)
    }

    sendEmail(email,name)
    .then(results=>{
      return responseHelpers.response(res, results, {
        status: 'succeed',
        statusCode: 200
      }, null)
    })
    .catch(()=>{
      const error = new createError(500,'Looks like server having trouble..')
      return next(error)
    })
  }

  emailVerification(req,res,next){
    const email = req.body.email
    console.log(req.body)
    if(!email){
      const error = new createError(400,'email cannot empty')
      return next(error)
    }
    emailModel.checkEmailStatus(email)
    .then(results=>{
      console.log(results[0])
      const emailStatus = results[0].emailStatus
      console.log(`emailstuatu --> ${emailStatus}`)
      if(emailStatus === 1){
        const error = new createError(404, 'Forbidden')
        return next(error)
      }else if(emailStatus === 0){
        emailModel.emailVerification(email)
        .then(exist=>{
          console.log(exist)
          const message = {message: 'your email was successfully verified'}
          return responseHelpers.response(res,message,{status:'Succeedd',statusCode:200},null)
        })
        .catch(()=>{
          console.log('masuk error')
          const error = new createError(500, 'Looks like server having trouble')
          return next(error)
        })
      }
    })
    .catch(()=>{
      console.log('masuk error bawah')
      const error = new createError(500, 'Looks like server having trouble..')
    })
  }
}
const Email = new Controller()
module.exports = Email