const express = require('express')
const router = express.Router()
const topUpController = require('../controllers/topUpController')
const { getTopUp,getTopUpById, getTopUpByFirstName ,deleteTopUp, insertTopUp } = topUpController
router
  .get('/', getTopUp)
  .get('/search', getTopUpByFirstName)
  .get('/:idTopUp',getTopUpById)
  .delete('/:idTopUp',deleteTopUp)
  .post('/',insertTopUp)
module.exports = router
