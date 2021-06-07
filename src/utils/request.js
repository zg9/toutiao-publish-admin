/* 基于axios封装的请求模块 */
import axios from 'axios'

// 创建一个axios实例,也就是复制一个axios
// 通过这个实例去发请求,把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础路径
})

// 请求拦截器
request.interceptors.request.use(
  // 所有api请求都必定会经过这里,
  function (config) {
    // console.log(config)

    // 可以在请求出去之前定制统一业务功能  例如统一设置token
    const userData = JSON.parse(window.localStorage.getItem('userData'))

    // 如果有登录用户信息,则统一设置token
    if (userData) {
      config.headers.Authorization = `Bearer ${userData.token}`
    }

    // 当return config之后请求才会真正的发出去
    return config
  },
  //   请求失败经过这里
  function (error) {
    return Promise.reject(error)
  })

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
