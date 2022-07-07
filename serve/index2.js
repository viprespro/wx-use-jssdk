const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  res.send('Hello world.')
})

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.weixin.qq.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
)

app.listen(8002)
