const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const usersHelpers = require('../helpers/usersHelpers')
const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

class Controllers {
  constructor() {
    this.resultsTokens = []
    this.userLogin = this.userLogin.bind(this)
    this.generateAccessToken = this.generateAccessToken.bind(this)
    this.generateRefreshToken = this.generateRefreshToken.bind(this)
    this.newToken = this.newToken.bind(this)
    this.userLogOut = this.userLogOut.bind(this)
  }
  getUsers(req, res,next) {
    const { page = 1, limit = 4, order = "ASC" } = req.query
    const offset = page ? (parseInt(page) - 1) * parseInt(limit) : 0
    usersModel.getUsers(limit, offset, order)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error)
      })
  }

  getUsersById(req, res, next) {
    const idUser = req.params.idUser
    usersModel.getUsersById(idUser)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `User with number ID:${idUser} not Found..`)
          next(error)
        } else {
          usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error)      
      })
  }

  getUsersByNameAndPhoneNumber(req, res, next) {
    const { firstName = '', phoneNumber = '' } = req.query

    usersModel.getUsersByNameAndPhoneNumber(firstName, phoneNumber)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `User with firstname : ${firstName} and phoneNumber : ${phoneNumber} not Found..`)
          next(error)
        } else {
          usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error)    
      })
  }
  userLogin(req, res, next) {
    const { email, password } = req.body

    usersModel.userLogin(email)
      .then(results => {
        if (results.length === 0) {
          const error = new createError(404, `Email or password you entered is incorrect.`)
          next(error)
        } else {
          const userData = results[0]
          bcrypt.compare(password, userData.password, ((errorcrypt, resultscrypt) => {
            if (!errorcrypt) {
              if (resultscrypt) {
                const userDataToken =
                {
                  id: userData.id,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                  phoneNumber: userData.phoneNumber,
                  balance: userData.balance,
                  pin: userData.pin

                }
                const token = this.generateAccessToken(userDataToken)
                const refreshToken = this.generateRefreshToken(userDataToken)
                const tokenResponse = { accessToken: token, refreshToken }

                this.resultsTokens.push({
                  ...userDataToken,
                  refreshToken: refreshToken
                })

                usersHelpers.response(res, tokenResponse, { status: 'Login Successful', statusCode: 200 }, null)
              } else {
                const error = new createError(404, `Email or password you entered is incorrect.`)
                next(error)
              }
            } else {
              const error = new createError(404, `Email or password you entered is incorrect.`)
              next(error)
            }
          }))
        }
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error)
      })
  }
  userLogOut(req, res, next) {
    console.log(this.resultsTokens)
    console.log('controller')
    if(this.resultsTokens.length===0){
      const error = new createError(401, `Forbidden`)
      next(error)   
    }
      const filter = this.resultsTokens.filter((user) => user.email !== req.user.email)
      this.resultsTokens = filter
      usersHelpers.response(res, { message: `${req.user.firstName} has logged out` }, { status: 'succeed', statusCode: 200 }, null)
  }
  generateAccessToken(userData) {
    return jwt.sign(
      userData,
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '24h'
      })
  }

  generateRefreshToken(userData) {
    return jwt.sign(userData, process.env.REFRESH_TOKEN)
  }

  newToken(req, res, next) {
    const refreshToken = req.body.token
    
    if (!refreshToken){
      const error = new createError(500, `Forbidden: tokens cannot be empty`)
      next(error)
    }

    const checkRefreshToken = this.resultsTokens.find((x) => {
      return x.refreshToken === refreshToken
    })

    if(!checkRefreshToken){
      const error = new createError(401, `Forbidden: you are not logged in`)
      next(error)
    }

    if (checkRefreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if(err){
          const error = new createError(500, `Invalid token`)
          next(error)     
        }

        usersModel.getDataToken(user.email)
          .then(results => {
            const userData = results[0]
            const accessToken = this.generateAccessToken(userData)
            usersHelpers.response(res, { accessToken }, { status: 'Succeed', statusCode: 200 }, null)
          })
          .catch(() => {
            const error = new createError(500, `Looks like server having trouble`)
            next(error)  
         })
      })
    }
    
  }
  insertUsers(req, res) {
    const { firstName, lastName, email, password, phoneNumber, pin } = req.body
    if(!firstName||!email||!password){
      const error = new createError(400, `firstName, email and password cannot be empty`)
      next(error)   
    }

    const id = uuidv4()

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if(!hash){
          const error = new createError(500, `Invalid password`)
          next(error) 
        }

        const data = {
          id,
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hash,
          pin,
          balance: 0,
          createdAt: new Date(),
          updatedAt: null
        }

        usersModel.checkEmail(email)
          .then(results => {
            if(results.length > 0){
              const error = new createError(409, `Forbidden: Email already exists. `)
              next(error)   
            }
            usersModel.insertUsers(data)
              .then(results => {
                usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
              })
              .catch(() => {
                const error = new createError(500, `Looks like server having trouble`)
                next(error)   
              })
          })
          .catch(() => {
            const error = new createError(500, `Looks like server having trouble`)
            next(error) 
          }) 
      })
    })
  }

  updatePhoneNumber(req, res) {
    const { phoneNumber = null } = req.body
    const id = req.params.idUser
    if(!id||!phoneNumber){
      const error = new createError(400, `Forbidden: Id or phone number cannot be empty`)
      next(error) 
    }

    usersModel.updatePhoneNumber(id, phoneNumber)
      .then(results => {
        usersHelpers.response(res, results, { status: 'Succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error) 
      })
  }
  updatePhoto(req, res) {
    const id = req.params.idUser
    const photo = `${process.env.BASE_URL}/upload/${req.file.filename}`
    
    if (!id || !req.file.filename){
      const error = new createError(400, `Forbidden: Id or Photo cannot be empty`)
      next(error) 
    }  
    usersModel.updatePhoto(id, photo)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error) 
      })
  }
  updateUsers(req, res,next) {
    const idUser = req.params.idUser
    if(Object.keys(req.body).length === 0) {
      const error = new createError(400, `Forbidden: Nothing to update`)
      next(error) 
    }

    const data = {
      ...req.body,
      updatedAt: new Date()
    }

    usersModel.updateUsers(idUser, data)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(() => {
        const error = new createError(500, `Looks like server having trouble`)
        next(error) 
      })
  }

  deleteUsers(req, res) {
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
