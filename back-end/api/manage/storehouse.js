const router = require('express').Router()
const storeHouseSql = require('../../sql/storehouse')
const errMsg = require('../../static/errMsg')

router.get('/', (req, res) => {
  const offset = req.query.offset
  const limit = req.query.limit
  storeHouseSql.selectStorehouses(offset, limit)
    .then(storehouses => {
      res.status(200).json({storehouses: storehouses})
    })
    .catch(e => {
      res.status(500).json({error: JSON.parse(e)})
    })
})

router.post('/', (req, res) => {
  const newStorehouse = req.body.storehouse
  if (!newStorehouse || !newStorehouse.name || !newStorehouse.location || !newStorehouse.size) {
    res.status(403).json({error: errMsg.errPostDataInvalid})
  }
  if (!/(平方米)$/.test(newStorehouse.size)) {
    newStorehouse.size = newStorehouse.size + '平方米'
  }
  storeHouseSql.insertStorehouse(newStorehouse)
    .then(storehouse => {
      res.status(201).json({storehouse: storehouse})
    })
    .catch(err => {
      res.status(500).json({error: JSON.parse(err)})
    })
})

module.exports = router
