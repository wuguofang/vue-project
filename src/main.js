// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import './global'
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

Vue.config.productionTip = false

Vue.prototype.$judgeLogin = function (res) {
  // 未登录 or 登录失效
  if(res.needLogin) {
    this.$vux.toast.show({
      type: 'text',
      text: res.errorMsg,
      width: '5rem'
    })
    // 跳转登录地址
    this.$router.push({path: '/login'})
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
