<template>
	<view v-if="shareShow" >
		<!-- 遮罩层 -->
		<view class="mark" @click="shareClose"></view>
		<view class="share-box animated slideInUp" v-if="flag">
			<view class="share-title">
				<text>分享</text>
				<image src="https://www.dxsc.vip/images/error.png" mode="" @click="shareClose"></image>
			</view>
			<view class="share-main" >
				<view class="share-item" @click="wxShare">
					<image src="https://www.dxsc.vip/images/wxshare.png" mode=""></image>
					<text>分享给好友</text>
				</view>
				<view class="share-item" @click="getImg">
					<image src="https://www.dxsc.vip/images/haibao.png" mode=""></image>
					<text>生成海报</text>
				</view>
			</view>
		</view>
		<!-- 引导用户浏览器分享 -->
		<image src="https://www.dxsc.vip/images/share-goods.png" mode="" v-if="show" class="lead"></image>
	</view>
</template>

<script>
	
	export default {
		props: {
			shareShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				flag: true
			}
		},
		methods: {
			// 关闭分享
			shareClose() {
				this.show = false;
				this.$emit('shareClose',false);
				this.flag = true;
			},
			// 点击微信分享
			wxShare() {
				this.show = true;
				this.flag = false;
				// 执行微信分享功能
				this.$emit('wxShare')
			},
			// 海报
			getImg() {
				this.$emit("getImg")
			}
		}
	}
</script>

<style lang="scss">
	.mark {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 10;
		pointer-events: auto
	}
	.share-box {
		box-sizing: border-box;
		background: #fff;
		width: 100%;
		z-index: 999;
		position: fixed;
		bottom: 138rpx;
		.share-title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			line-height: 100rpx;
			padding: 0 36rpx;
			border-bottom: 1px solid #f1f1f1;
			color: #333;
			text {
				flex: 1;
				text-align: center;
			}
			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
		.share-main {
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 100rpx 0;
			.share-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					font-size: 28rpx;
					margin-top: 12rpx;
					color: #333;
				}
			}
		}
	}
	.lead {
		z-index: 12;
		position: fixed;
		right: 0;
		top: 0;
	}
</style>
