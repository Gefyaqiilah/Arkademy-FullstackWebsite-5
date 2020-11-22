const connection = require('../configs/db')
class Models {
  getUsers () {
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

  getUsersById (id) {
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

  getUsersByNameAndPhoneNumber (firstName, phoneNumber) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE firstName LIKE ? AND phoneNumber LIKE ?`, [firstName, phoneNumber], (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }

  insertUsers (data) {
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

  updateUsers (id, data) {
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

  deleteUsers (id) {
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
