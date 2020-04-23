<template>
	<view>
		<view class="nav-box" style="background: #FED940;">
			<view class="location" @tap="getLocation()">
				<text>{{locationName}}</text>
			</view>
			<!-- 点击跳转到search-page搜索页面 -->
			<view class="search" @click="handleClick">
				<image src="/static/images/search.png"></image>
				<input disabled placeholder="输入您要搜索的宝贝..." placeholder-class="placeholder"/>
			</view>
			<view class="message">
				<image src="/static/images/cart-active.png" @click="goCart()" v-if="$store.state.goodsLength"></image>
				<image src="/static/images/cart.png" @click="goCart()" v-else style="width: 60rpx;height: 56rpx;"></image>
				<div class="line"></div>
				<!-- <image src="/static/images/message.png" @click="goLogistics()" style="widtht: 60rpx;height: 58rpx"></image> -->
				<image src="/static/images/message.png" @click="goLogistics()" style="width: 60rpx;height: 52rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			locationName:{
				type:String,
				default:'定位',
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			//父组件方法
			getLocation(){
				this.$emit('getLocation');
			},
			handleClick() {
				uni.navigateTo({
					url:"/pages/components/search-page/search-page"
				})
			},
			goCart() {
				this.$emit("goCart")
			},
			goLogistics() {
				uni.navigateTo({
					url:'/pages/components/logistics/logistics'
				})
			}
		},
		
		
	}
</script>

<style lang="scss">
	.nav-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		line-height: 60rpx;
		padding: 38rpx 30rpx 28rpx 30rpx;
		.location {
			font-size: 32rpx;
			color: #141104;
			margin-right: 42rpx;
		}
		.search {
			flex: 1;
			position: relative;
			height: 60rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 40rpx;
			input {
				width: 100%;
				height: 60rpx;
				box-sizing: border-box;
				border-radius: 8rpx;
				padding-left: 78rpx;
				line-height: 60rpx;
			}
			image {
				position: absolute;
				left: 38rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 30rpx;
				height: 30rpx;
			}
		}
		.message {
			box-sizing: border-box;
			display: flex;
			margin-left: 26rpx;
			align-items: center;
			position: relative;
			image {
				width: 70rpx;
				height: 55rpx;
			}
			image:first-child {
				margin-right: 20rpx;
			}
			image:last-child {
				margin-left: 10rpx;
				width: 55rpx;
				height: 55rpx;
			}
			// .line {
			// 	height: 125rpx;
			// 	width: 2rpx;
			// 	background-color: #E5E5E5;
			// 	position: absolute;
			// 	left: 50%;
			// 	top: -40rpx;
			// }
		}
	}
	.placeholder {
		font-size: 30rpx;
		color: #AAAAAA;
	}
</style>
