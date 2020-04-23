<template>
	<view>
		<!-- 导航 -->
		<view class="nav-box">
			<view class="nav">
				<block v-for="(item,index) in navList" :key="index">
					<view class="nav-item " @click="handleNav(index)" :class="{'active': currentIndex == index}">
						<text>{{item}}</text>
					</view>
				</block>
			</view>
		</view>
		<!-- 商品列表 -->
		<!-- 全部 -->
		<view v-if="visible == 1" class="animated fadeInLeft">
			<block v-for="(item,index) in list" :key="index">
			<!-- 已完成交易但未评价 -->
			<view class="goods-box">
				<view class="goods">
					<!-- 商品信息栏 -->
					<view class="goods-title">
						<text>{{item.create_date}}</text>
						<text>{{item.status_name}}</text>
					</view>
					<!-- 商品 -->
					<block v-for="(good,i) in item.order_item_list" :key="i">
					<view class="product" @click="orderDetail(item.order_id)">
						<view class="product-img">
							<image :src="baseURL + good.picture.pic_cover" mode=""></image>
						</view>
						<view class="product-title">
							<view class="title">
								<text style=" display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;">{{good.goods_name}}</text>
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
							<text>共{{item.order_item_list.length}}件商品，合计：￥{{item.order_money}}(含运费￥{{item.shipping_money}})</text>
						</view>
						<view>
							<block v-for="(btn,bk) in item.member_operation" :key="bk">
							<text v-if="btn.no == 'pay'" @click="payOrder(item.out_trade_no)" >{{btn.name}}</text>
							<text v-if="btn.no == 'close'" @click="orderClose(item.order_id)">{{btn.name}}</text>
							<text v-if="btn.no == 'logistics'" @click="orderLogistics(item.order_id)">{{btn.name}}</text>
							<text v-if="btn.no == 'getdelivery'" @click="OrderTakeDelivery(item.order_id)">{{btn.name}}</text>
							<text v-if="btn.no == 'delete_order'" @click="orderDeleteOrder(item.order_id)">{{btn.name}}</text>
							</block>
							<text v-if="(item.order_status == 3||item.order_status == 4) && item.is_evaluate==0" @click="orderEvaluate(item.order_id)">评价</text>
						</view>
					</view>
				</view>
			</view>
			</block>
			<!-- 已完成交易且已评价 -->
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
				visible:0,
				navList: ['全部', '待付款', '待发货', '待收货', '待评价'],
				currentIndex: 0,
				list: [],

			};

		},
		onLoad: function(params) {
			if(params.status == 'all') {
				this.currentIndex = 0
			}
			else {
				this.currentIndex = params.status;
			}
			
			this.getList();
		},
		methods: {
			// 点击切换
			handleNav(index) {
				this.currentIndex = index;
				this.getList();
			},
			// 点击商品去到订单详情页
			orderDetail(id) {
				uni.navigateTo({
					url: '/pages/components/order-detail/order-detail?id='+id
				})
			},
			// 店家跳转到申请退货页面
			returnGoods() {
				uni.navigateTo({
					url: '/pages/components/return-goods/return-goods'
				})
			},
			// 点击跳转到评价页面
			appraise() {
				uni.navigateTo({
					url: '/pages/components/appraise/appraise'
				})
			},
			getList() {
				this.visible = 0;
				let status = '';
				let that = this;
				let index = parseInt(this.currentIndex);
				switch (index) {
					case 0:
						status = 'all';
						break;
					case 1:
						status = '0';
						break;
					case 2:
						status = '1';
						break;
					case 3:
						status = '2';
						break;
					case 4:
						status = '3';
						break;
					default:
						status = '6';
				}

				request({
					url: 'index.php?s=/wap/order/apiMyOrderList',
					data: {
						status: status
					},
					method: "POST",
				}).then(function(res) {
					that.visible = 1;
					that.list = res.data.order_list.data;
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
									that.getList();
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
			//取消订单
			orderClose(order_id){
				let that = this;
				uni.showModal({
					content: '确定要取消该订单吗？',
					success: res => {
						if(res.confirm) {
							request({
								url:'index.php?s=/wap/order/apiOrderClose',
								method:"POST",
								data:{order_id:order_id},
							}).then(res=>{
								that.getList();
							});
						}
					}
				})
			},
			//删除订单
			orderDeleteOrder(order_id){
				let that = this;
				uni.showModal({
					content: '确定要删除该订单吗？',
					success: res => {
						if(res.confirm) {
							request({
								url:'index.php?s=/wap/order/apiDeleteOrder',
								method:"POST",
								data:{order_id:order_id},
							}).then(res=>{
								that.getList();
							});
						}
					}
				})
			},
			//支付订单
			payOrder(order_no){
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
			},
			orderEvaluate(order_id){
				uni.navigateTo({
					url:"/pages/components/appraise/appraise?id="+order_id
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}

	// 导航
	.nav-box {
		box-sizing: border-box;
		line-height: 90rpx;
		height: 90rpx;
		background: #fff;

		.nav {
			box-sizing: border-box;
			display: flex;
			border-bottom: 1px solid #E5E5E5;

			.nav-item {
				box-sizing: border-box;
				flex: 1;
				text-align: center;
				font-size: 30rpx;
				color: #444444;
				border-right: 1px solid #E5E5E5;
			}

			.nav-item:nth-child(5) {
				border-right: 0
			}

			.nav-item.active {
				color: #FED940;
			}
		}
	}

	// 商品列表
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

			.total {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 24rpx;
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 18rpx;
				padding-top: 18rpx;
				text-align: right;
				// line-height: 46rpx;
				view:nth-child(2) {
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
				}
			}
		}
	}
</style>
