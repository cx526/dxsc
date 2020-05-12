<template>
	<view>
		<view class="list-box">
			<view class="list-item">
				<text>店铺名称</text>
				<view class="item-right">
					<input type="text" placeholder="请填写店铺名称" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>店铺编号</text>
				<view class="item-right">
					<input type="text" placeholder="请填写店铺编号" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>店铺logo</text>
				<view class="item-right">
					<image :src="$src+'/images/shop-logo.png'" class="img"></image>
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>横幅</text>
				<view class="item-right">
					<image :src="$src+'/images/shop-logo.png'" class="img"></image>
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>店铺头像</text>
				<view class="item-right">
					<image :src="$src+'/images/shop-logo.png'" class="img"></image>
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item" style="margin-bottom: 20rpx;">
				<text>店铺描述</text>
				<view class="item-right">
					<input type="text" placeholder="请填写店铺描述" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>店铺类型</text>
				<view class="item-right">
					<text>个人店</text>
					<!-- <input type="text" placeholder="请填写店铺描述" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image> -->
				</view>
			</view>
			<view class="list-item" style="margin-bottom: 20rpx;">
				<text>主营类目</text>
				<view class="item-right">
					<input type="text" placeholder="请填写店铺主营类目" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item" style="margin-bottom: 20rpx;">
				<text>店铺收款码</text>
				<view class="item-right">
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>线下商铺名称</text>
				<view class="item-right">
					<input type="text" placeholder="如有线下店铺请填写" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>线下商铺电话</text>
				<view class="item-right">
					<input type="text" placeholder="如有线下店铺请填写" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			<view class="list-item">
				<text>线下商铺地址</text>
				<view class="item-right">
					<input type="text" placeholder="如有线下店铺请填写" />
					<image :src="$src+'/images/icon-gray-right.png'" class="icon"></image>
				</view>
			</view>
			
			<view class="btn">
				<button>保存</button>
			</view>
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
	.list-box {
		box-sizing: border-box;
		// padding-left: 30rpx;
		padding-bottom: 160rpx;
		.list-item {
			box-sizing: border-box;
			line-height: 100rpx;
			display: flex;
			justify-content: space-between;
			padding: 0 24rpx;
			border-bottom: 1px solid #F3F3F3;
			background: #fff;
			font-size: 28rpx;
			text {
				color: #3A3A3A;
			}
			.item-right {
				display: flex;
				align-items: center;
				overflow: hidden;
				input {
					width: 100%;
					text-align: right;
				}
				text {
					color: #3A3A3A;
				}
				.img {
					width: 60rpx;
					height: 60rpx;
				}
				.icon {
					width: 30rpx;
					height: 30rpx;
					margin-left: 12rpx;
				}
			}
		}
		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx;
			background: #Fff;
			button {
				background: #FED940;
				color: #272621;
			}
		}
	}
</style>
