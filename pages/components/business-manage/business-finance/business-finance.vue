<template>
	<view>
		<!-- 账户余额 -->
		<view class="account">
			<view class="money"><text>账户余额</text></view>
			<view class="number">
				<view>
					<text>￥</text>
					<text>0.00</text>
				</view>
				<image :src="$src+'/images/icon-gray-right.png'"></image>
			</view>
		</view>
		<!-- 商家信息 -->
		<view class="business-info account">
			<view class="info-item">
				<view class="title">
					<text>营业额</text>
				</view>
				<view class="total">
					<text class="unit">￥</text>
					<text class="add">0.00</text>
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					<text>待结算</text>
				</view>
				<view class="total">
					<text class="unit">￥</text>
					<text class="add">0.00</text>
				</view>
			</view>
			<view class="info-item">
				<view class="title">
					<text>已提现</text>
				</view>
				<view class="total">
					<text class="unit">￥</text>
					<text class="add">0.00</text>
				</view>
			</view>
		</view>
		<!-- 银行管理 -->
		<view class="bank-manage">
			<text>银行管理</text>
			<image :src="$src+'/images/icon-gray-right.png'"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$src: this.$src
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 账户余额
	.account {
		background: #fff;
		box-sizing: border-box;
		padding: 40rpx 30rpx 50rpx 30rpx;
		margin-bottom: 20rpx;
		.money {
			font-size: 30rpx;
			color: #676767;
		}
		.number {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			view {
				text:nth-child(1) {
					font-size: 36rpx;
				}
				text:nth-child(2) {
					font-size: 50rpx;
					font-weight: 700;
				}
			}
			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	// 商户信息
	.business-info {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.info-item {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: center;
			align-items: center;
			.title {
				font-size: 30rpx;
				color: #676767;
			}
			.total {
				box-sizing: border-box;
				.unit {
					font-size: 30rpx;
				}
				.add {
					font-size: 50rpx;
				}
			}
		}
	}
	
	// 银行管理
	.bank-manage {
		background: #fff;
		box-sizing: border-box;
		padding: 0 30rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #646464;
		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>
