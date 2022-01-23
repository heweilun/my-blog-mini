<template>
	<view>
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
		<button type="warn" @tap="undo">撤销</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: "请输入博客内容"
			}
		},
		onLoad() {

		},
		methods: {
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
				  this.editorCtx = res.context
				}).exec()
				// #endif
			},
			undo() {
				this.editorCtx.undo()
			}
		}
	}
</script>

<style>
	
</style>
