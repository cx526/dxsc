<template>
	<view style="background: #fff;">
		<!-- 提现提示 -->
		<view class="withdraw-plan">
			<image src="/static/images/withdraw.png" mode=""></image>
			<view class="bank"><text>零钱提现-到顺德农商银行(02020)</text></view>
			<view class="money"><text>5050.00</text></view>
		</view>
		<!-- 进度条 -->
		<view class="notice-box">
			<view class="notice">
				<view class="notice-step" >
					<view class="step">
						<view class="cirle"></view>
						<view class="line "></view>
					</view>
					<view class="step">
						<view class="cirle"></view>
						<view class="line "></view>
					</view>
					<view class="step">
						<view class="cirle "></view>
					</view>
				</view>
				<view class="notice-nav">
					<view><text>发起提现</text></view>
					<view><text>银行处理中</text></view>
					<view><text>到账</text></view>
				</view>
			</view>
		</view>
		<!-- 进度 -->
		<view class="plan">
			<view class="plan-item">
				<text>提现金额</text>
				<text>￥5000.00</text>
			</view>
			<view class="plan-item">
				<text>申请时间</text>
				<text>2020-4-21 10:00:00</text>
			</view>
			<view class="plan-item">
				<text>到账时间</text>
				<text>2020-4-21 10:00:00</text>
			</view>
			<view class="plan-item">
				<text>提现银行</text>
				<text>顺德农商银行</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	// 提现提示
	.withdraw-plan {
		box-sizing: border-box;
		padding-top: 12rpx;
		text-align: center;
		image {
			width: 90rpx;
			height: 90rpx;
		}
		.bank {
			font-size: 30rpx;
			color: #131313;
			margin-top: 28rpx;
			line-height: 0;
		}
		.money {
			font-size: 36rpx;
			font-weight: 700;
			margin-top: 40rpx;
		}
	}
	// 进度条
	.notice-box {
		border-top: 1px solid #EFEFF4;
		border-bottom: 1px solid #EFEFF4;
		margin-top: 40rpx;
		box-sizing: border-box;
		padding-left: 110rpx;
		padding-right: 100rpx;
		height: 110rpx;
		.notice {
			box-sizing: border-box;
			position: relative;
			border: 1px solid #fff;
			height: 110rpx;
			.notice-step {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.step {
					flex: 1;
					position: relative;
					.cirle {
						width: 18rpx;
						height: 18rpx;
						border-radius: 50%;
						border: 1px solid #444;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 30rpx;
					}
					.line {
						width: 162rpx;
						height: 1px;
						background: #444;
						position: absolute;
						left: 55%;
						top: 39rpx;
					}
				}
			}
			.notice-nav {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				margin-top: 60rpx;
				view {
					font-size: 22rpx;
					flex: 1;
					text-align: center;
					color: #828282;
				}
			}
		}
	}
	// 进度
	.plan {
		box-sizing: border-box;
		padding: 30rpx 0 24rpx 80rpx;
		.plan-item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			line-height: 60rpx;
			text:nth-child(1) {
				margin-right: 42rpx;
				color: #9B9B9B;
			}
			text:nth-child(2) {
				color: #535353;
			}
		}
	}
</style>
