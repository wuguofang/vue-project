/**
 * @description   global javascript
 */
import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// 全局引入 event-bus 用于代理全局事件
import './js/event-bus'

// 全局引入全局 less
import './index.less'

// 引入loading动画及加载失败页面
import './page-loading'

// 全局常量引入
import './js/constant'

// 全局引入 ajax 组件
import './js/ajax'

// import filters
import './js/filters'

// 引入flexible
import 'lib-flexible/flexible'
Vue.use(VueResource)
Vue.use(Router)
