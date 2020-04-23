<template>
	<view>
		<!-- banner -->
		<view class="banner">
			<image src="/static/images/video.jpg" mode=""></image>
		</view>
		<!-- 折扣专区 -->
		<view class="discount-box">
			<view class="discount">
				<block v-for="(item,index) in goodList" :key="index">
					<view class="discount-item">
						<view class="discount-img">
							<image :src="item.media_logo" mode="" style="width: 100%;height: 100%;border-radius: 50%;"></image>
						</view>
						<view class="discount-main">
							<text style="font-size: 24rpx;color: #666;margin-bottom: 8rpx;">{{item.media_name}}</text>
							<view style="margin-bottom: 8rpx;font-weight: 700;">
								<text>限时</text>
								<text style="color: #E64340;">5</text>
								<text>折起</text>
							</view>
							<button type="warn" @click="videoPay(item.id)">立即充值</button>
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				goodList: []
			};
		},
		methods:{
			videoPay(id) {
				uni.navigateTo({
					url:"/pages/components/video-pay/video-pay?id="+id
				})
			},
			getDataList() {
				uni.showToast({
					title: '数据加载中',
					icon: 'loading'
				});
				request({
					url: 'index.php?s=/wap/index/getMedia'
				}).then(res => {
					uni.hideToast();
					res.data.list.forEach(item => {
						return item.media_logo = this.$api + item.media_logo;
					})
					this.goodList = res.data.list;
				})
			}
		},
		onLoad() {
			this.getDataList()
		}
	}
</script>

<style lang="scss">
	page {
		background: #f1f1f1;
	}
	// banner
	.banner {
		box-sizing: border-box;
		height: 400rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	// 折扣专区
	.discount-box {
		box-sizing: border-box;
		.discount {
			box-sizing: border-box;
			padding: 0 10rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.discount-item {
				box-sizing: border-box;
				width: 49.5%;
				background: #fff;
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-radius: 12rpx;
				margin-bottom: 12rpx;
				padding-left: 12rpx;
				.discount-img {
					width: 120rpx;
					height: 120rpx;
					background: #f1f1f1;
					margin-right: 40rpx;
					flex-shrink: 0;
					border-radius: 50%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.discount-main {
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					button {
						font-size: 20rpx;
						border-radius: 24rpx;
					}
				}
			}
		}
	}
</style>
