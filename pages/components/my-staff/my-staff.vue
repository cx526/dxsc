<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<view class="search">
				<image src="/static/images/search.png" mode=""></image>
				<input type="text" placeholder="搜索我的员工" @confirm="search"/>
			</view>
		</view>
		<!-- 团队总人数 -->
		<view class="group-box">
			<view class="group">
				<view class="group-item" style="padding-left: 20rpx;">
					<text>员工合计</text>
					<text style="margin-left: 26rpx;">{{count}}人</text>
				</view>
				<view class="group-item" style="padding-right: 20rpx;text-align: right;">
					<text>今日新增</text>
					<text style="margin-right: 26rpx;">{{newadd}}人</text>
				</view>
			</view>
		</view>
		<!-- 成员列表 -->
		<view class="group-list">
			<view class="group-title">
				<text class="number">序号</text>
				<text class="name">姓名</text>
				<text class="message">信息</text>
			</view>
			<block v-for="(item,index) in list" :key="index">
			<view class="group-title spcial" @click="goStaffInfo(item.uid)">
				<text class="number hidden">{{index+1}}</text>
				<text class="name hidden">{{item.nick_name}}</text>
				<text class="message hidden">{{item.user_tel}}</text>
				<image src="/static/images/icon-right.png" mode=""></image>
			</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				list:[],
				count:0,
				newadd:0,
			};
		},
		onLoad(){
			this.getList('');
		},
		methods: {
			search(e){
				let value = e.detail.value;
				this.getList(value);
			},
			getList(search){
				let that = this;
				request({
					url:"index.php?s=/wap/member/apiStaffList",
					method:"POST",
					data:{
						search:search
					}
				}).then(function(res){
					if(res.data.code==1){
						that.newadd = res.data.newadd;
						that.count = res.data.count;
						that.list = res.data.list;
					}
				});
			},
			goStaffInfo(id) {
				uni.navigateTo({
					url:'/pages/components/staff-info/staff-info?id='+id
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 搜索框
	.search-box {
		box-sizing: border-box;
		background: #fff;
		padding: 20rpx 10% 30rpx 10%;
		.search {
			box-sizing: border-box;
			height: 70rpx;
			line-height: 70rpx;
			background: #EFEFF4;
			display: flex;
			align-items: center;
			padding-left: 24rpx;
			border-radius: 48rpx;
			input {
				height: 100%;
			}
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 24rpx;
			}
		}
	}
	// 团队总人数
	.group-box {
		box-sizing: border-box;
		padding: 0 10% 20rpx 10%;
		background: #fff;
		border-bottom: 1px solid #EDEDED;
		.group {
			box-sizing: border-box;
			display: flex;
			.group-item {
				width: 50%;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				text:nth-child(1) {
					color: #ACACAC;
					margin-bottom: 20rpx;
				}
				text:nth-child(2) {
					color: #7D7D7D;
				}
			}
		}
	}
	// 成员列表
	.group-list {
		box-sizing: border-box;
		background: #fff;
		.group-title {
			display: flex;
			font-size: 32rpx;
			padding-right: 80rpx;
			line-height: 80rpx;
			color: #B9B9B9;
			.number {
				flex: 1;
				text-align: center;
			}
			.name {
				flex: 1;
				text-align: center;
			}
			.message {
				flex: 1;
				text-align: center;
			}
			image {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 20rpx;
			}
		}
	}
	.hidden {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.spcial {
		border-bottom: 1px solid #F0F0F5;
		position: relative;
	}
</style>
