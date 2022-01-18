const navigeteUrl = (url)=> {
	if(uni.getStorageSync('userInfo') === '') {
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