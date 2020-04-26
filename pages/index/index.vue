<template>

	<view v-if="loading">
		<!-- 导航 -->
		<index-nav @goCart="goCart()" :locationName="locationName" v-on:getLocation="getLocartion"></index-nav>
		<!-- 分割线 -->
	<!-- 	<view class="cut-line"></view> -->
		<!-- swiper -->
		<Swiper :imgUrl="imgUrl"></Swiper>
		<index-choose :chooseList="chooseList"></index-choose>
		<!-- 标题栏 -->
		<index-title title="店下推荐，立享优惠" des="王牌精选，精洗店下享" :flag="true"></index-title>
		<view style="padding: 16rpx 36rpx;">
			<image src="/static/images/dianxia.png" mode="" style="height: 350rpx;width: 100%;"></image>
		</view>
		<!-- Vip会员专属产品 -->
		<index-vip :topic="plat_dianxia" :vip_product="vip_product"></index-vip>
		<!-- 标题 -->
		<index-title title="折扣专区，把惊喜带回家" des="一折起，火拼到顶"></index-title>
		<!-- 折扣区 -->
		<index-discount :discountList="discount_ad"></index-discount>
		<!-- 标题 -->
		<index-title title="今日热卖" des="爆款热卖，人手一份" :hot="true"></index-title>
		<!-- 新品上架 -->
		<index-news :newsList="newsList" :isMarginTop="isMarginTop"></index-news>
		<!-- 标题 -->
		<index-title title="特别推荐" des="全程门店任你挑选"></index-title>
		<!-- 商家推荐 -->
		<index-recommend :recommendList="recommendList"></index-recommend>
		<view v-if="loadall==1" class="load-all">已全部加载</view>
	</view>
	<Loading v-else></Loading>
</template>

