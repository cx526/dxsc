<template>
	<view>
		<!-- 滚动列表 -->
		<view class="nav">
			<scroll-view scroll-x="true" class="scroll" :scroll-into-view="id">
				<block v-for="(item,index) in typeList" 
				:key="item.category_id">
					<view 
					:id="item.id" :class="currentIndex==index? 'active': ''"
					@click="handleClick(item,index)">{{item.short_name}}</view>
				</block>
			</scroll-view>
			<view class="menu" @click="goClassify">
				<image src="/static/images/icon-menu.png" mode=""></image>
			</view>
		</view>
		<!-- banner图 -->
		<view class="banner">
			<image src="../../../static/images/online-goods.png" mode=""></image>
		</view>
		
		<!-- 推荐列表 -->
		<view class="recommend">
			<view class="title">
				<text style="position: relative;z-index: 999;">为你推荐</text>
				<view class="line"></view>
			</view>
			<view class="list" v-if="onLineGoods && onLineGoods.length > 0">
				<block v-for="(goods,index) in onLineGoods" :key="index">
					<view class="list-item" @click="handleDetail(goods.goods_id)">
						<image :src="goods.pic_cover_mid" mode=""></image>
						<view class="main">
							<view class="list-title">{{goods.goods_name}}</view>
							<view class="list-price">
								<view class="new">
									<text>￥{{goods.market_price}}</text>
									<text class="member">会员专享价</text>
								</view>
								<view class="old">
									<text>市场参考价：</text>
									<text>￥{{goods.price}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				
			</view>
			<view class="none" v-else>暂无数据</view>
			<view class="none" v-if="flag">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				// 分类
				typeList: [],
				// 当前分类id
				category_id: '',
				// 当前索引
				currentIndex: 0,
				id: '',
				// 商品列表
				onLineGoods: [],
				page: 1,
				flag: false
			};
		},
		onLoad() {
			// 左侧分类请求数据
			this.getNav()
		},
		onReachBottom() {
			this.handleBottom()
		},
		methods:{
			// 跳转到商品详情
			handleDetail(id) {
				uni.navigateTo({
					url:'/pages/common/goods-detail/goods-detail?id='+id
				})
			},
			// 分类页面
			goClassify() {
				uni.switchTab({
					url: '/pages/classify/classify'
				})
			},
			// 获取分类
			getNav() {
				uni.showLoading({
					title:"数据加载中",
					mask:true
				});
				request({
					url: 'index.php?s=/wap/goods/goodsClassificationList'
				}).then(res => {
					uni.hideLoading()
					for(let i = 0; i < res.data.list.length;i++) {
						res.data.list[i].id="item" + res.data.list[i].category_id
					}
					
					this.typeList = res.data.list;
					this.category_id = res.data.list[0].category_id;
					// 默认请求第一个分类数据
					this.handleClick(this.typeList[0],0)
				})
			},
			// 点击切换
			handleClick(item,index) {
				this.page = 1;
				this.category_id = item.category_id
				this.currentIndex = index;
				// 实现点击滚动
				this.id = item.id;
				this.flag = false;
				request({
					url: 'index.php?s=/wap/goods/listCategoryGoods',
					data: {
						cat_id: this.category_id,
						page: 1
					}
				}).then(res => {
					// 处理图片
					let onLineGoods = res.data.list.data;
					for(let i = 0;i < onLineGoods.length;i++) {
						onLineGoods[i].pic_cover_mid = this.$api + onLineGoods[i].pic_cover_mid
					}
					this.onLineGoods = onLineGoods;
				})
			},
			// 上拉加载更多
			handleBottom() {
				if(this.onLineGoods && this.onLineGoods.length > 0) {
					this.$nextTick(() =>{
						this.page = this.page + 1;
							uni.showLoading({
								title: '加载中'
							});
							request({
								url: 'index.php?s=/wap/goods/listCategoryGoods',
								data: {
									cat_id: this.category_id,
									page : this.page
								}
							}).then(res => {
								uni.hideLoading()
								if(res.data.list.page_count == this.page) {
									this.flag = true;
									return
								}
								// 处理图片
								let onLineGoods = res.data.list.data;
								for(let i = 0;i < onLineGoods.length;i++) {
									onLineGoods[i].pic_cover_mid = this.$api + onLineGoods[i].pic_cover_mid
								}
								this.onLineGoods = [...this.onLineGoods,...onLineGoods];
							})
						})
					}
				}
			},
		
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}
	// 滚动列表
	.nav {
		box-sizing: border-box;
		padding-right: 80rpx;
		padding-left: 20rpx;
		position: relative;
		.scroll {
			width: 100%;
			box-sizing: border-box;
			white-space: nowrap;
			font-size: 28rpx;
			line-height: 80rpx;
			view {
				display: inline-block;
				color: #2C2C2C;
				margin-right: 40rpx;
			}
			view:last-child {
				margin-right: 0;
			}
		}
		.menu {
			box-sizing: border-box;
		
			image {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				z-index: 90; 
			}
		}
	}
	
	
	// banner图
	.banner {
		height: 300rpx;
		width: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	// 推荐列表
	.recommend {
		box-sizing: border-box;
		.title {
			font-size: 34rpx;
			font-weight: 700;
			text-align: left;
			line-height: 120rpx;
			position: relative;
			padding-left: 30rpx;
			box-sizing: border-box;
			.line {
				width: 130rpx;
				height: 20rpx;
				background: #FFD323;
				position: absolute;
				z-index: 90;
				left: 94rpx;
				bottom: 38rpx;
				transform: translateX(-50%);
				border-radius: 6rpx;
			}
		}
		.list {
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list-item {
				box-sizing: border-box;
				width: 49%;
				image {
					width: 100%;
					height: 330rpx;
				}
				.main {
					box-sizing: border-box;
					padding: 20rpx 18rpx;
					.list-title {
						font-size: 24rpx;
						color: #505050;
						text-align: left;
						line-height: 32rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.list-price {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						margin-top: 28rpx;
						line-height: 26rpx;
						.new {
							color: #0E0E0E;
							font-size: 26rpx;
							font-weight: 700;
							display: flex;
							align-items: center;
							.member {
								display: inline-block;
								background: #333333;
								box-sizing: border-box;
								padding: 8rpx 12rpx;
								margin-left: 10rpx;
								color: #BFB2A3;
								font-weight: normal;
								font-size: 24rpx;
								border-radius: 16rpx;
							}
						}
						.old {
							margin-top: 20rpx;
							color: #999;
							font-size: 24rpx;
							text:nth-child(2) {
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	.active {
		color: #f00 !important;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 26rpx;
		text-align: center;
		color: #666;
	}

</style>
