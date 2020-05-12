<template>
	<view>
		<view class="pay">
			<text>需要支付</text>
			<text style="color: #f00;">￥{{add}}</text>
			<!-- 		<text style="color: #f00;" v-else>{{sum}}</text> -->
		</view>
		<view class="pay" style="margin-top: 30rpx;" v-if="userPay.discount_num">
			<text>折扣</text>
			<text style="color: #f00;">￥{{userPay.discount_num}}</text>
		</view>
		<!-- 余额现金券支付 -->
		<view class="pay-box">
			<view class="pay-item">
				<text>现金券：￥{{res.n_money}}</text>
				<input type="number" placeholder="请输入使用额度" placeholder-style="color:#ccc" style="text-align: right;" v-model="cash"
				 @input="money($event)" />
			</view>
			<view class="pay-item">
				<text>余额：￥{{res.balance}}</text>
				<input type="number" placeholder="请输入使用余额" placeholder-style="color:#ccc" style="text-align: right;" v-model="balance"
				 @input="changeBalance($event)" />
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="way">
			<view class="title">选择支付方式</view>
			<view class="item">
				<view>
					<image :src="$src+'/images/payment.png'" mode=""></image>
					<text>余额支付</text>
				</view>
				<radio color="#FED940" style="transform: scale(0.7);" @click="handleBalance" :checked="balanceWay"></radio>
			</view>
			<view class="item">
				<view>
					<image :src="$src+'/images/wx-pay.png'" mode=""></image>
					<text>微信支付</text>
				</view>
				<radio color="#FED940" style="transform: scale(0.7);" :checked="payWay" @click="handlePayWay"></radio>
			</view>
		</view>
		<!-- 支付密码 -->
		<view class="pay-item" v-if="passwordWin">
			<input type="password" placeholder="请输入支付密码" placeholder-style="color: #C0C0C0" @input="getUserPassword" />
		</view>
		<!-- btn -->
		<view class="btn" @click="handleOrder">
			<button style="font-size: 30rpx;background: #FED940;color: #fff;">
				支付
			</button>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../request.js"
	export default {
		data() {
			return {
				goods_id: '', //所选商品的id
				mobile: '', //充值的手机号码
				userPay: {}, //储存用户需要支付的金额和折扣的金额
				cash: '', //用户输入的现金券
				balance: '', // 用户输入的余额
				passwordWin: false, //控制支付密码显示/隐藏
				// 选择支付方式
				payWay: true,
				balanceWay: false,
				res: {}, //储存用户的现金券和余额
				add: '', //用户需要支付的金额
				userPassword: '' ,//用户的支付密码
				$src: this.$src
			}
		},
		onLoad(options) {
			this.getUserMoney();
			this.goods_id = options.id;
			this.mobile = options.mobile;
			this.getUserPay()
		},
		methods: {
			// 获取用户余额信息
			getUserMoney() {
				request({
					url: 'index.php?s=/wap/member/getMomeyInfo'
				}).then(res => {
					this.res = res.data.data;
					console.log(this.res);
				})
			},
			// 获取用户实付金额,已折扣的金额
			getUserPay() {
				request({
					url: 'index.php?s=/wap/media/buyMediaGoodsPay',
					method: 'post',
					data: {
						mobile: this.mobile, //用户充值的手机号,
						goods_id: this.goods_id
					}
				}).then(res => {
					this.userPay = res.data;
					this.add = parseFloat(res.data.price)
					console.log(this.userPay);
				})
			},
			// 使用现金券
			money(event) {
				// 如果支付金额存在，显示输入支付密码输入框
				this.passwordWin = event.detail.value || this.balance ? true : false;
				this.cash = parseInt(event.detail.value) || 0;
				if (this.res.n_money == 0 || !this.res.n_money) {
					// uni的bug
					setTimeout(() => {
						this.cash = 0;
					}, 50)
					uni.showToast({
						title: '现金券为零',
						icon: 'none'
					})
					return
				} else {
					// 如果输入金额大于商品总额,显示商品总额
					// 如果用户存在现金券
					this.cash = parseInt(event.detail.value) || 0;
					// 当前商品的总价
					let price = parseFloat(this.userPay.price);
					// 当前用户拥有的现金券
					let userCash = parseFloat(this.res.n_money);
					// 当前用户输入的现金券和余额的总和
					let sum = this.cash + (parseInt(this.balance) ? parseInt(this.balance) : 0);
					// 商品总额大于用户现有现金券,默认最大输入位当前现金券(this.res.n_money)
					if (this.balance == '') {
						// 如果用户现金券小于当前的商品价格
						if (userCash < price) {
							// 输入现金券大于用户的现金券
							if (this.cash > userCash) {
								setTimeout(() => {
									this.cash = userCash;
									this.add = (price - this.cash).toFixed(2)
								}, 50)
							} else {
								this.add = (price - this.cash).toFixed(2);
							}
						}
						// 如果用户现金券大于当前的商品价格
						else {
							// 输入现金券大于当前商品的总价
							if (this.cash > price) {
								setTimeout(() => {
									this.cash = price
								}, 50)
								this.add = 0
							} else {
								this.add = (price - this.cash).toFixed(2)
							}
						}
					}
					// 如果用户输入的余额不为空
					else if (this.balance != '') {
						// 如果用户拥有的现金券大于当前商品的总价
						if (userCash > price) {
							// 当前余额+现金券大于商品的价格
							if (sum >= price) {
								// 输入的现金券小于当前商品价格
								if (this.cash < price) {
									setTimeout(() => {
										this.balance = (price - this.cash).toFixed(2);
									}, 50)
									this.add = 0;
								}
								// 输入的现金券大于当前商品价格
								else {
									setTimeout(() => {
										this.cash = price;
										this.balance = 0
									}, 50)
									this.add = 0;
								}
							} else {
								this.add = (price - this.balance - this.cash).toFixed(2)
							}
						}
						// 如果用户拥有的现金券小于当前商品的总价
						else {
							if (sum >= price) {
								// 如果输入的现金券大于用户的现金券
								if (this.cash > userCash) {
									setTimeout(() => {
										this.cash = userCash;
										this.add = (price - this.balance - userCash).toFixed(2)
									}, 50)
								} else {
									this.add = (price - this.balance - this.cash).toFixed(2);
								}
							} else {
								this.add = (price - this.balance - this.cash).toFixed(2);
							}
						}
					}
				}
			},
			// 使用余额
			changeBalance(event) {
				// 如果支付金额存在，显示输入支付密码输入框
				this.passwordWin = event.detail.value || this.cash ? true : false;
				// 如果用户存在现金券
				this.balance = parseInt(event.detail.value) || 0;
				// 当前商品的总价
				let price = parseFloat(this.userPay.price);
				// 当前用户拥有的余额
				let userBalance = parseFloat(this.res.balance);
				// 当前用户输入的现金券和余额的总和
				let sum = this.balance + (parseInt(this.cash) ? parseInt(this.cash) : 0);
				// 如果现金券等于价格，默认给0
				if (this.cash == price) {
					setTimeout(() => {
						this.balance = 0;
					}, 50)
				}
				// 如果用户没有输入现金券
				if (this.cash == '' || this.cash == 0) {
					// 如果余额存在且余额大于商品价格
					if (userBalance && userBalance >= price) {
						if (this.balance > price) {
							setTimeout(() => {
								this.balance = price
							}, 50);
							this.add = 0
						} else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
					// 余额存在且余额小于商品价格
					else {
						if (this.balance > userBalance) {
							setTimeout(() => {
								this.balance = userBalance;
								this.add = (price - this.balance).toFixed(2)
							}, 50)
						} else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
				}
				// 用户输入了现金券
				else {
					// 如果余额存在且余额大于商品价格
					if (userBalance && userBalance >= price) {
						if (this.balance > price - this.cash) {
							setTimeout(() => {
								this.balance = price - this.cash;
							})
							this.add = 0;
						} else {
							this.add = (price - this.balance - this.cash).toFixed(2);
						}
					}
					// 余额小于商品价格
					else {
						if (this.balance > userBalance) {
							setTimeout(
								() => {
									this.balance = userBalance;
									this.add = (price - this.balance - this.cash).toFixed(2)
								}, 50)
						} else {
							this.add = (price - this.balance - this.cash).toFixed(2)
						}
					}
				}

			},
			// 选择余额支付
			handleBalance() {
				this.balanceWay = !this.balanceWay;
				this.payWay = !this.balanceWay;
				if (this.balanceWay) {
					this.passwordWin = true;
					// 如果当前用户的余额大于商品价格，默认填充
					if (parseInt(this.res.balance) > parseInt(this.userPay.price)) {
						// 如果当前用户有输入现金券
						if (this.cash) {
							this.balance = (this.userPay.price - this.cash).toFixed(2)
						} else {
							this.balance = this.userPay.price;
						}
						this.add = 0;
					} else {
						// 余额小于商品价格
						if (this.res.balance < this.userPay.price && this.res.balance) {
							// 如果用户有输入现金券res.n_money
							if (this.cash) {
								// 如果现金券+余额大于商品价格
								if (Number(this.balance) + Number(this.cash) > this.userPay.price) {
									this.balance = (this.userPay.price - this.cash).toFixed(2);
									this.add = 0;
								} else {
									let cash = this.cash || 0
									this.add = (this.userPay.price - this.balance - cash).toFixed(2)
								}
							}
							else {
								if(parseInt(this.res.balance) != 0) {
									this.balance = this.res.balance
								}
								
							}
						}
					}
				}
			},
			// 选择微信支付
			handlePayWay() {
				this.payWay = !this.payWay;
				this.balanceWay = !this.payWay;
				if (this.payWay) {
					this.balance = '';
					if (this.cash && this.balance) {
						this.add = (this.userPay.price - this.cash - this.balance).toFixed(2)
					} else if (this.cash) {
						this.add = (this.userPay.price - this.cash).toFixed(2);
					} else if (this.balance) {
						this.add = (this.userPay.price - this.balance).toFixed(2);
					} else {
						this.add = this.userPay.price
					}

				}
			},
			// 监听用户输入的密码
			getUserPassword(event) {
				// 去空
				this.userPassword = event.detail.value.replace(/\s+/g, "");
			},
			// 点击支付
			handleOrder() {
				console.log("handleOrder")
				// 如果有输入现金券或余额则判断输入支付密码是否为空
				if (this.cash || this.balance) {
					// 输入密码为空
					if (this.userPassword == '') {
						uni.showToast({
							title: '请输入支付密码',
							icon: 'none'
						});
						return
					}
					// 请求核对用户支付密码
					else {
						// 请求核对密码
						request({
							url: 'index.php?s=/wap/member/checkPayPass',
							method: 'post',
							data: {
								paypass: this.userPassword
							}
						}).then(res => {
							if (res.data.code < 0) {
								uni.showModal({
									title: res.data.msg,
									content: '是否前往设置支付密码？',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/components/setPayPassword/setPayPassword'
											})
										}
									}
								})
								// 测试用
								// this.handleFlowData();
							} else {
								// 这里调用订单支付
								uni.showToast({
									title: '数据加载中',
									icon: 'none'
								});
								request({
									url: 'index.php?s=/wap/media/createOrderForMedia',
									method: 'post',
									data: {
										n_money: this.cash ? this.cash : 0,
										balance: this.balance ? this.balance : 0,
										mobile: this.mobile ? this.mobile : '',
									},
								}).then(res => {
									uni.hideToast();
									console.log(res);
									console.log(res.data[0].code);
									// 成功
									if (res.data[0].code > 0) {
										// 如果输入的余额 + 现金券 > 商品总额，不调起微信支付
										let importBalance = parseInt(this.balance) ? parseInt(this.balance) : 0;
										let importCash = parseInt(this.cash) ? parseInt(this.cash) : 0;
										if (importCash + importBalance >= parseInt(this.userPay.price)) {
											uni.navigateTo({
												url: '/pages/components/order/order?status=2'
											})
										} else {
											// 获取token；不存在则跳转到登录页面
											let tmp = res;
											let token = uni.getStorageSync('token')[0];
											console.log(token);
											if (token == '') {
												uni.showToast({
													title: '请先登录',
													icon: 'none'
												});
												setTimeout(() => {
													uni.navigateTo({
														url: '/pages/components/login/login'
													})
												}, 500)
											} else {
												let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+tmp.data[0].order_no + "&token=" + token);
												let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
												window.location.href = url;
											}
										}
									}
									// 失败
									else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								})
							}
						})
					}

				}
				// 直接调起微信支付
				else if (!this.balance && !this.cash && this.payWay) {
					request({
						url: 'index.php?s=/wap/media/createOrderForMedia',
						method: 'post',
						data: {
							n_money: this.cash ? this.cash : 0,
							balance: this.balance ? this.balance : 0,
							mobile: this.mobile ? this.mobile : '',
						},
					}).then(res => {
						if (res.data[0].code > 0) {
							// 获取token；不存在则跳转到登录页面
							let tmp = res;
							let token = uni.getStorageSync('token')[0];
							if (token == '') {
								uni.showToast({
									title: '请先登录',
									icon: 'none'
								});
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/components/login/login'
									})
								}, 500)
							} else {
								let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+tmp.data[0].order_no + "&token=" + token);
								let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
								window.location.href = url;
							}
							
						}
						else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}
			},











		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F3F3;
	}

	.pay {
		box-sizing: border-box;
		line-height: 70rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
	}

	.way {
		margin-top: 80rpx;
		font-size: 28rpx;

		.title {
			line-height: 90rpx;
			padding: 0 30rpx;
			border-bottom: 1px solid #f1f1f1;
			background: #fff;
		}

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 90rpx;
			padding: 0 30rpx;
			background: #fff;
			border-bottom: 1px solid #f1f1f1;

			view {
				box-sizing: border-box;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 12rpx;
				}

				text {
					font-size: 28rpx;
				}
			}
		}
	}

	.pay-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #000;
		background: #fff;
	}

	.btn {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	// 余额现金券支付
	.pay-box {
		box-sizing: border-box;

		.pay-item {
			box-sizing: border-box;
			margin-top: 24rpx;
			line-height: 70rpx;
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			padding: 0 30rpx;
		}
	}
</style>
