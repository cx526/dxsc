<template>
	<view>
		<!-- 个人信息 -->
		<view class="user-info">
			<text class="user">小A</text>
			<text>区域顺德</text>
		</view>
		<!-- 我的团队 -->
		<view class="group-box">
			<view class="group">
				<block v-for="(item,index) in dataList" :key="item.name">
					<view class="group-item">
						<view class="group-name">
							<text>{{item.name}}</text>
							<image src="/static/images/icon-right.png" mode=""></image>
						</view>
						<view class="group-main">
							<view class="main">
								<block v-for="(list,listIndex) in item.list" :key="listIndex">
									<view class="group-list">
										<text class="number">{{list.number}}</text>
										<text class="name">{{list.classify}}</text>
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
	export default {
		data() {
			return {
				dataList: [
					{
						name: "代理",
						list: [
							{
								number: 0,
								classify: "合计"
							},
							{
								number: 1,
								classify: "今日新增"
							},
							{
								number: 2,
								classify: "昨日新增"
							},
							{
								number: 3,
								classify: "本月新增"
							},
						]
					},
					{
						name: "团队长",
						list: [
							{
								number: 0,
								classify: "合计"
							},
							{
								number: 1,
								classify: "今日新增"
							},
							{
								number: 2,
								classify: "昨日新增"
							},
							{
								number: 3,
								classify: "本月新增"
							},
						]
					},
					{
						name: "商家",
						list: [
							{
								number: 0,
								classify: "合计"
							},
							{
								number: 1,
								classify: "今日新增"
							},
							{
								number: 2,
								classify: "昨日新增"
							},
							{
								number: 3,
								classify: "本月新增"
							},
						]
					},
					{
						name: "VIP会员",
						list: [
							{
								number: 0,
								classify: "合计"
							},
							{
								number: 1,
								classify: "今日新增"
							},
							{
								number: 2,
								classify: "昨日新增"
							},
							{
								number: 3,
								classify: "本月新增"
							},
						]
					},
					{
						name: "普通会员",
						list: [
							{
								number: 0,
								classify: "合计"
							},
							{
								number: 1,
								classify: "今日新增"
							},
							{
								number: 2,
								classify: "昨日新增"
							},
							{
								number: 3,
								classify: "本月新增"
							},
						]
					},
				
				]
			};
		}
	}
</script>

<style lang="scss">
	// 个人信息
	.user-info {
		height: 210rpx;
		background: #FED940;
		box-sizing: border-box;
		padding: 26rpx;
		color: #4E4B43;
		font-size: 32rpx;
		position: relative;
		z-index: 10;
		.user {
			margin-right: 20rpx;
		}
	}
	// 我的团队
	.group-box {
		box-sizing: border-box;
		padding: 0 26rpx;
		.group {
			background: #fff;
			box-sizing: border-box;
			border-radius: 12rpx;
			box-shadow: 0 0 12rpx #999;
			position: relative;
			top: -100rpx;
			z-index: 20;
			.group-item {
				box-sizing: border-box;
				padding: 12rpx 0;
				.group-name {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #3F3F3F;
					font-size: 32rpx;
					image {
						width: 30rpx;
						height: 30rpx;
					}
				}
				.group-main {
					box-sizing: border-box;
					padding: 26rpx 26rpx 0 26rpx;
					
					.main {
						box-sizing: border-box;
						padding-bottom: 24rpx;
						display: flex;
						border-bottom: 1px solid #EEEEEE;
						.group-list {
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: center;
							flex: 1;
							align-items: center;
							font-size: 26rpx;
							.name {
								color: #999999;
								margin-top: 6rpx;
							}
						}
						.group-list:nth-child(1) {
							border-right: 1px solid #EEEEEE;
							.number {
								color: #FF0000;
							}
						}
					}
				}
			}
		}
			
	}
</style>
