<template>
	<view>
		<view class="pay">
			<text>需要支付</text>
			<text style="color: #f00;" v-if="!sum">￥{{payprice}}</text>
			<text style="color: #f00;" v-else>{{sum}}</text>
		</view>
		<view class="pay" style="margin-top: 30rpx;">
			<text>折扣</text>
			<text style="color: #f00;">￥{{discountPrince}}<span v-if="enough==0">(折扣券不足)</span></text>
		</view>
		<!-- 	<view class="pay" style="margin-top: 30rpx;" v-if="sum">
			<text>应付金额</text>
			<text style="color: #f00;" >￥{{sum}}</text>
		</view> -->
		<!-- 余额现金券支付 -->
		<view class="pay-box">
			<view class="pay-item">
				<text>现金券：￥{{n_money}}</text>
				<input type="number" placeholder="请输入使用额度" placeholder-style="color:#ccc" style="text-align: right;" v-model="cash"
				 @input="money($event)" />
			</view>
			<view class="pay-item">
				<text>使用余额：{{balance}}</text>
				<input type="number" placeholder="请输入使用余额" placeholder-style="color:#ccc" style="text-align: right;" v-model="remaining"
				 @input="changeBalance($event)" />
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="way">
			<view class="title">在线支付方式</view>
			<view class="item">
				<view>
					<image :src="$src+'/images/wx-pay.png'" mode=""></image>
					<text>微信支付</text>
				</view>
				<radio :checked="checked" color="#FED940" style="transform: scale(0.7);" @click="changeChecked"></radio>
			</view>
		</view>
		<!-- btn -->
		<view class="btn">
			<button @click="createOrderOffline()" style="font-size: 30rpx;background: #FED940;color: #fff;">
				微信支付
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
				enough: 1,
				checked: true,
				amount: 0, //订单总金额(未折扣)
				payprice: "", //需要支付的金额
				discountPrince: "", //折扣了的金额
				amountsPayable: 0, //应付金额
				balance: "", //用户余额
				n_coupon: "", //用户折扣券
				n_money: "", //用户现金券
				use_balance: 180, //用户使用的余额
				use_n_coupon: 0, //用户使用的折扣券
				use_n_money: 0, //用户使用的现金券
				shop_id: "",
				sum: '', //应付总额
				cash: '', //用户输入的现金券
				remaining: '', //用户输入的余额
				$src: this.$src
			};
		},
		onLoad() {
			request({
				url: "index.php?s=/wap/order/payOfflineOrder",
			}).then(res => {
				console.log(res);
				if (res.data.code == 200) {
					let tmp = res.data;
					// console.log(tmp.sumAmount);
					this.payprice = tmp.sumAmount;
					this.amount = tmp.amount;
					this.discountPrince = tmp.discountCoupon;
					this.balance = tmp.account.balance;
					this.n_coupon = tmp.account.n_coupon;
					this.n_money = tmp.account.n_money;
					this.shop_id = tmp.shop_id
					this.use_n_coupon = tmp.discountCoupon;
					this.sum = tmp.sumAmount;
					this.enough = tmp.enough;
				} else {
					uni.showToast({
						title: "获取订单失败!",
						icon: "none",
					})
				}
			})
		},
		methods: {
			changeChecked() {
				this.checked = !this.checked
			},
			// 点击微信支付
			createOrderOffline() {
				request({
					url: "index.php?s=/wap/order/createOfflineOrder",
					data: {
						shop_id: this.shop_id, //店铺ID
						use_balance: this.remaining, //使用的余额
						use_n_money: this.cash, //使用的现金券
						use_n_coupon: this.use_n_coupon, //使用的折扣券
						discount_account: this.payprice, //计算了折扣后的金额 就是后台返回来的金额
						amountsPayable: this.sum, //用户需要支付的金额   就是需要调用微信支付的金额
						amount: this.amount, //订单的总金额  后台给你的
					},
					method: "POST"
				}).then(res => {
					console.log(res);
					let data = res.data.msg;
					if (res.data.code > 0) {
						uni.showToast({
							title: data,
							icon: 'none'
						})
						var tmp = res;
						uni.getStorage({
							key: 'token',
							fail: res => {},
							success: res => {
								uni.setStorage({
									key: 'price',
									data: this.sum
								});
								let token = res.data[0];
								let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no=" + tmp.data
									.code_no + "&token=" + token);
								let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri=' +
									redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
								window.location.href = url;
							}
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						})
					}
				})
			},
			// 现金券
			money(event) {
				this.cash = parseInt(event.detail.value) || 0;
				if (this.n_money == 0 || !this.n_money) {
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
					// 当前应付总额
					let price = this.payprice;
					// 当前用户拥有的现金券
					let userCash = parseFloat(this.n_money);
					// 当前用户输入的现金券和余额的总和
					let sum = this.cash + (parseInt(this.remaining) ? parseInt(this.remaining) : 0);
					// 支付总额大于用户现有现金券,默认最大输入位当前现金券(this.n_money)
					if (this.remaining == '') {
						// 如果用户现金券小于当前的支付金额
						if (userCash < price) {
							// 输入现金券大于用户的现金券
							if (this.cash > userCash) {
								setTimeout(() => {
									this.cash = userCash;
									this.sum = (price - this.cash).toFixed(2)
								}, 50)
							} else {
								this.sum = (price - this.cash).toFixed(2);
							}
						}
						// 如果用户现金券大于当前的支付金额
						else {
							// 输入现金券大于当前的总价
							if (this.cash > price) {
								setTimeout(() => {
									this.cash = price
								}, 50)
								this.sum = 0
							} else {
								this.sum = (price - this.cash).toFixed(2)
							}
						}
					}
					// 如果用户输入的余额不为空
					else if (this.remaining != '') {
						// 如果用户拥有的现金券大于当前商品的总价
						if (userCash > price) {
							// 当前余额+现金券大于支付总额
							if (sum >= price) {
								// 输入的现金券小于当前支付总额
								if (this.cash < price) {
									setTimeout(() => {
										this.remaining = (price - this.cash).toFixed(2);
									}, 50)
									this.sum = 0;
								}
								// 输入的现金券大于当前商品价格
								else {
									setTimeout(() => {
										this.cash = price;
										this.remaining = 0
									}, 50)
									this.sum = 0;
								}
							} else {
								this.sum = (price - this.remaining - this.cash).toFixed(2)
							}
						}
						// 如果用户拥有的现金券小于当前商品的总价
						else {
							if (sum >= price) {
								// 如果输入的现金券大于用户的现金券
								if (this.cash > userCash) {
									setTimeout(() => {
										this.cash = userCash;
										this.sum = (price - this.remaining - userCash).toFixed(2)
									}, 50)
								} else {
									this.sum = (price - this.remaining - this.cash).toFixed(2);
								}
							} else {
								this.sum = (price - this.remaining - this.cash).toFixed(2);
							}
						}
					}
				}
			},
			// 余额
			changeBalance(event) {
				// 如果用户存在现金券
				this.remaining = parseInt(event.target.value) || 0;
				if (this.balance == 0 || !this.balance) {
					// uni的bug
					setTimeout(() => {
						this.remaining = 0;
					}, 50)
					uni.showToast({
						title: '余额为零',
						icon: 'none'
					})
					return
				} else {
					// 当前要支付的总价
					let price = this.payprice;
					// 当前用户拥有的余额
					let userBalance = parseFloat(this.balance);
					// 当前用户输入的现金券和余额的总和
					let sum = this.remaining + (parseInt(this.cash) ? parseInt(this.cash) : 0);
					// 如果现金券等于价格，默认给0
					if (this.cash == price) {
						setTimeout(() => {
							this.remaining = 0;
						}, 50)
					}
					// 如果用户没有输入现金券
					if (this.cash == '' || this.cash == 0) {
						// 如果余额存在且余额大于支付总额
						if (userBalance && userBalance >= price) {
							if (this.remaining > price) {
								setTimeout(() => {
									this.remaining = price;
								}, 50);
								this.sum = 0
							} else {
								this.sum = (price - this.remaining).toFixed(2)
							}
						}
						// 余额存在且余额小于支付总额
						else {
							if (this.remaining > userBalance) {
								setTimeout(() => {
									this.remaining = userBalance;
									this.sum = (price - this.remaining).toFixed(2)
								}, 50)
							} else {
								this.sum = (price - this.remaining).toFixed(2)
							}
						}
					}
					// 用户输入了现金券
					else {
						// 如果余额存在且余额大于支付总额
						if (userBalance && userBalance >= price) {
							if (this.remaining > price - this.cash) {
								setTimeout(() => {
									this.remaining = (price - this.cash).toFixed(2)
								})
								this.sum = 0;
							} else {
								this.sum = (price - this.remaining - this.cash).toFixed(2);
							}
						}
						// 余额小于支付总额
						else {
							if (this.remaining > userBalance) {
								setTimeout(
									() => {
										this.remaining = userBalance;
										this.sum = (price - this.remaining - this.cash).toFixed(2)
									}, 50)
							} else {
								this.sum = (price - this.remaining - this.cash).toFixed(2)
							}
						}
					}

				}
			}
		},
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
