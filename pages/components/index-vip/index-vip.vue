<template>
<view class="vip-box">
<!-- 	<view class="vip-banner">
		<image v-if="topic" :src="topic"></image>
		<image v-else src="/static/images/vipBanner_03.png"></image>
	</view> -->
	<view class="vip-goods">
		<scroll-view scroll-x="true">
			<view class="goods-list" >
				<block v-for="(item,index) in vip_product" :key="index">
					<view class="goods" @click="goDetail(index)">
						<image :src="item.pic_cover_small"></image>
						<view class="goods-title">
							<text>{{item.goods_name}}</text>
						</view>
						<view class="goods-price">
							<view>
								<!-- <text class="new-unit"></text> -->
								<text class="new-price">优惠价：{{item.price}}</text>
							</view>
							<view class="old-price">
								<!-- <text class="new-unit"></text> -->
								<text>市场价：{{item.market_price}}</text>
							</view>
							<view>
								<text style="color: #B7B7B7;font-size: 18rpx;">已售{{item.sales}}</text>
							</view>
						</view>
						<!-- <image src="/static/images/red-tuijian%20.png" style="position: absolute;left: 0;top: 0;width: 40rpx;height: 40rpx;"></image> -->
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
	
	<view class="vip-get" style="margin: 50rpx 0;">
		<image src="/static/images/member.png" @click="goMoney" ></image>
	</view>
	
</view>
</template>

<script>
	export default {
		props: {
			topic: String,
			vip_product: Array
		},
		data() {
			return {
				
			}
		},
		methods: {
			goDetail(index) {
				let id = this.vip_product[index].goods_id
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			},
			goMoney() {
				uni.navigateTo({
					url: '/pages/components/money/money'
				})
			}
		}
	}
</script>

<style lang="scss">
	.vip-box {
		box-sizing: border-box;
		padding: 0 36rpx;
		.vip-banner {
			box-sizing: border-box;
			padding-bottom: 30rpx;
			image {
				width: 100%;
				height: 200rpx;
				display: block;
			}
		}
		.vip-goods {
			box-sizing: border-box;
			.goods-list {
				box-sizing: border-box;
				width: 100%;
				display: flex;
				white-space: nowrap;
				.goods {
					box-sizing: border-box;
					margin-right: 18rpx;
					box-sizing: border-box;
					width: 210rpx;
					position: relative;
					image {
						display: block;
						width: 100%;
						height: 208rpx;
					}
					.goods-title {
						white-space: normal;
						box-sizing: border-box;
						width: 210rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #0F0F0F;
						font-size: 23rpx;
						margin-top: 14rpx;
					}
					.goods-price {
						box-sizing: border-box;
						font-weight: 700;
						font-size: 20rpx;
						margin-top: 8rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.new-price,.new-unit {
							color: #FC4746;
						}
						.new-unit,.old-unit {
							font-weight: normal;
						}
						.old-price {
							font-weight: normal;
							color: #AAAAAA;
							text-decoration: line-through;
						}
					}
				}
				.goods:last-child {
					margin-right: 0;
				}
			}
		}
		.vip-get {
			height: 164rpx;
			box-sizing: border-box;
			margin-top: 30rpx;
			image {
				display: block;
				height: 100%;
				width: 100%;
			}
		}
	}
	.active {
		text-decoration: line-through;
		font-weight: normal !important;
		color: #727272 !important;
	}
	scroll-view [style*="overflow"]::-webkit-scrollbar {  
	  display: none;  
	}
</style>
