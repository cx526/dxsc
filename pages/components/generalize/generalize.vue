<template>
	<view>
		<image :src='url' mode="aspectFit" :style="{'height': Height}"></image>
	</view>
</template>

<script>
	import { request } from '../../request.js'
	export default {
		data() {
			return {
				uid: '12',
				url:"",
				Height: ''
			};
		},
		onLoad(options) {
			this.uid = options.uid;
			this.getImg();
			uni.getSystemInfo({
				success: res => {
					this.Height = res.windowHeight + 'px';
					this.Width = res.windowWidth + 'px'
				}
			})
		},
		methods:{
			getImg(){
				request({
					url:"index.php?s=/wap/Member/showUserQrcode?source_uid="+this.uid,
					method:"POST"
				}).then(res=>{
					this.url=res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	image{
		width: 100%;
	}
</style>
