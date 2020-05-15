<template>
	<view>
		<view class="news-box " :class="isMarginTop ? 'distanceActive': ''">
			<view class="news">
				<view style="box-sizing: border-box;padding: 0 20rpx;">
					<block v-for="(item,index) in newsList" :key="index">
						<!-- 跳转到goods-detail页面 -->
						<view class="news-item" @click="handleClick(item.goods_id)">
							<!-- #ifndef H5 -->
							<image :src="item.pic_cover_small" class="image"></image>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<easy-loadimage :scroll-top="scrollTop" :image-src="item.pic_cover_small" class="image"></easy-loadimage>
							<!-- #endif -->
							<view class="news-text">
								<view class="news-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="news-price">
										<view class="now"><text>优惠价：{{item.price}}</text></view>
										<view class="old"><text>市场价：{{item.market_price}}</text></view>
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
	// #ifdef H5
	import easyLoadimage from '../../../components/easy-loadimage/easy-loadimage.vue'
	// #endif
	export default {
		props: {
			newsList: {
				type: Array
			},
			// 定义图片外边包裹的div是否有外边距
			isMarginTop: {
				type: Boolean
			},
			scrollTop: {
				type: Number
			}
		},
		// #ifdef H5
		components: {
			easyLoadimage
		},
		// #endif
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
 			.image {
 				width: 100%;
 				height: 300rpx;
 				display: block;
 			}
 			.news-text {
 				box-sizing: border-box;
 				padding: 20rpx 16rpx;
				width: 100%;
 				.news-title {
 					font-size: 30rpx;
 					color: #444444;
					width: 100%;
 					text {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
 				}
 				.news-price {
 					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
 					.now {
 						font-size: 28rpx;
 						color: #FC3D3C;
 						font-weight: 700;
 						margin-right: 10rpx;
 					}
					.old {
						text-decoration: line-through;
						color: #AAAAAA;
						font-size: 24rpx;
					}
 					
 				}
 			}
 		}
 	}
 }
 .news-box.distanceActive {
	 margin-top: 16rpx;
 }
</style>
