const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (filename) => path.resolve(__dirname, filename)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    static: './dist',
    port: 8000,
    open: true,
    proxy: {
      '/cgi-bin': {
        target: 'https://api.weixin.qq.com',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
