<template>
	<view>
		<view class="cutline"></view>
		<view class="reset">
			<view>
				<text>请输入当前登录密码</text>
			</view>
			
			<input type="text" placeholder="请输入当前登录密码" placeholder-class="placeholder" v-model="old_password"/>
		</view>
		<view class="cutline"></view>
		<view class="reset">
			<view>
				<text>确认新密码</text>
			</view>
			
			<input type="text" placeholder="确认新密码" placeholder-class="placeholder" v-model="new_password"/>
		</view>
		<view class="cutline"></view>
		<view class="btn">
			<button size="mini" style="background: #FED940;"  @click="reset()">
				提交
			</button>
		</view>
		
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				old_password:'',
				new_password:'',
			};
		},
		methods: {
			// 修改密码
			reset() {
				var old_password = this.old_password;
				var new_password = this.new_password;
				//验证字符
				request({
					url: "index.php?s=/wap/member/apimodifyPassword",
					method: "POST",
					data: {
						old_password: old_password,
						new_password: new_password
					}
				}).then(res => {
					console.log(res);
					if(res.data.code == 1){
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							});
							
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								});
							}, 1500);
					}
					else {
						uni.showToast({
							title: '用户名与密码不匹配',
							icon: 'none'
						})
					}
				})
			},
			
		}

	}
</script>

<style lang="scss">
	.cutline {
		height: 12rpx;
		background: #EFEFF4;
	}
	.reset {
		box-sizing: border-box;
		padding: 0 12rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		view {
			height: 80rpx;
			text {
				color: #444;
				margin-right: 12rpx;
			}
		}
		
		text {
			color: #444;
			margin-right: 12rpx;
		}
		input {
			flex: 1;
			height: 80rpx;
		}
	}
	.btn {
		box-sizing: border-box;
		padding: 30rpx;
		button {
			width: 100%;
			line-height: 80rpx;
			font-size: 32rpx;
		}
	}
	.placeholder {
		font-size: 28rpx;
	}
</style>
