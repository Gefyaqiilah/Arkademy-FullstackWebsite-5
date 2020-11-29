const bcrypt = require('bcrypt')

const usersHelpers = require('../helpers/usersHelpers')
const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')
class Controllers {
  constructor() {
    this.resultsTokens = []
    this.userLogin = this.userLogin.bind(this)
    this.generateAccessToken = this.generateAccessToken.bind(this)
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
    usersModel.userLogin(email)
    .then(results=>{
        if(results.length === 0){
          const error = new Error ('Email or password you entered is incorrect.')
          usersHelpers.response(res, null, { status: 'failed', statusCode: 404 }, error)
        }else{
          const userData = JSON.parse(JSON.stringify(results[0]))
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
                  const refreshToken = jwt.sign(userDataToken,process.env.REFRESH_TOKEN)
                  const resultsResponse = {accessToken:token,refreshToken}
                  this.resultsTokens.push({
                    ...userDataToken,
                    refreshToken : refreshToken
                  })
                  console.log(this.resultsTokens)
                usersHelpers.response(res, resultsResponse, { status: 'Auth Successful', statusCode: 200 }, null)
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
    console.log(this.resultsTokens.length)
    if(this.resultsTokens.length !== 0){
      const filter = this.resultsTokens.filter((user)=>user.email !== req.user.email)
      this.resultsTokens = filter
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
        expiresIn:'1h'
      })  
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
            const userData = JSON.parse(JSON.stringify(results[0]))
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
    const { firstName, lastName, email, password, phoneNumber, pin } = req.body
    bcrypt.hash(password, 10, function(err, hash) {
        if(hash){
          const data = {
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
          usersModel.checkFirstNameAndEmail(firstName,email)
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
            const errorMessage = new Error ('username or email are already used by other users')
            usersHelpers.response(res, null, { status: 'failed', statusCode: 409 }, errorMessage)
          }           
          })
          .catch(error=>{
            usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
          })
        }else{
          usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
        }
    });
  }
  updateUsers (req, res) {
    const { firstName = '', lastName = '', email = '', password = '', phoneNumber = '', pin = '' } = req.body
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
