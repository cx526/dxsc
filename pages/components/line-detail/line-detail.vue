<template>
	<view style="padding-bottom: 100rpx;">
		<view class="swiper-box" >
			<swiper indicator-dots indicator-color="rgba(187,187,187,0.4)" indicator-active-color="rgba(255,255,255,0.7)">
				<block v-if="imgUrl && imgUrl.length > 0">
					<swiper-item v-for="(item,index) in imgUrl" :key="index">
						<view>
							<image :src="item" mode="widthFix"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>	
		<view class="goods-info">
			<view class="goods-title">
				<view class="title">
					<!-- <text class="sell">促销</text> -->
					<text>美味的佛山猪脚饭美味的佛山猪脚饭美味的佛山猪脚饭美味的佛山猪脚饭美味的佛山猪脚饭美味的佛山猪脚饭</text>
				</view>
				<view class="price">
					<view>
						<text style="font-size: 28rpx;color: #f00;">￥99</text>
						<!-- <view style="font-size: 24rpx;color: #ccc;" v-if="dataList.is_stock_visible">
							库存: {{dataList.stock}}件
						</view> -->
					</view>
				<!-- 	<view>
						<text>邮费：{{sales}}</text>
					</view> -->
				</view>
			</view>
			<view class="goods-params">
				<text>规格</text>
				<view class="choose-params">
					<text>标准</text>
					<image :src="$src+'/images/icon-right.png'"></image>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="cut-line"></view>
			<!-- 店铺名 -->
			<view class="shop-box" @click="shop">
				<view class="shop">
					<image :src="$src+'/images/logo_03.png'" mode=""></image>
					<view class="shop-title">
						<view><text>牛蛙店</text></view>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="cut-line"></view>
			<view class="goods-sell">
				<!-- 详情、售后、评价 -->
				<view class="goods-nav">
					<block v-for="(item,index) in navList" :key="index">
						<view :class="{'active': currentIndex == index}" @click="handleClick(index)">
							<text>{{item}}</text>
						</view>
					</block>
				</view>
				<!-- 展示内容 -->
				<view class="goods-context">
					<!-- 详情 -->
					<view class="goods-show" v-if="currentIndex == 0">
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
						<image src="/static/images/newGoods_03.png"></image>
					</view>
					<!-- 评价 -->
					<view v-if="currentIndex == 1">
						<view class="goods-appraise">
							<view class="appraise-nav">
								<block v-for="(item,index) in appraiseNav" :key="index">
									<text :class="{'appraiseActive': appraiseIndex == index}" @click="handleAppraise(index)">{{item.name}}</text>
								</block>
							</view>
						</view>
						<view class="appraise-list">
								<view class="appraise-item">
									<view class="appraise-auth">
										<view>
											<image src="/static/images/logo_03.png" mode=""></image>
											<text>username</text>
										</view>
										
										<text>2020-4-1</text>
									</view>
									<view class="appraise-container">
										<view>评论内容</view>
									</view>
									<!-- 评论图片 -->
									<view class="appraise-show">
											<view><image :src="imgUrl[0]"></image></view>
									</view>
								</view>
						</view>
				<!-- 		<view v-else class="noneAppraise">
							<text>暂无评价</text>
						</view> -->
					</view>				

				</view>
			</view>
			<!-- 底部 -->
			<view class="footer-box">
				<view class="footer">
					<view class="collect">
						<view>
							<image :src="$src+'/images/service.png'" mode=""></image>
							<view><text>客服</text></view>
						</view>
						<view>
							<image :src="$src+'/images/collect.png'" mode="" style="width: 50rpx;"></image>
							<!-- <image v-if="is_favorate==1" src="/static/images/collect-active.png" mode="" style="width: 50rpx;"></image> -->
							<view><text>收藏</text></view>
						</view>
					</view>
					<view class="cart">
						<text>加入购物车</text>
					</view>
					<!-- 点击跳转到付款页面pay -->
					<view class="buy" >
						<text>立即下单</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: [
					"/static/images/vipBanner_03.png",
					"/static/images/vipBanner_03.png",
					"/static/images/vipBanner_03.png"
				],
				navList: ["详情","评价"],
				// 控制详情、评价、售后切换
				currentIndex: 0,
				// 控制评价类型
				appraiseIndex: 0,
				appraiseNav: [
					{
						type: 0,
						name: '全部评价6.2W'
					},
					{
						type: 1,
						name: '好评5K'
					},
					{
						type: 2,
						name: '中评2K'
					},
					{
						type: 3,
						name: '差评8'
					},
					{
						type: 4,
						name: '有图评价99'
					},
				],
				$src: this.$src
			};
		},
		methods: {
			// 切换详情、评价、售后
			handleClick(index) {
				this.currentIndex = index
			},
			// 切换评价类型
			handleAppraise(index) {
				this.appraiseIndex = index
			},
			// 跳转到店家页
			shop() {
				uni.navigateTo({
					url: '/pages/components/shop/shop'
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper-box {
			box-sizing: border-box;
			padding: 21rpx 21rpx 0 21rpx;
			background: #fff;
			swiper {
				box-sizing: border-box;
				width: 100%;
				// height: 600rpx;
				swiper-item {
					box-sizing: border-box;
					width: 100%;
					view {
						box-sizing: border-box;
						// height: 350rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	.goods-info {
		box-sizing: border-box;
		background: #fff;
		.goods-title {
			box-sizing: border-box;
			padding: 30rpx;
			padding-bottom: 20rpx;
			border-top: 1px solid #E7E7E7;
			border-bottom: 1px solid #E7E7E7;
			// height: 130rpx;
			.title {
				box-sizing: border-box;
				display: flex;
				align-content: center;
				.sell {
						background: #B4302D;
						box-sizing: border-box;
						color: #fff;
						font-size: 24rpx;
						padding: 0 4rpx;
						padding-top: 4rpx;
				}
				text:last-child {
					flex: 1;
					color: #686868;
					font-size: 30rpx;
					box-sizing: border-box;
					margin-left: 8rpx ;
				}
			}
			.price {
				box-sizing: border-box;
				display: flex;
				align-content: center;
				justify-content: space-between;
				view:first-child {
					box-sizing: border-box;
					flex: 1;
					text {
						font-size: 36rpx;
						color: #444;
					}
					// text:last-child {
					// 	font-size: 24rpx;
					// 	color: #B3B3B3;
					// 	text-decoration: line-through;
					// 	margin-left: 10rpx;
					// }
				}
				view:last-child {
					box-sizing: border-box;
					text {
						font-size: 18rpx;
						color: #AAAAAA;
					}
				}
			}
		}
	.goods-params {
		box-sizing: border-box;
		border-bottom: 1px solid #E7E7E7;
		line-height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
		text:first-child {
			flex: 1;
			font-size: 30rpx;
			color: #000;
		}
		.choose-params {
			box-sizing: border-box;
			text {
				font-size: 30rpx;
				color: #BDBDBD;
				margin-right: 12rpx;
			}
			image {
				width: 20rpx;
				height: 25rpx;
			}
		}
	}
	// 分割线
	.cut-line {
		background: #efeff4;
		height: 18rpx;
	}
	// 牛蛙店
	.shop-box {
		box-sizing: border-box;
		background: #fff;
		padding: 40rpx 30rpx;
		border-bottom: 1px solid #F1F1F1;
		.shop {
			display: flex;
			// align-items: center;
			
			image {
				width: 90rpx;
				height: 65rpx;
				margin-right: 16rpx;
			}
			.shop-title {
				font-size: 30rpx;
				color: #444;
			}
			
		}
	}
	.goods-sell {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		.goods-nav {
			box-sizing: border-box;
			border-bottom: 1px solid #E7E7E7;
			border-top: 1px solid #E7E7E7;
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			background: #fff;
			position: sticky;
			top: 0;
			view {
				flex: 1;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #444444;
				border-right: 1px solid #E7E7E7;
				text-align: center;
			}
			view:last-child {
				border-right: 0;
			}
			.active {
				color: #B4302D;
			}
		}
		.goods-show {
			box-sizing: border-box;
			image {
				width: 100%;
				display: block;
			}
		}
		.goods-appraise {
			box-sizing: border-box;
			height: 90rpx;
			border-bottom: 1px solid #E7E7E7;
			padding: 25rpx 0;
			.appraise-nav {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 20rpx;
				text {
					background: #EAF2F7;
					margin-right: 20rpx;
					padding: 4rpx;
					color: #9EA0A2;
				}
				text:last-child {
					margin-right: 0;
				}
				.appraiseActive {
					color: #fff;
					background: #B4302D;
				}
			}
		}
		.appraise-list {
			box-sizing: border-box;
			background: #fff;
			.appraise-item {
				box-sizing: border-box;
				padding: 32rpx 30rpx;
				border-bottom: 1px solid #E7E7E7;
				.appraise-auth {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					view {
						flex: 1;
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 18rpx;
							border-radius: 50%;
						}
						text:nth-child(2) {
							font-size: 28rpx;
							color: #444444;
						}
					}
					
					text:nth-child(2) {
						font-size: 24rpx;
						color: #AAAAAA
					}
				}
				.appraise-container {
					box-sizing: border-box;
					margin-top: 24rpx;
					view {
						color: #9B9B9B;
						font-size: 24rpx;
					}
				}
				.appraise-show {
					box-sizing: border-box;
					display: flex;
					margin-top: 45rpx;
					view {
						flex: 1;
						flex-shrink: 0;
						height: 220rpx;
						margin-right: 16rpx;
						width: calc(33.33% - 11rpx);
						box-sizing: border-box;
						border: 1px solid #E7E7E7;
						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
					view:last-child {
						margin-right: 0;
					}
				}
				.appraise-sell {
					box-sizing: border-box;
					text {
						font-size: 24rpx;
						color: #BBBBBB;
					}
				}				
			}
			.appraise-item:last-child {
				border-bottom: 0;
			}
		}
		.goods-sale {
			box-sizing: border-box;
			.sale-item {
				box-sizing: border-box;
				padding: 32rpx 30rpx 55rpx 32rpx;
				.sale-title {
					font-size: 26rpx;
					color: #444;
				}
				.sale-des {
					margin-top: 32rpx;
					font-size: 20rpx;
					color: #888888;
				}
			}
		}
		
	}
	// 底部
	.footer-box {
		box-sizing: border-box;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 90;
		.footer {
			box-sizing: border-box;
			display: flex;
			line-height: 100rpx;
			align-items: center;
			.collect,
			.buy,
			.cart{
				flex: 1;
				box-sizing: border-box;
				height: 100rpx;
				background: #f00;
				text-align: center;
				font-size: 30rpx;
				color: #fff;
				background: #B4302D;
			}
			.collect {
				padding-top:20rpx;
				background: #522121;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view {
					box-sizing: border-box;
					flex: 1;
					text-align: center;
					position: relative;
					image {
						width:40rpx;
						height: 40rpx;
						position: absolute;
						left: 50%;
						top: 15rpx;
						transform: translateX(-50%);
						
					}
					view {
						box-sizing: border-box;
						margin-top: 25rpx;
						text {
							font-size: 20rpx;
							color: #fff;
						}
					}
				}
			}
			.cart {
				background: #6C2E2E;
			}
		}
	}
	}	
</style>
