<template>
	<view>
		<view class="register" :style="{height: clientHeight + 'px'}">
			<view class="logo">
				<image src="/static/images/user-logo.png" mode=""></image>
			</view>
			<view class="choose">
				<view></view>
				<view>登录</view>
				<view @click="register()">注册</view>
			</view>
			<view class="form-list">
				<view class="form-item">
					<image src="/static/images/arrow-user.png" mode=""></image>
					<input type="text" value="" placeholder="请输入用户名"
					 placeholder-class="input-placeholder" v-model="username" 
					 @blur="user"/>
				</view>
				<view class="form-item">
					<image src="/static/images/arrow-password.png" mode=""></image>
					<input type="password" value="" placeholder="请输入密码" 
					placeholder-class="input-placeholder" v-model="password"
					@blur="phone"/>
					<text style="font-size: 24rpx;position: absolute;right: 10%;color: #C8C7CC;z-index: 99;" @click="forget">忘记密码 </text>
				</view>
				<view style="text-align: right;box-sizing: border-box;padding: 0 10%;font-size: 24rpx;color: #C8C7CC;">
					<text @click="QRlogin">手机验证码登录</text>
				</view>
			</view>
			<!-- <view>
				{{username}} {{password}}
			</view> -->
			<view class="btn" v-if="tabbar">
				<view class="login">
					<button @click="login()" style="background: #E64340;color: #fff;">马上登录</button>
				</view>
				<view class="register">
					<button @click="wechatLogin()" style="background: #04BE02;">微信登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				uid:0,
				// 存储第一次屏幕的可视高度
				clientHeight: '',
				tabbar: true
			};
		},
		onLoad(ob){
			if(ob.uid >0) {
				this.uid = ob.uid;
				uni.setStorageSync("up_uid",ob.uid);
			}else{
				let up_uid = uni.getStorageSync("up_uid");
				if (up_uid==null||up_uid==undefined||up_uid==""||up_uid==0){
					uni.setStorageSync("up_uid",0);
				}else{
					this.uid = up_uid;
				}
			}
			// 储存第一次屏幕可视区高度
			uni.getSystemInfo({
				success: res => {
					this.clientHeight = res.windowHeight
				}
			})
			// 读取屏幕可视区域高度变化
			setTimeout(() => {
				uni.onWindowResize((res) => {
	        if(res.size.windowHeight < this.clientHeight){
	            this.tabbar = false
	        }else{
	            this.tabbar = true
	        }
		    })
			},100)

		
		},
		created() {
		},
		methods: {
			// 跳转到注册页
			register() {
				if(this.uid>0){
					uni.redirectTo({
						url: '../register/register?uid='+this.uid
					})
				}else{
					uni.redirectTo({
						url: '../register/register'
					})
				}
				
			},
			wechatLogin(){
				uni.getStorage({
					key: 'token',
					fail: res => {
						
					},
					success:res =>{
						let token = res.data[0];
						let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/login/wchatLogin&token="+token+"&pid="+this.uid);
						let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
						window.location.href = url;
					}
				});
				
			},
			// 立即登录
			login() {
				var username = this.username;
				var password = this.password;
				//验证字符串
				request({
					url: "index.php?s=/wap/login/index",
					method: "POST",
					data: {
						username: username,
						password: password
					}
				}).then(res => {
					console.log(res);
					if(res.data.retval.code > 0){
						if(res.data.token != null) {
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							});
							let expireDate = new Date().getTime() + 86400000;
							let data =Array(res.data.token,expireDate);
							uni.setStorage({
								key:"token",
								data:data,
							});
							if(getCurrentPages().length == 1) {
								uni.reLaunch({
									url: '/pages/mine/mine'
								})
									
								
							}
							else {
								// 返回上一页
								uni.navigateBack({
									delta:1
								});
							}
							
						}
					}
					else {
						uni.showToast({
							title: '用户名与密码不匹配',
							icon: 'none'
						})
					}
				})
			},
			// 忘记密码
			forget() {
				uni.navigateTo({
					url: '/pages/components/forget/forget'
				})
			},
			// 手机验证码登录
			QRlogin() {
				uni.navigateTo({
					url: '/pages/components/QRlogin/QRlogin'
				})
			},
			// 用户名验证
			user() {
				let test = /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.username);
				if(test || this.username == '') {
					uni.showToast({
						title: '请输入合法用户名',
						icon: 'none'
					})
					return
				}
			},
			// 手机号验证
			phone() {
				let test = /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.password);
				if(test || this.password == '') {
					uni.showToast({
						title: '请输入合法密码',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	
	.register {
		box-sizing: border-box;
	
		.logo {
			// box-sizing: border-box;
			width: 220rpx;
			height: 170rpx;
			margin: 0 auto;
			padding-top: 80rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.choose {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			view {
				box-sizing: border-box;
				flex: 1;
				text-align: center;
			}
			view:nth-child(3) {
				color: #5E5A5A;
				font-size: 40rpx;
			}
			view:nth-child(2) {
				font-size: 50rpx;
				color: #C8C7CC;
			}
		}
		.form-list {
			box-sizing: border-box;
			margin-top: 80rpx;
			.form-item {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				padding: 0 10%;
				height: 100rpx;
				line-height: 100rpx; 
				image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 24rpx;
				}
				input {
					flex: 1;
					box-sizing: border-box;
					border-bottom: 1px solid #C8C7CC;
				}
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
					background: #E64340;
					color: #fff;
				}
			}
		}
	}
	
	.input-placeholder {
		font-size: 28rpx;
		color: #C8C7CC
	}

</style>
