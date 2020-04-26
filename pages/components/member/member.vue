<template>
	<view>
		<image src="/static/images/member-01.png" class="top"></image>
		<image src="/static/images/member-02.png" class="main"></image>
		<image src="/static/images/member-03.png" class="bottom"></image>
		<button class="btn" @click="pay">成为会员</button>
	</view>
</template>

<script>
	import {request} from '../../request.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			pay() {
				uni.showModal({
					content: '是否确认充值成为会员?',
					success: res => {
						if(res.confirm) {
							this.upLevel()
						}
					},
				});
			},
			// 成为会员
			upLevel() {
				request({
					url: 'index.php?s=/wap/member/online',
					data: {
						level: 1,
						type: 0
					}
				}).then(res => {
					// 微信支付
					if (res.data.code == 203) {
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
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}
	.top {
		width: 100%;
		height: 210rpx;
		display: block;
	}
	.main {
		height: 680rpx;
		width: 90%;
		margin-left: 5%;
	}
	.bottom {
		width: 90%;
		margin-left: 5%;
		height: 150rpx;
		margin-top: 36rpx;
	}
	.btn {
		width: 90%;
		margin-left: 5%;
		background: #FED940;
		color: #000;
		margin-top: 36rpx;
	}
</style>
