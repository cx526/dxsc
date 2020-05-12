<template>
	<view>
		<view class="register" :style="{height: clientHeight + 'px'}">
			<view class="logo">
				<image :src="$src+'/images/user-logo.png'" mode=""></image>
			</view>
			<view class="choose">
				<view @click="login()">登录</view>
				<view>注册</view>
				<view></view>
			</view>
			<view class="form-list">
				<!-- <view class="form-item">
					<image :src="$src+'/images/arrow-user.png'" mode=""></image>
					<input 
					type="text" value="" 
					placeholder="请输入用户名" 
					placeholder-class="placeholder" 
					v-model="username"
					@blur="user()"/>
				</view> -->
				<view class="form-item">
					<image :src="$src+'/images/arrow-phone.png'" mode=""></image>
					<input 
					type="text" value="" 
					placeholder="请输入手机号" 
					placeholder-class="placeholder" 
					@blur="phone()" 
					v-model="cellphone"/>
				</view>
				<view class="form-item">
					<image :src="$src+'/images/arrow-password.png'" mode=""></image>
					<input 
					type="password" value="" 
					placeholder="请输入密码" 
					placeholder-class="placeholder" 
					@blur="password()"
					v-model="code"/>
				</view>
				<view class="form-item">
					<input 
					type="text" value="" 
					placeholder="请输入手机验证码" 
					placeholder-class="placeholder" 
					v-model="vertification"
					@blur="QRcode()"/>
					<button size="mini" style="" class="QRcode" @click="getCode()" :disabled="disabled">
						<text v-if="get">获取验证码</text>
						<text v-if="down">还剩{{count}}秒</text>
						<text v-if="again">重新获取</text>
					</button>
				</view>
				
			</view>
			<view class="btn" v-if="tabbar">

					<button  @click="register()">马上注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				// 用户命
				username: '',
				// 密码
				code: '',
				// 手机号
				cellphone: '',
				// 手机验证码
				vertification: '',
				// 控制按钮是否可以点击
				disabled: false,
				get: true,
				down: false,
				again: false,
				// 倒计时秒数
				count: 60,
				uid:0,
				// 存储第一次屏幕的可视高度
				clientHeight: '',
				tabbar: true,
				$src: this.$src
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
	        }
					else{
	            this.tabbar = true
	        }
	    	})
			},100)
		},
		methods: {
			// 跳转到登录页
			login() {
				if(this.uid>0){
					uni.redirectTo({
						url: '../login/login?uid='+this.uid
					})
				}else{
					uni.redirectTo({
						url: '../login/login'
					})
				}
			},
			// 检测用户名
			// user() {
			// 	let test = /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.username);
			// 	if(test || this.username == '') {
			// 		uni.showToast({
			// 			title: '请输入合法用户名',
			// 			icon: 'none'
			// 		})
			// 		return
			// 	}
			// },
			// 检测密码
			password() {
				let test = /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.code);
				if(test || this.code == '') {
					uni.showToast({
						title: '请输入合法密码',
						icon: 'none'
					})
				}
			},
			// 检测手机号码是否注册过
			async phone() {
				if(this.cellphone == '' || !(/^1[3456789]\d{9}$/.test(this.cellphone))) {
					uni.showToast({
						title: '请输入合法的手机号',
						icon: 'none'
					})
					return false
				}
				await request({
					url: 'index.php?s=/wap/login/checkMobileIsHas',
					method: 'post',
					data: {
						mobile: this.cellphone
					}
				}).then(res => {
					if(res.data) {
						uni.showToast({
							title: '手机号已被注册',
							icon:'none'
						});
						
					}
				})
			},
			// 检测验证码
			QRcode() {
				if(this.vertification == '') {
					uni.navigateTo({
						title: '请输入合法验证码',
						icon: 'none'
					})
				}
			},
			// 发送验证码
			getCode() {	
				if(this.cellphone != '' && (/^1[3456789]\d{9}$/.test(this.cellphone))) {
					uni.showToast({
						title: '短信发送成功',
						icon: 'none'
					});
					this.disabled = true;
					this.get = false;
					this.down = true;
					this.again = false
					let timer = setInterval(() => {
						this.count = this.count-1;
						if(this.count <= 0) {
							this.disabled = false;
							this.down = false;
							this.again = true;
							this.count = 60;
							clearInterval(timer)
						}
					},1000)
						request({
							url: '/index.php?s=/wap/Login/sendSmsRegisterCode',
							method: 'post',
							data: {
								vertification: 123,
								mobile: this.cellphone
							}
						}).then(res => {
							
						})
				}
				else {
					uni.showToast({
						title: '请输入合法手机号',
						icon: 'none'
					})
				}
			},
			// 点击注册
			register() {
				request({
					url: 'index.php?s=/wap/Login/register',
					method: 'post',
					data: {
						// username: this.username,
						password: this.code,
						mobile: this.cellphone,
						vertification: this.vertification,
						pid:this.uid
					}
				}).then(res => {
					
					if(res.data.retval > 0) {
						uni.showToast({
							title: '注册成功',
							icon: 'none'
						})
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
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
			view:nth-child(1) {
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
				.QRcode {
					margin-left: 20rpx;
					background: #E64340;
					color: #fff;
				}
			}
			
		}
		.btn {
			width: 100%;
			box-sizing: border-box;
			position: absolute;
			bottom: 110rpx;
				button {
					width: 60%;
					// height: 100%;
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					border-radius: 60rpx;
					background: #E64340;
				}
		}
	}
	.placeholder {
		font-size: 28rpx;
		color: #C8C7CC
	}
</style>
