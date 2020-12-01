const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const authenticateToken = require('../middleware/authenticateToken')
const authorization = require('../middleware/authorization')
const {uploadMulter} = require('../middleware/uploadImage')
const { getUsers, getUsersByNameAndPhoneNumber,updatePhoneNumber, updatePhoto, getUsersById, insertUsers, updateUsers, deleteUsers, userLogin, newToken,userLogOut } = usersController

router
  .get('/',authenticateToken,authorization, getUsers)
  .get('/search',authenticateToken, getUsersByNameAndPhoneNumber)
  .get('/:idUser',authenticateToken, getUsersById)
  .post('/token',newToken)
  .post('/', insertUsers)
  .post('/login', userLogin)
  .post('/logout',authenticateToken ,userLogOut)
  .patch('/:idUser',authenticateToken, updatePhoneNumber)
  .patch('/photo/:idUser',authenticateToken,uploadMulter.single('photo'), updatePhoto)
  .delete('/:idUser',authenticateToken, deleteUsers)

module.exports = router
