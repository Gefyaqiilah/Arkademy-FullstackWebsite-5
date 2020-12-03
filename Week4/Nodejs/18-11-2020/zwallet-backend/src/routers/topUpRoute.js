const express = require('express')
const router = express.Router()
const topUpController = require('../controllers/topUpController')
const authenticateToken = require('../middleware/authenticateToken')
const authorization = require('../middleware/authorization')
const {
  getTopUp,
  getTopUpById,
  getTopUpByFirstName,
  deleteTopUp,
  insertTopUp
} = topUpController
router
  .get('/', getTopUp)
  .get('/search', getTopUpByFirstName)
  .get('/:idTopUp', getTopUpById)
  .delete('/:idTopUp', deleteTopUp)
  .post('/', insertTopUp)
module.exports = router