<template name="blogCard">
	<view class="blog_card">
		<view class="blog_title">
			<sunui-omitted :text="data.title" :sty="sty" :clamp="1"/>
			<!-- <text>{{data.createtime | dateFormat}}</text> -->
			<text>{{this.$moment(data.createtime)}}</text>
		</view>
		<u-divider :hairline="true"></u-divider>
		<view class="blog_content">
			{{data.content}}
		</view>
	</view>
</template>

<script>
	import sunuiOmitted from "components/sunui-omitted.vue"
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
				sty:'max-width: 360rpx'
			};
		}
	}
</script>

<style lang="scss">
	.blog_card {
		margin-bottom: 15rpx;
		background: #fff;
		overflow: hidden;
		.blog_title{
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 65rpx;
			.title_view {
				height: 64rpx;
				max-width: 120rpx;
			}
		}
		.blog_content {
			min-height: 180rpx;
			padding: 0 30rpx;
		}
	}
</style>
