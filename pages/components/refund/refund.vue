<template>
	<view>
		<!-- 申请退款 -->
		<view class="process-box">
			<view class="step step1 current">
				<view class="name">买家申请退款</view>
				<text class="number">1</text>
				<text class="line line-l"></text>
			</view>
			<block v-if="refund_status==0">
				<view class="step step2">
					<view class="name">商家处理退款申请</view>
					<text class="line line-r"></text>
					<text class="number">2</text>
					<text class="line line-l"></text>
				</view>
			</block>
			<block v-if="refund_status!=0">
				<view class="step step2 current">
					<view class="name">商家处理退款申请</view>
					<text class="line line-r"></text>
					<text class="number">2</text>
					<text class="line line-l"></text>
				</view>
			</block>
			<block v-if="refund_status!=6">
				<view class="step step3">
					<view class="name">退款完成</view>
					<text class="line line-r"></text>
					<text class="number">3</text>
				</view>
			</block>
			<block v-if="refund_status==6">
				<view class="step step3 current">
					<view class="name">退款完成</view>
					<text class="line line-r"></text>
					<text class="number">3</text>
				</view>
			</block>
		</view>

		<block v-if="refund_status==-1">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">退款已拒绝</view>
					<view class="ul">
						<view class="li">卖家拒绝本次退款，本次维权结束。</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==-2">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">退款已关闭</view>
					<view class="ul">
						<view class="li">主动撤销退款，退款关闭。</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==-3">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">退款申请不通过</view>
					<view class="ul">
						<view class="li">拒绝了本次退款申请,等待买家修改。</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==3">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">等待卖家确认收货</view>
					<view class="ul">
						<view class="li">买家已退货,等待卖家确认收货。</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==4">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">您已成功申请退款</view>
					<view class="ul">
						<view class="li">等待卖家处理退款申请。。。</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==5">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">商家已审核，等待平台退款</view>
					<view class="ul">
						<view class="time">商家审核时间:{{detail.refund_date}}</view>
						<view class="li">退款金额： {{detail.refund_real_money}}元</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="refund_status==6">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">退款成功</view>
					<view class="ul">
						<view class="time">退款成功时间:{{detail.refund_date}}</view>
						<view class="li">退款金额： {{detail.refund_real_money}}元</view>
					</view>
				</view>
			</view>
		</block>

		<block v-if="refund_status==2">
			<view class="seller-agree">
				<view>请退货并填写物流信息</view>
				<view class="h5">1、请退货</view>
				<view class="explanation">
					请退货未经卖家同意，请不要使用到付或平邮。<br>
					退货地址：
					<text class="address">
						该商家暂未配置收货地址
					</text>
				</view>
				<view class="h5">
					2、请填写退货物流信息 <view class="small">（逾期未填写，退货申请将关闭）</view>
				</view>
				<view class="express-form">
					<view class="row">
						<view class="label">
							<text class="color-red">*</text>物流公司：
						</view>
						<input type="text" v-model="LogisticsCompany">
					</view>
					<view class="row">
						<view class="label">
							<text class="color-red">*</text>运单号：
						</view>
						<input type="text" v-model="ExpressNo">
					</view>
					<view class="btn">
						<button type="warn" @click="refundExpress()">提交</button>
					</view>
				</view>
			</view>
		</block>

		<block v-if="refund_status===0 || refund_status==-3">
			<view class="form-box">
				<view class="line">
					<view class="label">处理方式：</view>
					<view class="input">
						<picker @change="changeRequireIndex" :value="requireIndex" :range="refund_require" range-key="name">
							<view>{{refund_require[requireIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="line">
					<view class="label">退款原因：</view>
					<view class="input">
						<picker @change="changeReasonIndex" :value="reasonIndex" :range="refund_reason" range-key="name">
							<view>{{refund_reason[reasonIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="line">
					<view class="label">退款金额：</view>
					<view class="input">
						<input v-model="refund_money" class="inputframe" type="digit" :placeholder="'最多可退款'+max_refund_money+'元'" />
					</view>
				</view>
				<view class="line">
					<view class="label">退款说明：</view>
					<view class="input">
						<textarea v-model="description" class="textbox" placeholder="请输入退款说明"></textarea>
					</view>
				</view>
				<view class="btn">
					<button type="warn" @click="refundAsk()">提交</button>
				</view>
			</view>
		</block>

		<!-- 等待审核 -->
		<block v-if="refund_status==1">
			<view class="none-goods">
				<view class="icon-tip-circle">!</view>
				<view class="text">
					<view class="h2">等待商家处理退款申请</view>
					<view class="ul">
						<view class="li">如果商家同意，退款申请将达成并退款至您的账号中。</view>
					</view>
				</view>
			</view>
		</block>



	</view>
</template>

<script>
	import {
		request
	} from '../../request.js'
	export default {
		data() {
			return {
				detai: {},
				refund_status: '',
				max_refund_money: 0,
				refund_money: '',
				refund_balance: 0,
				description: '',
				LogisticsCompany:'',
				ExpressNo:'',
				refund_require: [{
						'name': '我要退款，但不退货',
						'value': 1
					},
					{
						'name': '我要退款，并且退货',
						'value': 2
					}
				],
				requireIndex: 0,
				refund_reason: [{
						'name': '买/卖双方协商一致',
						'value': 0
					},
					{
						'name': '买错/多买/不想要',
						'value': 1
					},
					{
						'name': '商品质量问题',
						'value': 2
					},
					{
						'name': '未收到货品',
						'value': 3
					},
					{
						'name': '其他',
						'value': 4
					}
				],
				reasonIndex: 0,
				order_id: 0,
				order_goods_id: 0,
			}
		},
		onLoad(options) {
			this.getInfo(options.id);
		},
		methods: {
			getInfo(id) {
				let that = this;
				that.order_goods_id = id;
				request({
					url: 'index.php?s=/wap/order/apiRefundDetail',
					data: {
						order_goods_id: id
					},
				}).then(function(res) {
					that.order_id = res.data.data.detail.order_id;
					that.refund_status = res.data.data.detail.refund_status,
					that.detail = res.data.data.detail;
					that.max_refund_money = res.data.data.refund_money;
					that.refund_balance = res.data.data.refund_balance;
				});
			},
			changeRequireIndex(e) {
				this.requireIndex = e.target.value;
			},
			changeReasonIndex(e) {
				this.reasonIndex = e.target.value;
			},
			refundAsk() {
				let that = this;
				request({
					url: 'index.php?s=/wap/order/apiOrderGoodsRefundAskfor',
					data: {
						order_id: that.order_id,
						order_goods_id: that.order_goods_id,
						refund_type: that.refund_require[that.requireIndex].value,
						refund_reason: that.refund_reason[that.reasonIndex].name,
						refund_require_money: that.refund_money
					},
					method: "POST",
				}).then(function(res) {
					if (res.data.data == 1) {
						uni.showToast({
							title: "申请成功"
						})
						setTimeout(function() {
							uni.redirectTo({
								url: "/pages/components/refund/refund?id=" + that.order_goods_id
							})
						},2000);
					}
				});
			},
			refundExpress() {
				let that = this;
				request({
					url: 'index.php?s=/wap/order/apiOrderGoodsRefundExpress',
					data: {
						order_id: that.order_id,
						order_goods_id: that.order_goods_id,
						refund_express_company: that.LogisticsCompany,
						refund_shipping_no: that.ExpressNo,
					},
					method: "POST",
				}).then(function(res) {
					if (res.data.data == 1) {
						uni.showToast({
							title: "提交成功"
						})
						setTimeout(function() {
							uni.redirectTo({
								url: "/pages/components/refund/refund?id=" + that.order_goods_id
							})
						},2000);
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	.process-box {
		width: 600rpx;
		margin: 0 auto;
		padding: 40rpx 0;
		overflow: hidden;

		.step {
			float: left;
			font-size: 26rpx;
			overflow: hidden;

			.name {
				width: 100%;
				color: #ccc;
			}

			.number {
				display: inline-block;
				width: 40rpx;
				height: 40rpx;
				line-height: 40rpx;
				border-radius: 50%;
				background: #ccc;
				color: #fff;
				font-weight: bold;
				text-align: center;
				vertical-align: middle;
			}

			.line {
				display: inline-block;
				height: 2px;
				width: 120rpx;
				background: #ccc;
				vertical-align: middle;
			}

			.line-l {
				margin-right: -20rpx;
			}

			.line-r {
				margin-left: -20rpx;
			}
		}

		.step1 .name {
			text-align: left;
		}

		.step2 .name {
			text-align: center;
		}

		.step3 .name {
			text-align: right;
		}

		.current {
			.name {
				color: #f37872;
			}

			.number,
			.line {
				background: #f37872;
			}
		}
	}

	.form-box {
		border-top: 1px dashed #ccc;

		.line {
			overflow: hidden;
			border-bottom: 1px solid #f1f1f1;

			.label {
				float: left;
				width: 28%;
				color: #888;
				font-size: 30rpx;
				text-align: center;
				margin-bottom: 0px;
				line-height: 80rpx;
			}

			.input {
				float: right;
				width: 70%;
				line-height: 80rpx;
				font-size: 30rpx;

				input {
					font-size: 30rpx;
					height: 80rpx;
					line-height: 80rpx;
				}

				textarea {
					width: 100%;
					height: 150rpx;
					padding: 15rpx 0;
					font-size: 30rpx;
					line-height: 50rpx;
				}
			}
		}
	}

	.none-goods {
		margin: 40rpx 30rpx 0 30rpx;
		font-size: 32rpx;

		.icon-tip-circle {
			float: left;
			margin-right: 20rpx;
			font-size: 80rpx;
			color: #fff;
			font-family: "dis-font";
			font-style: normal;
			width: 100rpx;
			height: 80rpx;
			padding-bottom: 20rpx;
			border-radius: 50%;
			text-align: center;
			background-color: #45a5cf;
		}
		.text {
			overflow: hidden;

			.h4 {
				margin-top: 10px;
			}

			.ul {
				color: #999;

				.li {
					margin: 0;
					padding: 0;
					vertical-align: baseline;
				}
			}
			.time {
			    margin: 0;
			    color: #999;
			    font-size: 32rpx;
			}
		}

	}
	.seller-agree {
		font-size: 32rpx;
	    margin: 40rpx 30rpx 0 30rpx;
		.h5 {
			font-weight: bold;
		    margin: 20px 0 5px 0;
		    font-size: 16px;
		    overflow: hidden;
			.small {
				font-weight: normal;
			    display: block;
			    margin: 16rpx 0 20rpx 50rpx;
			    color: #999;
			}
		}
		.explanation {
		    margin: 0;
		    font-size: 30rpx;
		}
		.address {
		    margin: 0;
		    line-height: 50rpx;
		    font-style: normal;
		}
		.express-form {
		    margin-top: 20rpx;
		}
		.row {
		    margin-bottom: 20rpx;
		}
		.label{
			display: inline;
		}
		.color-red {
		    margin-right: 5px;
			color: red;
		}
		input{
			margin: 10rpx 0;
			padding:0 10rpx;
			border:1px solid #aaa;
		}
	}

	.btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
