<template>
	<view class="page-container index-page">
		<u-navbar :autoBack="false" >
			<view slot="left" >
				<u-search shape="round" v-model="keyword" :clearabled="true" :showAction="false" placeholder="请输入博客标题" @search="blogSearch" @clear="clearSearch"></u-search>
			</view>
		</u-navbar>
		<u-subsection :list="list" :current="selectSection" @change="sectionChange"></u-subsection>
		<swiper class="swiper" :indicator-dots="false" :current="selectSection" :vertical="false" @change="swiperChange">
			<swiper-item>
				<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y">
					<blogCard v-for=" (item,index) in data" :data="item" :key="index"></blogCard>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="scroll-Y">
					<blogCard v-for=" (item,index) in data" :data="item" :key="index"></blogCard>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-back-top :scroll-top="scrollTop" icon="arrow-up"></u-back-top>
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
				keyword: null,
				scrollTop: 0,
				data: null,
				list: ['所有', '我的'],
				selectSection: 0
			}
		},
		onLoad() {
			this.blogSearch()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom(e) {
			console.log(e)
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			clearSearch() {
				this.keyword = null
				this.blogSearch()
			},
			swiperChange(e) {
				this.selectSection = e.detail.current
			},
			sectionChange(index) {
				this.selectSection = index;
			},
			blogSearch() {
				this.$httpRequest('/api/blog/list',{
					type: 'GET',
					data: {
						keyword: this.keyword
					}
				}).then(result=>{
					const {data} = result.data
					this.data = data
				}).catch(error =>{
					console.log(error)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index-page {
		background: #f2f2f2;
		.swiper {
			height: calc(100% - 225rpx);
			.scroll-Y {
				height: 100%;
			}
		}
	}
</style>
