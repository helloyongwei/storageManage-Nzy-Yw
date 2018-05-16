/**
 * @module 连接数据库的模块
 */
const config = require('../config/db-config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.databaseName, config.user, config.password, {
  host: config.host,
  dialect: config.databaseType,
  pool: config.poolConfig
})
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
  */

module.exports = sequelize
