const usersHelpers = require('../helpers/usersHelpers')
const usersModel = require('../models/usersModel')

class Controllers {
  getUsers (req, res) {
    const {page = 1,limit=4,order="DESC"} = req.query
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

  insertUsers (req, res) {
    const { firstName, lastName, email, password, phoneNumber, pin } = req.body
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      pin,
      balance: 0,
      createdAt: new Date(),
      updatedAt: null
    }
    usersModel.checkFirstNameAndEmail(firstName,email)
    .then(()=>{
      usersModel.insertUsers(data)
      .then(results => {
        usersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        usersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
    })
    .catch(error=>{
      usersHelpers.response(res, null, { status: 'failed', statusCode: 400 }, error)
    })
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
