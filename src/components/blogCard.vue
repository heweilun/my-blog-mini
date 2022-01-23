<template name="blogCard">
	<view class="blog_card" @click="navigateDetail">
		<view class="blog_title" >
			<sunui-omitted :text="data.title" sty="max-width: 320rpx" :clamp="1"/>
			<text class="blog_createtime">{{this.$moment(data.createtime).format('YYYY-MM-DD HH:mm:ss')}}</text>
		</view>
		<u-divider :hairline="true"></u-divider>
		<view class="blog_content">
			<sunui-omitted :text="data.content" :clamp="3"/>
		</view>
		<view class="blog_control">
			<view class="blog_visitor">
				<u-icon name="eye" size="15" color="rgb(86,195,200)"></u-icon><text class="visitor_number">{{12}}</text>浏览
			</view>
		</view>
		<view class="card_margin"></view>
	</view>
</template>

<script>
	import sunuiOmitted from "components/sunui-omitted.vue"
	import { navigeteUrl } from "common/navigate.js"
	export default {
		components: {
			sunuiOmitted
		},
		name:"blogCard",
		props: {
			data: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			navigateDetail() {
				const { createtime, title, id } = this.data
				this.$navigeteUrl(`/pages/detail/detail?id=${id}`)
			},
		}
	}
</script>

<style lang="scss">
	.blog_card {
		.card_margin {
			background: #f2f2f2;
			height: 15rpx;
		}
		background: #fff;
		overflow: hidden;
		.blog_title{
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 65rpx;
			.blog_createtime {
				font-size: 26rpx;
				color: rgb(161,161,161);
			}
		}
		.blog_content {
			padding: 0 30rpx;
		}
		.blog_control {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			height: 70rpx;
			.blog_visitor {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 30rpx;
				.visitor_number {
					padding: 0 10rpx;
				}
			}
		}
	}
</style>
