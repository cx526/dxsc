<template>
	<view v-if="loading">
		<!-- 个人信息 -->
		<view class="user-info">
			<text class="user" v-if="res.data">{{res.data.user_name}}</text>
			<!-- <text>区域顺德</text> -->
		</view>
		<!-- 我的团队 -->
		<view class="group-box">
			<view class="group" v-if="dataList && dataList.length > 0">
				<block v-for="(item,index) in dataList" :key="item.name">
					<view class="group-item" 
					v-if="parseInt(item.list[0].id) <= parseInt(id)"
					@click="goGroup(item.list[0].id,item.name)">
						<view class="group-name">
							<text>{{item.name}}</text>
							<image src="/static/images/icon-right.png" mode=""></image>
						</view>
						<view class="group-main">
							<view class="main" v-for="(list,listIndex) in item.list" :key="listIndex">
								<view class="group-list">
									<text class="number">{{item.list[listIndex].count}}</text>
									<text class="name">合计</text>
								</view>
								<view class="group-list">
									<text class="number">{{item.list[listIndex].today}}</text>
									<text class="name">今日增长</text>
								</view>
								<view class="group-list">
									<text class="number">{{item.list[listIndex].yesterday}}</text>
									<text class="name">昨天增加</text>
								</view>
								<view class="group-list">
									<text class="number">{{item.list[listIndex].thismonth}}</text>
									<text class="name">本月增长</text>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import { request } from '../../request.js'
	import Loading from '../../common/loading/loading.vue'
	export default {
		data() {
			return {
				res:'',
				dataList: [],
				loading: false,
				id: ''
			};
		},
		components: {
			Loading
		},
		onShow() {
			this.getUserGroup()
		},
		methods: {
			// 获取我的团队资料
			getUserGroup() {
				this.loading = false;
				request({
					url: 'index.php?s=/wap/member/getTeamMembers',
					method: 'post'
				}).then(res => {
					this.loading = true;
					// 等级
					this.id = res.data.level_id;
					this.res = res;
					const arr = []
					const list = res.data.list;
					for(let key in list) {
						arr.push({name: key,list:[list[key]]});
					};
					this.dataList = arr;
				})
			},
			goGroup(id,name) {
				uni.navigateTo({
					url:'/pages/components/my-group/my-group?id='+id+'&name='+name
				})
			}
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
