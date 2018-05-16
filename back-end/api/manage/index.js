const express = require('express')
const router = express.Router()
const jwtToken = require('../../static/jwtToken')
const jwt = require('jsonwebtoken')
const errMsg = require('../../static/errMsg')
const api = require('./manage-api-list')

const supplierApi = require('./suppliers')
const materialApi = require('./material')
const storehouseApi = require('./storehouse')
const departmentApi = require('./department')

/**
 * 权限验证
 */
router.use((req, res, next) => {
  const token = req.cookies[jwtToken.tokenCookieName]
  if (!token) {
    res.status(403).json({error: errMsg.errNotLogin})
    return
  }
  jwt.verify(token, jwtToken.secretToken, (err, decode) => {
    if (err) {
      res.status(403).json({error: errMsg.errTokenExpired})
      return
    }
    req.body.user_id = decode.id
    next()
  })
})

router.use(api.suppliersUrl, supplierApi)
router.use(api.materialsUrl, materialApi)
router.use(api.storehousesUrl, storehouseApi)
router.use(api.departmentsUrl, departmentApi)

module.exports = router
