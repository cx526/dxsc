<template>
	<view>
		<view class="choose-box" style="">
			<block v-for="(item,index) in chooseList" :key="index">
				<!-- #ifdef H5 || APP-PLUS -->
				<view class="choose" @click="choose(index)">
					<view class="item">
						<image :src="item.src" :style="item.WH"></image>
						<view class="context"><text>{{item.text}}</text></view>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 || APP-PLUS -->
				<view class="choose" @click="choose(index)" v-if="index < 7">
					<view class="item">
						<image :src="item.src" :style="item.WH"></image>
						<view class="context"><text>{{item.text}}</text></view>
					</view>
				</view>
				<!-- #endif -->
			</block>
		</view>
	</view>
	
</template>

<script>
	//#ifdef H5
	import wechat from '../../../common/wechat.js'
	//#endif 
	import { mapMutations } from 'vuex'
	export default {
		props: {
			chooseList: {
				type: Array
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations(['changeDiscount']),
			choose(index) {
				switch (index) {
					case 0:
					//#ifdef H5
					uni.showToast({
						title: '启动扫一扫中',
						icon: 'loading'
					});
						wechat.sacn(() => {uni.hideToast()});
					//#endif
					//#ifndef H5
					uni.scanCode({
						success: () => {
							console.log('扫码调取成功')
						}
					})
					//#endif
					break;
					case 1:
					uni.navigateTo({
						url: '/pages/components/coupon/coupon'
					})
					break;
					case 2:
					uni.switchTab({
						url: '/pages/car/car'
					})
					break;
					case 3:
					uni.navigateTo({
						url: '/pages/components/online-goods/online-goods'
					})
					break;
					case 4:
					this.changeDiscount({index: 0})
					uni.navigateTo({
						url: '/pages/components/vip-list/vip-list?type=all'
					})
					break;
					case 5:
					this.changeDiscount({index: 4})
					uni.navigateTo({
						url: '/pages/components/vip-list/vip-list?price=9.9'
					})
					break;
					case 6:
					uni.navigateTo({
						url: '/pages/components/more-list/more-list'
					});
					break;
					case 7:
					uni.showToast({
						title: '该功能暂未开放',
						icon: 'none'
					})
					// uni.navigateTo({
					// 	url: '/pages/components/drinking/drinking'
					// })
					break;
					case 8:
					uni.showToast({
						title: '该功能暂未开放',
						icon: 'none'
					});
					break;
					case 9:
					uni.navigateTo({
						url: '/pages/components/watching-tv/watching-tv'
					})
					break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.choose-box {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		border-top: 1px solid #F5F5F5;
		align-items: center;
		padding: 20rpx 0;
		flex-wrap: wrap;
		.choose {
			box-sizing: border-box;
			width: 20%;
			height: 126rpx;
			margin-bottom: 10rpx;
			.item {
				position: relative;
				top: 50%;
				transform: translateY(-42%);
				text-align: center;
				image {
					width: 50rpx;
					height: 50rpx;
				}
				.context {
					width: 100%;
					font-size: 20rpx;
					text-align: center;
					color: #626262;
					position: absolute;
					bottom: -30rpx;
					left: 50%;
					transform: translateX(-51%);
				}
			}
		}
		
		.choose:nth-child(5n) {
			margin-right: 0;
		}
	}
</style>
