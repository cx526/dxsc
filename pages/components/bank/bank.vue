<template>
	<view>
		<view class="bank-box">
			<view class="bank">
				<block v-for="(item,index) in account_number_list" key="i">
					<view class="bank-item">
						<view class="card">
							<text class="name">{{item.branch_bank_name}}</text>
							<text class="name">卡号</text>
							<view style="display: flex;align-items: center;">
								<text style="flex:1">****</text>
								<text style="flex:1">****</text>
								<text style="flex:1">****</text>
								<text style="flex:1;">{{item.banknum}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="btn">
			<button style="background: #FED940;" @click="bankCard">添加新卡</button>
		</view>
	</view>
</template>

<script>
	import {request} from "../../request.js";
	export default {
		data() {
			return {
				account_number_list:[],
			};
		},
		onLoad() {
			this.getAccountNumberList();
		},
		methods:{
			bankCard(){
				uni.showLoading({
					title:"加载中",
					icon:"loading",
					mask:true
				})
				uni.navigateTo({
					url:"../bankcard/bankcard"
				});
			},
			getAccountNumberList(){
				request({
					url:"index.php?s=/wap/member/getBankList"
				}).then(res=>{
					this.account_number_list=res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.bank-box {
		box-sizing: border-box;
		.bank {
			box-sizing: border-box;
			padding: 0 50rpx;
			.bank-item {
				background: url(https://www.dxsc.vip/images/bankCard.png) no-repeat;
				background-size: 100%;
				height: 320rpx;
				.card {
					padding-left: 80rpx;
					padding-top: 60rpx;
					text {
						font-size: 36rpx;
						color: #fff;
					}
					.name {
						margin-bottom: 20rpx;
						display: block;
					}
				}
			}
		}
	}
	.btn {
		box-sizing: border-box;
		padding: 0 30rpx;
		position: fixed;
		bottom: 40rpx;
		left: 0;
		width: 100%;
	}
</style>
