const connection = require('../configs/db')
class Models {
  getUser () {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getUserById (id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  getUserByNameAndPhoneNumber (firstName, phoneNumber) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE firstName LIKE ? AND phoneNumber LIKE ?', [firstName, phoneNumber], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  insertUser (data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  updateUser (id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  deleteUser (id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
const Users = new Models()
module.exports = Users
