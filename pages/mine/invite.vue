<template>
	<view>
		<image v-if="is_boss" :src="qrcode" class="qrcode"></image>
		<view v-if="is_boss" class="text">会员扫该码<br/>确认后即可绑定为您的员工</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../request.js'
	export default {
		data() {
			return {
				is_boss:0,
				qrcode:'',
			}
		},
		onLoad(options){
			if(typeof options.uid!='undefined'){
				let uid = options.uid;
				uni.showModal({
					content: '确定要成为该合作伙伴的员工吗？',
					success: res => {
						if(res.confirm) {
							request({
								url:'index.php?s=/wap/member/bindStaff',
								method:"POST",
								data:{uid:uid},
							}).then(res=>{
								uni.showToast({
									title:res.data.msg,
									icon: 'none',
								})
								if(res.data.code==1){
									setTimeout(function(){
										uni.switchTab({
											url:"/pages/mine/mine"
										})
									},1000);
								}
							});
						}
					}
				});
			}else{
				this.is_boss = 1;
				this.getQrcode();
			}
		},
		methods:{
			getQrcode(){
				let that = this;
				request({
					url:"index.php?s=/wap/member/getBossQrcode",
					data:{
						plat:'wap',
					}
				}).then(function(res){
					that.qrcode = res.data;
				});
			}
		}
	}
</script>

<style>
	.qrcode{
		width:80%;
		margin: 30rpx 10%;
	}
	.text{
		width:80%;
		margin:10rpx 10%;
		font-size: 36rpx;
		color:#888;
		line-height: 60rpx;
		text-align: center;
	}
</style>
