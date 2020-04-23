<template>
	<view>
		<view class="tab-box">
			<block v-for="(v,i) in packet" :key="i">
			<view v-if="curPacket==i" class="item focus">{{v.packet_name}}</view>
			<view v-if="curPacket!=i" class="item" @click="changePacket(i)">{{v.packet_name}}</view>
			</block>
		</view>
		<view class="goods-box">
			<block v-for="(v,i) in packet[curPacket].order_goods_list" :key="i">
			<view class="item"><image :src="baseURL + v.picture_info.pic_cover"></image></view>
			</block>
		</view>
		<view class="cut-line"></view>
		<view class="title-box">
			<view class="title">
				<view class="title-context">
					<view class="title-express">
						<text>{{packet[curPacket].express_name}}</text>
					</view>
					<view class="title-service">
						<text>运单编号：{{packet[curPacket].express_code}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cut-line"></view>
		<view class="express-after">
			<text>物流跟踪</text>
		</view>
		<view class="express-status">
			<view class="status">
				<view class="express-item">
					<block v-for="(item,index) in express" :key="index">
						<view class="item">
							<view style="margin-left: 30rpx;">
								<view class="message">
									<text class="circle"></text>
									<text>{{item.AcceptStation}}</text>
								</view>
								<view class="time">
									<text>{{item.AcceptTime}}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
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
				packet:[],
				curPacket:0,
				express:[],
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
					url: 'index.php?s=/wap/order/apiOrderExpress',
					data: {
						order_id: id
					},
				}).then(function(res){
					that.packet = res.data.data.order.goods_packet_list;
					that.getExpress();
				});
			},
			getExpress(){
				let that = this;
				let express_id = that.packet[that.curPacket].express_id;
				request({
					url: 'index.php?s=/wap/order/ApiGetOrderGoodsExpressMessage',
					data: {
						express_id: express_id
					},
					method:"POST"
				}).then(function(res){
					if(res.data.code==1){
						that.express = res.data.list;
					}
				});
			},
			changePacket(i){
				this.curPacket = i;
				this.getExpress();
			}
		}
	}
</script>

<style lang="scss">
	.tab-box{
		width:100%;
		overflow: hidden;
		display: flex;
		.item{
			flex: 1;
			margin:0 10rpx;
			box-sizing: content-box;
			line-height: 80rpx;
			font-size: 32rpx;
			height: 80rpx;
			text-align: center;
			color:#888;
		}
		.focus{
			border-bottom: 5rpx solid rgba(254,217,64,1);
		}
	}
	.goods-box{
		width:100%;
		overflow: hidden;
		.item{
			padding:20rpx;
			box-sizing: border-box;
			width:142rpx;
			height:142rpx;
			float: left;
			overflow: hidden;
			image{
				width:100%;
				height: 100%;
			}
		}
	}
	.title-box {
		box-sizing: border-box;
		padding: 30rpx;
		height: 200rpx;
		.title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.title-show {
				width: 142rpx;
				height: 142rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title-context {
				flex: 1;
				margin-left: 26rpx;
				.title-status {
					color: #B53431;
					font-size: 30rpx;
				}
				.title-express {
					color: #AAAAAA;
					font-size: 26rpx;
					margin-top: 8rpx;
				}
				.title-service {
					color: #AAAAAA;
					font-size: 26rpx;
					margin-top: 8rpx;
				}
			}
		}
	}
	.cut-line {
		background: #EFEFF4;
		height: 18rpx;
	}
	.express-after {
		box-sizing: border-box;
		line-height: 90rpx;
		color: #909090;
		font-size: 30rpx;
		border-bottom: 1px solid #EAEAEA;
		padding-left: 30rpx;
	}
	.express-status {
		box-sizing: border-box;
		.status {
			box-sizing: border-box;
			padding: 40rpx;
			.express-item {
				box-sizing: border-box;
				height: 145rpx;
				.item {
					position: relative;
					box-sizing: border-box;
					padding-bottom: 80rpx;
					border-left: 1px solid #DDDDDD;
					.message {
						font-size: 30rpx;
						color: #9B9B9B;
						.circle {
							display: inline-block;
							width: 40rpx;
							height: 40rpx;
							background: #9B9B9B;
							border-radius: 50%;
							position: absolute;
							left: -20rpx;
							top: 0;
							z-index: 2;
						}
					}
					.time {
						font-size: 24rpx;
						color: #AFAFAF;
						margin-top: 18rpx;
					}
				}
				.item:last-child {
					border-left: 0;
				}
				.active {
					color: #B4302D !important;
				}
				.bgActive {
					color: #B4302D !important;
				}
			}
		}
	}
</style>
