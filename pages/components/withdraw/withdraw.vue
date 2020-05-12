<template>
	<view>
		<view class="money-box">
			<view class="money">
				<view style="margin: 0 30rpx;padding: 24rpx 0;">
					<text>金额</text>
				</view>
				<view class="import" style="flex: 1;">
					<view>
						<input v-model="price" type="number" value="" placeholder="请输入提现的金额" />
					</view>
					<view>
						<text style="font-size: 28rpx;color: #CECECE;">可提取余额￥{{userBalance > 0 ?userBalance:0}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 提现方式 -->
		<view class="way">
			<text>输入提现方式</text>
		</view>
		<!-- 提现选择 -->
		<view class="choose-box">
			<view class="choose">
				<view class="choose-item">
					<view>
						<label class="radio" @click="bank">
							<radio :checked="tixian_type == 0 ? true:false" color="#FED940" /><text></text>
						</label>
						<text style="margin-left: 20rpx;">银行卡提现</text>
					</view>
					<view v-if="account_number_list.length>0 " class="">
						<picker  mode="selector" :value="bank_id" range-key="name_num" :range="account_number_list" @change="chooseBank($event)">
							<view>{{account_number_list[bank_id].name_num}}</view>
						</picker>
					</view>
					<view v-else-if="tixian_type ==0" @click="goBankCard"  class="">
						未绑定银行卡,点击添加!
					</view>
					<view>
						<image :src="$src+'/images/icon-right.png'"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="btn">
			<button @click="tixian">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		request
	} from "../../request.js"
	export default {
		data() {
			return {
				account_number_list: [],
				bank_id: 0,
				bankId: "",
				price: 0,
				userBalance:0,
				tixian_l:false,
				hasBankAccount:false,//是否存在银行卡
				tixian_type:0,//判断提现类型 0银行卡,1微信
				$src: this.$src
			};
		},
		onShow() {
			this.getAccountNumberList();
			this.getUserBalance();
		},
		methods: {
			// 银行提现
			bank() {
				this.tixian_type=0;
			},
			
			// 微信提现
			wx() {
				this.tixian_type=1;
			},
			//跳转添加银行卡页面
			goBankCard(){
				uni.navigateTo({
					url:"../bankcard/bankcard",
				})
			},
			getAccountNumberList() {
				request({
					url: "index.php?s=/wap/member/getBankList"
				}).then(res => {
					if(res.data.length >0){
						this.account_number_list = res.data;
						this.bankId = this.account_number_list[this.bank_id].id;
						this.hasBankAccount = true;
					}
					
				})
			},
			chooseBank(event) {
				console.log(event.detail.value);
				this.bank_id = event.detail.value;
				this.bankId = this.account_number_list[this.bank_id].id;
			},
			tixian() {
				if(this.tixian_l){
					return;
				}
				this.tixian_l = true;
				if (this.price == "") {
					uni.showToast({
						title: "提现金额不能为0",
						icon: "none"
					})
					this.tixian_l=false;
					return
				}
				
				if(parseFloat(this.price) > this.userBalance){ //要转成float在进行比较
					uni.showToast({
						title: "提现金额不能大于最大提现金额!",
						icon: "none"
					})
					this.tixian_l=false;
					return
				}
				let check_type = this.checkTixianType();
				if (!check_type) {
					this.tixian_l=false;
					return;
				} 
				this.tixian2();
			},
			tixian2(){
				request({
					url: "index.php?s=/wap/member/tixian",
					method: "POST",
					data: {
						cash: this.price,
						bank_acc_id: this.bankId,
					}
				}).then(res => {
					if(res.data.code>0){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						});
						setTimeout(function(){
							uni.navigateTo({
								url:"../money/money"
							})
						},1000)
						this.tixian_l = true;
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						this.tixian_l = true;
					}
				})
			},
			//获取会员余额
			getUserBalance(){
				request({
					url:"index.php?s=/wap/member/getMomeyInfo",
				}).then(res=>{
					this.userBalance=res.data.data.balance;
				})
			},
			//提现类型逻辑判断
			checkTixianType(){
				if(this.tixian_type ==0){
					if(!this.hasBankAccount){
						uni.showModal({
							title:"提示",
							content:"您还没绑定银行卡,点击确定跳转到绑定页面!",
							cancelText:"暂不",
							success: (res) => {
								if(res.confirm){
									uni.navigateTo({
										url:"../bankcard/bankcard",
									})
								}else{
									return false;
								}
							}
						})
						return false;
					}
				}else if(this.tixian_type ==1){
					//微信提现的逻辑 目前没有等有了后在这里添加
					uni.showToast({
						title:"暂不支持微信提现!",
						icon:"none"
					})
					return false;
				}
				return true;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.money-box {
		box-sizing: border-box;

		.money {
			box-sizing: border-box;
			display: flex;
			font-size: 34rpx;
			height: 140rpx;
			border-top: 1px solid #E6E6E6;
			border-bottom: 1px solid #E6E6E6;
			background: #fff;
			color: #4C4C4C;

			.import {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;

				input {
					height: 85rpx;
					font-size: 34rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #F0F0F0;
					padding-top: 12rpx;
				}
			}
		}
	}

	// 提现方式
	.way {
		line-height: 90rpx;
		font-size: 28rpx;
		color: #C0C0C0;
		box-sizing: border-box;
		padding-left: 30rpx;
	}

	//	提现选择
	.choose-box {
		box-sizing: border-box;
		.choose {
			box-sizing: border-box;
			.choose-item {
				box-sizing: border-box;
				line-height: 90rpx;
				padding: 0 30rpx;
				background: #fff;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 18rpx;
				color: #363636;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}

	// 提交按钮
	.btn {
		box-sizing: border-box;
		padding: 30rpx;
		button {
			color: #fff;
			width: 100%;
			background-color: #FED940
		}
	}
</style>
