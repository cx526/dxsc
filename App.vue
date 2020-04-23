<script>
	 const baseURL = "https://admin.dxsc.vip/"
	export default {
		onLaunch: function() {
			let token = uni.getStorageSync("token");
			if(token ==""||token == undefined||token==null){
				uni.request({
					url: baseURL + 'index.php?s=wap/captchac/getUserToken',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: res => {
						token = res.data.token;
						let endTime = new Date().getTime() + 86400000;
						 uni.setStorageSync("token",Array(token,endTime));
						 console.log(token);
					}
				})
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods:{
		 
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/css/animate.min.css");
</style>
