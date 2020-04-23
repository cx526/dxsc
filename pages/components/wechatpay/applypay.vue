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
				alert("applypay");
				request({
					url:"index.php?s=/wap/pay/getPaySessionInfo",
				}).then(res=>{
					var tmpp = JSON.parse(res.data.pay);
					wechat.wchatapply(tmpp,res => {
						alert('callback');
						if(url) {
							uni.switchTab({
								url: this.url
							})
						}

					});
				})
			}
		}
	}
</script>

<style>

</style>
