<template>
	<view v-if="loading">
		<!-- userinfo -->
		<view class="user-info">
			<view class="user-img">
				<view v-if="userInfo">
					<image :src="$api + userInfo.user_headimg"></image>
				</view>
				<view v-else>
					<image :src="$src+'/images/shop-logo.png'" mode=""></image>
				</view>
				<text v-if="userInfo">{{userInfo.nick_name}}</text>
				<text v-else @click="goLogin()">请先登录</text>
			</view>
			<view class="user-number">
				<text v-if="userInfo">{{userInfo.n_coupon}}</text>
				<text v-else>0.00</text>
				<view>
					<text>折扣券余额</text>
				</view>
			</view>
		</view>
		<!-- banner图 -->
		<view class="banner">
			<image :src="$src+'/images/discount-01.png'" mode=""></image>
		</view>
		<!-- 产品推荐 -->
		<view class="product-box">
			<view class="product-title">
				<text>精品推荐</text>
			</view>
			<view class="product-context" v-if="goodsList && goodsList.length > 0">
				<block v-for="(item,index) in goodsList" :key="index">
					<view class="product-item" @click="goDetail(item.goods_id)">
						<view class="product-show">
							<image :src="$api + item.pic_cover" mode=""></image>
						</view>
						<view class="product-main">
							<view 
							style="color: #414141;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							{{item.goods_name}}
							</view>
							<view class="price">
								<view>
									<text style="color: #FE1E1C;">￥{{item.price}}</text>
									<text style="font-size: 22rpx;color: #DCDCDC;text-decoration: line-through;margin-left: 8rpx;">￥{{item.market_price}}</text>
								</view>
								<view style="background: #FE1E1C;padding: 0 20rpx;border-radius: 30rpx;">
									<text style="color: #fff;font-size: 24rpx;">抢购</text>
									<image :src="$src+'/images/icon-right.png'" mode="" style="width: 20rpx;height: 20rpx;"></image>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="!flag" class="none">
					<text>暂无更多数据</text>
				</view>
			</view>
		</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import { request } from '../../request.js'
	import Loading from '../../common/loading/loading.vue'
	export default {
		data() {
			return {
				userInfo: '',
				goodsList: [],
				page: 1,
				flag: true,
				$api: this.$api,
				loading: false,
				$src: this.$src
			};
		},
		components:{
			Loading
		},
		onShow() {
			this.getUserInfo();
			this.getGoodsList();
		},
		onReachBottom() {
			if(this.flag) {
				this.page+=1;
				this.getGoodsList()
			}
		},
		methods: {
			// 前往登录页
			goLogin() {
				uni.navigateTo({
					url:"/pages/components/login/login"
				})
			},
			// 获取用户个人信息
			getUserInfo() {
				request({
					url: 'index.php?s=/wap/member/couponList'
				}).then(res => {
					this.userInfo = res.data.member;
				})
			},
			// 获取推荐商品
			getGoodsList() {
				if(this.page != 1) {
					uni.showLoading({
						title:"数据加载中",
						mask:true
					});
				}
				request({
					url: 'index.php?s=/wap/member/couponList',
					method: 'post',
					data: {
						page: this.page
					}
				}).then(res => {
					this.loading = true
					if(res.data.code != 201) {
						
						uni.hideLoading()
						if(res.data.goods && res.data.goods.length < 10) {
							this.flag = false;
						}
						this.goodsList = [...this.goodsList,...res.data.goods];
					}
					
				})
			},
			// 跳转到商品详情页
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		},
		
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
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		text-align: center;
	}
</style>
