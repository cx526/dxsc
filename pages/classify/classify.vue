<template>
	<view class="container" v-if="loading">
		<!-- 搜索 -->
		<view class="classify-search">
			<view class="search">
				<view class="search-input">
					<image :src="$src+'/images/search.png'"></image>
					<input type="text"  placeholder="输入您要搜索的宝贝.." 
					placeholder-class="placeholder" @input="handleSearch($event)"
					/>
				</view>
				<view class="search-img">
					<text @click="search">搜索</text>
				</view>
			</view>
		</view>
		<!-- 产品 -->
		<view class="product-box">
			<view class="product-type" >
				<scroll-view scroll-y="true" :style="{height:cssText.height}" :scroll-into-view="id">
					<block v-for="(item,index) in typeList" :key="item.category_id">
						<view class="type-item " 
						:class="currentIndex==index? 'active': ''"
						:id="item.id"
						@click="handleClick(item,index)">
							<text>{{item.short_name}}</text>
						</view>
					</block>
				</scroll-view>
				
			</view>
			<view class="product-main">
				<view class="product-online" v-if="onLineGoods && onLineGoods.length > 0" >
				<scroll-view scroll-y="true" :style="{height:cssText.height}" @scrolltolower="handleBottom()">
					<block v-for="(item,index) in onLineGoods" :key="index">
						<view class="online-item" @click="handleDetail(item.goods_id)">
							<view class="online-show">
								<image :src="item.pic_cover_micro" lazy-load></image>
							</view>
							<view class="online-des">
								<view class="online-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="online-context">
									<view class="online-price">
										<text>优惠价：{{item.price}}</text>
										<text style="text-decoration: line-through;color: #AAAAAA;font-size: 22rpx;">市场价: {{item.market_price}}</text>
									</view>
									<view style="font-size: 26rpx;color: #999;">销量：{{item.sales}}</view>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>

				</view>
				<view v-else class="none">暂无相关产品</view>
			</view>
		</view>
		
		
		  
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import { request } from '../request.js'
	import Loading from '../common/loading/loading.vue'
	export default {
		data() {
			return {
				text: '',
				typeList: [],
				// 店上好货模拟数据
				onLineGoods: [],
				// 店下好货模拟数据
				downLineGoods: [
					{
						topic: '/static/images/product-02.png',
						title: '【给眼睛做个SPA】眼部按摩器升级',
						oldPrice: 99,
						newPrice: 199
					},
					{
						topic: '/static/images/product-01.png',
						title: '【给眼睛做个SPA】眼部按摩器升级',
						oldPrice: 99,
						newPrice: 199
					},
				],
				currentIndex: 0,
				cssText: {
					height: ''
				},
				id: '',
				// 请求分类
				page: 1,
				// 商品id
				category_id: '',
				// 控制否是执行上啦加载函数
				isflag:true,
				// 搜索内容
				searchText: '',
				// 加载图
				loading: false,
				$src: this.$src
			};
		},
		components: {
			Loading
		},
		methods: {
			//	监听搜索框输入的值
			handleSearch(event) {
				this.searchText = event.detail.value;
			},
			// 请求搜索数据
			searchData() {
				request({
					url: 'index.php?s=wap/goods/goodsSearchList',
					method: 'post',
					data: {
						sear_name: this.searchText
					}
				}).then(res => {
					if(res.data.code == 200) {
						// 提交到vuex做保存
						this.$store.commit('search',res.data);
						uni.navigateTo({
							url: '/pages/components/goods-result/goods-result'
						})
					}
				})
			},
			// 搜索
			search() {
				if(this.searchText == '') {
					uni.showToast({
						title: '请输入要搜索的产品',
						icon: 'none'
					})
					return
				}
				else {
					// 储存搜索历史
					this.$store.commit('saveKeywords',{keywords: this.searchText});
					this.searchData();
				}
			},
			// 点击搜索
			handleClicks(item) {
				this.searchText = item;
				this.searchData();
			},
			// 实现点击切换tab
			handleClick(item,index) {
				this.loading = false;
				this.page = 1;
				this.category_id = item.category_id
				this.currentIndex = index;
				// 实现点击滚动
				this.id = item.id;
				request({
					url: 'index.php?s=/wap/goods/listCategoryGoods',
					data: {
						cat_id: this.category_id,
						page: 1
					}
				}).then(res => {
					this.loading = true
					// 处理图片
					let onLineGoods = res.data.list.data;
					console.log(onLineGoods);
					for(let i = 0;i < onLineGoods.length;i++) {
						onLineGoods[i].pic_cover_micro = this.$api + onLineGoods[i].pic_cover_micro
					}
					this.onLineGoods = onLineGoods;
				})
			},
			// 监听右侧下拉触底
			handleBottom() {
				console.log(111);
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
								uni.showToast({
									title:'暂无更多数据',
									icon: 'none'
								})
								this.isflag = false;
								return
							}
							// 处理图片
							let onLineGoods = res.data.list.data;
							for(let i = 0;i < onLineGoods.length;i++) {
								onLineGoods[i].pic_cover_micro = this.$api + onLineGoods[i].pic_cover_micro
							}
							this.onLineGoods = [...this.onLineGoods,...onLineGoods];
						})
					})
				},
				// 跳转到商品详情
				handleDetail(id) {
					uni.navigateTo({
						url:'/pages/common/goods-detail/goods-detail?id='+id
					})
				}
			
		},
			onLoad() {
				// 获取可视区域高度
				uni.getSystemInfo({
					success:(res) => {
						this.cssText.height = res.windowHeight - 48 + 'px';
					}
				})
				// 左侧分类请求数据
				request({
					url: 'index.php?s=/wap/goods/goodsClassificationList'
				}).then(res => {
					for(let i = 0; i < res.data.list.length;i++) {
						res.data.list[i].id="item" + res.data.list[i].category_id
					}
					this.typeList = res.data.list;
					this.category_id = res.data.list[0].category_id;
					// 默认请求第一个分类数据
					this.handleClick(this.typeList[0],0)
				})
			},
			onShow() {
				uni.getStorage({
					key: 'keywords',
					success: res => {
						this.$store.state.keywords = res.data
						this.list = res.data
					}
				})
			}
		}
