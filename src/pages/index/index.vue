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
				<scroll-view :scroll-y="true" class="scroll-Y" @scroll="scroll">
					<blogCard v-for=" (item,index) in data" :data="item" :key="index"></blogCard>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :scroll-y="true" class="scroll-Y" @scroll="scroll">
					<blogCard v-for=" (item,index) in data" :data="item" :key="index"></blogCard>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-back-top :scrollTop="scrollTop" top="2" bottom="100" class="page_backTop"></u-back-top>
	</view>
	
</template>

<script>
	import blogCard from "components/blogCard.vue"
	export default {
		components: {
			blogCard,
		},
		data() {
			return {
				scrollTop: 0,
				data: null,
				list: ['所有', '我的'],
				selectSection: 0
			}
		},
		onLoad() {
			this.blogSearch()
		},
		
		methods: {
			scroll(e) {
				//onPageScroll删除页面滚动监听 改用scroll-view的滚动监听
				this.scrollTop = e.detail.scrollTop
			},
			navigateSearch() {
				uni.navigateTo({
				    url: '/pages/search/search',
					fail(e) {
						console.log(e)
					}
				});
			},
			blogSearch() {
				this.$httpRequest('/api/blog/list',{
					type: 'GET',
				}).then(result=>{
					const {data} = result.data
					this.data = data
				}).catch(error =>{
					console.log(error)
				})
			},
			swiperChange(e) {
				this.selectSection = e.detail.current
			},
			sectionChange(index) {
				this.selectSection = index;
			},
			
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
