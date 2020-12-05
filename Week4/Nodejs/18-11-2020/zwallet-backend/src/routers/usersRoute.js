const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const emailController = require('../controllers/emailController')
const authenticateToken = require('../middleware/authenticateToken')
const authorization = require('../middleware/authorization')
const {uploadMulter} = require('../middleware/uploadImage')

const {
  getUsers,
  getUsersByNameAndPhoneNumber,
  updatePhoto,
  getUsersById,
  insertUsers,
  updateUsers,
  deleteUsers,
  userLogin,
  newToken,
  userLogOut,
  insertPhoto
} = usersController
const {
  sendEmailVerification
} = emailController
router
  .get('/', getUsers)
  .get('/search', getUsersByNameAndPhoneNumber)
  .post('/token', newToken)
  .get('/:idUser', getUsersById)
  .post('/', insertUsers)
  .post('/login', userLogin)
  .post('/logout', authenticateToken, userLogOut)
  .patch('/:idUser', updateUsers)
  .post('/email',sendEmailVerification)
  .post('/photo', uploadMulter.single('photo'),insertPhoto)
  .patch('/photo/:idUser', uploadMulter.single('photo'), updatePhoto)
  .delete('/:idUser', deleteUsers)

module.exports = router