<script>
	import IndexNav from '../components/index-nav/index-nav.vue'
	import Swiper from '../common/swiper/swiper.vue'
	import IndexChoose from '../components/index-choose/index-choose.vue'
	import IndexTitle from '../components/index-title/index-title.vue'
	import IndexVip from '../components/index-vip/index-vip.vue'
	import IndexDiscount from '../components/index-discount/index-discount.vue'
	import IndexNews from '../common/goods-list/goods-list.vue'
	import IndexRecommend from '../components/index-recommend/index-recommend.vue'
	import Loading from '../common/loading/loading.vue'
	import {
		getSwiper,
		request
	} from '../request.js'
	import wechat from '../../common/wechat.js'
	export default {
		data() {
			return {
				loadall:0,
				shopPage:1,
				locationName: '定位...',
				latitude: '',
				longitude: '',
				// swiper模拟数据
				imgUrl: [],
				// chooseList数据
				chooseList: [
					{
						src: '/static/images/choose-icon01.png',
						text: '扫一扫',
						WH: 'width: 50rpx;height: 42rpx'
					},
					{
						src: '/static/images/choose-icon02.png',
						text: '折扣券',
						WH: 'width: 50rpx;height: 46rpx'
					},
					{
						src: '/static/images/choose-icon03.png',
						text: '店下爆品',
						WH: 'width: 50rpx;height: 40rpx'
					},
					{
						src: '/static/images/choose-icon04.png',
						text: '线上好货',
						WH: 'width: 50rpx;height: 44rpx'
					},
					{
						src: '/static/images/choose-icon05.png',
						text: '折扣专区',
						WH: 'width: 50rpx;height: 46rpx'
					},
					{
						src: '/static/images/choose-icon06.png',
						text: '9块9专区',
						WH: 'width: 50rpx;height: 42rpx'
					},
					{
						src: '/static/images/choose-icon07.png',
						text: 'vip专属',
						WH: 'width: 50rpx;height: 50rpx'
					},
					{
						src: '/static/images/choose-icon09.png',
						text: '饮品畅饮',
						WH: 'width: 50rpx;height: 50rpx'
					},
					{
						src: '/static/images/choose-icon10.png',
						text: '品牌专区',
						WH: 'width: 50rpx;height: 50rpx'
					},
					{
						src: '/static/images/choose-icon08.png',
						text: '影视专区',
						WH: 'width: 50rpx;height: 50rpx'
					},
				],
				// 折扣区模拟数据
				discountList: ["/static/images/discount-02.png", "/static/images/discount-03.png",
					"/static/images/discount-04.png", "/static/images/discount-05.png"
				],
				// 新品上架模拟数据
				isMarginTop: true,
				newsList: [],
				// 推荐商家模拟数据
				recommendList: [],
				// 店下广告位
				plat_dianxia: '',
				// vip货品位
				vip_product: [],
				// 储存折扣数据
				discount_ad: [],
				// loading加载图
				loading: false,
			}
		},
		components: {
			IndexNav,
			Swiper,
			IndexChoose,
			IndexTitle,
			IndexVip,
			IndexDiscount,
			IndexNews,
			IndexRecommend,
			Loading
		},
		onLoad() {
			let that = this;
			// 请求数据
			this.setWchatShare();
			request({
					url: 'index.php?s=/wap/index/index',
				})
				.then(res => {
					that.loading = true;
					// 存储轮播图数据
					let imgUrl = res.data.plat_adv_list.adv_list;
					// 存储新品上架数据
					let newsList = res.data.goods_list.data;
					// 折扣数据
					let discount_ad = res.data.discount_ad;
					// 存储商家店铺数据
					let recommendList = res.data.shop_list.data;
					// 处理轮播图图片
					for (let i = 0; i < imgUrl.length; i++) {
						imgUrl[i].adv_image = this.$api + imgUrl[i].adv_image
					}
					this.imgUrl = imgUrl
					// 处理新品上架图片
					for (let j = 0; j < newsList.length; j++) {
						newsList[j].pic_cover_small = this.$api + newsList[j].pic_cover_small
					}
					this.newsList = newsList;					
					// 处理店下广告位图
					this.plat_dianxia = this.$api + res.data.plat_dianxia.default_content;
					// vip产品图片处理
					for(let z = 0;z < res.data.is_recommend_list.data.length;z++) {
						res.data.is_recommend_list.data[z].pic_cover_small =this.$api+res.data.is_recommend_list.data[z].pic_cover_small
					}		
					this.vip_product = res.data.is_recommend_list.data;
					// 折扣数据banner图片处理
					for(let i = 0;i < discount_ad.length;i++) {
						discount_ad[i].adv_image = this.$api + discount_ad[i].adv_image
					};
					this.discount_ad = discount_ad;
				});
			// 定位
			uni.getStorage({
				key:"position",
				fail: function(res){
					that.getLocartion();
				},
				success:function(res){
					that.latitude = res.data[0];
					that.longitude = res.data[1];
					that.getShopList();
					uni.getStorage({
						key:"positionName",
						fail: function(res){
							that.getLocationName();
						},
						success:function(res){
							that.locationName = res.data;
						}
					})
				}
			})
			
		},
		onShow() {
			// 读取用户购物车数量改变图标
			this.$store.dispatch('getGoods');
		},
		onReachBottom(){
			this.shopPage = this.shopPage + 1;
			this.getShopList();
		},
		methods: {
			getlocationpoint() {
				let that = this;
				let latitude;
				let longitude;
				if(wechat.isWechat()){
					wechat.location(function(res){
						latitude = res.latitude;
						longitude = res.longitude;
						that.latitude = latitude;
						that.longitude = longitude;
						uni.setStorage({
							key: 'position',
							data: Array(latitude, longitude)
						})
						that.getLocationName();
						that.getShopList();
					});
				}else{
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(
							function(position) {
								latitude = position.coords.latitude; //获取纬度
								longitude = position.coords.longitude; //获取经度
								that.latitude = latitude;
								that.longitude = longitude;
								uni.setStorage({
									key: 'position',
									data: Array(latitude, longitude)
								})
								that.getLocationName();
								that.getShopList();
							});
					} else {
						uni.showToast({
							title: '不支持定位功能',
							icon: 'none'
						})
					}
				}
			},
			//设置微信分享
			setWchatShare(){
				wechat.share({
					title:"店下商城",
					desc:"这是一个让消费者省钱,商家赚钱的平台!",
					img:"http://dxsc.vip/static/images/user-logo.png",
				});
			},
			getLocartion() {
				let that = this;
				that.loadall = 0;
				that.shopPage = 1;
				that.recommendList = [];
				let position = that.getlocationpoint();
			},
			getLocationName() {
				let that = this;
				request({
						url: 'index.php?s=/wap/index/apiGetLocateName',
						data: {
							latitude: that.latitude,
							longitude: that.longitude,
						}
					})
					.then(res => {
						that.locationName = res.data.data.result.ad_info.city;
						uni.setStorage({
							key: 'positionName',
							data: res.data.data.result.ad_info.city
						})
					});
			},
			// 获取周围商家列表
			getShopList() {
				let that = this;
				let page = this.shopPage;
				if(that.loadall==1) return '';
				// uni.showLoading({
				// 	title: '加载中'
				// });
				request({
						url: 'index.php?s=/wap/index/apiGetShopList',
						data: {
							page:page,
							latitude: that.latitude,
							longitude: that.longitude,
						}
					})
					.then(res => {
						let list = that.recommendList;
						if(res.data.data.length==0){
							that.loadall = 1;
						}else{
							// 处理星级评分(shop_deliverycredit);
							for(let i = 0; i < res.data.data.length;i++) {
								res.data.data[i].all = res.data.data[i].shop_deliverycredit/1;
								res.data.data[i].half = res.data.data[i].shop_deliverycredit % 1 != 0? 1: 0;
								res.data.data[i].none = 5 - res.data.data[i].all - res.data.data[i].half;
								// res.data.data[i].distance_number = typeof(res.data.data[i].distance_number) == 'number'?res.data.data[i].distance_number/1000: 0;
								list.push(res.data.data[i]);
								that.recommendList = list;
							}
						}
						// uni.hideLoading();
						
					});
			},
			goCart() {
				uni.navigateTo({
					url: '/pages/components/cart/cart'
				})
			},
		},
	}
</script>

<style lang="scss">
	.load-all{
		text-align: center;
		color:#888;
		line-height: 80rpx;
		font-size: 30rpx;
		border:1rpx solid #eee;
	}
	.cut-line {
		width: 100%;
		height: 4rpx;
		background: #E5E5E5;
	}

</style>
