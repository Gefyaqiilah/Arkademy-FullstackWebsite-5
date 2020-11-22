const topUpModel = require('../models/topUpModel')
const topUpHelpers = require('../helpers/topUpHelpers')

class Controller {
  getTopUp (req, res) {
    topUpModel.getTopUp()
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
    const { firstName, limit = 10 } = req.query
    console.log(`
    firstName --> ${firstName}
    limit --> ${limit}
    `)
    topUpModel.getTopUpByFirstName(firstName, limit)
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
