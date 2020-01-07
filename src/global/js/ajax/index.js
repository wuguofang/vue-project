/**
 * @authors       wuguofang
 * @date          2019-12-10 16:06
 * @description   global javascript
 */
import Vue from 'vue'
import Axios from 'axios'
import jsonp from './jsonp'
import Cookies from 'js-cookie'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

Axios.interceptors.request.use(function (config) {
  // 请求加/api前缀
  // 加Authorization鉴权
  let url = config.url.substr(0,1) == '/' ? config.url : '/' + config.url
  config.url = '/api' + url
  config.headers['SystemId'] = 'FRONTEND'
  config.headers['Authorization'] = 'Bearer ' + Cookies.get('token')
  return config
})

// Add a response interceptor
Axios.interceptors.response.use((response) => {
  // 数据处理
  let res = {
    success: false,
    errorMsg: '',
    needLogin: false,
    data: null
  }
  let { state, rspMemo, rspCode, errorTimes } = response.data
  if(state == 'FAIL') {
    if(errorTimes) {
      res['errorTimes'] = errorTimes
    }
    if(rspCode == '52408') {
      // 登录失败
      res.needLogin = true
    }
    res.success = false
    res.errorMsg = rspMemo
  }else {
    res.success = true
    res.needLogin = false
    res.data = response.data
  }
  return res
}, error => {
  console.log(error)
  return {
    success: false,
    errorMsg: '网络异常，请稍后再试',
    needLogin: false,
    data: null
  }
})

Vue.prototype.$ajax = Axios

Vue.prototype.$jsonp = jsonp

export {
  Axios as ajax,
  jsonp
}
