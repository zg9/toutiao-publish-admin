import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/'
import Layout from '@/views/layout/'
import Home from '@/views/home/'
import Article from '@/views/article/'

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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
//   console.log(to)

  const userData = JSON.parse(window.localStorage.getItem('userData'))

  // 访问/login以外的都要校验登录状态
  if (to.path !== '/login') {
    if (userData) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
