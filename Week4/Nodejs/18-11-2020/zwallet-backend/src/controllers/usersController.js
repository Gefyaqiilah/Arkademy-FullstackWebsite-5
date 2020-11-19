const usersHelpers = require('../helpers/usersHelpers')
const usersModel = require('../models/usersModel')

class Controllers {
  getUsers (req, res) {
    usersModel.getUser()
      .then(results => {
        usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
      })
      .catch(error => {
        usersHelpers.response(res, null,{status:'failed',statusCode:500}, error)
      })
  }

  getUsersById (req, res) {
    const idUser = req.params.idUser
    usersModel.getUserById(idUser)
      .then(results => {
        console.log(results.length);
        if(results.length > 0){
          usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
        }else{
          usersHelpers.response(res, results, {status:'failed',statusCode:500}, {message:`Sorry User with number ID:${idUser} Not Found`})
        }
      })
      .catch(error => {
        usersHelpers.response(res, null,{status:'failed',statusCode:500}, error)
      })
  }

  getUsersByNameAndPhoneNumber (req,res){
    const {firstName = "",phoneNumber = ""} = req.query
    console.log(`
    name --> ${firstName}
    phone --> ${phoneNumber}
    `);
    usersModel.getUserByNameAndPhoneNumber(firstName,phoneNumber)
    .then(results=>{
      usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
    })
    .catch(error=>{
      usersHelpers.response(res, null,{status:'failed',statusCode:500}, error)
    })
  }

  insertUsers (req, res) {
    const { firstName, lastName, email, password, phoneNumber, balance, pin } = req.body
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      pin,
      balance
    }
    usersModel.insertUser(data)
      .then(results => {
        usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
      })
      .catch(error => {
        usersHelpers.response(res, results,{status:'failed',statusCode:500}, error)
      })
  }

  updateUsers (req, res) {
    const { firstName = '', lastName = '', email = '', password = '', phoneNumber = '', balance = 0, pin = '' } = req.body
    const idUser = req.params.idUser
    const data = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      balance,
      pin
    }
    usersModel.updateUser(idUser, data)
      .then(results => {
        usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
      })
      .catch(error => {
        usersHelpers.response(res, results,{status:'failed',statusCode:500}, error)
      })
  }

  deleteUsers (req, res) {
    const idUser = req.params.idUser
    usersModel.deleteUser(idUser)
      .then(results => {
        usersHelpers.response(res, results,{status:'succeed',statusCode:200}, null)
      })
      .catch(error => {
        usersHelpers.response(res, results,{status:'failed',statusCode:500}, error)
      })
  }
}
const Users = new Controllers()
module.exports = Users
