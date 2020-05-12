<template>
	<view class="bg" :style="{height: clientHeight + 'px'}">
		<image :src="$src+'/images/TV-main.png'" mode=""></image>
		<!-- <button type="default" @click="goPay">支付</button> -->
	</view>
	
	
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				clientHeight: '',
				$src: this.$src
			};
		},
		onLoad() {
			// 储存第一次屏幕可视区高度
			uni.getSystemInfo({
				success: res => {
					this.clientHeight = res.windowHeight;
				}
			})
		},
		methods: {
			...mapMutations(["changePrice"]),
			goPay() {
				this.changePrice({price: 30});
				uni.navigateTo({
					url: '../components/wechatpay/wechatpay'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		background: url(https://www.dxsc.vip/images/TV-background.png) no-repeat;
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
