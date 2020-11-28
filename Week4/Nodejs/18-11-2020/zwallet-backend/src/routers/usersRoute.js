const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
// desctructuring method from class usersController
const { getUsers, getUsersByNameAndPhoneNumber, getUsersById, insertUsers, updateUsers, deleteUsers, userLogin, newToken } = usersController

router
  .get('/', getUsers)
  .get('/search', getUsersByNameAndPhoneNumber)
  .get('/:idUser', getUsersById)
  .post('/token',newToken)
  .post('/', insertUsers)
  .post('/login', userLogin)
  .patch('/:idUser', updateUsers)
  .delete('/:idUser', deleteUsers)

module.exports = router
