<template>
	<view>
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
		<view class="search-nav">
			<block v-for="(item,index) in navList" :key="index">
				<view>
					<text>{{item}}</text>
				</view>
			</block>
		</view>
		
		<!-- 列表 -->
		<view class="news-box">
			<view class="news">
				<view v-if="newsList && newsList.length > 0">
					<block v-for="(item,index) in newsList" :key="index">
					<!-- 	{{newsList}} -->
						<!-- 跳转到goods-detail页面 -->
						<view class="news-item" @click="handleGoodsDetail(item.goods_id)">
							<image :src="item.pic_cover_small"></image>
							<view class="news-text">
								<view class="news-title">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="news-price">
									<text class="now">￥{{item.market_price}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view v-else style="text-align: center;font-size: 28rpx;color: #444;padding: 30rpx;">暂无对应的商品</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../request.js'
	export default {
		data() {
			return {
				flag: false,
				isMarginTop: false,
				navList:['店下','线上','销量','价格'],
				// 搜索结果模拟数据
				newsList: [],
				// 存储搜索的关键词
				searchText: '',
				$src: this.$src
			};
		},
		onShow() {
			this.upDateResult();
		},
		methods:{
			// 更新搜索结果
			upDateResult() {this.newsList = this.$store.state.searchResult;},
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
						this.upDateResult();
					}
				})
			},
			// 点击搜索
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
			handleClick(item) {
				this.searchText = item;
				this.searchData();
			},	
			// 点击跳转到详情页
			handleGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/common/goods-detail/goods-detail?id='+id
				})
			}
		},
	}
</script>

<style lang="scss">
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
.search-nav {
	 box-sizing: border-box;
	 line-height: 85rpx;
	 border-bottom: 1px solid #E5E5E5;
	 color: #686868;
	 font-size: 28rpx;
	 display: flex;
	 view {
		 flex: 1;
		 border-right: 1px solid #E5E5E5;
		 box-sizing: border-box;
		 text-align: center;
	 }
	 view:last-child {
		 border-right: 0;
	 }
 }
.news-box {
 	box-sizing: border-box;
 	padding-bottom: 32rpx;
 	view {
 		overflow: hidden;
 		display: block;
 		box-sizing: border-box;
 		.news-item {
 			box-sizing: border-box;
 			width: 50%;
 			float: left;
 			image {
 				width: 100%;
 				height: 300rpx;
 				display: block;
 			}
 			.news-text {
 				box-sizing: border-box;
 				padding: 20rpx;
 				.news-title {
 					font-size: 26rpx;
 					color: #444444;
 					text-overflow: ellipsis;
 					overflow: hidden;
 					white-space: nowrap;
 				}
 				.news-price {
 					box-sizing: border-box;
 					.now {
 						font-size: 26rpx;
 						color: #000;
 						font-weight: 700;
 						margin-right: 10rpx;
 					}
 					.old {
 						font-size: 20rpx;
 						color: #D2D2D2;
 						text-decoration: line-through;
 						
 					}
 				}
 			}
 		}
 	}
 }
</style>
