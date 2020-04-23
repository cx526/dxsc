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
				<view style="margin-top: 84rpx" v-if="levelInfo[currentIndex]">￥{{levelInfo[currentIndex].quota}}</view>
			</view>
		</view>
		<!-- 协议 -->
		<view class="deal">
			<text>同意支付服务协议</text>
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
				<!-- <view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view>
				<view class="choose-item">
					<view class="face">
						<text>￥200元</text>
					</view>
					<view class="discount">
						<text>获1200抵扣优惠券</text>
					</view>
				</view> -->
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
	import {request} from "../../request.js"
	export default {
		data() {
			return {
				levelInfo:[],
				currentIndex:1,
				province: [{'province_name':'请选择'}],
				city:  [{'city_name':'请选择'}],
				district: [{'distrcit_name':'请选择'}],
				provinceId:[],
				cityId:[],
				districtId:[],
				selectProvince:1,
				selectCity:0,
				selectDistrict:0,
				showAddres:false,
			};
		},
		onLoad(){
			this.getLevelInfo();
			this.getProvince();
		},
		methods:{
			getLevelInfo(){
				request({
					url:'index.php?s=/wap/member/getMemberLevel',
				}).then(res=>{
					this.levelInfo = res.data;
				});
			},
			act(index){
				if(index ==4){
					this.showAddres= true;
				}else{
					this.showAddres =false;
				}
				this.currentIndex = index;
			},
			upLevel(){
				let level_id = this.currentIndex;
				request({
					url:'index.php?s=/wap/member/online',
					data:{
						dis_id:this.district[this.selectDistrict].district_id,
						level:this.currentIndex
					}
				}).then(res=>{
					if(res.data.code > 0){
						uni.showToast({
							title:"绑定成功!",
							icon:"none"
						});
						setTimeout(function(){
							uni.switchTab({
								url:"/pages/mine/mine",
							});
						},2000);
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						});
					}
				});
			},
			bindSelectProvince(e){
				this.selectProvince = e.detail.value;
				this.getCity();
			},
			bindSelectCity(e){
				this.selectCity = e.detail.value;
				this.getDistrict();
			},
			bindSelectDistrict(e){
				this.selectDistrict = e.detail.value;
			},
			getProvince(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getProvince',
					method:'POST',
				}).then(res=>{
					let province = res.data;
					console.log(address_info);
					if(address_id>0){
						for(var i in province){
							console.log(province[i].province_id + ' - ' + address_info.province);
							if(province[i].province_id==address_info.province){
								that.selectProvince = i;
							}
						}
					}
					that.province = province;
					that.getCity();
				});
			},
			getCity(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getCity',
					data:{
						province_id:that.province[that.selectProvince].province_id
					},
					method:'POST',
				}).then(res=>{
					let city = res.data;
					if(address_id>0){
						for(var i in city){
							console.log(city[i].province_id + ' - ' + address_info.province);
							if(city[i].city_id==address_info.city){
								that.selectCity = i;
							}
						}
					}
					that.city = city;
					that.getDistrict();
				});
			},
			getDistrict(){
				let that = this;
				let address_id = this.address_id;
				let address_info = this.address_info;
				request({
					url:'index.php?s=/wap/index/getDistrict',
					data:{
						city_id:that.city[that.selectCity].city_id
					},
					method:'POST',
				}).then(res=>{
					let district = res.data;
					if(address_id>0){
						for(var i in district){
							console.log(district[i].district_id + ' - ' + address_info.district);
							if(district[i].district_id==address_info.district){
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
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #AAAAAA;
		text:nth-child(1) {
			flex: 1;
		}
		view {
			box-sizing: border-box;
			image {
				width: 40rpx;
				height: 40rpx;
				position: relative;
				top: 10rpx;
			}
		}
	}
}
// 充值金额
.pay-money {
	box-sizing: border-box;
	height: 200rpx;
	padding: 35rpx;
	font-size: 24rpx;
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
			border: 1px solid #B4302D;
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
