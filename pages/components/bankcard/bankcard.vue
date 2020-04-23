<template>
	<view>
		<view class="selbank">
			<view class="item-left">
				请选择银行:
			</view>
			<view >
				<picker :range="banklist" :value="bank_id" @change="changebank($event)">
					<view >{{banklist[bank_id]}}</view>
				</picker>
			</view>
		</view>
		<view class="selbank">
			<view>银行卡账号:</view>
			<view>
				<input type="text" v-model="cardnum" value="" placeholder="请输入银行卡账号"/>
			</view>
		</view>
		<view class="selbank">
			<view>身份证号码:</view>
			<view>
				<input type="text" v-model="idcard" value="" placeholder="请输入身份证号码"/>
			</view>
		</view>
		<view class="selbank">
			<view >请输入真实姓名:</view>
			<view>
				<input type="text" v-model="realname" value="" placeholder="请输入真实姓名" />
			</view>
		</view>
		<view class="selbank">
			<view >请输入开户手机号:</view>
			<view>
				<input type="number" v-model="mobile" value="" placeholder="请输入开户手机号码" />
			</view>
		</view>
		<view class="selbank">
			<view >请输入验证码:</view>
			<view>
				<input type="number"  v-model="captcha" value="" placeholder="请输入验证码" />
			</view>
			<view @click="getCaptcha" class="">
				获取验证码
			</view>
		</view>
		<view class="selbank" style="border: none;">
			<view >是否默认:</view>
			<view>
				<label>
					<checkbox :value="is_def" @click="chooseDef" :checked="is_def ==1 ? true:false" />
				</label>
			</view>
		</view>
		<view class="submit">
			<button type="default" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import {request} from "../../request.js";
	export default {
		data() {
			return {
				banklist:[],
				bank_id:0,
				bank_name:"",
				idcard:"",
				is_def:"0",
				realname:"",
				mobile:"",
				captcha:"",
				cardnum:"",
				bank_id_list:[],
				bamkId:"",
			}
		},
		onLoad() {
			this.getBankList();
			
		},
		methods: {
			getBankList(){
				request({
					url:"index.php?s=/wap/index/getBank"
				}).then(res=>{
					for(let i in res.data){
						this.banklist.push(res.data[i]);
						this.bank_id_list.push(i);
					}
					this.bank_name=this.banklist[this.bank_id];
					this.bamkId = this.bank_id_list[this.bank_id];
					uni.hideLoading();
				})
			},
			changebank(event){
				this.bank_id = event.detail.value;
				this.bank_name=this.banklist[this.bank_id];
				this.bamkId=this.bank_id_list[this.bank_id];
				
			},
			chooseDef(){
				this.is_def = this.is_def ==0?"1":"0";
				console.log(this.is_def);
			},
			submit(){
				if(this.idcard ==""){
					uni.showToast({
						title:"身份证不允许为空!",
						icon:"none"
					})
					return
				}
				if(this.realname ==""){
					uni.showToast({
						title:"真实姓名不允许为空!",
						icon:"none"
					})
					return
				}
				if(this.mobile ==""){
					uni.showToast({
						title:"手机号不允许为空!",
						icon:"none"
					})
					return
				}
				if(this.captcha ==""){
					uni.showToast({
						title:"验证码不允许为空!",
						icon:"none"
					})
					return
				}
				if(this.cardnum ==""){
					uni.showToast({
						title:"银行卡账号不允许为空!",
						icon:"none"
					})
					return
				}
				uni.showLoading({
					title:"加载中",
					icon:"loading",
					mask:true
				})
				request({
					url:"index.php?s=/wap/member/bankCardBinding",
					method:"POST",
					data:{
						mobile:this.mobile,
						captcha:this.captcha,
						is_default:this.is_def,
						bank_name:this.banklist[this.bank_id],
						realname:this.realname,
						identification:this.idcard,
						account_number:this.cardnum,
						bank_id:this.bamkId
					}
				}).then(res=>{
					if(res.data.code >0){
						console.log(res);
						uni.hideLoading();
						uni.showToast({
							title:res.data.msg,
							icon:"none",
						})
						setTimeout(function(){
							uni.navigateTo({
								url:"../bank/bank"
							});
						},500);
					}else{
						console.log(res);
						uni.hideLoading();
						uni.showToast({
							title:res.data.msg,
							icon:"none",
						})
					}
				})
			},
			getCaptcha(){
				if(this.mobile==""){
					uni.showToast({
						title:"请先输入手机号码!",
						icon:"none"
					});
					return;
				}
				request({
					url:"index.php?s=/wap/index/sendBackCardBindingFly",
					data:{
						mobile:this.mobile
					}
				}).then(res=>{
					if(res.data.code>0){
						uni.showToast({
							title:res.data.msg,
							icon:"none",
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none",
						})
						return
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		font-size: 32rpx;
		box-sizing: border-box;
		padding:0px 20px 0px 20px;
	}
	input::-webkit-input-placeholder {
	    font-size: 16px;
	}
.selbank{
	display: flex;
	align-items: center;
	height: 100rpx;
	border-bottom: 1px solid #C8C7CC;
	view{
		flex:1;
	};
	
}
button{
	background: rgb(254, 217, 64);
}
</style>
