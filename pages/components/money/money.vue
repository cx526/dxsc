<template>
	<view>
		<!-- 个人余额 -->
		<view class="person-money">
			<view class="money">
				<view class="item">
						<view>
							<text class="count">{{user_balance.balance ? user_balance.balance: 0.00}}</text>
						</view>
						<view><text>余额</text></view>
						<view class="line"></view>
				</view>
				<view class="item">
						<view><text class="count">{{user_balance.n_money ? user_balance.n_money: 0.00}}</text></view>
						<view><text>现金券</text></view>
						<view class="line"></view>
				</view>
				<view class="item">
						<view><text class="count">{{user_balance.n_coupon ? user_balance.n_coupon: 0.00}}</text></view>
						<view><text>优惠券</text></view>
				</view>
			</view>
		</view>	
		<view class="list-box">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item" hover-class="click" @click="handleClick(index)">
					<view style="display: flex;align-items: center;">
						<image :src="$src+'/images/qianbao.png'" mode="" style="width: 50rpx;height: 50rpx;"></image>
						<text style="margin-left: 16rpx;">{{item.name}}</text>
					</view>
					<view>
						<image :src="$src+'/images/icon-right.png'" mode="" style="position: relative;top: 8rpx;"></image>
					</view>
				</view>
			</block>
			
			
		</view>
	</view>

</template>
<script>
	import { request }  from '../../request.js' 
	export default {
		data() {
			return {
				list: [
					{
						name: '充值'
					},
					{
						name: '提升等级'
					},
					{
						name: '我的银行卡'
					},
					{
						name: '提现'
					},
					{
						name: '收入明细'
					},
					{
						name: '提现列表'
					},
				],
				// 储存用户个人余额
				res:'',
				user_balance: '',
				$src: this.$src
			}
		},
		onLoad() {
			request({
				url: 'index.php?s=/wap/order/ApiorderInfo',
				method:"POST",
			}).then(res => {
				console.log(res)
				if(res.data) {
					this.res = res.data;
				}
			})
			this.getUserMoney();
		},
		methods:{
			// 获取用户余额信息
			getUserMoney() {
				request({
					url: 'index.php?s=/wap/member/getMomeyInfo'
				}).then(res => {
					
					this.user_balance = res.data.data;
					console.log(this.user_balance)
				})
			},
			// 跳转页面
			handleClick(index) {
				switch(index) {
					case 0:
					uni.navigateTo({
						url: '/pages/components/payUp/payUp'
					});
					break;
					case 1:
					uni.navigateTo({
						url:'/pages/components/payMoney/payMoney'
					})
					break;
					case 2:
					uni.navigateTo({
						url: '/pages/components/bank/bank'
					})
					break;
					case 3:
					uni.navigateTo({
						url: '/pages/components/withdraw/withdraw'
					})
					break;
					case 4:
					uni.navigateTo({
						url: '/pages/components/bill/bill'
					})
					break;
					case 5:
					uni.navigateTo({
						url: '/pages/components/withdraw-list/withdraw-list'
					})
					break;
				}
			}
		}
	}
</script>
<style lang="scss">
	// 余额
	.person-money {
		box-sizing: border-box;
		padding: 18rpx;
		height: 250rpx;
		.money {
			background: #FED940;
			height: 100%;
			border-radius: 12rpx;
			font-size: 28rpx;
			color: #333;
			display: flex;
			align-items: center;
			width: 100%;
			.item {
				flex: 1;
				text-align: center;
				position: relative;
				
				.line {
					width: 1px;
					height: 38rpx;
					position: absolute;
					right: 0;
					top: 50%;
					background: #fff;
					transform: translateY(-50%);
				}
				.count {
					font-size: 30rpx;
				}
			}
		}
	}
	.list-box {
		box-sizing: border-box;
		padding: 0 18rpx;
		.list-item {
			line-height: 80rpx;
			border-bottom: 1px solid #f1f1f1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			color: #6D6D6D;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.click {
		background: #f1f1f1;
	}
</style>