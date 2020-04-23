<template>
	<view>
		<!-- nav -->
		<view class="nav-box">
			<scroll-view scroll-x="true" >
				<block v-for="(item,index) in navList.list" :key="index">
					<view @click="navList.currentIndex = index">
						<text :class="navList.currentIndex == index? 'active':''">{{item.name}}</text>
					</view>
				</block>
				
			</scroll-view>
		</view>
		<!-- 产品区 -->
		<view class="product-box">
			<view class="product">
				<block v-for="n in 4" :key="n">
					<view class="product-item">
						<view class="product-img">
							<!-- <image src="/static/images/goods-detail.png" mode=""></image> -->
						</view>
						<view class="product-main">
							<text style="">樱花初绽玛奇朵(中杯)</text>
							<text style="">浓醇咖啡交织淡雅樱花般的清香</text>
							<text style="">7.1折</text>
							<text style="">官方价 ￥38.00</text>
							<text style="">会员专享价：￥26.90</text>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: {
					currentIndex: 0,
					list: [
						{
							name: '全部'
						},
						{
							name: '星巴克'
						},
						{
							name: '美团外卖'
						},
						{
							name: '饿了么'
						},
						{
							name: '全部'
						},
						{
							name: '星巴克'
						},
						{
							name: '美团外卖'
						},
						{
							name: '饿了么'
						},
						{
							name: '全部'
						},
						{
							name: '星巴克'
						},
						{
							name: '美团外卖'
						},
						{
							name: '饿了么'
						},
					]
				}
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #f1f1f1;
	}
	// nav
	.nav-box {
		box-sizing: border-box;
		background: #fff;
		scroll-view {
			width: 100%;
			white-space: nowrap;
			box-sizing: border-box;
			padding: 0 20rpx;
			line-height: 80rpx;
			view {
				display: inline-block;
				margin-right: 36rpx;
				font-size: 28rpx;
				color: #333;
				text.active {
					border-bottom: 1px solid #f00;
					padding-bottom: 16rpx;
				}
			}
			view:last-child {
				margin-right: 0;
			}
		}
	}
	// 产品区
	.product-box {
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		.product {
			box-sizing: border-box;
			.product-item {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				background: #fff;
				padding: 24rpx 20rpx;
				margin-bottom: 18rpx;
				.product-img {
					flex-shrink: 0;
					width: 160rpx;
					height: 160rpx;
					background: #f1f1f1;
					margin-right: 28rpx;
				}
				.product-main {
					flex: 1;
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					text:nth-child(1) {
						color: #333;
					}
					text:nth-child(2) {
						font-size: 24rpx;
						color: #999;
						margin-top: 8rpx;
					}
					text:nth-child(3) {
						border: 1px solid #f00;
						width: 80rpx;
						font-size: 22rpx;
						text-align: center;
						border-radius: 6rpx;
						margin-top: 8rpx;
						color: #f00;
					}
					text:nth-child(4) {
						font-size: 24rpx;
						color: #333;
						margin-top: 12rpx;
					}
					text:nth-child(5) {
						color: #f00;
						margin-top: 8rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
