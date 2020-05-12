<template>
	<view>
		<!-- 店铺信息 -->
		<view class="header-box">
			<view class="header">
				<view class="user">
					<image :src="$src+'/images/shop-logo.png'"></image>
					<text>{{shop_name}}</text>
				</view>
				<view class="setting" @tap='goShopSeeting'>
					<text>店铺设置</text>
					<image :src="$src+'/images/icon-right.png'"></image>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list-box">
			<view class="list">
				<block v-for='(item,index) in dataList' :key='index'>
					<view class="list-item">
						<!-- 标题 -->
						<view class="list-title">
							<view class="title-left">
								<text>{{item.title}}</text>
								<text class="line"></text>
							</view>
							<view class="title-right" @tap='goDetail(index)'>
								<text>{{item.des}}</text>
								<image :src="$src+'/images/icon-red-right.png'" mode=""></image>
							</view>
						</view>
						<!-- 详情 -->
						<view class="list-detail">
							<view class="list-turnover" style="border-bottom: 1px solid #EFEFEF;">
								<block v-for='(data,dataIndex) in item.list' :key='dataIndex'>
									<view class="turnover " :class="item.active? 'spcial': ''">
										<text>{{data.number}}</text>
										<text class="des">{{data.des}}</text>
									</view>
								</block>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '@/pages/request.js'
	export default {
		data() {
			return {
				shop_name:'店铺',
				dataList: [
					{
						title: '交易数据',
						des: '数据中心',
						active: true,
						list: [
							{
								number: '0',
								des: '总营业额'
							},
							{
								number: '0',
								des: '本月营业额'
							},
							{
								number: '0',
								des: '今日营业额'
							},
							{
								number: '0',
								des: '总成交订单'
							},
							{
								number: '0',
								des: '本月订单数'
							},
							{
								number: '0',
								des: '今日订单数'
							},
						]
					},
					{
						title: '订单管理',
						des: '查看详情',
						active: false,
						list: [
							{
								number: 0,
								des: '待支付'
							},
							{
								number: 0,
								des: '待发货'
							},
							{
								number: 0,
								des: '退款/售后'
							},
						]
					},
					{
						title: '商品管理',
						des: '发布商品',
						active: false,
						list: [
							{
								number: 0,
								des: '总商品数'
							},
							{
								number: 0,
								des: '出售中'
							},
							{
								number: 0,
								des: '已下架'
							},
						]
					},
					{
						title: '财务管理',
						des: '查看详情',
						active: false,
						list: [
							{
								number: 0,
								des: '账户余额'
							},
							{
								number: 0,
								des: '会员充值收入'
							},
							{
								number: 0,
								des: '会员跨店收入'
							},
						]
					},
				],
				$src: this.$src
			};
		},
		onLoad(){
			this.getInfo();
		},
		methods: {
			// 跳转到店铺设置页
			goShopSeeting() {
				uni.navigateTo({
					url: '/pages/components/business-manage/shop-setting/shop-setting'
				})
			},
			// 跳转到二级页面
			goDetail(index) {
				switch(index) {
					case 0:
					uni.navigateTo({
						url: '/pages/components/business-manage/business-deal/business-deal'
					})
					break;
					case 3:
					uni.navigateTo({
						url: '/pages/components/business-manage/business-finance/business-finance'
					})
					break;
				}
			},
			//获取店铺资料
			getInfo(){
				
				request({
					url:'index.php?s=/wap/manage/info',
				}).then(res=>{
					if(res.code==1){
						
					}
				});
			},
			//获取本业数据
			getData(){
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 店铺信息
	.header-box {
		box-sizing: border-box;
		background: #FED943;
		padding: 10rpx 22rpx 0 22rpx;
		height: 220rpx;
		font-size: 28rpx;
		.header {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.user {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			image {
				width: 70rpx;
				height: 70rpx;
				margin-right: 20rpx;
			}
		}
		.setting {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	// 列表
	.list-box {
		box-sizing: border-box;
		padding: 0 22rpx;
		.list {
			box-sizing: border-box;
			position: relative;
			top: -120rpx;
			.list-item {
				box-sizing: border-box;
				width: 100%;
				background: #fff;
				box-shadow: 0px 0px 4px #999;
				padding-top: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 18rpx;
				.list-title {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24rpx;
					padding: 0 26rpx;
					.title-left {
						box-sizing: border-box;
						position: relative;
						text {
							padding-left: 16rpx;
						}
						.line {
							width: 3px;
							height: 28rpx;
							background: #EC5D4F;
							display: inline-block;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							padding-left: 0;
						}
					}
					.title-right {
						display: flex;
						align-items: center;
						color: #EC5D4F;
						image {
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
				.list-detail {
					box-sizing: border-box;
					padding: 0 62rpx;
					.list-turnover {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						font-size: 22rpx;
						flex-wrap: wrap;
						.turnover {
							display: flex;
							flex-direction: column;
							align-items: center;
							width: 33.33%;
							padding: 36rpx 0;
							.des {
								color: #999999;
							}
						}
						.turnover.spcial:nth-child(-n+3) {
							border-bottom: 1px solid #EFEFEF;
						}
					}
				}
			}
		}
	}
</style>
