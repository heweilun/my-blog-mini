<template>
	<view class="page-container login-page">
		<view class="login-container">
			<view class="login-header"><text space="ensp">欢迎使用  我的小程序</text></view>
			<view class="login-tip"><text space="ensp">立即登录，创建自己的博客内容</text></view>
			<view class="login-icon">
				<view class="login-circle">
					<image style="width: 95rpx; height: 95rpx;" mode="scaleToFill" :src="iconUrl"></image>
				</view>
			</view>
			<view class="login-form">
				<u-button type="primary" text="登录"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconUrl: require('@/static/login/login-icon.png')
			}
		},
		onLoad() {

		},
		methods: {
			loginSubmit(e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
	.login-page{
		display: flex;
		justify-content: center;
		.login-container {
			width: 680rpx;
			.login-header {
				font-size: 45rpx;
				color: #080808;
				margin: 60rpx 0 20rpx;
			}
			.login-tip {
				font-size: 25rpx;
				color: #929292;
			}
			.login-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 400rpx;
				.login-circle {
					background: #f2f1f6;
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.login-form {
				
			}
		}
	}
</style>
