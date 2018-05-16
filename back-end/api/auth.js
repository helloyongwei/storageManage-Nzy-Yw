const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const redisClient = require('redis').createClient()
const errMsg = require('../static/errMsg')
const authUtil = require('../util/authUtil')
const jwtToken = require('../static/jwtToken')

/**
 * 接受用户登录的post请求
 * api: /api/v1/auth/login
 */
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let authToken = req.cookies[jwtToken.tokenCookieName]
  // 邮箱不能为空
  if (!email) {
    res.status(403).json({
      error: errMsg.errEmptyEmail
    }).end()
    return
  }
  // 密码不能为空
  if (!password) {
    res.status(403).json({
      error: errMsg.errEmptyPassword
    }).end()
    return
  }
  // 从数据库中查询信息
  authUtil.checkUser(email, password)
    // 如果成功找到
    .then(user => {
      user = Object.assign({}, user)
      delete user.password
      // 如果请求不带token，则初始化其为空
      if (!authToken) {
        authToken = ''
      }
      // 从redis中获取token
      redisClient.get(authToken, (err, reply) => {
        if (err) {
          res.status(500).json({error: errMsg.errServer})
          return
        }
        // 如果存在并且对应的value为该用户的id，则需要更新，先将其删去
        if (reply && reply === user.user_id) {
          redisClient.del(authToken)
        }
        // 生成新的token，一天后失效
        authToken = jwt.sign({id: user.user_id}, jwtToken.secretToken, {
          expiresIn: jwtToken.expireTime
        })
        // 在 redis中设置token的key，对应的value为用户的id
        redisClient.set(authToken, user.user_id, 'EX', jwtToken.expireTime / 1000)
        res.cookie(jwtToken.tokenCookieName, authToken, {
          maxAge: jwtToken.expireTime,
          httpOnly: true
        }).status(201).json(user)
      })
    })
    .catch(err => {
      res.status(403).json({error: JSON.parse(err.message)})
    })
})

router.get('/tokenConfirm', (req, res) => {
  const token = req.cookies[jwtToken.tokenCookieName]
  console.log(token)
  if (!token) {
    res.status(403).json({error: errMsg.errLogin})
    return
  }
  redisClient.get(token, (err, reply) => {
    if (err) {
      res.status(500).json({error: errMsg.errServer})
      return
    }
    if (!reply) {
      res.status(403).json({error: errMsg.errLogin})
      return
    }
    jwt.verify(token, jwtToken.secretToken, (err, decode) => {
      if (err) {
        res.status(403).json({error: errMsg.errTokenExpired})
        return
      }
      authUtil.getUserById(decode.id)
        .then(user => {
          res.status(200).json(user)
        })
        .catch(err => {
          res.status(403).json({error: JSON.parse(err.message)})
        })
    })
  })
})

router.post('/logout', (req, res) => {
  const authToken = req.cookies[jwtToken.tokenCookieName]
  redisClient.del(authToken)
  res.clearCookie(jwtToken.tokenCookieName).status(201).json({})
})

module.exports = router
