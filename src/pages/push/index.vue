<template>
	<view class="blog_push">
		<u-toast ref="uToast"></u-toast>
		<u--form
			labelPosition="top"
			:model="pushData"
			ref="pushForm"
		>
			<u-form-item
				prop="title"
			>
				<u--input
					v-model="pushData.title"
					placeholder="请输入标题"
					clearable
				></u--input>
			</u-form-item>
			<u-form-item
				prop="content"
			>
				<u--textarea v-model="pushData.content" :count="true" :maxlength="500" placeholder="请输入内容" ></u--textarea>
			</u-form-item>
			<u-form-item>
				<u-button type="primary" :loading="loading" @click="pushCommit" shape="circle">发布</u-button>
			</u-form-item>
		</u--form>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				pushData: {
					title: '',
					content: ''
				},
				loading: false,
				rules: {
					'title': [{
						type: 'string',
						required: true,
						message: '请输入标题',
						trigger: ['blur', 'change']
					}],
					'content': [{
						type: 'string',
						required: true,
						message: '请输入内容',
						trigger: ['blur', 'change']
					}],
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.pushForm.setRules(this.rules)
		},
		onShow() {
			!this.hasLogin && uni.reLaunch({
				url: '/pages/login/index'
			})
		},
		methods: {
			textFormat(val) {
				// 格式化文字展示文本域格式文字
				if (val) {
					val = val.replace(/\ +/g,"&nbsp;")
					return val;
				}
			},
			pushCommit() {
				this.$refs.pushForm.validate().then(res => {
					this.loading = true
					const { title, content } = this.pushData
					console.log(this.pushData)
					this.$httpRequest('/api/blog/new',{
						type: 'POST',
						data: {
							title: this.textFormat(title),
							content: this.textFormat(content)
						}
					}).then(result=>{
						this.$refs.uToast.show({
							type: 'success',
							message: `博客发布成功`,
						})
						this.loading = false
						this.pushData.title = ''
						this.pushData.content = ''
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
			}
		}
	}
	
</script>

<style>
	.blog_push {
		padding: 30rpx;
	}
</style>
