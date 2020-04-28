<template>
	<view class="bg" :style="{height: clientHeight + 'px'}">
		<image src="/static/images/TV-main.png" mode=""></image>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				clientHeight: ''
			};
		},
		onLoad() {
			// 储存第一次屏幕可视区高度
			uni.getSystemInfo({
				success: res => {
					this.clientHeight = res.windowHeight;
				}
			})
		}
	}
</script>

<style lang="scss">
	.bg {
		background: url(../../static/images/TV-background.png) no-repeat;
		background-size: 100% 100%;
		// height: 100%;
		box-sizing: border-box;
		image {
			height: 90%;
			position: absolute;
			left: 53%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	
</style>
