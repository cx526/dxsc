<template>
	<view>
		<!-- 轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)">
			<block v-for="n in 3" :key="n">
				<swiper-item>	
					<view class="swiper-item">
						<image src="/static/images/dianxia.png" mode=""></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<!-- 标题 -->
		<view class="title">
			<text>为您推荐</text>
		</view>
		<!-- 筛选 -->
		<view class="nav-box">
			<view class="nav">
				<block v-for="(item,index) in navList.list" :key="index">
					<text @click="changeNav(index)" 
					:class="navList.currentIndex == index ? 'active': ''">
					{{item.name}}
					</text>
				</block>
			</view>
		</view>
		<!-- 产品列表 -->
		<view class="product-box">
			<view class="product">
				<block v-for="(item,index) in goodsList" :key="item.goods_id">
					<view class="product-item" @click="goodsDetail(item.goods_id)">
						<image :src="item.pic_cover_small" mode=""></image>
						<view class="product-title">
							<text>{{item.goods_name}}</text>
						</view>
						<!-- <view class="product-des">
							<text>商品附加说明</text>
						</view> -->
						<view class="product-price">
							<text>￥{{item.price}}</text>
							<text>￥{{item.market_price}}</text>
						</view>
					</view>
				</block>
			</view>
			<view v-if="!flag" class="none">
				<text>暂无更多数据</text>
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
							name: '综合'
						},
						{
							name: '人气'
						},
						{
							name: '销量'
						},
						{
							name: '距离'
						},
						{
							name: '价格'
						},
					]
				},
				// 类别
				sort: 0,
				// 页码
				page: 1,
				latitude: '',
				longitude: '',
				// 储存商品数据
				goodsList: [],
				flag: true
			};
		},
		onLoad() {
			// 默认请求综合类
			this.getGoodsList(this.sort,this.page);
			// 读取经纬度
			uni.getStorage({
				key:'position',
				success: res => {
					this.latitude = res.data[0],
					this.longitude = res.data[1]
				}
			})
		},
		// 上拉加载更多
		onReachBottom() {
			this.page += 1;
			if(this.flag) {
				this.getGoodsList(this.sort,this.page,this.latitude,this.longitude);
			}
		},
		methods: {
			// tab切换
			changeNav(index) {
				this.navList.currentIndex = index;
				if(this.sort == index) {
					return
				}
				else {
					this.sort = index;
					this.goodsList = [];
					this.getGoodsList(this.sort,this.page,this.latitude,this.longitude)
				}
			},
			// index.php/wap/index/apiRecommendGoods
			// 参数：
			// sort（排序，0综合，1人气，2销量，3距离，4价格）
			// side(序向，0倒序，1正序）
			// latitude（纬度）
			// longitude（经度）
			// page（页码);
			// 获取数据
			getGoodsList(sort,page,latitude='',longitude='') {
				uni.showToast({
					title: '数据加载中',
					icon: 'loading',
					mask: true
				})
				request({
					url: 'index.php/wap/index/apiRecommendGoods',
					method: 'post',
					data: {
						sort: sort,
						page: this.page,
						latitude: this.latitude,
						longitude: this.longitude
					}
					
				}).then(res => {
					// 如果返回的条数小于10，默认不再进行上拉加载更多
					if(res.data.list.length < 10) {
						this.flag = false
					}
					uni.hideToast()
					// 图片处理
					res.data.list.forEach(item => {
						return item.pic_cover_small = this.$api + item.pic_cover_small
					})
					this.goodsList = [...this.goodsList,...res.data.list];
				})
			},
			// 查看商品详情
			goodsDetail(id) {
				uni.navigateTo({
					url:"../../common/goods-detail/goods-detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F4F4F4;
	}
	// 轮播图
	swiper {
		width: 100%;
		height: 400rpx;
		swiper-item {
			width: 100%;
			height: 100%;
			view {
				height: 100%;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	// 标题
	.title {
		box-sizing: border-box;
		padding: 30rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: 700;
		text {
			position: relative;
			border-bottom: 10rpx solid #FED940;
		}
	}
	// 筛选
	.nav-box {
		box-sizing: border-box;
		padding: 18rpx;
		.nav {
			box-sizing: border-box;
			font-size: 30rpx;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				flex: 1;
				text-align: center;
			}
		}
	}
	// 产品列表
	.product-box {
		box-sizing: border-box;
		padding: 0 30rpx;
		.product {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			flex-wrap: wrap;
			.product-item {
				box-sizing: border-box;
				width: 49.5%;
				background: #fff;
				margin-bottom: 12rpx;
				border-radius: 12rpx;
				image {
					width: 100%;
					height: 300rpx;
					border-top-left-radius: 12rpx;
					border-top-right-radius: 12rpx;
				}
				.product-title {
					font-size: 28rpx;
					color: #333;
					box-sizing: border-box;
					padding: 0 12rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.product-des {
					font-size: 26rpx;
					color: #999;
					box-sizing: border-box;
					padding: 0 12rpx;
					margin-top: 10rpx;
				}
				.product-price {
					color: #C0250F;
					font-weight: 700;
					font-size: 28rpx;
					box-sizing: border-box;
					padding: 0 12rpx;
					margin-top: 18rpx;
					text:last-child {
						font-weight: normal;
						font-size: 20rpx;
						color: #AAAAAA;
						text-decoration: line-through;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.active {
		color: #FED940 !important;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		text-align: center;
	}
</style>
