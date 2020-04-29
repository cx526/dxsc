<template>
	<view>
		<!-- 支付方式 -->
		<view class="pay-way">
			<view class="pay">
				<text>充值方式</text>
				<view>
					<text>微信支付</text>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="pay-money">
			<view class="money">
				<view>充值金额</view>
				<view style="margin-top: 40rpx;font-size: 38rpx;">￥{{currentFace}}</view>
			</view>
		</view>
		<!-- 协议 -->
		<!-- <view class="deal">
			<text>同意支付服务协议</text>
		</view> -->
		<!-- 充值选择 -->
		<view class="pay-choose">
			<view class="choose">
				<block v-for="(item,index) in payList" :key="index">
					<view class="choose-item" @click="act(index)" :class="index == currentIndex? 'active': ''">
						<view class="face">
							<text>￥{{item.face}}元</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button style="background: #FED940;" @click="chongzhi">确认充值</button>
		</view>
	</view>
</template>

<script>
	import {request} from "../../request.js"
	export default {
		data() {
			return {
				currentIndex:0,
				// 当前选中的金额
				currentFace: 50,
				// 充值面值选项
				payList: [
					{
						face: 50
					},
					{
						face: 100
					},
					{
						face: 200
					},
					{
						face: 600
					},
				],
			};
		},

		methods:{
			// 区域代理显示地区选择
			act(index){
				this.currentIndex = index;
				this.currentFace = this.payList[index].face;
			},
			// 充值
			chongzhi(){
				request({
					url:"index.php?s=/wap/member/userRechage",
					data:{money:this.currentFace},
				}).then(res=>{
					if(res.data.code==200){
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
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
				});
			}
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
			// flex: 1;
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
.active{
	background: #FED940 !important;
	color: #000 !important;
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
