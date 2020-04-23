<template>
	<view class="title-box" >
		<view class="title">
			<view class="main">
				<view style="display: flex;align-items: baseline">
					<text style="color: #393939;font-size: 32rpx;">{{title}}</text>
					<image src="/static/images/triangle.png" mode="" style="margin-left: 10rpx;"></image>
				</view>
				<text style="color: #CBCBCB;font-size: 22rpx;">{{des}}</text>
				
			</view>
			<view class="context">
				<text style="color: #CBCBCB" @click="checkMore">查看更多</text>
				<image src="/static/images/icon-right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			des: String,
			flag: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			checkMore() {
				console.log(this.flag)
				if(this.flag) {
					uni.navigateTo({
						url: '/pages/components/more-list/more-list'
					})
				}
				else {
					uni.navigateTo({
						url: '/pages/components/vip-list/vip-list'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.title-box {
		box-sizing: border-box;
		padding: 0 36rpx;
		.title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.main {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: baseline;
				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
			.context {
				display: flex;
				align-items: center;
				text {
					font-size: 24rpx;
				}
				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>
