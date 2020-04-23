<template>
	<view>
		<view class="set-box">
			<view class="set-line">
				<view class="set-label">普通返点(%)</view>
				<view class="set-input"><input data-key="0" class="input" type="digit" :value="info[0]" @input="changeInfo" /></view>
			</view>
			<view class="set-line">
				<view class="set-label">VIP返点(%)</view>
				<view class="set-input"><input data-key="1" class="input" type="digit" :value="info[1]" @input="changeInfo" /></view>
			</view>
			<view class="set-line">
				<view class="set-label">商家返点(%)</view>
				<view class="set-input"><input data-key="2" class="input" type="digit" :value="info[2]" @input="changeInfo" /></view>
			</view>
			<view class="set-line">
				<view class="set-label">团队长返点(%)</view>
				<view class="set-input"><input data-key="3" class="input" type="digit" :value="info[3]" @input="changeInfo" /></view>
			</view>
			<view class="set-line">
				<view class="set-label">代理返点(%)</view>
				<view class="set-input"><input data-key="4" class="input" type="digit" :value="info[4]" @input="changeInfo" /></view>
			</view>
			<view class="set-line">
				<view class="set-label">商家流水(%)</view>
				<view class="set-input"><input data-key="5" class="input" type="digit" :value="info[5]" @input="changeInfo" /></view>
			</view>
		</view>
		<view class="btn">
			<button style="background: #FEE16A;" @click="saveSet">保存</button>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				uid:0,
				info:[],
				saveinfo:[],
			};
		},
		onLoad(options){
			this.uid = options.id;
			this.getInfo(options.id);
		},
		methods: {
			getInfo(id){
				let that = this;
				request({
					url:"index.php?s=/wap/member/apiGetStaffInfo",
					method:"POST",
					data:{
						uid:id
					}
				}).then(function(res){
					if(res.data.code==1){
						let setInfo = res.data.staff;
						that.info = [setInfo.staff_rate1,setInfo.staff_rate2,setInfo.staff_rate3,setInfo.staff_rate4,setInfo.staff_rate5,setInfo.staff_rate6];
					}
				});
			},
			changeInfo(obj){
				this.info[obj.target.dataset.key] = obj.detail.value;
			},
			saveSet(){
				let saveInfo = this.info;
				request({
					url:"index.php?s=/wap/member/apiEditStaff",
					method:"POST",
					data:{
						uid:this.uid,
						rate1:saveInfo[0],
						rate2:saveInfo[1],
						rate3:saveInfo[2],
						rate4:saveInfo[3],
						rate5:saveInfo[4],
						rate6:saveInfo[5],
					}
				}).then(function(res){
					uni.showToast({
						title:res.data.msg,
						icon: 'none',
					})
				});
			}
		},
	}
</script>

<style>
	.set-box{
		width:90%;
		overflow: hidden;
		padding:20rpx 5%;
		color:30rpx;
	}
	.set-line{
		overflow: hidden;
		width:100%;
		line-height:60rpx;
		margin-bottom: 10rpx;
	}
	.set-label{
		float: left;
		width:38%;
		margin-right: 2%;
		text-align: left;
	}
	.set-input{
		float: left;
		width:53%;
		text-align: left;
	}
	.set-input input{
			padding:0 10rpx;
			border: 2rpx solid #888;
			color:30rpx;
			line-height:60rpx;
			height: 60rpx;
			width:90%;
	}
	.btn {
		box-sizing: border-box;
		padding: 30rpx;
	}
	
</style>
