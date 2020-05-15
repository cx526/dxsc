<template>
	<view>
		<!-- 充值title -->
		<view class="account-title">
			<image :src="typeList.media_logo" mode=""></image>
			<text>{{typeList.media_name}}</text>
		</view>
		<!-- 充值账号 -->
		<view class="account-number">
			<view class="account"><text>充值账号</text></view>
			<view class="number">
				<input type="text" placeholder="请输入手机号码" v-if="typeList.user_type == 0" 
				v-model="phone" @input="getUserPhone"/>
				<input type="text" placeholder="请输入手机号码" v-if="typeList.user_type == 1"
				v-model="QQ" @input="getUserQQ"/>
			</view>
			<view class="notice">
				<view><text>购买须知</text></view>
				<view><text>请确保无误，充值账号成功后不支持退换。</text></view>
			</view>
		</view>
		<!-- 充值类型 -->
		<view class="pay-type">
			<view class="title"><text>充值类型</text></view>
			<view class="type-list">
				<block v-for="(item,index) in classify.list" :key="index">
					<view class="type-item" 
					:class="classify.currentIndex == index?'typeActive':''"
					@click="chooseFaceType(index)"
					v-if="classify.list && classify.list.length > 0">
						<text>{{item.cat_name}}</text>
					</view>
				</block>
				
			</view>
		</view>
		<!-- 充值面额 -->
		<view class="pay-face">
			<view class="title"><text>面额</text></view>
			<view class="face-list">
				<block v-for="(item,index) in faceList.list" :key="index">
					<view class="face-item" @click="chooseFacePay(index)" 
					:class="faceList.currentIndex == index?'faceActive':''">
						<view class="time">
							<text>{{item.duration}}</text>
						</view>
						<view class="newPrice">
							<text>￥</text>
							<text>{{item.price}}</text>
						</view>
						<view class="oldPrice">
							<text>官方价￥{{item.facevalue}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button @click="goVideoCheckstand">立即充值</button>
		</view>
		
		
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				faceList: {
					currentIndex: 0,
					list:[]
				}, 
				// 商品id
				id: '',
				// 充值分类
				classify: {
					currentIndex: 0,
					list: []
				},
				// 充值商品信息
				typeList: {},
				goods_id: '',
				// 用户输入的充值手机号码
				phone: ''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getDataList();
			
		},
		methods: {
			// 选择充值类型
			chooseFaceType(index) {
				this.classify.currentIndex = index;
				this.getDataList()
			},
			// 选择充值面额
			chooseFacePay(index) {
				this.faceList.currentIndex = index;
				this.goods_id = this.faceList.list[index].id;
				console.log(this.goods_id);
			},
			// 请求数据
			getDataList() {
				uni.showToast({
					title: '数据加载中',
					icon: 'loading'
				});
				request({
					url: 'index.php?s=/wap/index/getMediaGoods',
					method: 'post',
					data: {
						media_id: this.id
					}
				}).then(res => {
					uni.hideToast()
					// 充值商品信息
					res.data.media.media_logo = this.$api + res.data.media.media_logo;
					this.typeList = res.data.media;
					console.log(this.typeList);
					// 充值分类(默认选择第一项)
					this.classify.list = res.data.cat_list;
					// 当前选中的充值分类id
					let id = this.classify.list[this.classify.currentIndex].id;
					// 刷选该分类下对应的商品
					this.faceList.list = res.data.goods_list.filter(item => {
						if(item.cat_id == id){
							return item
						}
					})
					this.goods_id = this.faceList.list[0].id
				})
			},
			// 获取用户输入的手机号
			getUserPhone(event) {
				this.phone = event.detail.value;
			},
			// 校验手机号码
			checkPhone() {
				if(this.typeList.user_type == 0) {
					if(!(/^1[3456789]\d{9}$/.test(this.phone))) {
						uni.showToast({
							title: '请输入正确手机号码',
							icon: 'none'
						});
						return false
					}
					else {
						return true
					}
				}
			},
			// 获取用户输入的QQ
			getUserQQ(event) {
				this.QQ = event.detail.value;
			},
			// 校验QQ
			checkQQ() {
				if(this.typeList.user_type == 1) {
					if(!(/^[1-9]\d*$/.test(this.QQ))) {
						uni.showToast({
							title: '请输入正确qq',
							icon: 'none'
						});
						return false
					}
					else {
						return true
					}
				}
			},
			// 付款页面
			goVideoCheckstand() {
				request({
					url:"index.php?s=/wap/member/checkLogin",
					method: 'post'
				}).then(res => {
					if(res.data == "") {
						if(this.checkPhone() || this.checkQQ()) {
							// 如果是手机号充值
							if(this.typeList.user_type == 0) {
								uni.navigateTo({
									url: '/pages/components/video-checkstand/video-checkstand?id='+this.goods_id+'&mobile='+this.phone,
								})
							}
							// 如果是QQ号充值
							if(this.typeList.user_type == 1) {
								uni.navigateTo({
									url: '/pages/components/video-checkstand/video-checkstand?id='+this.goods_id+'&mobile='+this.QQ,
								})
							}
							
						}
						
					}
					else {
						uni.showModal({
							title: '请先登录!',
							content:'是否前往登录页面?',
							success: res => {
								if(res.confirm) {
									uni.navigateTo({
										url: '/pages/components/login/login'
									})
								}
								else {}
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// 充值title
	.account-title {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 38rpx;
		font-size: 28rpx;
		padding-bottom: 0;
		image {
			width: 100rpx;
			height: 100rpx;
			margin-right: 18rpx;
		}
	}
	// 充值帐号
	.account-number {
		box-sizing: border-box;
		padding: 50rpx 38rpx 0 38rpx;
		.account {
			font-size: 28rpx;
			color: #636363;
		}
		.number {
			box-sizing: border-box;
			border-bottom: 1px solid #F6F5F3;
			line-height: 80rpx;
			height: 80rpx;
			margin-top: 16rpx;
			input {
				box-sizing: border-box;
				display: block;
				height: 100%;
			}
		}
		.notice {
			box-sizing: border-box;
			background: #FEF7E5;
			color: #CCA02F;
			font-size: 26rpx;
			padding: 30rpx 36rpx;
			margin-top: 28rpx;
			line-height: 40rpx;
		}
	}
	// 充值类型
	.pay-type {
		box-sizing: border-box;
		padding: 0 38rpx;
		margin-top: 70rpx;
		.title {
			font-size: 26rpx;
			color: #888888;
			margin-bottom: 24rpx;
		}
		.type-list {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.type-item {
				box-sizing: border-box;
				font-size: 30rpx;
				background: #F6F5F0;
				padding: 24rpx 36rpx;
				color: #D09B09;
				border-radius: 12rpx;
				margin-right: 12rpx;
			}
			.type-item.typeActive {
				font-weight: 700;
				background: #F8E7BB;
				color: #6D3E06;
			}
		}
	}
	// 充值面额
	.pay-face {
		box-sizing: border-box;
		padding: 0 38rpx;
		margin-top: 60rpx;
		.title {
			font-size: 26rpx;
			color: #888888;
			margin-bottom: 24rpx;
		}
		.face-list {
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			.face-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: calc(33.33% - 8rpx);
				background: #F6F5F0;
				box-sizing: border-box;
				font-size: 26rpx;
				padding: 38rpx 0;
				margin-right: 12rpx;
				margin-bottom: 12rpx;
				.time {
					color: #755023;
					font-weight: 700;
					margin-bottom: 18rpx;
					line-height: 0;
				}
				.newPrice {
					font-size: 36rpx;
					font-weight: 700;
					color: #CF9808;
					margin-bottom: 14rpx;
					text:nth-child(1) {
						font-size: 28rpx;
					}
				}
				.oldPrice {
					color: #AB9D86;
					text-decoration: line-through;
					line-height: 0;
					font-size: 22rpx;
				}
			}
			.face-item:nth-child(3n) {
				margin-right: 0;
			}
			.face-item.faceActive {
				background: #F8E7BB !important;
			}
		}
	}
	// 充值按钮
	.btn {
		box-sizing: border-box;
		padding: 30rpx 38rpx;
		button {
			background: #FED940;
			color: #FFFFFF;
		}
		
	}
</style>
