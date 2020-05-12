<template>
	<view>
		<!-- 支付方式 -->
		<view class="pay-way">
			<view class="pay">
				<text>充值方式</text>
				<view>
					<picker :range="payWay" :range-key="'name'" @change="changePay">
						<text>{{payWay[payIndex].name}}</text>
					</picker>
					<image :src="$src+'/images/icon-right.png'" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="pay-money">
			<view class="money">
				<view>充值金额</view>
				<view style="margin-top: 40rpx;font-size: 34rpx;" v-if="levelInfo[currentIndex]">￥{{levelInfo[currentIndex].quota}}</view>
			</view>
		</view>
		<!-- 充值选择 -->
		<view class="pay-choose">
			<view class="choose">
				<block v-for="(item,index) in levelInfo" :key="index">
					<view class="choose-item" v-if="index > 0" @click="act(index)" :class="index == currentIndex? 'active': ''">
						<view class="face">
							<text>￥{{item.quota}}元</text>
						</view>
						<view class="discount">
							<text>获{{item.money}}抵扣优惠券</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="address-item" v-show="showAddres">
			<view>
				<text>所在地区</text>
			</view>
			<picker @change="bindSelectProvince" :value="selectProvince" :range="province" :range-key="'province_name'">
				<view class="uni-input" v-if="province.length > 1">{{province[selectProvince].province_name}}</view>
			</picker>
			<picker @change="bindSelectCity" :value="selectCity" :range="city" :range-key="'city_name'">
				<view class="uni-input" v-if="city.length >0">{{city[selectCity].city_name}}</view>
			</picker>
			<picker @change="bindSelectDistrict" :value="selectDistrict" :range="district" :range-key="'district_name'">
				<view class="uni-input" v-if="district.length>0">{{district[selectDistrict].district_name}}</view>
			</picker>
			<!-- <input type="text" value="" placeholder="请输入城市区" placeholder-class="placeholder"/> -->
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button style="background: #FED940;" @click="upLevel()">确认充值</button>
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
				levelInfo: [],
				currentIndex: 1,
				province: [{
					'province_name': '请选择'
				}],
				city: [{
					'city_name': '请选择'
				}],
				district: [{
					'distrcit_name': '请选择'
				}],
				// 城市区相关数据
				provinceId: [],
				cityId: [],
				districtId: [],
				selectProvince: 1,
				selectCity: 0,
				selectDistrict: 0,
				showAddres: false,
				// 支付方式
				payWay:[
					{name: '微信支付',value: 0},
					{name: '余额支付',value: 1}
				],
				payIndex: 0,
				value: 0,//默认微信支付
				$src: this.$src
			};
		},
		onLoad() {
			this.getLevelInfo();
			this.getProvince();
		},
		methods: {
			getLevelInfo() {
				request({
					url: 'index.php?s=/wap/member/getMemberLevel',
				}).then(res => {
					this.levelInfo = res.data;
				});
			},
			act(index) {
				if (index == 4) {
					this.showAddres = true;
				} else {
					this.showAddres = false;
				}
				this.currentIndex = index;
			},
			// 提升等级
			upLevel() {
				let level_id = this.currentIndex;
				request({
					url: 'index.php?s=/wap/member/online',
					data: {
						dis_id: this.district[this.selectDistrict].district_id  ,
						level: this.currentIndex,
						type: this.value == 1  ? 1 : 0
					}
				}).then(res => {
					console.log(res);
					// 余额支付
					if (res.data.code == 200 && this.value == 1) {
						uni.showToast({
							title: "升级成功!",
							icon: "none"
						});
						setTimeout(function() {
							uni.switchTab({
								url: "/pages/mine/mine",
							});
						}, 2000);
					}
					// 微信支付
					else if (res.data.code == 203 && this.value == 0) {
						let tmp = res;
						uni.getStorage({
							key: 'token',
							success: res => {
								let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+tmp.data.no+"&token="+res.data[0]+"&type=1");
								let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
								window.location.href = url;
							},
							fail: res => {
								uni.showModal({
									title: '请先登录!',
									content: '是否前往登录页面?',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/components/login/login'
											})
										}
									},
								});
							}
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				});
			},
			// 改变支付方式
			changePay(e) {
				this.payIndex = e.detail.value;
				this.value = this.payWay[e.detail.value].value;
			},
			// 城市区相关选择
			bindSelectProvince(e) {
				this.selectProvince = e.detail.value;
				this.getCity();
			},
			bindSelectCity(e) {
				this.selectCity = e.detail.value;
				this.getDistrict();
			},
			bindSelectDistrict(e) {
				this.selectDistrict = e.detail.value;
			},
			// 读取省份
			getProvince() {
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url: 'index.php?s=/wap/index/getProvince',
					method: 'POST',
				}).then(res => {
					let province = res.data;
					if (address_id > 0) {
						for (var i in province) {
							if (province[i].province_id == address_info.province) {
								that.selectProvince = i;
							}
						}
					}
					that.province = province;
					that.getCity();
				});
			},
			// 读取城市
			getCity() {
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url: 'index.php?s=/wap/index/getCity',
					data: {
						province_id: that.province[that.selectProvince].province_id
					},
					method: 'POST',
				}).then(res => {
					let city = res.data;
					if (address_id > 0) {
						for (var i in city) {
							if (city[i].city_id == address_info.city) {
								that.selectCity = i;
							}
						}
					}
					that.city = city;
					that.getDistrict();
				});
			},
			// 读取地区
			getDistrict() {
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url: 'index.php?s=/wap/index/getDistrict',
					data: {
						city_id: that.city[that.selectCity].city_id
					},
					method: 'POST',
				}).then(res => {
					let district = res.data;
					if (address_id > 0) {
						for (var i in district) {
							if (district[i].district_id == address_info.district) {
								that.selectDistrict = i;
							}
						}
					}
					that.district = district;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}

	// 支付方式
	.pay-way {
		box-sizing: border-box;
		line-height: 70rpx;
		border-bottom: 1px solid #E4E4E4;
		padding: 0 30rpx;
		background: #fff;

		.pay {
			box-sizing: border-box;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #AAAAAA;

			text:nth-child(1) {
				flex: 1;
			}

			view {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}

	// 充值金额
	.pay-money {
		box-sizing: border-box;
		height: 200rpx;
		padding: 35rpx;
		font-size: 28rpx;
		color: #AAAAAA;
		border-bottom: 1px solid #E4E4E4;
		background: #fff;
	}

	// 协议
	.deal {
		box-sizing: border-box;
		background: #Fff;
		line-height: 70rpx;
		font-size: 24rpx;
		color: #AAAAAA;
		padding-left: 30rpx;
	}

	// 充值选择
	.pay-choose {
		box-sizing: border-box;
		padding: 60rpx 90rpx 80rpx 90rpx;

		.choose {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;

			.choose-item {
				box-sizing: border-box;
				width: calc(50% - 12rpx);
				border: 1px solid #FED940;
				background: #fff;
				padding: 24rpx;
				border-radius: 12rpx;
				margin-bottom: 36rpx;

				.face {
					font-size: 40rpx;
					color: #B4302D;
					text-align: center;
				}

				.discount {
					font-size: 24rpx;
					color: #B4302D;
					text-align: center;
				}

			}

			.choose-item:nth-child(2n) {
				margin-left: 12rpx;
			}

			.choose-item:nth-child(2n-1) {
				margin-left: 12rpx;
			}
		}
	}

	// 充值按钮
	.btn {
		box-sizing: border-box;
		padding: 36rpx;
	}

	.active {
		background: #F0AD4E !important;
	}

	.address-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E7E7E7;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;

		view {
			width: 165rpx;

			text {
				color: #000;
			}
		}

		input {
			flex: 1;
		}
	}

	.address-item.default {
		margin-top: 20rpx;
	}
</style>
