const express = require('express')
const fetch = require('node-fetch')

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

app.get('/api/getAccessToken', (req, res) => {
  fetch(
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa6c30b0075d4adf9&secret=4257c6587844598f8270117cd122d29d'
  )
    .then((response) => response.json())
    .then((data) => {
      res.send(data)
    })
    .catch((err) => console.log(err))
})

app.listen(8001)
