import App from './App'
import uView from "uview-ui"
import httpRequest from './common/http.js'



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$httpRequest= httpRequest
Vue.use(uView)
uni.$u.config.unit = 'rpx'
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif