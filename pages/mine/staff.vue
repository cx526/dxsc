<template>
	<view>
		<view class="toolbar">
			<view class="toolbar-left">员工总数：<text>{{count}}</text></view>
			<view class="toolbar-right-btn" @click="bind">绑定新员工</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
			<view class="list-item">
				<view class="list-item-left">
					<image :src="baseURL+item.user_headimg" class="list-item-left-avatar"></image>
					<view class="list-item-left-name">{{item.nick_name}}</view>
				</view>
				<view class="list-item-right">
					<block v-if="item.is_edit==0">
					<view class="list-item-right-item">普通会员：<text>{{item.staff_rate1}}</text>%</view>
					<view class="list-item-right-item">VIP会员：<text>{{item.staff_rate2}}</text>%</view>
					<view class="list-item-right-item">商家：<text>{{item.staff_rate3}}</text>%</view>
					<view class="list-item-right-item">其他等级：<text>{{item.staff_rate4}}</text>%</view>
					<view class="list-item-right-item">营业额：<text>{{item.staff_rate5}}</text>%</view>
					</block>
					<block v-if="item.is_edit==1">
					<view class="list-item-right-item"><view class="label">普通会员(%)</view><input data-key="0" class="input" type="digit" :value="savedata[0]" @input="change" /></view>
					<view class="list-item-right-item"><view class="label">VIP会员(%)</view><input data-key="1" class="input" type="digit" :value="savedata[1]" @input="change" /></view>
					<view class="list-item-right-item"><view class="label">商家(%)</view><input data-key="2" class="input" type="digit" :value="savedata[2]" @input="change" /></view>
					<view class="list-item-right-item"><view class="label">其他等级(%)</view><input data-key="3" class="input" type="digit" :value="savedata[3]" @input="change" /></view>
					<view class="list-item-right-item"><view class="label">营业额(%)</view><input data-key="4" class="input" type="digit" :value="savedata[4]" @input="change" /></view>
					</block>
					<view class="list-item-right-block">
						<text v-if="item.is_edit==0" class="list-item-right-btn" @click="edit(item,index)">编辑</text>
						<text v-if="item.is_edit==1" class="list-item-right-btn save-btn" @click="save(item,index)">保存</text>
						<text v-if="item.is_edit==1" class="list-item-right-btn" @click="cancel(item,index)">取消</text>
					</view>
				</view>
			</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { request,getToken,Token } from '../request.js'
	export default {
		data() {
			return {
				baseURL:this.$api,
				is_boss:0,
				qrcode:'',
				list:[],
				count:0,
				savedata:[],
				editUid:0,
			}
		},
		onLoad(){
			this.getList();
		},
		methods:{
			bind(){
				uni.navigateTo({
					url:"/pages/mine/invite"
				})
			},
			getList(){
				let that = this;
				request({
					url:"index.php?s=/wap/member/apiStaffList",
					method:"POST",
				}).then(function(res){
					if(res.data.code==1){
						that.count = res.data.count;
						that.list = res.data.list;
					}
				});
			},
			change(obj){
				this.savedata[obj.target.dataset.key] = obj.detail.value;
			},
			edit(info,key){
				this.list[key].is_edit = 1;
				this.savedata = [info.staff_rate1,info.staff_rate2,info.staff_rate3,info.staff_rate4,info.staff_rate5];
				this.editUid = info.uid;
				console.log(this.savedata);
			},
			save(info,key){
				let that = this;
				let savedata = this.savedata;
				request({
					url:"index.php?s=/wap/member/apiEditStaff",
					data:{
						uid:that.editUid,
						rate1:savedata[0],
						rate2:savedata[1],
						rate3:savedata[2],
						rate4:savedata[3],
						rate5:savedata[4],
					},
					method:"POST",
				}).then(function(res){
					uni.showToast({
						title:res.data.msg,
						icon: 'none',
					})
					if(res.data.code==1){
						that.list[key].staff_rate1 = savedata[0];
						that.list[key].staff_rate2 = savedata[1];
						that.list[key].staff_rate3 = savedata[2];
						that.list[key].staff_rate4 = savedata[3];
						that.list[key].staff_rate5 = savedata[4];
						that.list[key].is_edit = 0;
					}
				});
			},
			cancel(info,key){
				this.list[key].is_edit = 0;
			}
		},
	}
</script>

<style>
	.toolbar{
		width:100%;
		padding:0 2%;
		line-height: 80rpx;
		border-bottom: 1rpx #eee solid;
		overflow: hidden;
	}
	.toolbar-left{
		color:#888;
		font-size: 30rpx;
		float:left;
	}
	.toolbar-right-btn{
		font-size: 30rpx;
		float: right;
		padding:0 30rpx;
		background-color: rgba(254,217,64,1);
		color:#fff;
	}
	.list{
		width:100%;
		overflow: hidden;
	}
	.list-item{
		width:100%;
		padding:15rpx 2%;
		overflow: hidden;
		border-bottom: 1rpx #eee solid;
	}
	.list-item-left{
		float: left;
		width:21%;
		border-right: 1rpx #eee solid;
		padding:0 1%;
		overflow: hidden;
		font-size: 30rpx;
		color:#888;
	}
	.list-item-left-avatar{
		border-radius: 5rpx;
		display: block;
		width:100rpx;
		height: 100rpx;
		margin: 10rpx auto;
	}
	.list-item-left-name{
		line-height: 60rpx;
		text-align: center;
	}
	.list-item-right{
		float: left;
		width:71%;
		padding:0 2%;
		overflow: hidden;
		font-size: 30rpx;
		line-height: 50rpx;
		color:#888;
	}
	.list-item-right-item{
		float: left;
		width:100%;
		text-align: left;
	}
	.list-item-right-item text{
		color:#F76260;
	}
	.list-item-right-item input{
		vertical-align: middle;
		font-size: 30rpx;
		display: inline-block;
		line-height: 50rpx;
		color:#F76260;
	}
	.list-item-right-block{
		width:96%;
		padding:0 2%;
		overflow: hidden;
	}
	.list-item-right-btn{
		margin-top: 10rpx;
		display: inline-block;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 5rpx;
		padding:0 30rpx;
		background-color: #10AEFF;
		color:#fff;
	}
	.list-item-right-item .label{
		width:48%;
		padding-right: 2%;
		float: left;
		text-align: left;
		line-height: 50rpx;
		color:#888;
	}
	.list-item-right-item .input{
		width:45%;
		padding:0 2%;
		border: 1px solid #eee;
		float: left;
		text-align: left;
		line-height: 50rpx;
		color:#F76260;
	}
	.save-btn{
		background-color: rgba(254,217,64,1);
	}
</style>
