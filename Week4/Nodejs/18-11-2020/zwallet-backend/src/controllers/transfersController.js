const {v4:uuidv4} = require('uuid')
const createError = require('http-errors')
const transfersModel = require('../models/transfersModel')
const transfersHelpers = require('../helpers/transfersHelpers')

class Controller {
  getTransfers (req, res) {
    const {page = 1,limit = 2,order = "DESC"}=req.query
    const ordered = order.toUpperCase()
    const offset = page ? (parseInt(page)-1) * parseInt(limit) : 0;

    transfersModel.getTransfers(limit,offset,ordered)
      .then(results => {
        transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  getTransferById (req, res, next) {
    const idTransfer = req.params.idTransfer
    transfersModel.getTransferById(idTransfer)
      .then(results => {
        console.log(results)
        if (results.length === 0) {
          const error = new Error(`Data Transfer User with ID :${idTransfer} not Found..`)
          error.statusCode = 500
          error.status = 'failed'
          return next(error)
        } else {
          transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
        }
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error)
      })
  }

  insertTransfers (req, res) {
    const { idSender, idReceiver, amount, notes = '' } = req.body
    const idTransfer = uuidv4()
    const data = {
      idTransfer,
      idSender,
      idReceiver,
      amount,
      notes,
      transferDate: new Date()
    }
    transfersModel.insertTransfers(data)
      .then(results => {
        transfersHelpers.response(res, {message:'transfer successfully'}, { status: 'transfer succeed', statusCode: 200 }, null)
      })
      .catch(error => {
        transfersHelpers.response(res, null, { status: 'transfer failed', statusCode: 500 }, error.message)
      })
  }

  getTransactionByNameAndType (req, res, next) {
    const { firstName, type = 'transfers',page=1, limit = '2',order = "DESC" } = req.query
    const offset = page ? (parseInt(page)-1)*parseInt(limit) : 0;
    const ordered = order.toUpperCase()
    if (type === 'transfers') {
      transfersModel.getTransactionTransfers(firstName, limit,offset,ordered)
        .then(results => {
          if (results.length === 0) {
            const error = new createError(204,`Data not found`)
            return next(error)
          } else {
            transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
          }
        })
        .catch(error => {
          transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error.message)
        })
    } else if (type === 'receiver') {
      transfersModel.getTransactionReceiver(firstName, limit,offset,ordered)
        .then(results => {
          if (results.length === 0) {
            const error = new Error(`Data Transfer User with firstName :${firstName} not Found..`)
            error.statusCode = 500
            error.status = 'failed'
            return next(error)
          } else {
            transfersHelpers.response(res, results, { status: 'succeed', statusCode: 200 }, null)
          }
        })
        .catch(error => {
          transfersHelpers.response(res, null, { status: 'failed', statusCode: 500 }, error.message)
        })
    } else {
      const error = new Error(`data type ${type} not found ..`)
      error.statusCode = 500
      error.status = 'failed'
      return next(error)
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
