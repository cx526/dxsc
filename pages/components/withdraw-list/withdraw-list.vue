<template>
	<view>
		
		<view class="shop-list" v-if="planList && planList.length > 0">
			<block v-for="(item,index) in planList" :key="index">
			<view class="shop-item" hover-class="clickActive" @click="checkPlan(index)">
				<view class="shop-img">
					<image src="/static/images/shop-logo.png" mode=""></image>
				</view>
				<view class="shop-main">
					<view class="title">
						<text>提现{{item.cash}}元</text>
					</view>
					<view class="time">
						<text>{{item.ask_for_date}}</text>
					</view>
				</view>
				<view class="shop-price">
					<view class="price">
						<text>{{item.cash}}元</text>
					</view>
					<view class="used">
						<!-- <text>(已使用优惠券抵扣10)</text> -->
					</view>
				</view>
			</view>
			</block>
		</view>
		<view v-else class="none">暂无提现相关信息</view>
		
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				uid: '',
				planList: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'uid',
				success: res => {
					this.uid = res.data;
					this.getList()
				}
			})
		},
		methods: {
			// 获取提现列表
			getList() {
				request({
					url: 'index.php?s=/wap/member/getMemberWithdrawList',
					method: 'post',
					data: {
						uid: this.uid
					}
				}).then(res => {
					if(res.data.msg&&res.data.msg.length > 0) {
						res.data.msg.forEach(item => {
							item.ask_for_date = this.changeTime(item.ask_for_date);
							item.member_img = this.$api + item.member_img 
						});
					}
					this.planList = res.data.msg;
					console.log(res.data.msg)
				})
			},
			// 转化时间
			changeTime(time) {
				let date = time * 1000;
				let yy = new Date(date).getFullYear();
				let mm = new Date(date).getMonth() + 1 > 9?new Date(date).getMonth() + 1:'0'+(new Date(date).getMonth() + 1);
				let dd = new Date(date).getDay() > 9?new Date(date).getDay():'0'+new Date(date).getDay();
				let h = new Date(date).getHours() > 9?new Date(date).getHours():'0'+new Date(date).getHours();
				let m = new Date(date).getMinutes()>9?new Date(date).getMinutes():'0'+new Date(date).getMinutes();
				let s = new Date(date).getSeconds()>9?new Date(date).getSeconds():'0'+new Date(date).getSeconds();
				return yy +'-'+ mm +'-'+ dd +' '+ h +':'+ m +':'+ s
			},
			// 跳转到提现详情
			checkPlan() {
				uni.navigateTo({
					url:"/pages/components/withdraw-plan/withdraw-plan"
				})
			},
		}
	}
</script>

<style lang="scss">
	.date-picker{
		width: 100%;
		position: fixed;
		bottom:0;
		background-color: #fff;
	}
	.date-picker-line{
		width:90%;
		overflow: hidden;
		padding:0 5%;
		line-height: 80upx;
		border-top: 1upx solid #eee;
		border-bottom: 1upx solid #eee;
	}
	.date-picker-cancel{
		float: left;
	}
	.date-picker-ok{
		color:seagreen;
		float: right;
	}
	picker-view {
	    width: 90%;
		padding:0 5%;
	    height: 300upx;
	    margin-top:20upx;
	}
	.item{
		text-align:center;
	}
	.data-time {
		box-sizing: border-box;
		height: 105rpx;
		background: #EFEFF4;
		font-size: 24rpx;
		padding: 10px 24rpx 0;

		.data {
			box-sizing: border-box;

			view:nth-child(1) {
				color: #444444;
			}

			.method {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				margin-top: 8rpx;

				.expend {
					color: #BBBBBB;
					flex: 1;
				}

				.icoming {
					color: #BBBBBB;
					flex: 1;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}

	.shop-list {
		box-sizing: border-box;

		.shop-item {
			box-sizing: border-box;
			padding: 38rpx 30rpx 18rpx 30rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #EFEFF4;

			.shop-img {
				width: 60rpx;
				height: 60rpx;
				margin-right: 28rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.shop-main {
				box-sizing: border-box;
				flex: 1;

				.title {
					font-size: 30rpx;
					color: #2B2B2B;
				}

				.time {
					font-size: 24rpx;
					color: #9F9F9F;
				}
			}

			.shop-price {
				box-sizing: border-box;

				.price {
					font-size: 30rpx;
					color: #777777;
				}

				.used {
					font-size: 20rpx;
					color: #CECECE;
				}
			}
		}
	}
	.clickActive {
		background: #f1f1f1;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		text-align: center;
		color: #666;
	}
</style>
