const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const redis = require('redis')

const app = express()
const redisClient = redis.createClient()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

const apiAuthRoute = require('./api/auth')
const apiManageRoute = require('./api/manage/index')
app.use('/api/v1/auth', apiAuthRoute)
app.use('/api/v1/manage', apiManageRoute)

/*
app.get('/api/v1/test', (req, res) => {
  const test = req.cookies['test']
  if (test) {
    redisClient.set('test', test + 'test', (err, reply) => {
      if (err) res.status(500).json({error: 'redis err'})
      res.status(200).json({ok: reply})
    })
  } else {
    
    res.cookie('test', 'test').status(200).json({msg: 'init'})
  }
})
*/

module.exports = app
