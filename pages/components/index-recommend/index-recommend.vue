<template>
	<view class="recommend-box">
<!-- 		<view>{{recommendList}}</view> -->
		<view class="recommend" v-if="recommendList.length > 0">
			<block v-for="(item,index) in recommendList" :key="index">
				<view class="recommend-item" @click="goShop(item.shop_id)">
					<view class="recommend-left">
						<image v-if="item.shop_logo==''" src="/static/images/logo_03.png"></image>
						<image v-if="item.shop_logo!=''" :src="baseURL + item.shop_logo"></image>
					</view>
					<view class="recommend-right">
						<!-- 商店名称 -->
						<view class="title">
							<text class="main">{{item.shop_name}}</text>
						</view>
						<!-- 商店评分 -->
						<view class="rate" style="margin-top: 16rpx;">
							<view class="rate-left">
								<view class="score">
									<view >
										<block v-if="item.shop_deliverycredit">
											<image src="/static/images/start-active.png"
											v-for="(all,allIndex) in item.all" :key="allIndex">
											</image>
											<image src="/static/images/start-half.png"
											v-for="(half,halfIndex) in item.half" :key="halfIndex"></image>
											<image src="/static/images/start.png"
											v-for="(none,noneIndex) in item.none" :key="noneIndex"></image>
										</block>
										<text v-else style="font-size: 26rpx;">暂无评分</text>
										<text class="goal" v-if="item.shop_deliverycredit && item.shop_deliverycredit != 0">
										{{item.shop_deliverycredit}}分
										</text>
									<!-- 	<text>￥36/人</text> -->
									</view>
									
									<view class="rate-right">
										<text style="font-size: 24rpx;color: #797979;">{{ item.distance_number }}</text>
									</view>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 26rpx;color: #797979;margin-right: 16rpx;">
								<text>经营范围</text>
							</view>
							<image src="/static/images/renqi.png" mode="" style="width: 60rpx;height: 26rpx;"></image>
						</view>
						<view class="address" style="margin-right: 20rpx;">
							<text v-if="item.live_store_address">{{item.live_store_address}}</text>
							<text v-else>暂无该店铺相关地址信息</text>
						</view>
						<!-- <view style="display: flex;align-items: center;">
							<image src="/static/images/pinglun.png" mode="" style="width: 22rpx;height: 26rpx;"></image>
							<text style="font-size: 22rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-left: 20rpx;color: #C8C8C8;">店里的服务员很热情，虾片都是送的，可以免费加饭</text>
						</view> -->
			
					</view>
				</view>
			</block>
			
		</view>
		<view v-else style="box-sizing: border-box;padding: 30rpx;font-size: 26rpx;text-align: center;">附件暂无商铺</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommendList: {
				type: Array
			}
		},
		data() {
			return {
				baseURL:this.$api,
				score: ''
			};
		},
		methods:{
			goShop(id){
				let that = this;
				uni.navigateTo({
					url: '/pages/components/shop/shop?id='+id
				})
			}
		},
		created() {
			

		}
	}
</script>

<style lang="scss">
	.recommend-box {
		box-sizing: border-box;
		background: #fff;
		padding: 0 26rpx;
		.recommend {
			box-sizing: border-box;
			.recommend-item {
				padding: 28rpx 20rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 8rpx;
				overflow: hidden;
				margin-top: 20rpx;
				.recommend-left{
					box-sizing: border-box;
					float: left;
					width: 165rpx;
					height: 165rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.recommend-right{
					box-sizing: border-box;
					padding-left: 16rpx;
					float: left;
					width: calc(100% - 165rpx);
					.title {
						box-sizing: border-box;
						width: 100%;
						line-height: 30rpx;
						.main {
							font-size: 30rpx;
							font-weight: 700;
							color: #000;
							display: inline-block;
							max-width: 86%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						view {
							display: inline-block;
							font-size: 22rpx;
							margin-left: 18rpx;
							position: relative;
							padding: 4rpx 6rpx;
							background: #FFF5ED;
							color: #F19C49;
						}
					}
					.address {
						font-size: 26rpx;
						color: #797979;
					}
					.rate {
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 6rpx;
						.rate-left {
							flex: 1;
							box-sizing: border-box;
							color: #656565;
							font-size: 22rpx;
							display: flex;
							.score {
								box-sizing: border-box;
								display: flex;
								justify-content: space-between;
								align-items: center;
								width: 100%;
								image {
									width: 25rpx;
									height: 25rpx;
									margin-right: 6rpx;
								}
							}
							.goal {
								margin-left: 12rpx;
							}
							.symbol {
								margin-left: 12rpx;
								font-size: 16rpx;
								position: relative;
								top: 5rpx;
							}
						}
						.rate-right {
							box-sizing: border-box;
							font-size: 22rpx;
							color: #656565;
						}
					}
					.feature {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 22rpx;
						color: #656565;
						margin-top: 6rpx;
						.feature-left {
							box-sizing: border-box;
							flex: 1;
							max-width: 86%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text {
								margin-top: 12rpx;
							}
						}
						.feature-right {
							box-sizing: border-box;
							color: #FF4407;
						}
					}
					.ranking {
						box-sizing: border-box;
						font-size: 22rpx;
						color: #FF4407;
						margin-top: 10rpx;
						text {
							border: 1px solid #EAEAEA;
							padding: 3rpx 6rpx;
							display: inline-block;
							border-radius: 20rpx;
							border-bottom-left-radius: 0;
							margin-right: 8rpx;
						}
						text:last-child {
							margin-right: 0;
						}
						text.active {
							border-color: #FFD6C8;
						}
					}
					.group {
						font-size: 20rpx;
						color: #5F5F5F;
						margin-top: 16rpx;
						text:first-child {
							color: #fff;
							display: inline-block;
							padding: 2rpx 6rpx;
							margin-right: 10rpx;
							background: #FD490A;
							border-radius: 2rpx;
						}
					}
					.ticket {
						font-size: 20rpx;
						color: #5F5F5F;
						margin-top: 16rpx;
						text:first-child {
							color: #fff;
							display: inline-block;
							padding: 2rpx 6rpx;
							margin-right: 10rpx;
							background: #F99802;
							border-radius: 2rpx;
						}
					}
					
				}
			}
		}
	}
</style>
