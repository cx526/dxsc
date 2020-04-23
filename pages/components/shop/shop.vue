<template>
	<view style="padding-bottom: 100rpx;">
		<view class="swiper-box" v-if="imgUrl">
			<swiper indicator-dots indicator-color="rgba(187,187,187,0.4)" indicator-active-color="rgba(255,255,255,0.7)" style="height: 600rpx;">
				<block v-if="imgUrl && imgUrl.length > 0">
					<swiper-item v-for="(item,index) in imgUrl" :key="index" style="height: 600rpx;">
						<view style="height: 100%;">
							<image :src="item" style="height: 600rpx"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 店铺详情 -->
		<view class="shop-box">
			<view class="shop">
				<view class="shop-item">
					<text>店名：</text>
					<text style="font-weight: 700;">{{shop_name}}</text>
				</view>
				<view class="shop-item">
					<text>预约电话：</text>
					<text v-if="shop_phone != ''">{{shop_phone}}</text>
					<text v-else>暂无资料</text>
				</view>
				<view class="shop-item">
					<text>店铺二维码：</text>
					<image :src="baseURL+'index.php?s=/wap/shop/apiShopQrcode?shop_id='+shop_id" mode="" style="width:100px;height:100px" ref="shopImg" @click="preview"></image>
				</view>
				<view class="shop-item">
					<text>店铺地址：</text>
					<view style="display: flex;align-items: center;">
						<text style="color: #BEBEBE;" v-if="shop_address">{{shop_address}}</text>
						<text v-else>暂无资料</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品展示 -->
<!-- 		<view>{{goods}}</view> -->
		<view class="product-show">
			<view class="product-title">
				<text style="border-bottom: 3px solid #FED940;display: inline-block;">为你推荐</text>
			</view>
			<view class="product" v-if="goods && goods.length > 0">
				<block v-for="(v,index) in goods" :key="index">
					<view class="product-item" @click="goodsinfo(v.goods_id)">
						<view class="product-img">
							<image :src="baseURL + v.img" mode=""></image>
						</view>
						<view class="product-context" style="text-align: left;display: flex;flex-direction: column;">
							<text style="display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;overflow: hidden;margin: 12rpx 0;">{{v.goods_name}}</text>
							<view>
								<text style="color: #C3000B;font-size: 26rpx;margin-right: 10rpx;">平台价：{{v.price}}</text>
								<text style="color: #AAAAAA;font-size: 24rpx;text-decoration: line-through;">
									市场价：{{v.market_price}}
								</text>
							</view>
							
						</view>
					</view>
				</block>
			</view>
			<view v-else style="text-align: center;box-sizing: border-box;padding: 30rpx;font-size: 24rpx;">暂无相关推荐</view>
		</view>
		<!-- 底部 -->
		<view class="footer-box">
			<view class="footer">
				<view class="cart" @click="goMoney" style="background: #333333;">
					<text>充值会员</text>
				</view>
				<!-- 点击跳转到付款页面pay -->
				<view class="buy" @click="goRefer" style="background: #FED22E;color: #1F0A00;">
					<text>咨询买单</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				imgUrl: [
					"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386247472,87720242&fm=26&gp=0.jpg",
					"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg",
				],
				shop_name:'',
				shop_address:'',
				shop_phone:'',
				goods:[],
				QRcodeUrl:'123',
				$api: '',
				qr:'',
				isLogin: '',
				// 储存预览店铺图片的路径
				shopSrc: []
			};
		},
		onShow() {
			this.getUserInfo();
			
		},
		onLoad(options) {
			this.shop_id = options.id;
			this.getUserInfo();
			this.checkLogin()
		},
		mounted() {
			// 获取要预览图片的路径
			this.shopSrc.push(this.$refs.shopImg.src);
		},
		methods: {
			// 检测登录
			checkLogin() {
				request({
					url:"index.php?s=/wap/member/checkLogin",
					method:"POST",
				}).then(res => {
					if(res.data.code == 201) {
						this.isLogin = false
					}
					else {
						this.isLogin = true
					}
				})
			},
			//获取信息
			getUserInfo() {
				let that = this;
				request({
						url:"index.php?s=/wap/shop/apiIndex",
						method:"POST",
						data: {
							shop_id: this.shop_id,
						}
					}).then(function(res){
						that.shop_name = res.data.shop_info.shop_name;
						that.shop_address = res.data.shop_info.shop_address;
						that.shop_phone = res.data.shop_info.shop_phone;
						that.imgUrl = [
							that.baseURL + res.data.shop_info.shop_logo,
							// that.baseURL + res.data.shop_info.shop_banner,
							// that.baseURL + res.data.shop_info.shop_avatar,
						];
						that.goods = res.data.goods;
						that.qr = res.data.qr;
					});
			},
			// 充值会员
			goMoney() {
				if(!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return
				}
				else {
					uni.navigateTo({
						url: '/pages/components/money/money'
					})
				}
			},
			// 咨询买单
			goRefer() {
				if(!this.isLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return
				}
				else {
					uni.navigateTo({
						url: '/pages/components/refer-member/refer-member?shop_id='+this.shop_id
					})
				}
				
			},
			// 商品详情
			goodsinfo(id) {
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			},
			// 预览店铺图
			preview() {
				uni.previewImage({
					urls: this.shopSrc
				})
			},
		}
	}
</script>

<style lang="scss">
	// 轮播图
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
						height: 100%;
						image {
							width: 100%;
							height: 600rpx;
						}
					}
				}
			}
		}
		// 店铺详情页
		.shop-box {
			box-sizing: border-box;
			border-top: 1px solid #EFEFEF;
			.shop {
				box-sizing: border-box;
				.shop-item {
					padding: 30rpx;
					font-size: 30rpx;
					color: #444;
					display: flex;
					align-items: center;
					justify-content: space-between;
					// line-height: 90rpx;
					border-bottom: 1px solid #EFEFEF;
				}
			}
		}
	// 商品展示
	.product-show {
		box-sizing: border-box;
		// margin-top: 30rpx;
		.product-title {
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size: 32rpx;
			font-weight: 700;
			line-height: 80rpx;
			
		}
		.product {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 24rpx;
			.product-item {
				box-sizing: border-box;
				margin-bottom: 20rpx;
				width: 48%;
				.product-img {
					width: 100%;
					height: 300rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.product-context {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				text-align: center;
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
</style>
