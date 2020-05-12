<template>
	<view style="background: #fff;">
		<!-- 提现提示 -->
		<view class="withdraw-plan">
			<image :src="$src+'/images/withdraw.png'" mode=""></image>
			<view class="bank"><text>零钱提现-到{{bank_name}}({{account_number}})</text></view>
			<view class="money"><text>{{cash}}</text></view>
		</view>
		<!-- 进度条 -->
		<view class="notice-box" hidden>
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
				<text>￥{{cash}}</text>
			</view>
			<view class="plan-item">
				<text>申请时间</text>
				<text>{{ask_for_date}}</text>
			</view>
			<view class="plan-item">
				<text>到账时间</text>
				<text>{{modify_date}}</text>
			</view>
			<view class="plan-item">
				<text>提现银行</text>
				<text>{{bank_name}}</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				uid: '',
				bank_name: '',
				ask_for_date: '',
				modify_date: '',
				cash: '',
				account_number: '',
				$src: this.$src,
				id: ''
			}
		},
		onLoad(options) {
			this.id = options.id;
			console.log(options);
			this.getInfo()
			// uni.getStorage({
			// 	key: 'uid',
			// 	success: res => {
			// 		console.log(res);
			// 		this.uid = res.data;
			// 		this.getInfo()
			// 	}
			// })
		},
		methods: {
			// 获取提现列表
			getInfo() {
				let that = this;
				request({
					url: 'index.php?s=/wap/member/getMemberWithdrawInfo',
					method: 'post',
					data: {
						id: this.id,
					}
				}).then(res => {
					console.log(res);
					that.bank_name = res.data.msg.bank_name;
					that.ask_for_date = res.data.msg.ask_for_date;
					that.modify_date = res.data.msg.modify_date;
					that.cash = res.data.msg.cash;
					that.account_number = res.data.msg.account_number;
					that.status = res.data.msg.status;
					console.log(res.data.msg)
				})
			},
			
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

