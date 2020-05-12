<template>
	<view>
		<view class="cutline"></view>
		<view class="userInfo">
			<view class="item" style="line-height: 200rpx;" @click="changeImg">
				<text>头像</text>
				<view>
					<image :src="$src+'/images/shop-logo.png'" mode="" v-if="avatar == 0"
					style="width: 145rpx;height: 145rpx;border-radius: 50%;margin-right: 28rpx;">
					</image>
					<image v-else :src="baseURL + avatar" 
					style="width: 145rpx;height: 145rpx;border-radius: 50%;margin-right: 28rpx;">
					</image>
				</view>
			</view>
			<view class="item" style="line-height: 90rpx;" @click="changeName">
				<text>昵称</text>
				<view>
					<text>{{user_name}}</text>
					<image :src="$src+'/images/icon-right.png'" style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view>
			<view class="item" style="line-height: 90rpx;" @click="reset()">
				<text>密码</text>
				<view>
					<text style="margin-right: 28rpx;">修改</text>
					<image :src="$src+'/images/icon-right.png'" style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view>
			<view class="item" style="line-height: 90rpx;" @click="setPassword">
				<text>支付密码</text>
				<view>
					<text style="margin-right: 28rpx;">设置</text>
					<image :src="$src+'/images/icon-right.png'" style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view>
		</view>
		<view class="btn" style="padding: 30rpx;">
			<button @click="signOut" style="background: #FED940;color: #000;">安全退出</button>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				isLogin:true,
				user_name:'未登陆',
				avatar:'/static/images/user-default.jpeg',
				phone:'',
				ordernum:{
					0:0,
					1:0,
					2:0
				},
				area:'',
				$api: '',
				$src: this.$src
			};
		},
		onShow() {
			this.getUserInfo();
		},
		onLoad() {
			this.$api = this.$api
		},
		methods:{
			// 跳转到reset修改密码页
			reset() {
				uni.navigateTo({
					url: '/pages/components/reset/reset'
				})
			},
			//获取信息
			getUserInfo() {
				let that = this;
				request({
						url:"index.php?s=/wap/member/Api_member_index",
						method:"POST",
					}).then(function(res){
						that.user_name = res.data.member_name;
						that.avatar = res.data.member_img;
						that.phone = res.data.phone;
						
						let address = res.data.address;
						that.area = address.province + " " + address.city + " " + address.district;
					});
			},
			//上传图片
			changeImg() {
				let that = this;
			        uni.chooseImage({
			            success: (chooseImageRes) => {
			                const tempFilePaths = chooseImageRes.tempFilePaths;
			                this.changeimg = tempFilePaths[0] 
			                uni.uploadFile({
			                    url: this.$api +'index.php?s=/wap/upload/uploadFile', //仅为示例，非真实的接口地址
			                    filePath: tempFilePaths[0],
			                    name: 'file_upload',
			                    formData: {
			                        file_path:'upload/avator/',
			                    },
													
			                    success: (res) => {
			                        var res = JSON.parse(res.data)
			                        if (res.code == 1) {
																that.avatar = this.$api + res.data;
																console.log(that.avatar);
																that.modifyFace(res.data);
																uni.showToast({
																		title:res.message,
																		icon:'none',
																		duration:2000
																})
			                        }
															else {
																uni.showToast({
																		title:res.message,
																		icon:'none',
																		duration:2000
																})
			                        }
			                    }
			                });
			            }
			        });
			 },
			 //保存图片路径到数据库
			modifyFace(user_headimg){
				console.log(user_headimg);
				request({
					url: "index.php?s=/wap/member/apimodifyFace",
					method: "POST",
					data: {
						user_headimg: user_headimg,
					}
				}).then(res => {
					console.log(res);
					if(res.data.code == 1){
						console.dir('保存成功');	
						
					}
					else {
						console.dir('保存失败');
					}
				})
			},
			// 跳转到修改昵称页
			changeName() {
				uni.navigateTo({
					url: '/pages/components/change-username/change-username'
				})
			},
			// 跳转到支付密码
			setPassword() {
				uni.navigateTo({
					url: '/pages/components/setPayPassword/setPayPassword'
				})
			},
			// 安全退出
			signOut() {
				uni.showModal({
					content: '确认安全退出吗？',
					success: res => {
						if(res.confirm) {
							uni.removeStorage({
								key:'token',
								success: () => {
									this.isLogin = false;
									uni.switchTab({
										url: '/pages/index/index'
									})
								}
							})
						}
					}
				})
			},
			
			
			 
		},
		
	}
	
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}
	.cutline {
		height: 12rpx;
		background: #EFEFF4;
	}
	.userInfo {
		box-sizing: border-box;
		background: #fff;
		.item {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F6F6F6;
			padding: 0 32rpx;
			justify-content: space-between;
			text {
				font-size: 28rpx;
				flex: 1;
				color: #5A5A5A;
			}
			view {
				display: flex;
				align-items: center;
			}
			
		}
	}
</style>
