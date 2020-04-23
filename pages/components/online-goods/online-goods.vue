<template>
	<view>
		<!-- banner图 -->
		<view class="banner">
			<image src="https://admin.dxsc.vip/upload/common/1587201647.png" mode=""></image>
		</view>
		<!-- 滚动列表 -->
		<view class="nav-box">
			<scroll-view scroll-x >
				<view class="row">
					<block v-for="n in 10" :key="n">
						<view class="row-item">
							<image src="/static/images/online-goods.png" mode=""></image>
							<view>电脑办公</view>
						</view>
					</block>
				</view>
				<view class="row">
					<block v-for="n in 10" :key="n">
						<view class="row-item">
							<image src="/static/images/online-goods.png" mode=""></image>
							<view>电脑办公</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐列表 -->
		<view class="recommend">
			<view class="title">
				<text style="position: relative;z-index: 999;">为你推荐</text>
				<view class="line"></view>
			</view>
			<view class="list">
				<block v-for="n in 4" :key="n">
					<view class="list-item">
						<image src="/static/images/product.png" mode=""></image>
						<view class="main">
							<view class="list-title">莫次有机洗面奶莫次有机洗面奶莫次有机洗面奶莫次有机洗面奶莫次有机洗面奶</view>
							<view class="list-price">
								<view class="new">
									<text>￥56</text>
									<text class="member">会员专享价</text>
								</view>
								<view class="old">
									<text>市场参考价：</text>
									<text>￥99</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				
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
		background: #F6F6F6;
	}
	// banner图
	.banner {
		height: 220rpx;
		width: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	// 滚动列表
	.nav-box {
		box-sizing: border-box;
		background: #fff;
		margin-top: 18rpx;
		scroll-view {
			width: 100%;
			white-space: nowrap;
			.row {
				box-sizing: border-box;
				width: 100%;
				// height: 200rpx;

				white-space: nowrap;
				display: flex;
				.row-item {
					box-sizing: border-box;
					width: 20%;
					display: flex;
					flex-shrink: 0;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					height: 100%;
					font-size: 24rpx;
					margin-bottom: 16rpx;
					margin-top: 18rpx;
					image {
						width: 95rpx;
						height: 100rpx;
						margin-bottom: 12rpx;
					}
				}
			}
		}
	}
	// 推荐列表
	.recommend {
		box-sizing: border-box;
		.title {
			font-size: 34rpx;
			font-weight: 700;
			text-align: center;
			line-height: 120rpx;
			position: relative;
			.line {
				width: 136rpx;
				height: 20rpx;
				background: #FFD323;
				position: absolute;
				z-index: 90;
				left: 50%;
				bottom: 34rpx;
				transform: translateX(-50%);
				border-radius: 6rpx;
			}
		}
		.list {
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list-item {
				box-sizing: border-box;
				width: 49%;
				image {
					width: 100%;
					height: 330rpx;
				}
				.main {
					box-sizing: border-box;
					padding: 20rpx 18rpx;
					.list-title {
						font-size: 24rpx;
						color: #505050;
						text-align: left;
						line-height: 32rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.list-price {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						margin-top: 28rpx;
						line-height: 26rpx;
						.new {
							color: #0E0E0E;
							font-size: 26rpx;
							font-weight: 700;
							display: flex;
							align-items: center;
							.member {
								display: inline-block;
								background: #333333;
								box-sizing: border-box;
								padding: 8rpx 12rpx;
								margin-left: 10rpx;
								color: #BFB2A3;
								font-weight: normal;
								font-size: 24rpx;
								border-radius: 16rpx;
							}
						}
						.old {
							margin-top: 20rpx;
							color: #999;
							font-size: 24rpx;
							text:nth-child(2) {
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}

</style>
