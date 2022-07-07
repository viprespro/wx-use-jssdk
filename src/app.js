const {
  appid,
  secret,
  timestamp,
  nonceStr,
  baseUrl,
} = require('../constants/index')
const sha1 = require('sha1')

// useless code here.
const root = document.getElementById('app')
root.innerHTML = '<h1>hello world!</h1> <br />'

// Test jssdk apis
// 设置验证的button
const chooseBtn = document.createElement('button')
chooseBtn.innerText = '上传图片（验证chooseImage api）'
chooseBtn.onclick = function () {
  console.log('---chooseBtn is clicked---')
  // 1. chooseImage
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为 img 标签的 src 属性显示图片
      const tempFilePaths = res.tempFilePaths
      console.log('tempFilePath:', tempFilePath)
    },
  })
}
root.appendChild(chooseBtn)

// 0 判断环境
const ua = navigator.userAgent.toLowerCase()
let isInMPEnv = false
const ele = document.createElement('span')
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  wx.miniProgram.getEnv((res) => {
    if (res.miniprogram) {
      isInMPEnv = true
      ele.innerText = '在微信小程序环境中'
    } else {
      ele.innerText = '在微信浏览器环境中'
    }
  })
} else {
  ele.innerText = '当前不在微信浏览器环境中'
}
// 展示当前所在环境
root.appendChild(ele)

// 1. 引入jssdk
// https://res.wx.qq.com/open/js/jweixin-1.6.0.js

// 2. wx.config的配置
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2

// First entrance
setConfig()

// Test getAccessToken
// getAccessToken()

async function setConfig() {
  const signature = await genSignature()
  wx.config({
    debug: true, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
    appId: appid, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: ['chooseImage', 'previewImage', 'downloadImage'], // 必填，需要使用的 JS 接口列表
  })
}

// 3. 考虑如何获取到签名
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62

// 3.1 获取access_token 要全局缓存
async function getAccessToken() {
  console.log('---获取access_token中---')
  // const baseUrl = 'http://localhost:8001' // 本地的node服务1 测试ok
  // const url = `${baseUrl}/api/getAccessToken`

  // const baseUrl = 'http://localhost:8002/api' // 本地node服务2 作反向代理 测试ok 推荐
  // const url = `${baseUrl}/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`

  const url = `${baseUrl}/token?grant_type=client_credential&appid=${appid}&secret=${secret}` // 本地配置代理
  const response = await fetch(url)
  const { access_token } = await response.json()
  sessionStorage.setItem('accessToken', access_token)
  return access_token
}

// 3.2 获取jsapi_ticket 需要全局缓存
async function getJsApiTicket() {
  console.log('---获取jsapi_ticket中---')
  const accessToken =
    sessionStorage.getItem('accessToken') || (await getAccessToken())
  const url = `${baseUrl}/ticket/getticket?access_token=${accessToken}&type=jsapi`
  const response = await fetch(url)
  const { ticket } = await response.json()
  sessionStorage.setItem('jsApiTicket', ticket)
  return ticket
}

// 4. 生成签名
async function genSignature() {
  console.log('---生成签名中---')
  const jsApiTicket =
    sessionStorage.getItem('jsApiTicket') || (await getJsApiTicket())
  const href = window.location.href
  const url = ~href.indexOf('#') ? href.split('#')[0] : href
  const sortedStr = `jsapi_ticket=${jsApiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  return sha1(sortedStr)
}
