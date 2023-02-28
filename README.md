# H5中引用微信jssdk

## 项目描述
H5中引入微信jssdk，测试微信授权的部分api的使用，此H5最终要在微信浏览器或者小程序的webview中打开，所以会有环境判断
- 相关接口
  https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html#%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3-2
- jssdk
  https://res.wx.qq.com/open/js/jweixin-1.6.0.js
- JS-SDK说明文档
  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2


## 项目展示
[01. 授权成功](./imgs-dispaly/use-jssdk01.png)
[02. 触发选择文件](./imgs-dispaly/use-jssdk02.png)
[03. 确认选择文件回调](./imgs-dispaly/use-jssdk03.png)
[04. 获取签名](./imgs-dispaly/use-jssdk04.png)


## 目录介绍
- constants => 常量设置并导出在app.js中使用
- imgs-display =>  项目演示截图
- serve =>  node服务部署 用作代理2种方式（解决跨域问题）
- src => 入口文件夹 app.js为核心实现
- webpack.config.js => webpack配置文件

## 项目启动
- 安装依赖
```sh
pnpm i
```
- 本地开发
```sh
yarn dev
```
- 打包
```sh
yarn build
```

  

