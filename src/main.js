import App from './App'
import uView from "uview-ui"
import httpRequest from './common/http.js'
import moment from 'moment'
import 'moment/locale/zh-cn'
import store from './store'


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$httpRequest= httpRequest
Vue.use(uView)
uni.$u.config.unit = 'rpx'
Vue.prototype.$store = store
Vue.prototype.$moment = moment
App.mpType = 'app'
const app = new Vue({
	store,
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