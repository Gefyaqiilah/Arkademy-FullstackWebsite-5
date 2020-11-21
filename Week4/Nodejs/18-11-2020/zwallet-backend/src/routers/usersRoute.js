const express = require('express')
const router  = express.Router()

const usersController = require('../controllers/usersController')
// desctructuring method from class usersController
const { getUsers, getUsersByNameAndPhoneNumber, getUsersById, insertUsers, updateUsers, deleteUsers } = usersController

router
  .get('/', getUsers)
  .get('/search', getUsersByNameAndPhoneNumber)
  .get('/:idUser', getUsersById)
  .post('/', insertUsers)
  .patch('/:idUser', updateUsers)
  .delete('/:idUser', deleteUsers)

module.exports = router
