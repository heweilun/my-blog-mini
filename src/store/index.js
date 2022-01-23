import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,//是否登录
		userInfo: null,//存放用户账号信息
	},
	mutations: {
		loginIn(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
		},
		logOut(state) {
			state.hasLogin = false
			state.userInfo = null
		}
	}
})

export default store