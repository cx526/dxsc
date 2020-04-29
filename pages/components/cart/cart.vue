<template>
	<view>
		<view class="check-title">
			<view class="check">
				<view class="radio">
						 <checkbox 
						 style="transform: scale(0.7)"
						 color="#f00"
						 @click="sellectAll()"
						 :checked="selectAllchecked"
						 />
						 <text>全选</text>
				</view>
				<view class="edit">
					<text  @click="edit()" style="font-size: 26rpx;">{{isShow?'编辑':'完成'}}</text>
				<!-- 	<text v-else>删除</text> -->
				</view>
			</view>
		</view>
		<view class="goods-box">
			<view class="goods">
				
				<block v-for="(goods,index) in goods_list" :key="index" >
				<!-- 商品 -->
				<view class="product" >
					<view class="product-checkbox">
						<label>
						 <checkbox 
						 style="transform: scale(0.7)"
						 color="#f00"
						 @click="checkBox(index)"
						 :checked="goods.act"
						  />
						 </label>
					</view>
					<view class="product-img">
						<image :src="baseUrl + goods.picture_info.pic_cover" mode=""></image>
					</view>
					<view class="product-title">
						<view class="title">
							<text>{{goods.goods_name}}</text>
						</view>
						<view class="params">
							<text>{{goods.sku_name}}</text>
						</view>
					</view>
					<view class="product-price">
						<view class="price">
							<text>￥{{goods.price}}</text>
						</view>
						<view class="number">
							<text>×{{goods.num}}</text>
						</view>
						<view class="amount">
							
						</view>
					</view>
					<view class="product-amount" v-if="!isShow">
						<text @click="decrement(index)">-</text>
						<input type="number"  :value="goods.num" disabled/>
						<text @click="increment(index)">+</text>
					</view>
					
				</view>
				</block>
			</view>
		</view>
		<view class="btn">
			<view class="total" style="background: #333;">
				<text style="color: #fff;">合计：</text>
				<text>￥{{sumGoodsPrice}}</text>
			</view>
			<view @click="submitOrder()" class="add" style="background: #FED940;">
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				baseUrl:this.$api,
				// 控制编辑跟完成显示
				isShow: true,
				goods_list:[],
				sumGoodsPrice:0.00,//合计金额
				selectAllchecked:false,//全选按钮checked状态
				selectArr: []
			};
		},
		created() {

		},
		onLoad() {
			this.getGoods();
		},
		methods: {
			//请求接口获取货品信息
			getGoods(){
				request({
					url:"index.php?s=/wap/goods/Apicart",
					method:"POST",
				}).then(res=>{
					console.log(res);
					let data = res.data;
					if(data.code <=0){
						console.log("用户未登录!");
						return;
					}else{
						this.goods_list = data.goods_list;
					}
				});
			},
			//更改货品购买数量
			setGoodsNum(car_id,num,call_back){
				request({
					url:"index.php?s=/wap/goods/cartAdjustNum",
					method:"POST",
					data:{cartid:car_id,num:num}
				}).then(res =>{
					console.log(res);
					if(res.data ==1){
						if(call_back != undefined){
							call_back();
							this.total()
						}
					}
				})
			},
			// 点击编辑
			edit() {
				this.isShow = !this.isShow
			},
			// 增加
			increment(index) {
				console.log(this.goods_list[index]);
				//获取当前点击商品数量
				 let currentNum = this.goods_list[index].num + 1;
				// 获取当前点击商品的id
				let currentId = this.goods_list[index].cart_id;
				// 有限制最大购买数
				if(this.goods_list[index].max_buy > 0) {
					if(currentNum > this.goods_list[index].max_buy) {
						uni.showToast({
							title:"该商品最多购买:"+this.goods_list[index].max_buy+"个",
							icon: 'none'
						});
						this.setGoodsNum(currentId,currentNum,() => {
								this.goods_list[index].num = this.goods_list[index].max_buy;
						});
					}
				}
				else {
					this.setGoodsNum(currentId,currentNum,() => {
							this.goods_list[index].num += 1;
						});
					}
				
			},
			// 减少
			decrement(index) {
				//获取当前点击商品数量
				 let currentNum = this.goods_list[index].num>1? this.goods_list[index].num - 1:1;
				 console.log(currentNum);
				// 获取当前点击商品的id
				let currentId = this.goods_list[index].cart_id;
				// 有限制最小购买数
				if(this.goods_list[index].min_buy > 0 && currentNum < this.goods_list[index].min_buy) {
					uni.showToast({
						title:"该商品最少:"+this.goods_list[index].min_buy+"件起购",
						icon: 'none'
					});
					this.setGoodsNum(currentId,currentNum,() => {
							this.goods_list[index].num = this.goods_list[index].min_buy;
					});
				}
				else if(currentNum <= 1) {
					uni.showToast({
						title: '商品数量不能少于1件',
						icon: 'none'
					});
					this.setGoodsNum(currentId,currentNum,() => {
							this.goods_list[index].num = 1;
					});
				}
				else {
					this.setGoodsNum(currentId,currentNum,() => {
							this.goods_list[index].num -= 1;
						});
					}
				this.total()
			},

			//单选
			checkBox(index){
				this.goods_list[index].act = !this.goods_list[index].act;
				// 判断全选状态
				for(let i = 0;i < this.goods_list.length;i++) {
					if(!this.goods_list[i].act) {
						this.selectAllchecked = false;
						break;
					}
					else {
						this.selectAllchecked = true;
					}
				}
				this.total();
			},
			//全选
			sellectAll(){
				this.selectAllchecked = !this.selectAllchecked
				for(let i = 0;i < this.goods_list.length;i++) {
					this.goods_list[i].act = this.selectAllchecked
				}
				this.total()
			},
			// 结算"1,1,2,3"
			total() {
				this.sumGoodsPrice = 0;
				this.selectArr = [];
				this.goods_list.map(item => {
					if(item.act) {
						this.selectArr.push(item)
					}
				})
				console.log(this.selectArr);
				for(let i = 0;i < this.selectArr.length;i++) {
					this.sumGoodsPrice += this.selectArr[i].price * this.selectArr[i].num
				}
			},
			// 点击结算
			submitOrder() {
				let arr = [];
				let cart_id = '';
				if(this.selectArr.length <= 0) {
					uni.showToast({
						title: '当前没有选中商品',
						icon: 'none'
					})
					return
				}
				else if(this.selectArr && this.selectArr.length > 0) {
					for(let i =0;i<this.selectArr.length;i++){
						arr.push(this.selectArr[i].cart_id);
					}
					cart_id = (arr.join(","));
					this.createOrderSession(cart_id);
				}	
			},
			//提交到后台创建session
			createOrderSession(car_id){
				request({
					url:"index.php?s=/wap/order/ordercreatesession",
					method:"POST",
					data:{tag:"cart",cart_id:car_id},
				}).then(res =>{
					if(res.data==1){
						uni.navigateTo({
							url:"/pages/components/pay/pay"
						})
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
	.check-title {
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 70rpx;
		border-bottom: 1px solid #E5E5E5;
		background: #FFFFFF;
		.check {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.radio {
				font-size: 24rpx;
				color: #CCC;
				display: flex;
				align-items: center;
				// width: 40rpx;
				// height: 40rpx;
			}
			.edit {
				color: #A4A4A4;
				font-size: 20rpx;
			}
		}
	}
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		margin-bottom: 80rpx;
		// border-bottom: 1px solid #E5E5E5;
		.goods {
			box-sizing: border-box;
			
			.product {
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				border-bottom: 1px solid #E5E5E5;
				position: relative;
				// align-items: center;
				.product-checkbox {
					box-sizing: border-box;
					position: relative;
					margin-top: 30rpx;
				}
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
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
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
				.product-amount {
					position: absolute;
					right: 30rpx;
					bottom: 40rpx;
					box-sizing: border-box;
					border: 1px solid #E5E5E5;
					height: 30rpx;
					width: 150rpx;
					display: flex;
					height: 50rpx;
					align-items: center;
					text {
						font-size: 40rpx;
						flex: 1;
						text-align: center;
						height: 46rpx;
						line-height: 46rpx;
					}
					text:nth-child(1) {
						border-right: 1px solid #E5E5E5;
					}
					text:nth-child(3) {
						border-left: 1px solid #E5E5E5;
					}
					input {
						height: 42rpx;
						flex: 1.5;
						box-sizing: border-box;
						padding-left: 8rpx;
						height: 80%;
						text-align: center;
					}
				}
			}
		}
	}
	// 底部
	.btn {
		line-height: 90rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left:0;
		width: 100%;
		height: 90rpx;
		display: flex;
		.total {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			background: #6C2E2E;
			text:nth-child(1) {
				color: #885E5E;
			}
			text:nth-child(2) {
				color: #fff;
			}
		}
		.add {
			flex: 1;
			text-align: center;
			font-size: 30rpx;
			background: #B4302D;
			color: #fff;
		}
	}
</style>
