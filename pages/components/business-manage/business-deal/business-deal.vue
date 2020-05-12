<template>
	<view>
		<!-- 导航 -->
		<view class="nav-box">
			<view class="nav">
				<block v-for='(nav,index) in navList.list' :key='index'>
					<view class="nav-item" @click="changeNav(index)">
						<text :class="navList.currentIndex == index ? 'navActive' : ''">{{ nav.name }}</text>
					</view>
				</block>
			</view>
		</view>
		<!-- 首页内容 -->
		<view class="home-box" v-if="navList.currentIndex == 0">
			<!-- 二级导航 -->
			<view class="home-nav">
				<view class="nav">
					<view class="nav-title">
						<text>数据总览</text>
						<text v-if="homeList.currentIndex == 0">更新时间04-28(今天)11:00</text>
						<view v-if="homeList.currentIndex == 1">
							<text style="font-size: 24rpx;">2020年05月06日</text>
							<image :src="$src+'/images/icon-down.png'" mode=""></image>
						</view>
						<view v-if="homeList.currentIndex == 2 || homeList.currentIndex == 3">
							<text style="font-size: 24rpx;">2020年05月</text>
							<image :src="$src+'/images/icon-down.png'" mode=""></image>
						</view>
					</view>
					<view class="nav-main">
						<block v-for='(home,index) in homeList.list' :key='index'>
							<view 
							:class="homeList.currentIndex == index ? 'homeActive': ''"
							@click="changHome(index)"
							>
							{{ home.name }}
							</view>
						</block>
					</view>
				</view>
			</view>
			<!-- 实时内容 -->
			<view class="context-box">
				<view class="context">
					<block v-for='(item,index) in currentList' :key='index'>
						<view class="context-item">
							<view class="title"><text>{{ item.title }}</text></view>
							<view class="des">
								<text class="number">{{ item.number }}</text>
								<text class="unit">{{ item.unit }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 会员 -->
		<view class="home-box" v-if="navList.currentIndex == 3">
			<!-- 二级导航 -->
			<view class="home-nav">
				<view class="nav">
					<view class="nav-title">
						<text>会员数据总览</text>
						<text>更新时间04-28</text>
					</view>
				</view>
			</view>
			<!-- 实时内容 -->
			<view class="context-box">
				<view class="context">
					<block v-for='(item,index) in memberList' :key='index'>
						<view class="context-item">
							<view class="title"><text>{{ item.title }}</text></view>
							<view class="des">
								<text class="number">{{ item.number }}</text>
								<text class="unit">{{ item.unit }}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	
	
	
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 一级导航
				navList: {
					currentIndex: 0,
					list: [
						{
							name: '首页'
						},
						{
							name: '流量'
						},
						{
							name: '商品'
						},
						{
							name: '会员'
						}
					]
				},
				// 二级导航
				homeList: {
					currentIndex: 0,
					list: [
						{
							name: '实时'
						},
						{
							name: '日报'
						},
						{
							name: '周报'
						},
						{
							name: '月报'
						}
					]
				},
				// 首页数据
				currentList: [
					{
						title: '订单金额',
						number: 0.00,
						unit: '人'
					},
					{
						title: '订单数',
						number: 0,
						unit: '单'
					},
				],
				// 会员数据
				memberList: [
					{
						title: '会员数',
						number: 0.00,
						unit: '人'
					},
					{
						title: '本月新增会员数',
						number: 0,
						unit: '人'
					},
					{
						title: '今日新增会员数',
						number: 0,
						unit: '人'
					},
					{},
				],
				$src: this.$src
			};
		},
		methods: {
			// 切换nav
			changeNav(index) {
				this.navList.currentIndex = index
			},
			// 切换首页nav
			changHome(index) {
				this.homeList.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 导航
	.nav-box {
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
		margin-bottom: 20rpx;
		.nav {
			box-sizing: border-box;
			display: flex;
			line-height: 90rpx;
			font-size: 28rpx;
			.nav-item {
				flex: 1;
				text-align: center;
				color: #5C5C5C;
				text {
					padding-bottom: 20rpx;
				}
				text.navActive {
					border-bottom: 3px solid #323232;
					color: #474747
				}
			}
		}
	}
	// 首页内容样式
	.home-box {
		box-sizing: border-box;
		background: #fff;
		// 二级导航
		.home-nav {
			box-sizing: border-box;
			.nav {
				box-sizing: border-box;
				padding: 32rpx 24rpx ;
			}
			.nav-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text:nth-child(1) {
					font-size: 28rpx;
				}
				view {
					display: flex;
					align-items: center;
					image {
						width: 30rpx;
						height: 30rpx;
					}
					text {
						color: #A1A1A1;
						font-size: 24rpx;
					}
				}
				
				text:nth-child(2) {
					font-size: 24rpx;
					color: #A1A1A1;
				}
			}
			.nav-main {
				box-sizing: border-box;
				display: flex;
				border: 1px solid #E7E7E7;
				line-height: 70rpx;
				font-size: 26rpx;
				color: #747474;
				border-radius: 60rpx;
				margin-top: 32rpx;
				view {
					flex: 1;
					text-align: center;
					border-right: 1px solid #E7E7E7;
					
				}
				view:first-child {
					border-top-left-radius: 60rpx;
					border-bottom-left-radius: 60rpx;
				}
				view:last-child {
					border-right: 0;
					border-top-right-radius: 60rpx;
					border-bottom-right-radius: 60rpx;
				}
				.homeActive {
					background: #F9EFC6;
					color: #000;
				}
			}
		}
		// 实时内容样式
		.context-box {
			box-sizing: border-box;
			background: #fff;
			.context {
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				.context-item {
					box-sizing: border-box;
					width: 50%;
					padding: 40rpx 0 52rpx 30rpx;
					border-top: 1px solid #F2F2F6;
					border-right: 1px solid #F2F2F6;
					.title {
						font-size: 28rpx;
						color: #535353;
					}
					.des {
						box-sizing: border-box;
						.unit {
							font-size: 28rpx;
							color: #444444;
							margin-left: 12rpx;
						}
						.number {
							font-size: 40rpx;
							font-weight: 700;
						}
					}
				}
			}
		}
	}
</style>
