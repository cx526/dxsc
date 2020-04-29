<template>
	<view>
		<view>
			<block v-for="(item,index) in goods" :key="index">
			<!-- 退货商品 -->
			<view class="goods-box">
				<view class="goods">
					<!-- 商品 -->
					<view class="product" @click="orderDetail()">
						<view class="product-img">
							<image :src="baseURL + item.picture_info.pic_cover" mode=""></image>
						</view>
						<view class="product-title">
							<view class="title">
								<text>{{item.goods_name}}</text>
							</view>
							<view class="params">
								<text>{{item.sku_name}}</text>
							</view>
						</view>
						<view class="product-price">
							<view class="price">
								<text>￥{{item.price}}</text>
							</view>
							<view class="number">
								<text>×{{item.num}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品评价 -->
			<view class="appraise-box">
				<view class="appraise">
					<textarea value="" :data-index="index" @input="changeContent" placeholder="宝贝不能满足您的期待吗？简单说说它的不足吧.." placeholder-style="color:#B2B2B2;font-size: 15px;"/>
					<view class="show-photo" @click="uploadImage(index)">
						<image src="/static/images/photo.png" mode=""></image>
						<view>
							<text>添加图片</text>
						</view>
					</view>
					<block v-for="(v,i) in comment[index]['imgs']" :key="i">
					<view class="up-photo"><image :src="baseURL + v" mode=""></image></view>
					</block>
				</view>##FED940
			</view>
			<!-- 提示 -->
			</block>
			
			<!-- 提交按钮 -->
			<view class="btn-block">
				
			</view>
			<view class="btn">
				<button style="background: #FED940;" @click="submitSend()">确定</button>
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
				goods:[],
				comment:[
					{
						imgs:[],
					}
				],
				order_id:'',
				order_no:'',
			};
		},
		onLoad(options){
			let id = options.id;
			this.getInfo(id);
		},
		methods:{
			getInfo(id){
				let that = this;
				request({
					url: 'index.php?s=/wap/order/apiReviewCommodity',
					data: {
						order_id: id
					},
				}).then(function(res){
					that.goods = res.data.data.list;
					let comment = [];
					for(let i=0;i<that.goods.length;i++){
						let temp = {
							'is_anonymous':false,
							'scores':5,
							'explain_type':1,
							'order_id':res.data.data.order_id,
							'order_goods_id':that.goods[i].order_goods_id,
							'goods_id':that.goods[i].goods_id,
							'content':'',
							'imgs':[],
							};
						comment[i] = temp;
					}
					that.comment = comment;
					that.order_id = res.data.data.order_id;
					that.order_no = res.data.data.order_no;
				});
			},
			changeContent(obj){
				console.log(obj);
				console.log(obj.target.dataset.index);
				this.comment[obj.target.dataset.index]['content'] = obj.detail.value;
			},
			uploadImage(i){
				let that = this;
				let comment = that.comment;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        uni.uploadFile({
							url:that.$api+"index.php?s=/wap/upload/uploadfile",
							filePath:res.tempFilePaths[0],
							name:'file_upload',
							formData: {
							    file_path:'upload/common/',
							},
							success:function(res){
								let data = JSON.parse(res.data);
								console.log(data);
								if(data.code==1){
									comment[i]['imgs'].push(data.data);
									that.comment = comment;
								}
							}
						});
				    }
				});
			},
			submitSend(){
				let that = this;
				let comment = that.comment;
				console.log(comment);
				request({
					url: 'index.php?s=/wap/order/ApiAddGoodsEvaluate',
					data: {
						order_id: that.order_id,
						order_no:that.order_no,
						goodsEvaluate:JSON.stringify(comment),
					},
					method:"POST",
				}).then(function(res){
					uni.showToast({
						title:res.data.msg,
						duration:2000,
						icon: 'none'
					})
					if(res.data.code==1){
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},2000);
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 申请退货第一步
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		// border-bottom: 1px solid #E5E5E5;
		.goods {
				box-sizing: border-box;
				.product {
					box-sizing: border-box;
					padding: 30rpx;
					display: flex;
					border-bottom: 1px solid #E5E5E5;
					// align-items: center;
					.product-img {
						width: 140rpx;
						height: 140rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.product-title {
						flex: 1;
						box-sizing: border-box;
						padding-left: 30rpx;
						padding-right: 48rpx;
						.title {
							font-size: 30rpx;
							color: #444444;
						}
						.params {
							font-size: 24rpx;
							color: #AAAAAA;
						}
					}
					.product-price {
						box-sizing: border-box;
						.price {
							font-size: 30rpx;
							color: #000;
						}
						.number {
							font-size: 24rpx;
							color: #AAAAAA;
							text-align: right;
						}
					}
				}
			}
			
		}
	.goods-box:nth-child(1) {
		margin-top: 0;
	}
	// 商品评价
	.appraise-box {
		box-sizing: border-box;
		padding: 30rpx;
		background: #fff;
		// margin-top: 20rpx;
		.appraise {
			box-sizing: border-box;
			overflow: hidden;
			textarea {
				width: 100%;
				box-sizing: border-box;
				font-size: 28rpx;
			}
			.show-photo {
				float:left;
				box-sizing: border-box;
				width: 164rpx;
				height: 164rpx;
				border: 1px solid #E5E5E5;
				text-align: center;
				padding: 32rpx 0;
				image {
					width: 50rpx;
					height: 45rpx;
				}
				view {
					color: #D8D8D8;
					font-size: 24rpx;
					text-align: center;
				}
			}
			.up-photo{
				float:left;
				box-sizing: border-box;
				margin-top: 32rpx;
				margin-left: 10rpx;
				width: 100rpx;
				height: 100rpx;
				border: 1px solid #E5E5E5;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	// 评分
	
	// 提交按钮
	.btn-block{
		width:100%;
		height:100rpx;
	}
	.btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
