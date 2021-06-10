/* 基于axios封装的请求模块 */
import axios from 'axios'
import JSONBig from 'json-bigint'

// const str = '{"id":1234567123456234544}'
// JSON.parse()
// JSONBig.parse()
// console.log(JSON.parse(str))
// 他会把超出js安全整数范围的数字转为一种类型为BigNumber的对象
// 使用时BigNumber.toString()就能得到原来正确的数据
// console.log(JSONBig.parse(str).id.toString())

// 创建一个axios实例,也就是复制一个axios
// 通过这个实例去发请求,把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  //   定义后端返回的原始数据的处理
  transformResponse: [function (data) {
    // axios默认使用JSON.parse转换处理数据
    // return JSON.parse(data)

    // 后端返回的数据可能不是JSON格式字符串
    // 那么JSONBig.parse就会报错
    // 使用try-catch来捕获异常,处理异常的发生
    try {
      // 如果转换成功,返回结果
      return JSONBig.parse(data)
    } catch (err) {
      // 转换失败,则把原来的数据原封不动的直接返回给请求使用
      console.log('转换失败', err)
      return data
    }
  }]
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
