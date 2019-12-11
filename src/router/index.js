import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/pages/index'
// 登录
import Login from '@/pages/login'
// 注册
import Register from '@/pages/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
