<template>
	<view class="blog_detail">
		<u-loading-page :loading="loading"></u-loading-page>
		<view v-if="!loading">
			<view class="detail_title">{{data.title}}</view>
			<view class="detail_time">
				<view>{{this.$moment(data.createtime).format('YYYY-MM-DD')}}</view>
				<view><u--text :text="data.author" type="primary"></u--text></view>
			</view>
			<view class="detail_content">{{data.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: null,
				loading: true
			}
		},
		onLoad(option) {
			const { id } = option
			if(id){
				this.getDetail(id)
			}else {
				this.loading = false
			}
		},
		methods: {
			getDetail(id) {
				this.$httpRequest('/api/blog/detail',{
					type: 'GET',
					data: {id}
				}).then(result=>{
					this.data = result.data
					this.loading = false
				}).catch(error =>{
					this.loading = false
					console.log(error)
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.blog_detail {
		padding: 45rpx 30rpx;
		.detail_title {
			font-size: 50rpx;
			font-weight: 600;
		}
		.detail_time {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 15rpx;
			align-items: center;
			margin-top: 20rpx;
			height: 65rpx;
		}
		.detail_content {
			margin-top: 15rpx;
		}
	}
</style>
