/**
 * @authors       wuguofang
 * @date          2019-12-10 16:06
 * @description   global javascript
 */
import Vue from 'vue'
import Axios from 'axios'
import jsonp from './jsonp'

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // 数据处理
  return response.data
})

Vue.prototype.$ajax = Axios

Vue.prototype.$jsonp = jsonp

export {
  Axios as ajax,
  jsonp
}
