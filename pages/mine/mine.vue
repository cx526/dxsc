<template>
	<view v-if="loading">
		<!-- 用户未登录时显示 -->
		<view class="noLogin" v-if="!isLogin">
			<view class="logo">
				<image :src="$src+'/images/user-logo.png'" mode=""></image>
			</view>
			<view class="des">
				<view>
					<text>新零售双线平台,</text>
				</view>
				<view>
					<text>强力打通线上线下,更快,更省。</text>
				</view>
			</view>
			<view class="btn">
				<view class="login">
					<button @click="login()">登录</button>
				</view>
				<view class="register">
					<button @click="register()">注册</button>
				</view>
			</view>
		</view>
		<!-- 用户登录时显示 -->
		<view class="Login-box" v-else>
			<view class="user-logo">
				<view class="logo">
					
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view class="user-img">
						
							<image :src="$src+'/images/shop-logo.png'" mode="" v-if="avatar == 0" @click="userInfo"></image>
							<image :src="baseURL + avatar" v-else @click="userInfo"></image>
						</view>
						<view class="user-main" style="width: 200rpx;overflow: hidden;">
							<text style="font-size: 32rpx;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{user_name}}</text>
							<text v-if="res">{{res.data.level_name}}</text>
						</view>
					</view>
					<view class="money" style="display: flex;align-items: center;overflow: hidden;" v-if="user_balance">
						<view>
							<text style="font-size: 22rpx;font-weight: 700;">{{user_balance.balance ? user_balance.balance: 0.00}}</text>
							<text>余额</text>
						</view>
						<view>
							<text style="font-size: 22rpx;font-weight: 700;">{{user_balance.n_money ? user_balance.n_money: 0.00}}</text>
							<text>现金券</text>
						</view>
						<view>
							<text style="font-size: 22rpx;font-weight: 700;">{{user_balance.n_coupon ? user_balance.n_coupon: 0.00}}</text>
							<text>折扣券</text>
						</view>
					</view>
				</view>
				<view class="user-member">
					<image :src="$src+'/images/member1.png'" mode="" @click="goPayMoney"></image>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="order-box" style="box-sizing: border-box;background: #f4f4f4;margin-top: 40rpx;border: none;">
				<view class="order" 
				style="background: #fff;padding:0 20rpx;border-top-left-radius: 18rpx;border-top-right-radius: 18rpx;">
					<text>我的订单</text>
				</view>
			</view>
			<view class="order-list" 
			style="background: #fff;margin: 0 30rpx;border-bottom-left-radius: 18rpx;border-bottom-right-radius: 18rpx;">
				<view class="order-item"  @click="order('all')">
					<view class="order-img">
						<image :src="$src+'/images/alldingdan.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>全部订单</text>
					</view>
				</view>
				<view class="order-item" @click="order(1)">
					<view class="order-img">
						<image :src="$src+'/images/fukuan.png'" mode=""></image>
						<text class="order-icon">{{ordernum[0]}}</text>
					</view>
					<view class="order-text">
						<text>待付款</text>
					</view>
				</view>
				<view class="order-item" @click="order(2)">
					<view class="order-img">
						<image :src="$src+'/images/shouhuo.png'" mode=""></image>
						<text class="order-icon">{{ordernum[1]}}</text>
					</view>
					<view class="order-text">
						<text>待发货</text>
					</view>
				</view>
				<view class="order-item" @click="order(4)">
					<view class="order-img">
						<image :src="$src+'/images/pingjia.png'" mode=""></image>
						<text class="order-icon">{{ordernum[2]}}</text>
					</view>
					<view class="order-text">
						<text>待评价</text>
					</view>
				</view>
			</view>

			<!-- 我的服务 -->
			<view class="order-box" style="box-sizing: border-box;background: #f4f4f4;margin-top: 40rpx;border: none;">
				<view class="order" 
				style="background: #fff;padding:0 20rpx;border-top-left-radius: 18rpx;border-top-right-radius: 18rpx;">
					<text>我的服务</text>
				</view>
			</view>
			<view class="order-list"
			style="background: #fff;margin: 0 30rpx;border-bottom-left-radius: 18rpx;flex-wrap: wrap;
			border-bottom-right-radius: 18rpx;">
				<view class="list-item order-item" @click="money">
					<view class="order-img">
						<image :src="$src+'/images/user-money.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的钱包</text>
					</view>
				</view>
				<view class="list-item order-item" @click="address">
					<view class="order-img">
						<image :src="$src+'/images/user-address.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的地址</text>
					</view>
				</view>
				<view class="list-item order-item" @click="collect">
					<view class="order-img">
						<image :src="$src+'/images/user-collect.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的收藏</text>
					</view>
				</view>
				<!-- <view class="list-item order-item">
					<view class="order-img">
						<image :src="$src+'/images/user-xiaoxi.png" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的消息</text>
					</view>
				</view> -->
				<view class="list-item order-item" @click="tuiguang">
					<view class="order-img">
						<image :src="$src+'/images/user-tuiguan.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的推广</text>
					</view>
				</view>
				<view class="list-item order-item" @click="goBusiness">
					<view class="order-img">
						<image :src="$src+'/images/user-ruzhu.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>商家入驻</text>
					</view>
				</view>
				<!-- <view class="list-item order-item" @click="goBusinessManage">
					<view class="order-img">
						<image :src="$src+'/images/user-ruzhu.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>商家管理</text>
					</view>
				</view> -->
				<view class="list-item order-item" @click="staff" v-if="is_parter">
					<view class="order-img">
						<image :src="$src+'/images/user-manage.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>管理中心</text>
					</view>
				</view>
				<view class="list-item order-item" @click="goGroup()" v-if="res.data&&res.data.level_id >= 2">
					<view class="order-img">
						<image :src="$src+'/images/tuandui.png'" mode=""></image>
					</view>
					<view class="order-text">
						<text>我的团队</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import { request,getToken,Token } from '../request.js'
	import Loading from '../common/loading/loading.vue'
	export default {
		data() {
			return {
				is_parter:0,
				statusHeight: '',
				baseURL:this.$api,
				isLogin:true,
				user_name:'未登陆',
				avatar:'',
				ordernum:{
					0:0,
					1:0,
					2:0
				},
				area:'',
				// 储存推广的uid
				uid: '',
				res: '',
				// 用户的余额信息
				user_balance: '',
				// 加载图
				loading: false,
				$src: this.$src
			};
		},
		components: {
			Loading
		},
		onShow() {
			this.getLogin();
			uni.getSystemInfo({
				success: res => {
					this.statusHeight = res.statusBarHeight + 'px'
				}
			})
			// 获取用户余额信息
			this.getUserMoney();
			

		},
		methods:{
			// 检测登录状态
			getLogin() {
				let that = this;
				request({
						url:"index.php?s=/wap/member/checkLogin",
						method:"POST",
					}).then(res=>{
						that.loading = true
						// 未登录
						if(res.data.code == 201) {
							this.isLogin = false
						}else{
							this.isLogin = true;
							// 获取用户信息
							that.getUserInfo();
						}
					});
			},
			// 获取用户个人信息
			getUserInfo(){
				let that = this;
				request({
						url:"index.php?s=/wap/member/Api_member_index",
						method:"POST",
					}).then(function(res){
						// 推广uid保存到本地
						uni.setStorage({
							key: 'uid',
							data: res.data.uid
						});
						that.loading = true;
						that.res = res;
						that.is_parter = res.data.is_parter;
						// 储存推广的uid
						that.uid = res.data.uid;
						that.user_name = res.data.user_name;
						that.avatar = res.data.member_img;
						that.ordernum = {
							0:res.data.unpaidOrder,
							1:res.data.shipmentPendingOrder,
							2:res.data.goodsNotReceivedOrder,
						};
						let address = res.data.address;
						that.area = address.province + " " + address.city + " " + address.district;
					});
			},
			// 获取用户余额信息
			getUserMoney() {
				request({
					url: 'index.php?s=/wap/member/getMomeyInfo'
				}).then(res => {
					this.user_balance = res.data.data;
				})
			},

			// 跳转到登录页
			login() {
				uni.navigateTo({
					url: '../components/login/login'
				})
			},
			// 跳转到注册页
			register() {
				uni.navigateTo({
					url:'../components/register/register'
				})
			},
			// 跳转到order我的订单页
			order(status) {
				uni.navigateTo({
					url: '/pages/components/order/order?status='+status
				})
			},
			// 跳转到收藏页
			collect() {
				uni.navigateTo({
					url: '/pages/components/collect/collect'
				})
			},
			// 跳到收货地址
			address() {
				uni.navigateTo({
					url:'/pages/components/address/address'
				})
			},
			// 跳转到我的钱包页面
			money() {
				uni.navigateTo({
					url: '/pages/components/money/money'
				})
			},
			// 跳转到商家入驻页面
			goBusiness() {
				uni.navigateTo({
					url: '/pages/components/business-nav/business-nav'
				})
			},
			// 跳转到商家管理页面
			goBusinessManage() {
				uni.navigateTo({
					url: '/pages/components/business-manage/business-manage'
				})
			},
			// 跳转到我的推广页面
			tuiguang() {
				uni.navigateTo({
					url: '/pages/components/generalize/generalize?uid='+this.uid
				})
			},
			// 跳转到个人中心页
			userInfo() {
				uni.navigateTo({
					url: '/pages/components/userInfo/userInfo'
				})
			},
			//跳转员工管理
			staff(){
				uni.navigateTo({
					// url: '/pages/mine/staff'
					url: '/pages/components/preson-status/preson-status'
				})
			},
			
			// 跳转到充值页面
			goPayMoney() {
				uni.navigateTo({
					url: '/pages/components/member/member'
				})
			},
			// 跳转到我的团队
			goGroup() {
				uni.navigateTo({
					url: '/pages/components/group/group'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f4f4f4;
	}
	//  用户未登录时显示 
	.noLogin {
		box-sizing: border-box;
		.logo {
			width: 220rpx;
			height: 170rpx;
			margin: 0 auto;
			padding-top: 80rpx;
			justify-content: space-between;
			flex: 1;
			image {
				width: 100%;
				height: 100%;
			}
			
		}
		.des {
			font-size: 33rpx;
			view {
				text-align: center;
				color: #C8C7CC;
			}
		}
		.btn {
			position: absolute;
			bottom: 110rpx;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			.login,.register {
				box-sizing: border-box;
				height: 90rpx;
				button {
					width: 60%;
					height: 100%;
					text-align: center;
					font-size: 32rpx;
					color: #C8C7CC;
					border-radius: 60rpx;
				}
			}
			.login {
				margin-bottom: 24rpx;
				button {
					box-sizing: border-box;
					border: 1px solid #fff;
			
				}
				button:after {
					border: none;
				}
				
			}
			.register {
				button {
					background: #F14B64;
					color: #fff;
				}
			}
		}
	}
	// 用户登录时显示
	.Login-box {
		box-sizing: border-box;
		.user-logo {
			background: url(https://www.dxsc.vip/images/order-header.png) no-repeat;
			background-size: cover;
			height: 240rpx;
			.logo{
				box-sizing: border-box;
				display: flex;
				padding: 0 40rpx;
				padding-top: 24rpx;
				align-items: center;
				justify-content: space-between;
				.user-img {
					width: 100rpx;
					height: 100rpx;
					margin-right: 16rpx;
					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.user-main {
					display: flex;
					flex-direction: column;
					color: #080409;
					font-size: 26rpx;
				}
				.money {
					display: flex;
					view {
						display: flex;
						flex-direction: column;
						font-size: 24rpx;
						justify-content: center;
						margin-right: 30rpx;
						text-align: center;
					}
					view:last-child {
						margin-right: 0;
					}
				}
			}
			.user-member {
				height: 90rpx;
				width: 100%;
				margin-top: 46rpx;
				box-sizing: border-box;
				padding: 0 30rpx;
				image {
					width: 100%;
					height: 100%;
					
				}
			}
		}
		.order-box {
			box-sizing: border-box;
			border-bottom: 1px solid #E7E7E7;
			line-height: 90rpx;
			padding: 0 30rpx;
			background: #fff;
			.order {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				image:nth-child(1) {
					width: 50rpx;
					height: 50rpx;
				}
				text {
					flex: 1;
					box-sizing: border-box;
					padding-left: 12rpx;
					font-size: 30rpx;
				}
				image:nth-child(3) {
					width: 40rpx;
					height: 40rpx;
				}
			}
			
		}
		.order-list {
			box-sizing: border-box;
			// line-height: 150rpx;
			background: #fff;
			// height: 150rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.order-item {
				box-sizing: border-box;
				margin-bottom: 40rpx;
				text-align: center;
				width: 25%;
				flex-shrink: 0;
				.order-img {
					box-sizing: border-box;
					position: relative;
					image {
						width: 50rpx;
						height: 50rpx;
					}
					.order-icon {
						position: absolute;
						left: 52%;
						top: -4rpx;
						line-height: 16rpx;
						width: 32rpx;
						height: 32rpx;
						line-height: 32rpx;
						background: #FED940;
						color: #fff;
						font-size: 20rpx;
						border-radius: 50%;
					}
				}
				.order-text {
					font-size: 26rpx;
				}
			}
			// .list-item {
			// 	width: 25%;
			// 	flex-shrink: 0;
			// }
		}
		.line {
			box-sizing: border-box;
			height: 18rpx;
			background: #EFEFF4;
		}
	}
	
</style>
