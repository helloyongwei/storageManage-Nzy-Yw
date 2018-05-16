/**
 * @module 权限api部分的 util function
 */
const errMsg = require('../static/errMsg')
const userSql = require('../sql/user')

function checkUser (email, password) {
  return new Promise((resolve, reject) => {
    userSql.selectUserByEmail(email)
      .then(user => {
        console.log(user)
        if (user.length === 0) {
          reject(new Error(JSON.stringify(errMsg.errNoSuchUser)))
        } else if (user[0].password === password) {
          resolve(user[0])
        } else {
          reject(new Error(JSON.stringify(errMsg.errInvalidPassword)))
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

function getUserById (id) {
  return new Promise((resolve, reject) => {
    userSql.selectUserById(id)
      .then(user => {
        if (user.length === 0) {
          reject(new Error(JSON.stringify(errMsg.errNoSuchUser)))
        } else {
          resolve(user[0])
        }
      })
      .catch(e => reject(e))
  })
}

module.exports = {
  checkUser,
  getUserById
}
