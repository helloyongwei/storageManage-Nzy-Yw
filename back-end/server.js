const http = require('http')
const app = require('./app')

const port = process.env.NODE_PORT || 3000
const host = process.env.NODE_HOST || 'localhost'

http.createServer(app).listen(port, host, () => {
  console.log(`listening at port ${port}`)
})
