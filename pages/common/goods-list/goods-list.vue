<template>
	<view>
		<!-- <view>{{newsList}}</view> -->
		<view class="news-box " :class="isMarginTop ? 'distanceActive': ''">
			<view class="news">
				<view style="box-sizing: border-box;padding: 0 20rpx;">
					<block v-for="(item,index) in newsList" :key="index">
					<!-- 	{{newsList}} -->
						<!-- 跳转到goods-detail页面 -->
						<view class="news-item" @click="handleClick(item.goods_id)">
							<image :src="item.pic_cover_small"></image>
							<view class="news-text">
								<view class="news-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="news-price" style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
									<view style="flex: 4">
										<text class="now">优惠价：{{item.price}}</text>
										<text style="text-decoration: line-through;color: #AAAAAA;font-size: 22rpx;">市场价：{{item.market_price}}</text>
									</view>
									<text style="font-size: 20rpx;color: #BABABA;">已售：{{item.sales}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		props: {
			newsList: {
				type: Array
			},
			// 定义图片外边包裹的div是否有外边距
			isMarginTop: {
				type: Boolean
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 跳转到goods-detail详情页
			handleClick(id) {
				uni.navigateTo({
					url:'/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
 
 .news-box {
 	box-sizing: border-box;
 	padding-bottom: 32rpx;
 	
 	view {
 		overflow: hidden;
 		display: block;
 		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
 		.news-item {
 			box-sizing: border-box;
 			// flex-shrink: 0;
			width: 49%;
 			position: relative;
 			image {
 				width: 100%;
 				height: 300rpx;
 				display: block;
 			}
 			.news-text {
 				box-sizing: border-box;
 				padding: 20rpx 16rpx;
				width: 100%;
 				.news-title {
 					font-size: 26rpx;
 					color: #444444;
 					text {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
 				}
 				.news-price {
 					box-sizing: border-box;
 					.now {
 						font-size: 26rpx;
 						color: #FC3D3C;
 						font-weight: 700;
 						margin-right: 10rpx;
 					}
 					// .old {
 					// 	font-size: 20rpx;
 					// 	color: #D2D2D2;
 					// 	text-decoration: line-through;
 						
 					// }
 				}
 			}
 		}
 	}
 }
 .news-box.distanceActive {
	 margin-top: 16rpx;
 }
</style>
