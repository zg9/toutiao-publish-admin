/* 基于axios封装的请求模块 */
import axios from 'axios'

// 创建一个axios实例,也就是复制一个axios
// 通过这个实例去发请求,把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

// 哪里要使用就加载request模块
// import request from 'request.js'
// request.xxx
// request({
//   method:
//   url: ''
// })
