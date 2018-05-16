/**
 * @module 处理 material 相关请求
 */
const router = require('express').Router()
const materialSql = require('../../sql/material')
const errMsg = require('../../static/errMsg')

router.get('/', (req, res) => {
  const offset = req.query.offset
  const limit = req.query.limit
  materialSql.selectMaterials(offset, limit)
    .then(materials => {
      res.status(200).json({materials: materials})
    })
    .catch(e => {
      res.status(500).json({error: JSON.parse(e)})
    })
})

router.post('/', (req, res) => {
  const newMaterial = req.body.material
  if (!newMaterial || !newMaterial.name || !newMaterial.description) {
    res.status(403).json({error: errMsg.errPostDataInvalid})
    return
  }
  materialSql.insertMaterial(newMaterial)
    .then(newMaterial => {
      res.status(201).json({material: newMaterial})
    })
    .catch(err => {
      res.status(500).json({error: JSON.parse(err)})
    })
})

module.exports = router
