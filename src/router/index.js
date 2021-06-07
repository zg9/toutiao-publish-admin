import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'

Vue.use(VueRouter)

// 路由配置表
// 路由命名方便传参跳转
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    // 父路由layout有一个默认子路由,这个name没有意义,不需要name
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空,会作为默认子路由渲染
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
