<template>
	<view>
		<view class="check-title">
			<view class="check">
				<view class="radio">
					 <label>
						 <checkbox 
						 v-if="isShow" value="r1" 
						 :checked="allChecked" 
						 style="transform: scale(0.7)"
						 @click="allCheck()"
						 color="#FED940"/>
						 全选
						 </label>
				</view>
				<view class="edit" @click="edit()">
					<text v-if="!isShow">编辑</text>
					<text v-else @click="del()">删除</text>
				</view>
			</view>
		</view>
		<!-- 收藏商品列表 -->
		<view class="collect-box">
			<view class="collect">
				<block v-for="(item,index) in goodsList" :key="index">
					<view class="collect-item" style="width: 48%;">
						<view class="radio" v-if="isShow" @click="checked(index)">
							<label>
								<checkbox value="r1" :checked="item.active"  style="transform: scale(0.7)" color="#FED940"/>
							</label>
						</view>
						<view class="img" @click="openDetail(item.goods_id)">
							<image :src="baseURL + item.goods_image" mode=""></image>
						</view>
						<view class="title">
							<text>{{item.goods_name}}</text>
						</view>
						<view class="price" v-if="item.price">
							<text>优惠价：{{item.price}}</text>
						</view>
						<view v-if="item.market_price" style="font-size: 24rpx;color: #AAAAAA;text-decoration: line-through;">
							<text>市场价：{{item.market_price}}</text>
						</view>
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				page:1,
				goodsList:[],
				isShow: false,
				allChecked: false,
				total:0
			};
			
		},
		onLoad(){
			this.getList();
		},
		methods: {
			//商品详情
			openDetail(goods_id){
				console.log(goods_id)
				uni.navigateTo({
					url:"/pages/common/goods-detail/goods-detail?id="+goods_id
				});
			},
			//获取列表
			getList(){
				let that = this;
				request({
					url:'index.php?s=/wap/member/apiMyCollection',
					method:"POST",
					data:{
						page:that.page,
						type:'goods',
					},
				}).then(res=>{
					that.goodsList = res.data.data.data;
					console.log(that.goodsList)
				});
			},
			// 点击编辑
			edit(){
				this.isShow = !this.isShow;
			},
			// 点击全选，所有的商品选中或全不选
			allCheck() {
				this.allChecked = !this.allChecked;
				for(let i = 0;i < this.goodsList.length;i++) {
					this.goodsList[i].active = this.allChecked;
				}
			},
			// 点击商品的选中项
			checked(index) {
				this.goodsList[index].active = !this.goodsList[index].active;
				for(let i = 0;i < this.goodsList.length;i++) {
					if(!this.goodsList[i].active) {
						this.allChecked = false;
						break;
					}
					else {
						this.allChecked = true
					}
				}
			},
			// 点击删除
			del() {
				let that = this;
				// 单一点击每个商品
				if(that.goodsList&&that.goodsList.length > 0) {
					for(let i = 0;i < that.goodsList.length;i++) {
						if(that.goodsList[i].active) {
							request({
								url:'index.php?s=/wap/Member/apiCancelFavorites',
								method:"POST",
								data:{
									fav_id:that.goodsList[i].goods_id,
									fav_type:'goods',
								},
							}).then(res=>{
								that.goodsList.splice(i,1);
							});
						}	
					}
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
				}
				// 点击全选
				if(that.allChecked) {
					that.goodsList = '';
					that.allChecked = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.check-title {
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #E5E5E5;
		.check {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.radio {
				font-size: 24rpx;
				color: #CCC;
				// width: 40rpx;
				// height: 40rpx;
			}
			.edit {
				color: #A4A4A4;
				font-size: 20rpx;
			}
		}
	}
	.collect-box {
		box-sizing: border-box;
		.collect {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.collect-item {
				padding-bottom: 24rpx;
				box-sizing: border-box;
				width: 50%;
				position: relative;
				.radio {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 99;
				}
				.img {
					box-sizing: border-box;
					width: 100%;
					height: 300rpx;
					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.title {
					font-size: 30rpx;
					box-sizing: border-box;

					color: #444444;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.price {
					font-size: 26rpx;
					box-sizing: border-box;
					color: #FC3D3C;
					font-weight: 700;
					margin-right: 5px;
					text:nth-child(2) {
						font-size: 26rpx;
						color: #B0B0B0;
						text-decoration: line-through;
						margin-left: 18rpx;
					}
				}
			}
			.collect-item:nth-child(2n) {
				border-right: 0;
			}
		}
	}
	
</style>
