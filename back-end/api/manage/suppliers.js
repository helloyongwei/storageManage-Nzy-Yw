/**
 * @module 处理 supplier 相关请求
 */
const router = require('express').Router()
const supplierSql = require('../../sql/suppliers')
const errMsg = require('../../static/errMsg')

router.get('/', (req, res) => {
  const offset = req.query.offset
  const limit = req.query.limit
  supplierSql.selectSuppliers(offset, limit)
    .then(suppliers => {
      res.status(200).json({suppliers: suppliers})
    })
    .catch(e => {
      res.status(500).json({error: JSON.parse(e)})
    })
})

router.post('/', (req, res) => {
  const newSupplier = req.body.supplier
  console.log(req.body)
  if (!newSupplier || !newSupplier.name || !newSupplier.tel || !newSupplier.address) {
    res.status(403).json({error: errMsg.errPostDataInvalid})
    return
  }
  supplierSql.insertSuppliers(newSupplier)
    .then(newSupplier => {
      res.status(201).json({supplier: newSupplier})
    })
    .catch(err => {
      res.status(500).json({error: JSON.parse(err)})
    })
})

module.exports = router
