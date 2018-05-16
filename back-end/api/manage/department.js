const router = require('express').Router()
const departmentSql = require('../../sql/departments')
const errMsg = require('../../static/errMsg')

router.get('/', (req, res) => {
  const offset = req.query.offset
  const limit = req.query.limit
  departmentSql.selectDepartments(offset, limit)
    .then(departments => {
      res.status(200).json({departments: departments})
    })
    .catch(err => {
      res.status(500).json({error: JSON.parse(err)})
    })
})

router.post('/', (req, res) => {
  const newDepartment = req.body.department
  if (!newDepartment || !newDepartment.name) {
    res.status(403).json({error: errMsg.errPostDataInvalid})
  }
  departmentSql.insertDepartment(newDepartment.name)
    .then(newDepartment => {
      res.status(201).json({department: newDepartment})
    })
    .catch(err => {
      res.status(500).json({error: JSON.parse(err)})
    })
})

module.exports = router
