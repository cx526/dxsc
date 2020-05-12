<template>
	<view v-if="loading">
		<view class="user-info">
			<image v-if="headJpg" :src="headJpg" mode=""></image>
			<image v-else :src="$src+'/images/shop-logo.png'" mode=""></image>
			<text v-if="shopName">{{shopName}}</text>
			<text v-else>商家</text>
		</view>
		<view class="add">
			<input v-model="amount" placeholder="询问服务人员后输入消费总额" placeholder-style="font-size: 28rpx">
		</view>
		<view class="reminder">
			 <radio :checked="checked" style="transform: scale(0.7);" color="rgb(230, 67, 64)" @click="changeCheck"/>
			 <text>输入不参与折扣金额(如酒水、套餐等)</text>
		</view>
		<view class="discount" v-if="checked">
			<input v-model="discountamount" placeholder="询问服务人员后输入不参与折扣金额" placeholder-style="font-size: 28rpx">
		</view>
		<view style="box-sizing: border-box;padding: 30rpx 30rpx 0 30rpx;">
			<button  style="font-size: 30rpx;background: #FED940;" @click="goPay">去买单</button>
		</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import {request} from "../../request.js"
	import Loading from '../../common/loading/loading.vue'
	export default {
		data() {
			return {
				checked:false,
				discountamount:"",
				amount:"",
				uid:0,
				shop_id:0,
				shopInfo:[],
				headJpg:"",
				shopName:"",
				loading: false,
				$src: this.$src
			};
		},
		components: {
			Loading
		},
		onLoad(ob){
			//获取上级ID
			if(ob.uid !=0 ){
				this.uid= ob.uid
			}
			//获取店铺ID
			if(ob.shop_id !=0){
				this.shop_id = ob.shop_id;
				this.getShopInfo(this.shop_id);
			}
			this.checkLogin();
		},
		methods: {
			changeCheck() {
				this.checked = !this.checked
			},
			// 买单页面
			goPay() {
				if (this.amount <= 0 ){
					uni.showToast({
						title:"总金额不能为0",
						icon:"none",
					})
				}
				request({
					url:"index.php?s=/wap/order/offlineOrderSetSession",
					data:{
						shop_id:this.shop_id,
						amount:this.amount,
						discountamount:this.discountamount,
					}
				}).then(res=>{
					this.loading = true
					if(res.data==1){
						uni.navigateTo({
							url:"/pages/components/checkstand/checkstand",
							
						})
					}
				})
				
			},
			/**
			 *	检查是否登录
			 */
			checkLogin(){
				request({
					url:"index.php?s=/wap/member/checkLogin"
				}).then(res=>{
					if(res.data !=""){
						this.wechatLogin();
					}
				})
			},
			//微信登录
			wechatLogin(){
				uni.getStorage({
					key: 'token',
					fail: res => {
						
					},
					success:res =>{
						let token = res.data[0];
						let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/login/wchatLogin&token="+token+"&pid="+this.uid);
						let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
						window.location.href = url;
					}
				});
			},
			//获取店铺信息
			getShopInfo(shop_id){
				request({
					url:"index.php?s=/wap/shop/getShopInfo",
					data:{
						shop_id:shop_id,
					}
				}).then(res=>{
					this.loading = true;
					if(res.data !=""){
						this.shopInfo = res.data;
						this.headJpg = this.$api+res.data.shop_logo;
						this.shopName = res.data.shop_name
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		box-sizing: border-box;
		padding: 30rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
		text {
			font-size: 28rpx;
			font-weight: 700;
		}
	}
	.add,.discount {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
		input {
			border-radius: 8rpx;
			height: 80rpx;
			border: 1px solid #f1f1f1;
			box-sizing: border-box;
			padding-left: 24rpx;
		}
	}
	.reminder {
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		text {
			font-size: 24rpx;
			color: #ccc;
		}
	}
</style>
