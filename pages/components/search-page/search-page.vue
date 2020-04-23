<template>
	<view class="container">
		<view class="classify-search">
			<view class="search">
				<view class="search-input">
					<image src="/static/images/search.png"></image>
					<input type="text"  placeholder="输入您要搜索的宝贝.." 
					placeholder-class="placeholder" @input="handleSearch($event)"
					/>
				</view>
				<view class="search-img">
					<text @click="search">搜索</text>
				</view>
			</view>
		</view>
		<view class="list-box">
			<!-- 点击跳转到goodsResult页面 -->
			<view class="list-item" @click="handleClick(item)" v-for="(item,index) in list" :key="index">
				<text>{{item}}</text>
				<image src="/static/images/icon-right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../request.js'
	export default {
		data() {
			return {
				flag: true,
				text: '',
				// 搜索内容
				searchText: '',
				list: []
			};
		},
		components:{
			// Search
		},
		onShow() {
			uni.getStorage({
				key: 'keywords',
				success: res => {
					this.$store.state.keywords = res.data
					this.list = res.data
				}
			})
		},
		methods:{
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
							url: '../goods-result/goods-result'
						})
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
			
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: #EFEFF4;
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
		.list-box {
			box-sizing: border-box;
			margin-top: 20rpx;
			font-size: 30rpx;
			color: #505050;
			line-height: 85rpx;
			.list-item {
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				border-bottom: 1px solid #E7E7E7;
				text {
					flex: 1;
				}
				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}
</style>
