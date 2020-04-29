<template>
	<view>
		<!-- 导航 -->
		<view class="nav-box">
			<view class="nav">
				<view class="nav-item"
				v-for="(item,index) in navList" :key="index"
				:class="currentIndex == index? 'active': ''"
				@click="changeNabIndex(index)">
					<text>{{item.title}}</text>
					<text style="text-align: center;" class="number">{{item.number}}</text>
				</view>
			</view>
		</view>
		<!-- 店家数据 -->
		<view v-if="currentIndex == 0">
			<view class="shop-list">
				<block v-for="(item,index) in shop" :key="index">
				<view class="shop-item">
					<view class="shop-img">
						<image :src="baseURL + item.shop_logo" mode=""></image>
					</view>
					<view class="shop-context">
						<view class="shop-info">
							<text class="name">{{item.shop_name}}</text>
							<text class="hidden">地址：{{item.shop_address}}</text>
						</view>
						<view class="order"><text>订单数：{{item.stat.ordernum}}</text></view>
						<view class="params">
							<text>总营业额：{{item.stat.historysell}}</text>
							<text>本月营业额：{{item.stat.monthsell}}</text>
						</view>
						<view class="params">
							<text>总vip人数：{{item.stat.vipnum}}</text>
							<text>当月vip人数：{{item.stat.monthvipnum}}</text>
							<text>普通会员：{{item.stat.normalnum}}</text>
						</view>
					</view>
				</view>
				</block>
			</view>
		</view>
		<!-- VIP会员数据 -->
		<view v-if="currentIndex == 1">
			<view class="vip-box">
				<block v-for="(item,index) in vip" :key="index">
				<view class="vip-list">
					<view class="vip-show">
						<image :src="baseURL + item.user_headimg" mode=""></image>
					</view>
					<view class="vip-context">
						<view style="display: flex;justify-content: space-between;">
							<text>{{item.nick_name}}</text>
							<text style="color: #AAAAAA;">充值：{{item.stat.recharge}}</text>
						</view>
						<view><text>{{item.user_tel}}</text></view>
					</view>
				</view>
				</block>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button style="background: #FEE16A;" @click="goSet(uid)">设置</button>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				shop:[],
				vip:[],
				uid:0,
				currentIndex: 0,
				navList: [
					{
						title: '店家数',
						number: '0人'
					},
					{
						title: 'VIP会员',
						number: '0人'
					}
				],
			}
		},
		onLoad(options){
			let id = options.id;
			this.uid = id;
			this.getList(id);
		},
		methods: {
			getList(id){
				let that = this;
				request({
					url:"index.php?s=/wap/member/apiGetStaffInfo",
					method:"POST",
					data:{
						uid:id
					}
				}).then(function(res){
					if(res.data.code==1){
						that.shop = res.data.shop;
						that.vip = res.data.vip;
						that.navList[0].number = res.data.countshop;
						that.navList[1].number = res.data.countvip;
					}
				});
			},
			// 改变导航
			changeNabIndex(index) {
				this.currentIndex = index
			},
			goSet(id){
				uni.navigateTo({
					url:"/pages/components/staff-info/staff-set?id="+id,
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 导航 */
	.nav-box {
		box-sizing: border-box;
		padding-top: 24rpx;
		.nav {
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			.nav-item {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				color: #CBCBCB;
				.number {
					text-align: center;
				}
			}
			.nav-item.active {
				color: #FEE16A;
				border-bottom: 1px solid #FEE16A;
			}
		}
	}
	.shop-list {
		box-sizing: border-box;
		.shop-item {
			padding: 16rpx 40rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #EFEFF4;
			display: flex;
			align-items: center;
			.shop-img {
				width: 140rpx;
				height: 140rpx;
				margin-right: 24rpx;
				flex-shrink: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.shop-context {
				font-size: 20rpx;
				.shop-info {
					box-sizing: border-box;
					display: flex;
					overflow: hidden;
					flex-wrap: nowrap;
					align-items: center;
					font-size: 20rpx;
					.name {
						font-size: 26rpx;
						margin-right: 10rpx;
						flex-shrink: 0;
					}
				}
				.order {
					margin-top: 12rpx;
				}
				.params {
					box-sizing: border-box;
					text {
						margin-right: 10rpx;
					}
					text:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
	// vip
	.vip-list {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 12rpx 24rpx;
		border-bottom: 1px solid #f1f1f1;
		.vip-show {
			width: 80rpx;
			height: 80rpx;
			margin-right: 24rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.vip-context {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			flex: 1;
		}
	}
	.btn {
		box-sizing: border-box;
		padding: 30rpx;
	}
	.hidden {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
