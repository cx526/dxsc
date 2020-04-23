<template>
	<view>
		<!-- 订单号-->
		<view class="order-number">
			<view class="number">
				<text>订单号：{{order.order_no}}</text>
				<text>{{order.status_name}}</text>
			</view>
		</view>
		
		<!-- 自提 -->
		<view class="logistic-box" v-if="order.shipping_type == 2">
			<view class="logistic">
				<view class="type">
					<text>{{order.shipping_type_name}}</text>
				</view>
				<view class="user-info">
					<view class="user">
						<text>自提点</text>
					</view>
					<view class="address">
						<text>{{order['order_pickup']['province_name']}} {{order['order_pickup']['city_name']}} {{order['order_pickup']['dictrict_name']}} {{order['order_pickup']['address']}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 配送 -->
		<view class="logistic-box" v-if="order.shipping_type == 1">
			<view class="logistic">
				<view class="type">
					<text>{{order.shipping_type_name}}</text>
				</view>
				<view class="user-info">
					<view class="user">
						<text>收货地址</text>
					</view>
					<view class="address">
					<view style="display: flex;justify-content: space-between;">
						<text>{{order['receiver_name']}}</text>
						<text>{{order['receiver_mobile']}}</text>
					</view>
					<view style="margin-top: 12rpx;">
						<text decode="true">{{order['address']}}</text>
						<text>{{order['receiver_address']}}</text>
					</view>
					
					</view>
				</view>
			</view>
		</view>
		
		<!-- 物流 -->
		<view class="logistic-box" v-if="express_count > 0">
			<view class="logistic">
				<view class="type">
					<text>{{express_name}}：{{express_code}}</text>
					<view @click="orderLogistics(order.order_id)">
						<text>查物流</text>
						<image src="/static/images/icon-right.png" mode=""></image>
					</view>
				</view>
				<view class="user-info">
					<view class="user">
						<text>{{order.receiver_name}}</text>
						<text>{{order.receiver_mobile}}</text>
					</view>
					<view class="address">
						<text decode="true">{{order.address}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods">
				<!-- 商品信息栏 -->
				<view class="goods-title">
					<text>2020-3-20</text>
					<text>{{order.shipping_type_name}}</text>
				</view>
				<!-- 商品 -->
				<block v-for="(good,i) in order.order_goods" :key="i">
				<view class="product">
					<view class="product-img">
						<image :src="baseURL + good.picture_info.pic_cover" mode=""></image>
					</view>
					<view class="product-title">
						<view class="title">
							<text>{{good.goods_name}}</text>
						</view>
						<view class="params">
							<text>{{good.sku_name}}</text>
						</view>
					</view>
					<view class="product-price">
						<view class="price">
							<text>￥{{good.price}}</text>
						</view>
						<view class="number">
							<text>×{{good.num}}</text>
						</view>
					</view>
				</view>
				</block>
				<!-- 合计 -->
				<view class="total">
					<view>
						<text>共{{order.order_goods.length}}件商品，合计：￥{{order.order_money}}(含运费￥{{order.shipping_money}})</text>
					</view>
					<view>
						<block v-for="(btn,bk) in order.operation" :key="bk">
						<text v-if="btn.no == 'pay'" @click="orderPay(order.out_trade_no)">{{btn.name}}</text>
						<text v-if="btn.no == 'close'">{{btn.name}}</text>
						<text v-if="btn.no == 'logistics'" @click="orderLogistics(order.order_id)">{{btn.name}}</text>
						<text v-if="btn.no == 'getdelivery'" @click="OrderTakeDelivery(order.order_id)">{{btn.name}}</text>
						<text v-if="btn.no == 'pickup'">{{btn.name}}</text>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单时间 -->
		<view class="order-time">
			<view class="time">
				<view v-if="order.create_time > 0">
					<text>下单时间：{{order.format_create_time}}</text>
				</view>
				<view v-if="order.pay_time > 0">
					<text>付款时间：{{order.format_pay_time}}</text>
				</view>
				<view v-if="order.consign_time > 0">
					<text>发货时间：{{order.format_consign_time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				order:[],
				express_name:'',
				express_count:'',
				express_code:'',
				is_show_express_code:0,
			};
		},
		onLoad(options){
			this.getInfo(options.id);
		},
		methods:{
			//获取列表
			getInfo(order_id){
				let that = this;
				request({
					url :'index.php?s=/wap/order/orderDetail',
					data:{
						orderId:order_id
					}
				}).then(function(res){
					that.order = res.data.data.order;
					that.express_count = res.data.data.express_count;
					that.express_name = res.data.data.express_name;
					that.express_code = res.data.data.express_code;
					that.is_show_express_code = res.data.data.is_show_express_code;
				});
			},
			//订单确认收货
			OrderTakeDelivery(order_id){
				let that = this;
				uni.showModal({
					content: '确认收到货品了吗？',
					success: res => {
						if(res.confirm) {
							request({
								url:'index.php?s=/wap/order/OrderTakeDelivery',
								method:"POST",
								data:{order_id:order_id},
							}).then(res=>{
								if(res.data>0){
									uni.showToast({
										title:"确认收货成功!",
										icon:"none",
									});
									that.getInfo();
								}else{
									uni.showToast({
										title:"操作失败!",
										icon:"none",
									});
								}
							});
						}
					}
				})
			},
			//查看物流
			orderLogistics(order_id){
				uni.navigateTo({
					url:"/pages/components/logistics/logistics?id="+order_id,
				})
			},
			orderPay(order_no){
					if(order_no ==""){
						uni.showToast({
							title:"订单错误,请重新进入本页面!",
							icon:"none"
						});
						return ;
					}
					let token = uni.getStorageSync("token");
					console.log(token[0]);
					if(token[0] == ""||token[0]==null||token[0]==0){
						uni.showToast({
							title:"登录过期!请重新登录",
							icon:"none"
						});
						setTimeout(function(){
							uni.navigateTo({
								url:"/pages/components/login/login"
							});
						},1000);
					}
					let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+order_no+"&token="+token[0]);
					let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					window.location.href = url;
				}
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 订单号
	.order-number {
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
		.number {
			line-height: 90rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			color: #444444;
			text:nth-child(2) {
				color: #AAAAAA;
			}
		}
	}
	// 物流
	.logistic-box {
		box-sizing: border-box;
		padding: 30rpx;
		margin-top: 20rpx;
		background: #fff;
		.logistic {
			box-sizing: border-box;
			font-size: 30rpx;
			color: #888888;
			.type {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image {
					width: 30rpx;
					height: 30rpx;
					position: relative;
					top: 6rpx;
				}
			}
			.user-info {
				box-sizing: border-box;
				margin-top: 20rpx;
				.user {
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					// font-size: 30rpx;
					// color: #888888;
				}
				.address {
					box-sizing: border-box;
					margin-top: 18rpx;
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
	// 商品
	.goods-box {
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		.goods {
			box-sizing: border-box;
			.goods-title {
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #AAAAAA;
				border-bottom: 1px solid #E5E5E5;
				line-height: 70rpx;
				text:nth-child(1) {
					flex: 1;
				}
			}
			.product {
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				border-bottom: 1px solid #E5E5E5;
				// align-items: center;
				.product-img {
					width: 140rpx;
					height: 140rpx;
					flex-shrink: 0;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.product-title {
					// flex: 1;
					box-sizing: border-box;
					padding-left: 30rpx;
					padding-right: 48rpx;
					.title {
						font-size: 30rpx;
						color: #444444;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						overflow: hidden;
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
			.total {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 24rpx;
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 18rpx;
				padding-top: 20rpx;
				text-align: right;
				view:nth-child(2)  {
					box-sizing: border-box;
					margin-top: 20rpx;
					font-size: 24rpx;
					text {
						display: inline-block;
						box-sizing: border-box;
						border: 1px solid #f00;
						width: 120rpx;
						height: 44rpx;
						line-height: 44rpx;
						text-align: center;
					}
					text:nth-child(1) {
						margin-right: 14rpx;
						border: 1px solid #DDDDDD;
						color: #9B9B9B;
					}
					text:nth-child(2) {
						border: 1px solid #B4302D;
						color: #B4302D;
					}
					// button {
					// 	font-size: 24rpx;
					// }
				}
			}
		}
	}
	// 订单时间
	.order-time {
		box-sizing: border-box;
		margin-top: 20rpx;
		padding: 30rpx;
		background: #fff;
		color: #888888;
		font-size: 30rpx;
		.time {
			box-sizing: border-box;
			view {
				box-sizing: border-box;
				margin-top: 6rpx;
			}
			view:nth-child(1) {
				margin-top: 0;
			}
		}
	}
</style>
