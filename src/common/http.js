const NODE_ENV = process.env.NODE_ENV
import cookies from 'weapp-cookie'
import { requerst } from "../config/http.js"
import store from '../store'


const httpRequest = ((url, options) => {
	cookies.has('userid') && cookies.getCookie('userid').isExpired() && cookies.clearCookies()//cookie过期清除？
	const {type, data, header} = options?options:{}
	return new Promise((resolve, reject) => {
		uni.request({
		    url: url,
			method: type || 'GET',
		    data: data || {},
		    header: header || {'content-type' : "application/json"},
		}).then((response) => {
            let [error, res] = response;
			if(error) {
				return reject(new Error(error.errMsg))
			}
			if(res.data.errno === 401) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
			if(res.data.errno !== 0) {
				return reject(res.data)
			}
            return resolve(res.data)
        })
	})
})


// 接口白名单
const whiteList = [
    '/',
    '/api/blog/list',
]


function hasPermission (url) {
    // 在白名单中，直接跳转
    if(whiteList.indexOf(url) !== -1 && !store.state.hasLogin) {
        return true
    }
    return false
}

uni.addInterceptor('request', {
  invoke(args) {
	hasPermission(args.url)
	// request 触发前拼接 url 
	args.url = NODE_ENV === 'development'?`${requerst.localApi}${args.url}`:`${requerst.serverApi}${args.url}`
	return true
  },
  success(res) {
    // 请求成功后，修改code值为1
	
  }, 
  fail(err) {
    // console.log('interceptor-fail',err)
  }, 
  complete(res) {
    // console.log('interceptor-complete',res)
  }
})
export default httpRequest
