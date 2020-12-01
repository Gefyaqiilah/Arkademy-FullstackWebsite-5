const bcrypt = require('bcrypt')
const {v4:uuidv4} = require('uuid')

const usersHelpers = require('../helpers/usersHelpers')
const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')
class Controllers {
  constructor() {
    this.resultsTokens = []
    this.userLogin = this.userLogin.bind(this)
    this.generateAccessToken = this.generateAccessToken.bind(this)
    this.generateRefreshToken = this.generateRefreshToken.bind(this)
    this.newToken = this.newToken.bind(this)
    this.userLogOut = this.userLogOut.bind(this)
  }
  getUsers (req, res) {
    const {page = 1,limit=4,order="ASC"} = req.query
    const offset = page ? (parseInt(page)-1) * parseInt(limit) : 0
    usersModel.getUsers(limit,offset,order)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getUsersById (req, res, next) {
    const idUser = req.params.idUser
    usersModel.getUsersById(idUser)
      .then(results => {
        if (results.length === 0) {
          const error = new Error(`User with number ID:${idUser} not Found..`)
          error.statusCode = 500
          error.status = 'failed'
          next(error)
        } else {
          usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getUsersByNameAndPhoneNumber (req, res, next) {
    const { firstName = '', phoneNumber = '' } = req.query
    console.log(`
    name --> ${firstName}
    phone --> ${phoneNumber}
    `)
    usersModel.getUsersByNameAndPhoneNumber(firstName, phoneNumber)
      .then(results => {
        if (results.length === 0) {
          const error = new Error(`User with firstname : ${firstName} and phoneNumber : ${phoneNumber} not Found..`)
          error.statusCode = 500
          error.status = 'failed'
          next(error)
        } else {
          usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }
  userLogin (req,res) {
    const {email, password} = req.body
    console.log(`
    email --> ${email}
    password --> ${password} 
    `);
    console.log(this.resultsTokens)
    usersModel.userLogin(email)
    .then(results=>{
        if(results.length === 0){
          const error = {message:'Email or password you entered is incorrect.'}
          usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, error)
        }else{
          const userData = results[0]
          bcrypt.compare(password,userData.password,((errorcrypt,resultscrypt)=>{
            if(!errorcrypt){
              if(resultscrypt){
                const userDataToken = 
                  {
                        id:userData.id,
                        firstName:userData.firstName,
                        lastName:userData.lastName,
                        email:userData.email,
                        phoneNumber:userData.phoneNumber,
                        balance:userData.balance,
                        pin:userData.pin
                      
                }
                  const token = this.generateAccessToken(userDataToken)
                  const refreshToken = this.generateRefreshToken(userDataToken)
                  const resultsResponse = {accessToken:token,refreshToken}
                  this.resultsTokens.push({
                    ...userDataToken,
                    refreshToken : refreshToken
                  })
                  console.log(this.resultsTokens)
                usersHelpers.response(res, resultsResponse, { status: 'Login Successful', statusCode: 200 }, null)
              }else{
                const error = new Error ('Email or password you entered is incorrect.')
                usersHelpers.response(res, null, { status: 'Auth failed', statusCode: 404 }, error.message)
              }
            }else{
             const error = new Error ('Email or password you entered is incorrect.')
             usersHelpers.response(res, null, { status: 'failed', statusCode: 404 }, error)
            }
          }))
        }
    })
    .catch(error=>{
      usersHelpers.response(res, null, { status: 'failed', statusCode: 300 }, error)
    })
  }
  userLogOut (req,res,next){
    if(this.resultsTokens.length !== 0){
      const filter = this.resultsTokens.filter((user)=>user.email !== req.user.email)
      this.resultsTokens = filter
      console.log(this.resultsTokens)
      usersHelpers.response(res, {message:`${req.user.firstName} has logged out`}, { status: 'succeed', statusCode: 200 }, null)
    }else{
      usersHelpers.response(res,null, { status: 'failed', statusCode: 404 }, {message:'forbidden'})
    }
  }
  generateAccessToken (userData) {
      return jwt.sign(
      userData,
      process.env.ACCESS_TOKEN,
      {
        expiresIn:'24h'
      })  
    }
  generateRefreshToken (userData) {
   return jwt.sign(userData,process.env.REFRESH_TOKEN)
  }
  newToken (req,res) {
    const refreshToken = req.body.token
    console.log(`
    ini refreshtoken --> ${this.resultsTokens}
    dan ini refresh request --> ${refreshToken}
    `);
    const checkRefreshToken = this.resultsTokens.find((x)=>{
      return x.refreshToken === refreshToken
    }) 
    if(refreshToken == null) return usersHelpers.response(res, null, { status: 'failed', statusCode: 401 }, {message:'token not exists'})
    if(checkRefreshToken){
      jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
        if(!err){
          console.log(`
          user --> ${user.firstName}
          `)
          usersModel.getDataToken(user.email)
          .then(results=>{
            const userData = results[0]
            const accessToken = this.generateAccessToken(userData)
            usersHelpers.response(res, {accessToken}, { status: 'Succeed', statusCode: 200 }, null)
          })
          .catch(errorDataToken=>{
            usersHelpers.response(res, null, { status: 'failed', statusCode: 401 }, errorDataToken)
          })
        }else{
          usersHelpers.response(res, null, { status: 'failed', statusCode: 401 }, {message:'token not exists'})
        }
      })
    }else{
    usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message:'token not match'})    }
  }
  insertUsers (req, res) {
    const {firstName, lastName, email, password, phoneNumber, pin } = req.body
    const id = uuidv4()
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if(hash){
            const data = {
              id,
              firstName,
              lastName,
              email,
              phoneNumber,
              password : hash,
              pin,
              balance: 0,
              createdAt: new Date(),
              updatedAt: null
            }
            usersModel.checkEmail(email)
            .then(results=>{
            if(results.length === 0){
              usersModel.insertUsers(data)
              .then(results => {
                usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
              })
              .catch(error => {
                usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
              })
            }else{
              const error = {message:'Sorry email already exist'}
              usersHelpers.response(res, null, { status: 'failed', statusCode: 409 }, error)
            }           
            })
            .catch(error=>{
              usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
            })
          }else{
            usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, err)
          }
      })
    })
  }
  updatePhoneNumber(req,res){
    const {phoneNumber=null} = req.body
    const id = req.params.idUser
    if(phoneNumber===null)return usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, error)
    usersModel.updatePhoneNumber(id,phoneNumber)
    .then(results=>{
      usersHelpers.response(res, results, { status: 'Succeed', statusCode: 200 }, null)
    })
    .catch(error=>{
      usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, error)
    })
  }
  updatePhoto(req,res) {
    console.log('masuk updapohti')
    const id = req.params.idUser
    const photo = `${process.env.BASE_URL}/upload/${req.file.filename}`
    if(!id||!photo)return usersHelpers.response(res, null, { status: 'failed', statusCode: 403 }, {message:'Sorry id or image not found'})
    usersModel.updatePhoto(id,photo)
    .then(results=>{
      usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 },null)
    })
    .catch(()=>{
      usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, {message:'Something error in server'})
    })
  }
  updateUsers (req, res) {
    const { firstName = null, lastName = null, email = null, password = '', phoneNumber = '', pin = '' } = req.body
    const idUser = req.params.idUser  
    const data = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      pin,
      updatedAt: new Date()
    }
    usersModel.updateUsers(idUser, data)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  deleteUsers (req, res) {
    const idUser = req.params.idUser
    usersModel.deleteUsers(idUser)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }
}
const Users = new Controllers()
module.exports = Users
