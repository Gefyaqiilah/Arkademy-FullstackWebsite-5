const topUpModel = require('../models/topUpModel')
const topUpHelpers = require('../helpers/topUpHelpers')

class Controller {
  getTopUp (req, res) {
    const {page = 1,limit = 2,order = "DESC"}=req.query
    const ordered = order.toUpperCase()
    const offset = page ? (parseInt(page)-1) * parseInt(limit) : 0;
    topUpModel.getTopUp(limit,offset,ordered)
      .then(results => {
        topUpHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        topUpHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getTopUpById (req, res) {
    const idTopUp = req.params.idTopUp
    topUpModel.getTopUpById(idTopUp)
      .then(results => {
        topUpHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        topUpHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getTopUpByFirstName (req, res, next) {
    const { firstName,page = 1, limit = 2,order="DESC" } = req.query
    console.log(`
    firstName --> ${firstName}
    limit --> ${limit}
    `)
    const ordered = order.toUpperCase()

    const offset = page ? (parseInt(page)-1) * parseInt(limit) : 0;
    topUpModel.getTopUpByFirstName(firstName, limit,offset,ordered)
      .then(results => {
        if (results.length === 0) {
          const error = new Error(`Data TopUp User with firstName :${firstName} not Found..`)
          error.statusCode = 500
          error.status = 'failed'
          next(error)
        } else {
          topUpHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(error => {
        topUpHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  insertTopUp (req, res) {
    const { idReceiver, senderName = '', amount, notes = '' } = req.body
    console.log(idReceiver)
    const data = {
      idReceiver,
      senderName,
      amount,
      notes,
      topUpDate: new Date()
    }
    topUpModel.insertTopUp(data)
      .then(results => {
        topUpHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        topUpHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  deleteTopUp (req, res) {
    const idTopUp = req.params.idTopUp
    console.log(idTopUp)
    topUpModel.deleteTopUp(idTopUp)
      .then(results => {
        topUpHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        topUpHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }
}
const TopUp = new Controller()
module.exports = TopUp
