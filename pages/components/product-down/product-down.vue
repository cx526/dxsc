<template>
	<view>
		<view class="product-main">
			<view class="product-online">
			<scroll-view scroll-y="true" :style="{height: statusHeight}" @scrolltolower="loadMore">
				<block v-if="dataList && dataList.length > 0">
					<view class="online-item" 
					@click="handleDetail(item.goods_id)"
					v-for="(item,index) in dataList" :key="index">
						<view class="online-show">
							<image :src="item.pic_cover_small"></image>
						</view>
						<view class="online-des">
							<view class="online-title">
								<text>{{item.goods_name}}</text>
							</view>
							<view class="online-context" >
								<view class="online-price" >
									<view style="display: flex;flex-direction: column;">
										<text style="color: #FC3D3C;">
											优惠价：{{item.price}}
										</text>
										<text style="color: #AAAAAA;font-size: 22rpx;text-decoration: line-through;">
											市场价：{{item.market_price}}
										</text>
									</view>
									
								</view>
								<view class="online-current">
									<text>库存：{{item.stock}}</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view v-if="dataList == ''" class="none">暂无相关折扣商品</view>
				<view v-if="!flag" class="none">暂无更多数据</view>
			</scroll-view>
		
			</view>
			<!-- <view v-else class="none">暂无相关产品</view> -->
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
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
			}
		},
		onLoad(options) {
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
		},
		methods: {
			// 请求数据
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
					console.log(res);
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
					console.log(111)
					this.page = this.page + 1;
					this.getGoodsList(this.type,this.dynamics,this.page);
				}
				if(this.dataList.length >= this.total_count) {
					console.log('false')
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
	.product-main {
		flex: 1;
		box-sizing: border-box;
		.product-online {
			box-sizing: border-box;
			.online-item {
				box-sizing: border-box;
				margin-top: 24rpx;
				display: flex;
				padding: 0 20rpx;
				border-bottom: 1px solid #f1f1f1;
				.online-show {
					width: 150rpx;
					height: 170rpx;
					margin-right: 32rpx;
					flex-shrink: 0;
					image {
						width: 100%;
						height: 150rpx;
					}
				}
				.online-des {
					box-sizing: border-box;
					flex: 1;
					display: flex;
					justify-content: center;
					margin-left: 20rpx;
					flex-direction: column;
					.online-title {
						font-size: 30rpx;
						color: #444;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; 
						word-break: break-all;
						font-weight: 700;
					}
					.online-context {
						line-height: 50rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 16rpx;
						.online-price {
							flex: 1;
							text-align: left;
							text:first-child {
								color: #CEB98F;
								font-size: 26rpx;
								margin-right: 10rpx;
							}
						}
						.online-current {
							font-size: 26rpx;
							color: #B2B2B2;
						}
					}
				}
			}
		}	
	
	}
	.none {
		text-align: center;
		color: #444;
		font-size: 28rpx;
		padding-top: 20rpx;
	}	
</style>
