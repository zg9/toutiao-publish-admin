/* 用户相关请求模块 */
import request from '@/utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // 获取存储的localStorage,使用JSON.parse转义回来
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  //   console.log(userData)

  return request({
    method: 'Get',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios可以通过headers选项设置请求头
    headers: {
    // 属性名和值都需要看接口的要求
    // 属性名:Authorization,接口要求的
    // 属性值:Bearer空格token数据
    // 使用反引号和$拼接字符串比 'Bearer ' + userData.token好一些
      Authorization: `Bearer ${userData.token}`
    }
  })
}
// 修改用户信息
