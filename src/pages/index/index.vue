<template>
	<view class="page-container index-page">
		<u-navbar :autoBack="false">
			<view slot="left" >
				<u-search shape="round" :clearabled="true" :showAction="false" placeholder="请输入博客标题" @focus="navigateSearch"></u-search>
			</view>
		</u-navbar>
		<u-subsection :list="list" :current="selectSection" @change="sectionChange"></u-subsection>
		<swiper class="swiper" :indicator-dots="false" :current="selectSection" :vertical="false" @change="swiperChange">
			<swiper-item>
				<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y" @scroll="scroll">
					<blogCard v-for="item in data" :data="item" :key="item.id"></blogCard>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y" @scroll="scroll">
					<blogCard v-for="item in data" :data="item" :key="item.id"></blogCard>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-back-top :scrollTop="old.scrollTop" top="2" bottom="100" @click="backTop"></u-back-top>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	import blogCard from "components/blogCard.vue"
	export default {
		components: {
			blogCard,
		},
		computed:{
			...mapState(['hasLogin', 'userInfo'])
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				data: null,
				list: ['所有', '我的'],
				selectSection: 0
			}
		},
		onShow() {
			this.blogSearch()
		},
		methods: {
			backTop() {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
			},
			scroll(e) {
				//onPageScroll删除页面滚动监听 改用scroll-view的滚动监听
				this.old.scrollTop = e.detail.scrollTop
			},
			navigateSearch() {
				uni.navigateTo({
				    url: '/pages/search/search',
					fail(e) {
						console.log(e)
					}
				});
			},
			blogSearch(params) {
				this.$httpRequest('/api/blog/list',{
					type: 'GET',
					data: params?params:null
				}).then(result=>{
					this.data = result.data
				}).catch(error =>{
					console.log(error)
				})
			},
			swiperChange(e) {
				this.selectSection = e.detail.current
				this.getList()
			},
			sectionChange(index) {
				this.selectSection = index
				this.getList()
			},
			getList() {
				this.backTop()
				if(!this.hasLogin && this.selectSection===1) {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}else if(this.selectSection===1){
					this.blogSearch({
						author: this.userInfo.username,
					})
				}else {
					this.blogSearch()
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-page {
		.swiper {
			height: calc(100% - 225rpx);
			.scroll-Y {
				height: 100%;
			}
		}
	}
</style>
