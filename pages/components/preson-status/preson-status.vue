<template>
	<view>
		<!-- 个人信息 -->
		<view class="user-info">
			<view class="user-img">
				<image :src="baseURL + info.user_headimg" mode=""></image>
			</view>
			<view class="user-status">
				<view>
					<text style="margin-right: 24rpx;font-size: 36rpx;">{{info.nick_name}}</text>
					<text>合伙人</text>
				</view>
				<view>
					<text style="margin-right: 24rpx;">区域</text>
					<text>{{info.region_name}}</text>
				</view>
			</view>
		</view>
		<!-- 收入信息 -->
		<view class="manage-box">
			<view class="manage">
				<view class="manage-title">
					<text>经营数据</text>
					<image :src="'$src+/images/icon-right.png'" mode=""></image>
				</view>
				<view class="manage-list">
					<view class="manage-item"
					v-for="(item,index) in manageList" :key="index">
						<text>{{item.name}}</text>
						<text>{{item.money}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 管理人员列表 -->
		<view class="person-box">
			<view class="person">
				<view class="person-item" @click="goStaff">
					<text>我的员工</text>
					<image :src="'$src+/images/icon-right.png'" mode=""></image>
				</view>
				<view class="person-item" @click="bindStaff">
					<text>绑定新员工</text>
					<image :src="'$src+/images/icon-right.png'" mode=""></image>
				</view>
				<!-- <view class="person-item"
				v-for="(item,index) in personList" :key="index"
				@click="goStaff">
					<text>{{item.name}}</text>
					<image :src="/static/images/icon-right.png'" mode=""></image>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				info:[],
				manageList: [
					{
						name: '商家总额',
						money: '￥100.00'
					},
					{
						name: '上月总额',
						money: '￥100.00'
					},
					{
						name: 'VIP充值',
						money: '￥100.00'
					},
					{
						name: '上月预估',
						money: '￥100.00'
					}
				],
				personList: [
					{
						name: '我的经理'
					},
					{
						name: '我的商家'
					},
					{
						name: 'VIP会员'
					},
					{
						name: '普通会员'
					}
				],
				$src: this.$src
			};
		},
		onLoad(){
			this.getInfo();
		},
		methods:{
			getInfo(){
				let that = this;
				request({
					url:"index.php?s=/wap/member/apiParterCenter",
					method:"POST",
				}).then(function(res){
					if(res.data.code==1){
						that.info = res.data.info;
						that.manageList[0].money = "￥"+res.data.stat.history;
						that.manageList[1].money = "￥"+res.data.stat.last;
						that.manageList[2].money = "￥"+res.data.stat.recharge;
						that.manageList[3].money = "￥"+res.data.stat.predict;
					}
				});
			},
			// 跳转到我员工页面
			goStaff() {
				uni.navigateTo({
					url: '/pages/components/my-staff/my-staff'
				})
			},
			bindStaff(){
				uni.navigateTo({
					url:"/pages/mine/invite"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 个人信息
	.user-info {
		box-sizing: border-box;
		background: #FED940;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		.user-img {
			width: 160rpx;
			height: 160rpx;
			margin-right: 48rpx;
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.user-status {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			view:nth-child(1) {
				font-size: 32rpx;
			}
			view:nth-child(2) {
				font-size: 28rpx;
				margin-top: 12rpx;
			}
		}
	}
	// 收入信息
	.manage-box {
		box-sizing: border-box;
		background: #FED940;
		padding: 0 30rpx;
		.manage {
			background: #fff;
			border-radius: 20rpx;
			box-shadow: 4px 4px 4px #ccc;
			padding-top: 30rpx;
			padding-bottom: 56rpx;
			.manage-title {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #3C3C3C;
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.manage-list {
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				margin-top: 36rpx;
				.manage-item {
					width: 50%;
					font-size: 28rpx;
					text-align: center;
					margin-bottom: 24rpx;
					text:nth-child(1) {
						color: #999999;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
	// 管理人员列表
	.person-box {
		box-sizing: border-box;
		padding: 0 30rpx;
		.person {
			box-sizing: border-box;
			background: #fff;
			.person-item {
				box-sizing: border-box;
				padding: 0 28rpx;
				font-size: 28rpx;
				line-height: 90rpx;
				border-bottom: 1px solid #f1f1f1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.person-item:last-child {
				border-bottom: 0;
			}
		}
	}
</style>
