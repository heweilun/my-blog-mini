<template>
	<view class="page-container search-page">
		<u-search margin="10rpx 30rpx" shape="round" v-model="keyword" :clearabled="true" :showAction="true" :actionStyle="{color: 'rgb(140,227,185)'}" placeholder="请输入关键字" @search="blogSearch" @clear="clearSearch" :focus="true" @custom="blogSearch"></u-search>
		<u-toast ref="uToast"></u-toast>
		<!-- <scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y"> -->
			<blogCard v-for=" (item,index) in data" :data="item" :key="index"></blogCard>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import blogCard from "components/blogCard.vue"
	export default {
		components: {
			blogCard,
			scrollTop: 0
		},
		data() {
			return {
				keyword: null,
				data: null
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			clearSearch() {
				this.keyword = null
				this.data = null
			},
			blogSearch() {
				if(this.keyword) {
					this.$httpRequest('/api/blog/list',{
						type: 'GET',
						data: {
							keyword: this.keyword
						}
					}).then(result=>{
						this.data = result.data
					}).catch(error =>{
						this.$refs.uToast.show({
							type: 'error',
							position: "top",
							message: "请求失败，请稍后重试",
						})
					})
				}else {
					this.$refs.uToast.show({
						type: 'warning',
						position: "top",
						message: "请输入关键词",
					})
				}
			}
		}
	}
</script>

<style>
	.search-page {
	}
</style>
