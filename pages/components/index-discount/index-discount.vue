<template>
	<view class="discount-box">
		<view class="discount">
			<view>
				<block v-for="(item,index) in discountList" :key="index">
					<view @click="goDownLine(item,index)">
						<image :src="item.adv_image"></image>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		props: {
			discountList: Array
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			this.changeDiscount()
		},
		computed:{
			...mapState({
				discount: (state) => state.discount
			})
		},
		methods: {
			...mapMutations(['changeDiscount']),
			// 跳转到折扣列表
			goDownLine(item,index) {
				this.changeDiscount({index: index+1});
				let data = item.adv_url.split("?")[1];
				let type = data.split("=")[0];
				let val = data.split('=')[1];
				uni.navigateTo({
					url: `/pages/components/vip-list/vip-list?${type}=${val}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.discount-box {
		box-sizing: border-box;
		padding: 18rpx 40rpx 60rpx 40rpx;
		.discount {
			box-sizing: border-box;	
			view {
				overflow: hidden;
				display: block;
				box-sizing: border-box;
				list-style: none;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				view {
					box-sizing: border-box;
					margin-bottom: 10rpx;
					width: 49%;
					image {
						display: block;
						width: 100%;
						height: 192rpx;
					}
				}
				view:first-child {
					width: 100%;
					image {
						width: 100%;
					}
				}
			}
		}
	}
</style>
