<template>
	<view>
		<view class="noLogin">
			<view class="logo">
				<image :src="$src+'/images/user-logo.png'" mode=""></image>
			</view>
			<view class="des">
				<view>
					<text>新零售双线平台,</text>
				</view>
				<view>
					<text>强力打通线上线下,更快,更省。</text>
				</view>
			</view>
			<view class="btn">
				<view class="login">
					<button @click="login()">登录</button>
				</view>
				<view class="register">
					<button @click="register()">注册</button>
				</view>
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
		},
		methods:{
			// 跳转到登录页
			login() {
				uni.navigateTo({
					url: '/pages/components/login/login'
				})
			},
			// 跳转到注册页
			register() {
				uni.navigateTo({
					url:'/pages/components/register/register'
				})
			},
		}
	}
</script>

<style lang="scss">
	//  用户未登录时显示
	.noLogin {
		box-sizing: border-box;
		.logo {
			width: 220rpx;
			height: 170rpx;
			margin: 0 auto;
			padding-top: 80rpx;
			justify-content: space-between;
			flex: 1;
			image {
				width: 100%;
				height: 100%;
			}
			
		}
		.des {
			font-size: 33rpx;
			view {
				text-align: center;
				color: #C8C7CC;
			}
		}
		.btn {
			position: absolute;
			bottom: 110rpx;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			.login,.register {
				box-sizing: border-box;
				height: 90rpx;
				button {
					width: 60%;
					height: 100%;
					text-align: center;
					font-size: 32rpx;
					color: #C8C7CC;
					border-radius: 60rpx;
				}
			}
			.login {
				margin-bottom: 24rpx;
				button {
					box-sizing: border-box;
					border: 1px solid #fff;
			
				}
				button:after {
					border: none;
				}
				
			}
			.register {
				button {
					background: #F14B64;
					color: #fff;
				}
			}
		}
	}
</style>
