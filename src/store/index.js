import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,//是否登录
		userInfo: {},//存放用户账号信息
	},
	mutations: {
		loginIn(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
			console.log(state, provider)
		},
		logOut(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo'//根据键值删除对应位置的登录信息缓存
			})
		}
	}
})

export default store