import Vue from "vue"
import Vuex from "vuex"
import cookies from 'weapp-cookie'
const NODE_ENV = process.env.NODE_ENV
import { requerst } from "../config/http.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: cookies.get('username')?true:false,//是否登录
		userInfo: cookies.get('username')?{
			username: cookies.get('username'),
			realname: cookies.get('realname')
		}:null,//存放用户账号信息
	},
	mutations: {
		loginIn(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
			cookies.set('username', provider.username, { domain: NODE_ENV === 'development'?requerst.localApi:requerst.serverApi })
			cookies.set('realname', provider.realname, { domain: NODE_ENV === 'development'?requerst.localApi:requerst.serverApi })
		},
		logOut(state) {
			state.hasLogin = false
			state.userInfo = null
			cookies.remove('username')
			cookies.remove('realname')
		}
	}
})

export default store