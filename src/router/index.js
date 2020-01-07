import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/pages/index'
// 登录
import Login from '@/pages/login'
// 注册
import Register from '@/pages/register'
// 验证手机页面
import ValidateMobile from '@/pages/validate-mobile'
// 修改密码
import ModifyPassword from '@/pages/modify-password'
// 修改手机
import ModifyMobile from '@/pages/modify-mobile'
// 修改银行卡
import ModifyBank from '@/pages/modify-bank'
// 账户概览
import Account from '@/pages/account'
// 积分商城
import Mall from '@/pages/mall'
// 实名认证
import Identify from '@/pages/identify'
// 我的账单
import Bill from '@/pages/bill'
// 产品列表
import Product from '@/pages/product'
// 产品详情
import ProductDetail from '@/pages/product-detail'
// 修改用户信息
import Modify from '@/pages/modify'
// 申请页面
import Apply from '@/pages/apply'
// 兑换页面
import Exchange from '@/pages/exchange'
// 兑换记录页面
import ExchangeList from '@/pages/exchange-list'

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
      path: '/validate-mobile',
      name: 'ValidateMobile',
      component: ValidateMobile
    },
    {
      path: '/modify-password',
      name: 'ModifyPassword',
      component: ModifyPassword
    },
    {
      path: '/modify-mobile',
      name: 'ModifyMobile',
      component: ModifyMobile
    },
    {
      path: '/modify-bank',
      name: 'ModifyBank',
      component: ModifyBank
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
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/product-detail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/modify',
      name: 'Modify',
      component: Modify
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/exchange-list',
      name: 'ExchangeList',
      component: ExchangeList
    }
  ]
})
