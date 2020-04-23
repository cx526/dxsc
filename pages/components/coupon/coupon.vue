<template>
	<view>
		<!-- userinfo -->
		<view class="user-info">
			<view class="user-img">
				<image src="/static/images/user-default.jpeg" mode=""></image>
				<text>狗熊</text>
			</view>
			<view class="user-number">
				<text>1200.00</text>
				<view>
					<text>折扣券余额</text>
				</view>
			</view>
		</view>
		<!-- banner图 -->
		<view class="banner">
			<image src="/static/images/discount-01.png" mode=""></image>
		</view>
		<!-- 产品推荐 -->
		<view class="product-box">
			<view class="product-title">
				<text>精品推荐</text>
			</view>
			<view class="product-context">
				<block v-for="n in 4" :key="n">
					<view class="product-item">
						<view class="product-show">
							<image src="/static/images/product.png" mode=""></image>
						</view>
						<view class="product-main">
							<view style="color: #414141;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">莫次有机洗面奶莫次有机洗面奶</view>
							<view class="price">
								<view>
									<text style="color: #FE1E1C;">￥244</text>
									<text style="font-size: 22rpx;color: #DCDCDC;text-decoration: line-through;margin-left: 8rpx;">￥399</text>
								</view>
								<view style="background: #FE1E1C;padding: 0 20rpx;border-radius: 30rpx;">
									<text style="color: #fff;font-size: 24rpx;">抢购</text>
									<image src="/static/images/icon-right.png" mode="" style="width: 20rpx;height: 20rpx;"></image>
								</view>
							</view>
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
				
			};
		}
	}
</script>

<style lang="scss">
	// userinfo
	.user-info {
		box-sizing: border-box;
		padding: 36rpx;
		display: flex;
		font-size: 28rpx;
		justify-content: space-between;
		align-items: center;
		background: #FED940;
		color: #333;
		.user-img {
			display: flex;
			align-items: center;
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			text {
				margin-left: 20rpx;
			}
		}
		.user-number {
			box-sizing: border-box;
			
			view {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				margin-top: 12rpx;
				image {
					width: 30rpx;
					height: 30rpx;
					
				}
			}
		}
	}
	// banner
	.banner {
		box-sizing: border-box;
		padding: 36rpx;
		image {
			width: 100%;
			height: 200rpx;
		}
	}
	//  产品推荐
	.product-box {
		box-sizing: border-box;
		padding: 0 36rpx;
		font-size: 30rpx;
		.product-title {
			color: #5C5C5C;
			border-left: 2px solid #FED940;
			text {
				margin-left: 24rpx;
			}
		}
		.product-context {
			box-sizing: border-box;
			padding: 20rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			.product-item {
				width: 48%;
				box-sizing: border-box;
				font-size: 28rpx;
				margin-bottom: 20rpx;
				.product-show {
					width: 100%;
					height: 245rpx;
					image {
						width: 100%;
						height: 100%;
					}
				} 
				.product-main {
					box-sizing: border-box;
					margin-top: 20rpx;
					.price {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}
		
	}
</style>
