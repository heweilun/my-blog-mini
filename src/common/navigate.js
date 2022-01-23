
import store from '../store'
const navigeteUrl = (url)=> {
	if(!store.state.hasLogin) {//判断vuex登录态
		uni.reLaunch({
			url: '/pages/login/index'
		})
		return false
	}
	
	uni.navigateTo({
	    url,
		fail(e) {
			console.log(e)
		}
	})
}

module.exports = {
	navigeteUrl
}