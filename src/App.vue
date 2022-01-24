<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.onTabBarMidButtonTap(()=>{
				console.log("点击了")
				// 这里可以根据 个人需求 做点击处理，
				// 本人需进行页面跳转。
				// uni.navigateTo({
				// 	url:"../new/new",
				// 	animationType:'slide-in-bottom'
				// })
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	.page-container {
		height: 100vh;
	}
</style>
