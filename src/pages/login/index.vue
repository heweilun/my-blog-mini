<template>
	<view class="page-container login-page">
		<view class="login-container">
			<!-- <view class="login-header"><text space="ensp">欢迎使用  我的小程序</text></view>
			<view class="login-tip"><text space="ensp">立即登录，创建自己的博客内容</text></view> -->
			<u-toast ref="uToast"></u-toast>
			<view class="login-icon">
				<view class="login-circle">
					<u-icon name="account-fill" size="75" color="#cacaca"></u-icon>
				</view>
			</view>
			<view class="login-form">
				<u--form
					labelPosition="left"
					:model="loginState"
					ref="loginForm"
				>
					<u-form-item
						prop="userInfo.username"
					>
						<u--input
							v-model="loginState.userInfo.username"
							shape="circle"
							prefixIcon="account"
							prefixIconStyle="font-size: 22px;color: #3c9cff"
							placeholder="请输入用户名"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item
						prop="userInfo.password"
					>
						<u--input
							v-model="loginState.userInfo.password"
							shape="circle"
							prefixIcon="lock"
							prefixIconStyle="font-size: 22px;color: #3c9cff"
							placeholder="请输入密码"
							:password="true"
							clearable
						></u--input>
					</u-form-item>
					<u-form-item>
						<u-button type="primary" :loading="loading" @click="loginSubmit" shape="circle">登录</u-button>
					</u-form-item>
				</u--form>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				loginState: {
					userInfo: {
						username: null,
						password: null
					}
				},
				loading: false,
				rules: {
					'userInfo.username': [{
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					}
					// ,{
					// 	pattern: /^[0-9a-zA-Z]*$/g,
					// 	transform(value) {
					// 		return String(value);
					// 	},
					// 	message: '用户名仅支持字母数字下划线',
					// },
					],
					'userInfo.password': [{
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},{
						min: 6,
						max: 18,
						message: '密码长度在6-18位之间',
					},{
						pattern: /^[0-9a-zA-Z_]*$/g,
						transform(value) {
							return String(value);
						},
						message: '密码只能包含字母、数字、下划线',
					}],
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.loginForm.setRules(this.rules)
		},
		onLoad() {

		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['loginIn']),
			loginSubmit() {
				this.$refs.loginForm.validate().then(res => {
					this.loading = true
					const { username, password } = this.loginState.userInfo
					this.$httpRequest('/api/user/login',{
						type: 'POST',
						data: {
							username,
							password
						}
					}).then(result=>{
						const { data, errno } = result
						this.toUser(data)
						this.loading = false
					}).catch(error =>{
						this.$refs.uToast.show({
							type: 'error',
							message: error.message,
						})
						this.loading = false
					})
				}).catch(errors => {
					this.loading = false
				})
			},
			toUser(provider) {//登录成功后跳转个人中心
				this.loginIn(provider)
				uni.reLaunch({
					url: '/pages/my/index'
				})
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
		}
	}
</style>