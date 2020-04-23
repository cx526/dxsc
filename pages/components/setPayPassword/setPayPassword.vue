<template>
	<view>
		<view class="cutline"></view>
		<view class="reset">
			<view>
				<text>请输入支付密码</text>
			</view>
			<input type="password" placeholder="请输入支付密码" placeholder-class="placeholder"  @input="getPaypass"/>
		</view>
		<view class="cutline"></view>
		<view class="reset">
			<view>
				<text>确认支付密码</text>
			</view>
			
			<input type="password" placeholder="确认支付密码" placeholder-class="placeholder" @input="getPaypass2"/>
		</view>
		<view class="cutline"></view>
		<view class="reset">
			<input type="text" placeholder="请输入手机号码" placeholder-class="placeholder" @input="getCellPhone"/>
		</view>
		<view class="cutline"></view>
		<view class="form-item">
			<input 
			type="text" value="" 
			placeholder="请输入手机验证码" 
			placeholder-class="placeholder" 
			@input="getVevrlfy"/>
			<button size="mini" style="background: #FED940;" class="QRcode" @click="getCode()" :disabled="disabled">
				<text v-if="get">获取验证码</text>
				<text v-if="down">还剩{{count}}秒</text>
				<text v-if="again">重新获取</text>
			</button>
		</view>
		<view class="cutline"></view>
	
		
		
		
		
		<view class="btn">
			<button size="mini" style="background: #FED940;"  @tap="submit()">
				提交
			</button>
		</view>
		
	</view>
</template>

<script>
	/* /index.php?s=/wap/member/setPaypassword */
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				// 支付密码
				paypass:'',
				// 重复支付密码
				paypass2:'',
				// 手机号码
				cellphone: '',
				// 手机验证码
				vevrlfy: '',
				// 控制按钮是否可以点击
				disabled: false,
				get: true,
				down: false,
				again: false,
				// 倒计时秒数
				count: 60,
			};
		},
		methods: {
			// 支付密码
			getPaypass(event) {
				this.paypass = event.detail.value;
				console.log(this.paypass)
			},
			// 重复支付密码
			getPaypass2(event) {
				this.paypass2 = event.detail.value;
				console.log(this.paypass2);
			},
			// 手机号
			getCellPhone(event) {
				this.cellphone = event.detail.value;
				console.log(this.cellphone);
			},
			// 验证码
			getVevrlfy(event) {
				this.vevrlfy = event.detail.value;
				console.log(this.vevrlfy)
			},
			// 获取验证码
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
							if(res.code == 0) {
								uni.showToast({
									title: '短信发送成功'
								})
							}
						})
				}
				else {
					uni.showToast({
						title: '请输入合法手机号',
						icon: 'none'
					})
				}
			},
			// 提交
			submit() {
				// 验证支付密码
				if(this.paypass == '') {
					uni.showToast({
						title: '支付密码不能为空',
						icon: 'none'
					});
					return
				}
				// 验证重复支付密码
				if(this.paypass2 == '') {
					uni.showToast({
						title: '支付密码不能为空',
						icon: 'none'
					});
					return
				}
				// 验证两次密码是否相同
				if(JSON.stringify(this.paypass) != JSON.stringify(this.paypass2)) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return
				}
				// 验证手机号码
				if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.cellphone) || this.cellphone == '') {
					uni.showToast({
						title: '请输入合法手机号码',
						icon: 'none'
					})
				}
				// 验证验证码
				if(this.vevrlfy == '') {
					uni.showToast({
						title: '请先获取验证码',
						icon: 'none'
					});
					return
				}
				else {
					request({
						url: '/index.php?s=/wap/member/setPaypassword',
						method: 'post',
						data: {
							paypass: this.paypass,
							paypass2: this.paypass2,
							mobile: this.cellphone,
							vevrlfy: this.vevrlfy
						}
					}).then(res => {
						console.log(res.data);
						if(res.code == 200) {
							console.log(111);
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							uni.navigateBack({
								delta: 1
							})
						}
						else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}
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
	.form-item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		line-height: 80rpx; 
		justify-content: space-between;
		padding: 0 16rpx;
		height: 80rpx;
		input {
			flex: 1;
			box-sizing: border-box;
			height: 100%;
		}
		.QRcode {
			margin-left: 20rpx;
			background: #E64340;
			color: #fff;
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
