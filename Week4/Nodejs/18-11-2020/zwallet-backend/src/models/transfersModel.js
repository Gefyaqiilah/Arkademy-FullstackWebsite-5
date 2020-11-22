const connection = require('../configs/db')

class Models {
  getTransfers () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transfers ORDER BY transferDate DESC', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getTransferById (idTransfer) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transfers WHERE idTransfer = ? ', idTransfer, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  insertTransfers (data) {
    return new Promise((resolve, reject) => {
      // get balance user sender
      connection.query('SELECT balance FROM users WHERE id = ?', data.idSender, (errorSender, resultsSender) => {
        if (resultsSender.length !== 0) {
          const senderBalance = JSON.parse(JSON.stringify(resultsSender[0]))
          console.log(senderBalance.balance)
          if (senderBalance.balance - data.amount >= 0) {
          // get balance user receiver
            connection.query('SELECT balance FROM users WHERE id = ?', data.idReceiver, (errorReceiver, resultsReceiver) => {
              if (resultsReceiver.length !== 0) {
                const receiverBalance = JSON.parse(JSON.stringify(resultsReceiver[0]))
                const amount = parseInt(data.amount) + parseInt(receiverBalance.balance)
                // update for add up balance receiver
                connection.query('UPDATE users SET balance = ? WHERE id = ?', [amount, data.idReceiver], (errorUpdateBalance, resultsUpdateBalance) => {
                  if (!errorUpdateBalance) {
                    // update for reduce balance sender
                    const reduceBalanceSender = parseInt(senderBalance.balance) - parseInt(data.amount)
                    connection.query('UPDATE users SET balance = ? WHERE id = ?', [reduceBalanceSender, data.idSender], (errorReduceBalanceSender, resultsReduceBalanceSender) => {
                      if (!errorReduceBalanceSender) {
                        // add transfer transaction to table transfer
                        connection.query('INSERT INTO transfers SET ?', data, (errorAddTransfer, resultsAddTransfer) => {
                          resolve(resultsAddTransfer)
                        })
                      } else {
                        reject(errorReduceBalanceSender)
                      }
                    })
                  } else {
                    reject(errorUpdateBalance)
                  }
                })
              } else {
                reject(new Error('ID Receiver not found'))
              }
            })
          } else {
            reject(new Error('Sender Balance is not enough for transfer'))
          }
        } else {
          reject(new Error('ID Sender not found'))
        }
      })
    })
  }

  getTransactionTransfers (firstName, limit) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT users.firstName AS Sender,transfers.idReceiver,transfers.amount,transfers.transferDate,transfers.notes FROM users INNER JOIN transfers ON users.id = transfers.idSender AND users.firstName = ? ORDER BY transfers.transferDate DESC LIMIT ${limit}`, [firstName], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getTransactionReceiver (firstName, limit) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT transfers.idSender AS IDSender,users.firstName AS receiver,transfers.amount,transfers.transferDate,transfers.notes FROM users INNER JOIN transfers ON users.id = transfers.idReceiver AND users.firstName = ? ORDER BY transfers.transferDate DESC LIMIT ${limit}`, firstName, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  deleteTransfers (idTopUp) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transfers WHERE idTransfer = ?', idTopUp, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

const Transfers = new Models()
module.exports = Transfers
