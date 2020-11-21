const transfersModel = require('../models/transfersModel')
const transfersHelpers = require('../helpers/transfersHelpers')

class Controller {
  getTransfers (req, res) {
    transfersModel.getTransfers()
      .then(results => {
        transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getTransferById (req, res) {
    const idTransfer = req.params.idTransfer
    transfersModel.getTransferById(idTransfer)
      .then(results => {
        transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  insertTransfers (req, res) {
    const { idSender, idReceiver, amount, notes = '' } = req.body
    const data = {
      idSender,
      idReceiver,
      amount,
      notes,
      transferDate: new Date()
    }
    transfersModel.insertTransfers(data)
      .then(results => {
        transfersHelpers.response(res, results, { status: 'transfer succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'transfer failed', statusCode: 500 }, error.message)
      })
  }

  getTransactionByNameAndType (req, res, next) {
    const { firstName, type = 'all',limit='10' } = req.query
    console.log(`
    --> ${limit}
    --> ${type}
    `)
    if (type === 'transfers') {
      transfersModel.getTransactionTransfers(firstName,limit)
        .then(results => {
          if (results.length === 0) {
            const error = new Error(`Data Transfer User with firstName :${firstName} not Found..`)
            error.statusCode = 500
            error.status = 'failed'
            next(error)
          } else {
            transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
          }
        })
        .catch(error => {
          transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error.message)
        })
    } else if (type === 'receiver') {
      transfersModel.getTransactionReceiver(firstName, limit)
        .then(results => {
          if (results.length === 0) {
            const error = new Error(`Data Transfer User with firstName :${firstName} not Found..`)
            error.statusCode = 500
            error.status = 'failed'
            next(error)
          } else {
            transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
          }
        })
        .catch(error => {
          transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error.message)
        })
    } else if (type === 'all') {

    }
  }

  deleteTransfers (req, res) {
    const idTransfer = req.params.idTransfer
    transfersModel.deleteTransfers(idTransfer)
      .then(results => {
        transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }
}
const Transfers = new Controller()
module.exports = Transfers