</script>

<style lang="scss">
	// 搜索框
	.classify-search {
		box-sizing: border-box;
		padding: 0 30rpx;
		border-bottom: 1px solid #E5E5E5;
		background: #fff;
		.search {
			box-sizing: border-box;
			height: 88rpx;
			line-height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.search-input {
				flex: 1;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				image {
					width: 35rpx;
					height: 35rpx;
				}
				input {
					flex: 1;
					box-sizing: border-box;
					margin-left: 10rpx;
				}
			}
			.search-img {
				box-sizing: border-box;
				border-left: 1px solid #E5E5E5;
				text {
					margin-left: 36rpx;
					font-size: 28rpx;
					color: #9D9D9D;
				}
				image {
					width: 55rpx;
					height: 50rpx;
					position: relative;
					margin-left: 36rpx;
					top: 4rpx;
				}
			}
		}
	}
	.container {
		box-sizing: border-box;
		height: 100%;
		.product-box {
			box-sizing: border-box;
			display: flex;
			.product-type {
				width: 160rpx;
				box-sizing: border-box;
				.type-item {
					line-height: 100rpx;
					width: 100%;
					color: #444;
					font-size: 25rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					text-align: center;
				}
			}
			.product-main {
				flex: 1;
				box-sizing: border-box;
				padding: 0 20rpx;
			.product-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 14rpx;
					text:first-child {
						font-size: 24rpx;
						color: #BFBFBF;
						flex: 1;
					}
					text:last-child {
						display: inline-block;
						font-size: 16rpx;
						line-height: 18rpx;
						box-sizing: border-box;
						padding: 2rpx 10rpx;
						border-radius: 12rpx;
						color: #BFBFBF;
						background: #F3F3F3;
					}
				}
				.product-title.titleActive {
					margin-top: 40rpx;
				}
			.product-online {
				box-sizing: border-box;
				
				.online-item {
					box-sizing: border-box;
					margin-top: 40rpx;
					display: flex;
					.online-show {
						width: 150rpx;
						height: 150rpx;
						margin-right: 32rpx;
						flex-shrink: 0;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.online-des {
						box-sizing: border-box;
						flex: 1;
						.online-title {
							font-size: 30rpx;
							color: #444;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2; 
							word-break: break-all;
						}
						.online-context {
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 16rpx;
							.online-price {
								flex: 1;
								text-align: left;
								font-size: 13px;
								display: flex;
								flex-direction: column;
								text:first-child {
									color: #FC3D3C;
									font-weight: 700;
									margin-right: 5px;
								}
								text:last-child {
									font-size: 24rpx;
									margin-top: 10rpx;
									color: #AAAAAA;
								}
							}
							.online-add {
								width: 42rpx;
								height: 42rpx;
								image {
									width: 100%;
									height: 100%;
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
			}
		}
	}
	.active {
		border-left: 4px solid #C3A769;
		background: #fff !important;
	}
	

</style>
