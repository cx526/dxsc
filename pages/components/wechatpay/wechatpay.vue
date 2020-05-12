<template>
	<view>
		<view class="notice">
			<text>支付方式</text>
			<text>{{price}}元</text>
		</view>
		<view class="way">
			<view>
				<image :src="$src+'/images/wx-pay.png'"></image>
				<text>微信</text>
			</view>
			<view>
				<radio color="#FED940" checked="true" style="transform: scale(0.7);"/>
			</view>
		</view>
		<view class="btn">
			<button @click="getWechatPay" type="warn">去支付</button>
		</view>
		
	</view>
</template>

<script>
	import {request} from "../../request.js";
	//#ifdef H5
	import wechat from '../../../common/wechat.js';
	//#endif
	// import { mapState } from 'vuex'
	export default {
		data() {
			return {
				url:'',
				$src: this.$src,
				price: ''
			}
		},

		onLoad(options) {
			console.log(this.$store)
			console.log(this.price)
			if(options.type&&options.type==1){
				this.url = '/pages/mine/mine';
			}
		},
		onShow() {
			uni.getStorage({
				key: 'price',
				success: res => {
					this.price = res.data
				}
			})
		},
		methods: {
			getWechatPay(){
				uni.showLoading({
					title:"发起支付中",
					mask:true
				})
				request({
					url:"index.php?s=/wap/pay/getPaySessionInfo",
				}).then(res=>{
					uni.hideLoading();
					var tmpp = JSON.parse(res.data.pay);
					wechat.wchatapply(tmpp,res=>{
						if(this.url && this.url != '') {
							uni.switchTab({
								url: this.url
							})
						}
						else {
							uni.navigateTo({
								url: '/pages/components/order/order?status=1'
							})
						}
						
					},res=>{
						uni.hideLoading();
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						})
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.notice {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		font-size: 30rpx;
		padding: 0 30rpx;
		line-height: 80rpx;
	}
	.way {
		box-sizing: border-box;
		display: flex;
		line-height: 80rpx;
		font-size: 30rpx;
		align-items: center;
		padding: 0 30rpx;
		background: #fff;
		justify-content: space-between;
		view:nth-child(1) {
			display: flex;
			align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
.btn {
	box-sizing: border-box;
	padding: 0 30rpx;
	button {
		background: #FED940;
	}
}
</style>
