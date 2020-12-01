const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const authorization = require('../middleware/authorization')
const transfersController = require('../controllers/transfersController')
// desctructuring class
const { getTransfers, getTransferById, insertTransfers, getTransactionByNameAndType, deleteTransfers } = transfersController
router
  .get('/',authenticateToken,authorization, getTransfers)
  .get('/search',authenticateToken, getTransactionByNameAndType)
  .get('/:idTransfer',authenticateToken, getTransferById)
  .post('/',authenticateToken, insertTransfers)
  .delete('/:idTransfer',authenticateToken, deleteTransfers)
module.exports = router
