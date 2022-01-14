<template>
	<view>
		<u-navbar :autoBack="false">
			<view slot="left" >
				<u-search shape="round" v-model="keyword" :clearabled="true" :showAction="false" placeholder="请输入博客标题" @search="blogSearch" @clear="clearSearch"></u-search>
			</view>
		</u-navbar>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				keyword: null
			}
		},
		onLoad() {

		},
		methods: {
			clearSearch() {
				this.keyword = null
			},
			blogSearch() {
				this.$httpRequest('/api/blog/list',{
					type: 'GET',
					data: {
						keyword: this.keyword
					}
				}).then(e=>{
					console.log(e)
				}).catch(error =>{
					console.log(error)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
