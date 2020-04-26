<template>
	<view>
		<button type="warn" @click="getWechatPay">确认支付</button>
	</view>
</template>

<script>
	import {request} from "../../request.js";
	import wechat from '../../../common/wechat.js';
	export default {
		data() {
			return {
				url:'',
			}
		},
		onLoad(options) {
			console.log(options);
			if(options.type&&options.type==1){
				this.url = '/pages/mine/mine';
			}
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

<style>

</style>
