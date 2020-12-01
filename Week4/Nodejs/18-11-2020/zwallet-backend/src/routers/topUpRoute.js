const express = require('express')
const router = express.Router()
const topUpController = require('../controllers/topUpController')
const authenticateToken = require('../middleware/authenticateToken')
const authorization = require('../middleware/authorization')
const { getTopUp, getTopUpById, getTopUpByFirstName, deleteTopUp, insertTopUp } = topUpController
router
  .get('/',authenticateToken,authorization, getTopUp)
  .get('/search',authenticateToken, getTopUpByFirstName)
  .get('/:idTopUp',authenticateToken, getTopUpById)
  .delete('/:idTopUp',authenticateToken, deleteTopUp)
  .post('/', insertTopUp)
module.exports = router
