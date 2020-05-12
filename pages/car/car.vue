<template>
	<view v-if="loading">
		<view class="list-box">
			<view class="list-title">
				<view style="flex:1"></view>
				<text @click="getLocartion()">{{locationName}}</text>
				<image :src='$src + "/images/location.png"'></image>
			</view>
			<view class="list-empty" v-if="list.length == 0">
				您所在的位置暂无爆品哦
			</view>
			<view class="list" v-if="list">
				<block v-for="(item,index) in list" :key="index">
					<view class="list-item" @click="downLineDetail(item.goods_id)">
						<view class="list-img" >
							<image :src="baseURL + item.picture_cover" mode="aspectFill"></image>
						</view>
						<view class="list-context">
							<view class="list-address">
								<text class="name">{{item.shop_name}}</text>
								<view class="address">
									<text class="hide">
										{{item.live_store_address}}
									</text>
									<text class="line"></text>
									<text>{{item.distance_number}}</text>
								</view>
								
							</view>
							<view class="list-main">
								<!-- <text class="spcial">好吃的</text> -->
								<text style="position: relative;top: 2rpx;">{{item.goods_name}}</text>
							</view>
							<view class="list-price">
								<view class="now-price">
									<view class="price">
										<text>{{item.price}}</text>
										<text style="font-size: 26rpx;font-weight: normal;">元</text>
									</view>
									<button type="warn">购买</button>
								</view>
								<view class="old-price">
									<text style="text-decoration: line-through;">
										原价：{{item.market_price}}
									</text>
									<text>销售量：{{item.sales}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="none" v-if="!loadMore && list.length != 0">已加载全部</view>
			</view>
		</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import {
		getSwiper,
		request
	} from '../request.js'
	//#ifdef H5
	import wechat from '../../common/wechat.js'
	//#endif
	import Loading from '../common/loading/loading.vue'
	export default {
		data() {
			return {
				baseURL:this.$api,
				locationName: '获取当前位置',
				latitude: '',
				longitude: '',
				list: [],
				loading: false,
				page: 1,
				loadMore: true,
				$src: this.$src
			};
		},
		components: {
			Loading
		},
		onLoad() {
			let that = this;
			// 定位
			uni.getStorage({
				key: "position",
				fail: function(res) { 
					that.loading = true;
					that.getLocartion();
					
				},
				success: function(res) {
					that.latitude = res.data[0];
					that.longitude = res.data[1];
					that.getGoodsList();
					uni.getStorage({
						key: "positionName",
						fail: function(res) {
							that.getLocationName();
						},
						success: function(res) {
							that.locationName = res.data;
						}
					})
				}
			})
		},
		// 加载更多商家
		onReachBottom() {
			if(this.loadMore) {
				this.page += 1;
				this.getGoodsList();
			}
		},
		methods: {
			getlocationpoint() {
				let that = this;
				let latitude;
				let longitude;
				if (wechat.isWechat()) {
					wechat.location(function(res) {
						latitude = res.latitude;
						longitude = res.longitude;
						that.latitude = latitude;
						that.longitude = longitude;
						uni.setStorage({
							key: 'position',
							data: Array(latitude, longitude)
						})
						that.getLocationName();
						that.getGoodsList();
					});
				} else {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							function(position) {
								latitude = position.coords.latitude; //获取纬度
								longitude = position.coords.longitude; //获取经度
								that.latitude = latitude;
								that.longitude = longitude;
								uni.setStorage({
									key: 'position',
									data: Array(latitude, longitude)
								})
								that.getLocationName();
								that.getGoodsList();
							});
					} else {
						uni.showToast({
							title: '不支持定位功能',
							icon: 'none'
						});
					}
				}
			},
			getLocartion() {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				let that = this;
				let position = that.getlocationpoint();
				uni.hideLoading();
			},
			// 获取城市名
			getLocationName() {
				let that = this;
				request({
						url: 'index.php?s=/wap/index/apiGetLocateName',
						data: {
							latitude: that.latitude,
							longitude: that.longitude,
						}
					})
					.then(res => {
						that.locationName = res.data.data.result.ad_info.city;
						uni.setStorage({
							key: 'positionName',
							data: res.data.data.result.ad_info.city
						})
					});
			},
			// 获取商品
			getGoodsList() {
				let that = this;
				uni.showLoading({
					title:"加载中",
					mask:true
				});
				request({
						url: 'index.php?s=/wap/index/apiGetBoomGoods',
						data: {
							latitude: that.latitude,
							longitude: that.longitude,
							page: that.page
						}
					})
					.then(res => {
						uni.hideLoading();
						that.flag = true;
						this.loading = true
						if(res.data.list.length == 0) {
							that.loadMore = false;
							uni.showToast({
								title: '暂无更多数据',
								icon: 'none'
							})
						}
						else {
							that.loading = true;
							that.list = [...that.list,...res.data.list];
						}
					});
			},
			downLineDetail(id) {
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f4f4f4;
	}
	.list-empty{
		padding:0 20rpx;
		font-size: 35rpx;
		line-height: 100rpx;
		color:#888;
		text-align: center;
	}
	.list-box {
		box-sizing: border-box;
		.list-title {
			box-sizing: border-box;
			padding: 0 12rpx;
			line-height: 60rpx;
			background: #fff;
			display: flex;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			text {
				font-size: 28rpx;
				color: #444;
			}
		}

		.list {
			box-sizing: border-box;
			.list-item {
				box-sizing: border-box;
				background: #fff;
				padding: 30rpx;
				.list-img {
					width: 100%;
					height: 400rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.list-context {
					font-size: 26rpx;
					.list-address {
						display: flex;
						box-sizing: border-box;
						padding: 26rpx 0;
						font-size: 26rpx;
						justify-content: space-between;
						color: #949494;
						.line {
							display: inline-block;
							width: 1px; 
							height: 70%;
							background: #949494;
							margin: 0 8rpx;
						}
						.address {
							display: flex;
							align-items: center;
							overflow:hidden
						}
						.name {
							flex-shrink: 0;
							margin-right: 10rpx;
						}
					}
					.list-main {
						box-sizing: border-box;
						color: #444;
						line-height: 40rpx;
						font-size: 36rpx;
						.spcial {
							display: inline-block;
							background: #FFD828;
							padding: 8rpx 12rpx;
							font-size: 24rpx;
							margin-right: 10rpx;
							color: #4B262D;
						}
						// border-bottom: 1px solid #eee;
					}
					.list-price {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						margin-top: 18rpx;
						flex-direction: column;
						.now-price {
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
							// align-items: center;
							.price {
								flex: 1;
								font-size: 38rpx;
								color: #FE1E1C;
								font-weight: 700;
							}
							button {
								font-size: 26rpx;
								width: 120rpx;
							}
						}
						.old-price {
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
							margin-top: 12rpx;
							font-size: 24rpx;
							color: #797979;
						}
					}
				}
			}
		}
	}
	.hide {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		color: #666;
		text-align: center;
	}
</style>
