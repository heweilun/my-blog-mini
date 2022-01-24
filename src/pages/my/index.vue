<template>
	<view class="my_center">
		<view class="my_header">
			<view class="my_face">
				<u-icon name="account-fill" size="75" color="#cacaca"></u-icon>
			</view>
			<view>{{userInfo.username}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState(['hasLogin', 'userInfo'])
		},
		onShow() {
			!this.hasLogin && uni.reLaunch({
				url: '/pages/login/index'
			})
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.my_center {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.my_header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.my_face {
				background: #f2f1f6;
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 36rpx;
			}
		}
	}
</style>
