<template>
	<view style="box-sizing: border-box;padding-bottom: 30rpx;">
		<image src="/static/images/business-01.png" class="top"></image>
		<image src="/static/images/business-02.png" class="service"></image>
		<image src="/static/images/business-03.png" class="flow"></image>
		<image src="/static/images/business-04.png" class="service icome"></image>
		<image src="/static/images/business-06.png" class="service shop"></image>
		<button class="btn" @click="goBusiness">立即开店</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goBusiness() {
				uni.navigateTo({
					url: '/pages/components/business/business'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}
	.top {
		width: 100%;
		height: 325rpx;
	}
	.service {
		width: 90%;
		height: 256rpx;
		margin: 20rpx 0;
		margin-left: 5%;
	}
	.flow {
		height: 600rpx;
		width: 90%;
		margin-left: 5%;
	}
	.icome {
		height: 636rpx;
	}
	.shop {
		height: 300rpx;
		margin-top: 0;
	}
	.btn {
		background: #FED940;
		color: #000;
		width: 90%;
		margin-left: 5%;
	}
</style>
