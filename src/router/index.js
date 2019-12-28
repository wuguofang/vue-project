import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/pages/index'
// 登录
import Login from '@/pages/login'
// 注册
import Register from '@/pages/register'
// 重置密码
import ResetPassword from '@/pages/reset-password'
// 账户概览
import Account from '@/pages/account'
// 积分商城
import Mall from '@/pages/mall'
// 实名认证
import Identify from '@/pages/identify'
// 我的账单
import Bill from '@/pages/bill'
// 积分管理
import Credit from '@/pages/credit'
// 产品详情
import Product from '@/pages/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
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
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    },
    {
      path: '/identify',
      name: 'Identify',
      component: Identify
    },
    {
      path: '/bill',
      name: 'Bill',
      component: Bill
    },
    {
      path: '/credit',
      name: 'Credit',
      component: Credit
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    }
  ]
})
