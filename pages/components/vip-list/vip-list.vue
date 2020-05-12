<template>
	<view>
		<view class="banner">
			<image :src="$src+'/images/discount.jpg'" mode=""></image>
		</view>
		<view>
			<scroll-view scroll-x="true" class="scrollX">
				<block v-for="(item,index) in navList.list" :key="index">
					<text :class="navList.currentIndex == index? 'active': ''"
					@click="changeNav(index)">
					{{item.name}}
					</text>
				</block>
				
			</scroll-view>
			<view class="notice">
				<text>{{navList.list[navList.currentIndex].name}}</text>
				<text>{{navList.list[navList.currentIndex].des}}</text>
			</view>
		</view>
		
		<!-- 单排单个货品图 -->
			<view class="product-box">
				<block v-if="dataList && dataList.length > 0">
					<view class="product"
					v-for="(item,index) in dataList" :key="index"
					@click="handleDetail(item.goods_id)">
						<view class="product-item">
							<image :src="item.pic_cover_small"></image>
							<image :src="$src+'/images/overflow.png'" style="position: absolute;left: 0;top: 0;width: 120rpx;height: 40rpx;"></image>
						</view>
						<view class="product-main">
								<view class="product-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="product-sale">
									<view class="product-price">
										<text style="font-size: 36rpx;color: #EC5741;font-weight: 700;">￥{{item.price}}</text>
										<text style="margin-top: 0rpx;color: #AAAAAA;text-decoration: line-through;font-size: 24rpx;">￥{{item.market_price}}</text>
									</view>
									<view class="product-btn">
										<button type="warn">购买</button>
									</view>
								</view>
						</view>
					</view>
					<view v-if="!flag && dataList.length > 0" class="none">已加载全部</view>
				</block>
				<view v-else class="none">
					<text>暂无此折扣商品</text>
				</view>
			</view>
	
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				navList: {
					currentIndex: 0,
					list: [
						{
							name: '全部',
							des: '大促销 好礼不断'
						},
						{
							name: '限量清仓',
							des: '低至1折'
						},
						{
							name: '超值精选',
							des: '低至2折'
						},
						{
							name: '人气热卖',
							des: '低至3折'
						},
						{
							name: '9.9包邮',
							des: '低至9.9元'
						},
						{
							name: '19.9任选',
							des: '低至19.9元'
						},
					]
				},
				// 储存可视区域的高度
				statusHeight: '',
				// 储存折扣类型
				type: '',
				// 储存折扣度
				dynamics: '',
				// 储存数据
				dataList: [],
				// 储存接口返回的数据
				total_count: '',
				// 请求的页数(默认为1)
				page: 1,
				flag: true,
				$src: this.$src
			}
		},
		onLoad(options) {
			// 定位当前处于哪个栏目列表中
			this.navList.currentIndex = this.$store.state.discount;
			if(!options.type) {
				for(let key in options) {
					this.type = key;
					this.dynamics = options[key];
					this.getGoodsList(this.type,this.dynamics,this.page)
				}
			}
			else {
				this.getGoodsList(undefined,undefined,this.page)
			}
			// 读取屏幕可视高度
			uni.getSystemInfo({
				success: res => {
					this.statusHeight = res.windowHeight + 'px'
				}
			})
			// 默认读取全部
			// this.changeNav(0);
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			changeNav(index) {
				this.navList.currentIndex = index;
				switch(index) {
					case 0:
					this.dataList = [];
					this.getGoodsList(undefined,undefined,this.page);
					break;
					case 1: 
					this.dataList = [];
					this.getGoodsList('discount',10,this.page);
					break;
					case 2:
					this.dataList = [];
					this.getGoodsList('discount',20,this.page);
					break;
					case 3:
					this.dataList = [];
					this.getGoodsList('discount',30,this.page);
					break;
					case 4:
					this.dataList = [];
					this.getGoodsList('price',9.9,this.page);
					break;
					case 5:
					this.dataList = [];
					this.getGoodsList('price',19.9,this.page);
					break;
				}
			},
			getGoodsList(type='',dynamics='',page) {
				uni.showToast({
					title: '数据加载中',
					icon: 'loading'
				});
				request({
					url: 'index.php?s=/wap/goods/discountGoods',
					method: 'post',
					data: {
						[type]: dynamics,
						page: page
					}
				}).then(res => {
					uni.hideToast();
					// 接口数据返回条数
					this.total_count = res.data.total_count;
					// 处理接口返回的图片
					let data = res.data.data;
					for(let i = 0;i < data.length;i++) {
						data[i].pic_cover_small = this.$api + data[i].pic_cover_small
					}
					this.dataList = [...this.dataList,...data];
				})
			},
			// 上拉加载更多
			loadMore() {
				if(this.flag) {
					this.page = this.page + 1;
					this.getGoodsList(this.type,this.dynamics,this.page);
				}
				if(this.dataList.length >= this.total_count) {
					this.flag = false
				}
			},
			// 跳转到商品详情页
			handleDetail(id) {
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}
	.banner {
		height: 300rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	.scrollX {
		align-items: center;
		width: 100%;
		// height: 80rpx;
		font-size: 26rpx;
		color: #333;
		display: flex;
		align-items: center;
		white-space: nowrap;
		background: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		text {
			width: 16.66%;
			display: inline-block;
			flex: 1;
			text-align: center;
			align-items: center;
		}
		
	}
	.notice {
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		line-height: 30rpx;
		text:nth-child(1) {
			font-size: 32rpx;
			font-weight: 700;
			box-sizing: border-box;
			padding-right: 10rpx;
		}
		text:nth-child(2) {
			font-size: 28rpx;
			display: inline-block;
			padding-left: 10rpx;
			color: #333;
			border-left: 1px solid #000;
		}
	}
	.product-box {
		box-sizing: border-box;
		padding: 0 30rpx;
		.product {
			box-sizing: border-box;
			border-radius: 12rpx;
			background: #fff;
			padding: 24rpx;
			display: flex;
			align-items: center;
			margin-bottom: 18rpx;
			.product-item {
				box-sizing: border-box;
				width: 220rpx;
				height: 220rpx;
				margin-right: 24rpx;
				flex-shrink: 0;
				position: relative;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.product-main {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				flex: 1;
				justify-content: center;
				.product-title {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.product-sale {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 24rpx;
					.product-price {
						display: flex;
						flex-direction: column;
					}
					.product-btn {
						button {
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
	.active {
		background: #FB2056;
		color: #fff;
		display: inline-block;
		padding: 4rpx 0;
		border-radius: 24rpx;
	}
	.none {
		text-align: center;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 30rpx;
		color: #666;
	}
</style>
