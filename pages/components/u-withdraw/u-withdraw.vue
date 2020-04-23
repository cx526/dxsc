<template>
	<view class="balance-box">
		<view class="withdraw">当前可提现总额:{{number}}</view>
		<input v-model="cash" type="number" @input="preventPoint('cash',$event)"  value="" />
		<button type="default" @click="withdraw">提现</button>
			
	</view>
	
</template>

<script>
	import {request} from "../../request.js"
 	export default {
		data() {
			return {
				number:0,
				cash:0,
			}
		},
		onLoad() {
			this.getUserBalance();
		},
		methods: {
			getUserBalance(){
				request({
					url:"index.php?s=/wap/member/getUserBank"
				}).then(res=>{
					// if(res.data.code >0){
					// 	this.number = res.data.data.balance;
					// }
					console.log(res);
				})
			},
			withdraw(){
				if(!/^\d+$/.test(this.cash)){
					uni.showToast({
						title:"请输入整数!",
					})
					return;
				}
				request({
					url:"index.php?s=/wap/member/tixian",
					data:{
						cash:this.cash,
						bank_acc_id:1
					},
					method:"POST"
				}).then(res=>{
					console.log(res);
				})
			},
			preventPoint(type, evt) {
			        let newVal = parseInt(evt.target.value);
			        evt.target.value = '';  // 这句话看起来多此一举，但不写的话就是会出问题，但是为啥会出问题呢，我不知道!!!
			        evt.target.value = newVal;
			        this[type] = newVal;
			}
		
		}
	}
</script>

<style lang="scss">
	page{
		
	}
	.balance-box{
		
	}
	
</style>
