const NODE_ENV = process.env.NODE_ENV
import { requerst } from "../config/http.js"

const httpRequest = ((url, options) => {
	const {type, data, header} = options?options:{}
	return new Promise((resolve, reject) => {
		uni.request({
		    url: url,
			method: type || 'GET',
		    data: data || {},
		    header: header || {'content-type' : "application/json"},
		}).then((response) => {
			console.log(response)
            let [error, res] = response;
			if(error) {
				return reject(error)
			}
            return resolve(res)
        })
	})
})


// 接口白名单
const whiteList = [
    '/',
    '/api/blog/list',
]


function hasPermission (url) {
    // 在白名单中或有storage，直接跳转
    if(whiteList.indexOf(url) !== -1 || uni.getStorageSync('userInfo').hasOwnProperty('userId')) {
        return true
    }
    return false
}

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url 
	if(!hasPermission(args.url)){
		uni.reLaunch({
			url: '/pages/login/index'
		})
		return false
	}
	args.url = NODE_ENV === 'development'?`${requerst.localApi}${args.url}`:`${requerst.serverApi}${args.url}`
	return true
	
  },
  success(args) {
    // 请求成功后，修改code值为1
  }, 
  fail(err) {
    console.log('interceptor-fail',err)
  }, 
  complete(res) {
    console.log('interceptor-complete',res)
  }
})
export default httpRequest
