/**
 * @module  用户处理sql
 */
const sequelize = require('./sequelize')
const errMsg = require('../static/errMsg')
const consoleUtil = require('../util/console')

const authLevelList = ['admin', 'manager']

const selectSql = 'SELECT * FROM user LIMIT :offset, :limit'
const defaultOffset = 0
const defaultLength = 5

const selectByIdSql = 'SELECT * FROM user WHERE user_id=:id'
const selectByEmailSql = 'SELECT * FROM user WHERE email=:email'

const insertSql = 'INSERT INTO user (name, password, email, authLevel) VALUES (:name, :password, :email, :authLevel)'

module.exports = {
  selectUsers,
  selectUserById,
  selectUserByEmail,
  insertUser
}

/**
 * 获取用户信息
 * @param {number|string} offset 起点
 * @param {number|string} limit 长度
 * @return {Promise}
 * @example
 * [ { user_id: 1,name: 'admin', password: 'aaa',email: 'aaa@aaa.com',authLevel: 'admin' },
 *  {...}]
 */
function selectUsers (offset, limit) {
  offset = offset || defaultOffset
  limit = limit || defaultLength
  offset -= 0
  limit -= 0

  return new Promise((resolve, reject) => {
    sequelize.query(selectSql, {
      replacements: {offset, limit},
      type: sequelize.QueryTypes.SELECT
    }).then(users => {
      resolve(users)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定id用户
 * @param {number|string} id user的id
 * @returns {Promise}
 * @example [ { user_id: 1,name: 'admin',password: 'aaa',email: 'aaa@aaa.com',authLevel: 'admin' }]
 */
function selectUserById (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByIdSql, {
      replacements: {id},
      type: sequelize.QueryTypes.SELECT
    }).then(user => {
      resolve(user)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定email用户
 * @param {string} email user的email
 * @returns {Promise}
 * @example [ { user_id: 1,name: 'admin',password: 'aaa',email: 'aaa@aaa.com',authLevel: 'admin' }]
 */
function selectUserByEmail (email) {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByEmailSql, {
      replacements: {email},
      type: sequelize.QueryTypes.SELECT
    }).then(user => {
      resolve(user)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 插入一个user
 * @param {Object} user - 新user
 * @param {string} user.name - 名称
 * @param {string} user.password - 密码
 * @param {string} user.email - 邮箱 不能重复
 * @param {string} user.authLevel - 等级 ['admin', 'manager']
 * @returns {Promise} 返回[a,b] a--id b--count
 */
function insertUser (user) {
  return new Promise((resolve, reject) => {
    if (!user || !user.name || !user.password || !user.email || !user.authLevel) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    if (authLevelList.indexOf(user.authLevel) === -1) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertUserErrAuthLevel)))
      return
    }
    selectUserByEmail(user.email)
      .then(result => {
        if (result.length !== 0) {
          reject(new Error(JSON.stringify(errMsg.errSqlInsertUserEmailAlreadyExists)))
          return
        }
        sequelize.query(insertSql, {
          replacements: {name: user.name, password: user.password, email: user.email, authLevel: user.authLevel},
          type: sequelize.QueryTypes.INSERT
        })
      })
      .then(newUser => {
        resolve(newUser)
      })
      .catch(err => {
        consoleUtil.consoleError(err)
        reject(new Error(JSON.stringify(errMsg.errSqlSystemError)))
      })
  })
}
