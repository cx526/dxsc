<template>
	<view v-if="loading">
		<view class="group-list">
			<view class="group-title">
				<text class="number" style="flex: 1;">序号</text>
				<text class="name" style="flex: 1.5;">姓名</text>
				<text class="message" style="flex: 1.5;">信息</text>
			</view>
			<block v-for="(item,n) in list" :key="n">
				<view class="group-title spcial" style="color: #444444;">
					<text class="number hidden">{{n}}</text>
					<text class="name hidden">{{item.user_name}}</text>
					<text class="message hidden">{{item.user_tel}}</text>
					<!-- <image src="/static/images/icon-right.png" mode=""></image> -->
				</view>
			</block>
			
			
		</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import { request } from '../../request.js'
	import Loading from '../../common/loading/loading.vue'
	export default {
		data() {
			return {
				loading: false,
				list:[],
				page:1,
				level:'',
				over:0,
			};
		},
		components: {
			Loading
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.name
			})
			this.level = options.id;
			this.getList();
		},
		onReachBottom(){
			getList();
		},
		methods:{
			getList(){
				let that = this;
				if(that.over==1) return '';
				this.loading = false;
				request({
					url: 'index.php?s=/wap/member/getTeamMembersList',
					data:{
						level:this.level,
						page:this.page
					},
					method: 'post'
				}).then(res => {
					that.loading = true;
					if(res.data.list){
						that.list = res.data.list;
						that.page++;
					}else{
						that.over = 1;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #EFEFF4;
	}
	.group-list {
		box-sizing: border-box;
		background: #fff;
		.group-title {
			display: flex;
			font-size: 32rpx;
			line-height: 80rpx;
			color: #B9B9B9;
			.number {
				flex: 1;
				text-align: center;
			}
			.name {
				flex: 1.5;
				text-align: center;
			}
			.message {
				flex: 1.5;
				text-align: center;
			}
			
		}
	}
	.hidden {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.spcial {
		border-bottom: 1px solid #F0F0F5;
		position: relative;
	}
</style>
