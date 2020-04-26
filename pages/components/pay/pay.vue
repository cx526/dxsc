<template>
	<view>
		<!-- 选择物流配送时收货地址 -->
		<view class="mode-box" v-if="isAddress && addressList.address_default" @click="address()">
			<view class="mode">
				<view class="userInfo">
					<text style="font-weight: 700;">{{name}}</text>
					<text style="text-align: right;font-weight: 700;">{{phone}}</text>
				</view>
				<view class="address">
					<text>{{defaultAddress}}</text>
				</view>
			</view>
		</view>
		<!-- 如果选的是物流配送又没有默认收货地址时显示 -->
		<view v-if="isAddress && !addressList.address_default" style="background: #fff;line-height: 80rpx;
		font-size: 28rpx;text-align: center;color: #999;border-bottom: 1px solid #E5E5E5;"
		@click="goAddress">
			<text>您还未填写收货地址</text>
		</view>
		<!-- 订单商品 -->
		<view class="product-box">
			<view class="product" v-if="res.itemlist " v-for="(item,index) in res.itemlist" :key="index">
				<view class="product-img">
					<image :src="item.picture_info.pic_cover" mode=""></image>
				</view>
				<view class="product-title">
					<view class="title" >
						<text>{{item.goods_name}}</text>
					</view>
					<view class="params">
						<text>{{item.sku_name}}</text>
					</view>
				</view>
				<view class="product-price">
					<view class="price">
						<text v-if="parseFloat(res.cashback_price)">￥{{item.price}}</text>
						<text v-else>￥{{res.count_money}}</text>
					</view>
					<view class="number">
						<text>×{{item.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 送货,编辑订单地址 -->
		<view class="delivery-box">
		  <view class="delivery-item">
		  	
		  	<view class="delivery-title">
		  		<text>配送方式</text>
		  	</view>
		  	<view class="delivery-title-choose" style="display: flex;">
		  		<picker @change="bindPickerChange" :value="index2" :range="modeway">
						<view>{{modeway[index2]}}</view>
					</picker>
		  		<image src="/static/images/icon-right.png" mode=""></image>
		  	</view>
		  </view>
			<!-- 物流配送 -->
			<view class="delivery-item" v-if="isAddress">
				
				<view class="delivery-title">
					<text>物流配送</text>
				</view>
				<view class="delivery-title-choose" style="display: flex;">
					<picker @change="bindFlowChange" :value="index3" :range="flowway">
						<view>{{flowway[index3]}}</view>
					</picker>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
			<!-- 门店自提 -->
			<view class="delivery-item" v-if="!isAddress">
				
				<view class="delivery-title">
					<text>{{salesType[list]}}</text>
				</view>
				<view class="delivery-title-choose" style="display: flex;" >
					<picker @change="bindShopChange" :value="list" :range="salesType">
						<view>{{modeway[list]}}</view>
					</picker>
					<image src="/static/images/icon-right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="cut-line"></view>
		<!-- 付款金额 -->
		<view class="pay-box">
			<view class="pay-item">
				<text>商品总额</text>
				<text>￥{{res.count_money}}</text>
				<!-- <input type="text" value="" /> -->
			</view>
			<view class="pay-item">
				<text>运费</text>
				<text>￥{{addressList.express ? addressList.express:'免邮'}}</text>
			</view>
			<view class="pay-item">
				<text>折扣券</text>
				<text style="color: #C3000B;">商品已抵扣{{res.cashback_price?res.cashback_price : 0.00}}元</text>
			</view>
			<view class="pay-item" v-if="res.n_money">
				<view>
					<text style="flex: 1;">现金券：</text>
					<text style="color: #C3000B;font-weight: 700;">￥{{res.n_money?res.n_money: 0}}</text>
				</view>
				
					<input type="number" placeholder="请输入使用额度"
					placeholder-style="color:#ccc"
					style="text-align: right;"
					v-model="cash"
					@input="money($event)"/>
			</view>
			<view class="pay-item" v-if="res.member_account">
				<view>
					<text style="flex: 1;">使用余额：</text>
					<text style="color: #C3000B;font-weight: 700;">￥{{res.member_account.balance}}</text>
				</view>
				
				<input type="number" placeholder="请输入使用余额"
				placeholder-style="color:#ccc"
				style="text-align: right;"
				v-model="balance"
				@input="changeBalance($event)"
				/>
			</view>
			<view class="pay-item" v-if="passwordWin">
				<input type="password" placeholder="请输入支付密码"
				placeholder-style="color: #C0C0C0"
				@input="getUserPassword"
				/>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="cut-line"></view>
		<!-- 支付方式 -->
		<view class="delivery-box">
			<view class="delivery-item">
				<view class="delivery-title-choose" style="margin-right: 12rpx;">
					<image src="/static/images/payment.png" mode=""></image>
				</view>
				<view class="delivery-title">
					<text>余额付款</text>
				</view>
				<view class="delivery-radio">
					<radio :checked="balanceWay" style="transform: scale(0.6);" @click="handleBalance" color="#e64340"/>
				</view>
			</view>
			<!-- 微信支付 -->
			<view class="delivery-item">
				<view class="delivery-title-choose" style="margin-right: 12rpx;display: flex;align-items: center;">
					
					<image src="/static/images/wx-pay.png" mode=""></image>
				</view>
				<view class="delivery-title">
					<text>微信支付</text>
				</view>
				<view class="delivery-radio">
					<radio :checked="payWay" style="transform: scale(0.6);"  @click="handlePayWay" color="#e64340"/><text></text>
					
				</view>
			</view>
		</view>
		<!-- 付款 -->
		<view class="pay-money">
			<view  style="background: #333;">
				<text>应付金额：</text>
				<text>￥{{add}}</text>
			</view>
			<view @click="handleOrder(isAddress)">
				<text>提交订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from '../../request.js'
	export default {
		data() {
			return {
				// 是否使用折扣券
				isShop:false,
				// 存储全部的数据
				res: '',
				// 储存商品的sku_id
				sku_id: '',
				// 储存地址数据
				addressList:'',
				// 用户默认的收货地址
				defaultAddress: '',
				// 收货名字
				name: '',
				// 收货人号码
				phone: '',
				// 门店自提地址的id
				shopId: '',
				// 选择提货方式
				modeway: ['门店自取','物流配送'],
				index2: 1, 
				// 物流公司选择
				flowway: [],
				// 物流公司id
				co_id: '',
				// 物流公司索引
				index3: 0,
				// 物流方式
				salesType: [],
				// 物流方式索引
				list: 0,
				// 默认显示物流配送方式
				index:2,
				// 控制物流还是门店自提方式
				isAddress: true,
				// 现金券
				cash: '',
				// 余额
				balance: '',
				// 商品总价
				add: '',
				// 输入密码
				userPassword: '',
				
				// 弹窗
				passwordWin: false,
				// 确定是否是支付方式
				payWay: true,
				balanceWay: false
			};
		},
		onLoad() {
			this.getShopOnload()
		},
		onShow() {
			this.getShopData()
		},
		methods:{
			// 请求商品的价格数量等相关数据
			getShopOnload() {
				request({
					url: 'index.php?s=/wap/order/ApiorderInfo',
					method:"POST",
				}).then(res => {
					// 处理图片
					for(let i = 0;i < res.data.itemlist.length;i++) {
						res.data.itemlist[i].picture_info.pic_cover = this.$api + res.data.itemlist[i].picture_info.pic_cover
					}
					// 存储全部的数据
					this.res = res.data;
					// 储存商品的sku_id
					this.sku_id = res.data.goods_sku_list;
					// 存储门店自提id
					this.shopId = res.data.pickup_point_list.data[0].shop_id;
					// 获取门店自提的地址
						for(let i = 0;i < this.res.pickup_point_list.data.length;i++) {
							let item = this.res.pickup_point_list.data[i];
							let dataItem = (item.province_name + item.city_name + item.dictrict_name + item.address)
							this.salesType = this.salesType.concat(dataItem);
							
						}
						// 请求获取默认收货地址和快递公司(每次选择完收货人的同步下数据)
						request({
							url: 'index.php?s=/wap/order/getAddres',
							method: 'post',
							data: {
								sku_id: this.sku_id
							}
						}).then(res => {
							// 储存地址数据
							this.addressList = res.data;
							// 获取物流类型
							if(this.addressList.express_company_list && this.addressList.express_company_list.length > 0) {
								this.co_id = this.addressList.express_company_list[this.index3].co_id;
								for(let i = 0;i < this.addressList.express_company_list.length;i++) {
									this.flowway = this.flowway.concat(this.addressList.express_company_list[i].company_name)
								}
							}
							// 总价(单价*数量-邮费，默认不使用折扣券);
							if( Number(this.addressList.express)) {
								this.add = (Number(this.res.count_money) + Number(this.addressList.express)).toFixed(2);
							}
							else {
								this.add = Number(this.res.count_money).toFixed(2);
							}
							// 如果存在做处理
							if(this.addressList.address_default) {
								// 省市区
								this.addressList.address_default.address_info = this.addressList.address_default.address_info.split('&nbsp;').join("");
								// 默认地址处理
								this.defaultAddress = this.addressList.address_default.address_info + this.addressList.address_default.address;
								// 收货名字
								this.name = this.addressList.address_default.consigner;
								// 收货人名称
								this.phone = this.addressList.address_default.phone;							
							}
						})		
					})
			},
			getShopData() {
				// 请求获取默认收货地址和快递公司(每次选择完收货人的同步下数据)
				request({
					url: 'index.php?s=/wap/order/getAddres',
					method: 'post',
					data: {
						sku_id: this.sku_id || ''
					}
				}).then(res => {
					// 储存地址数据
					this.addressList = res.data;
					// 获取物流类型
					if(this.addressList.express_company_list && this.addressList.express_company_list.length > 0) {
						
						for(let i = 0;i < this.addressList.express_company_list.length;i++) {
							this.flowway = this.flowway.concat(this.addressList.express_company_list[i].company_name)
						}
					}
					// 总价(单价*数量-邮费，默认不使用折扣券);
					if( Number(this.addressList.express)) {
						this.add = (Number(this.res.count_money) + Number(this.addressList.express)).toFixed(2);
					}
					else {
						this.add = Number(this.res.count_money).toFixed(2);
					}
					// 如果存在做处理
					if(this.addressList.address_default) {
						// 省市区
						this.addressList.address_default.address_info = this.addressList.address_default.address_info.split('&nbsp;').join("");
						// 默认地址处理
						this.defaultAddress = this.addressList.address_default.address_info + this.addressList.address_default.address;
						// 收货名字
						this.name = this.addressList.address_default.consigner;
						// 收货人名称
						this.phone = this.addressList.address_default.phone;							
					}
				})		
			},
			// 点击跳转到chooseShop页面
			chooseShop() {
				uni.navigateTo({
					url:'/pages/components/choose-shop/choose-shop'
				})
			},
			// 点击跳转到address页面
			address() {
				uni.navigateTo({
					url: '/pages/components/address/address'
				})
			},
			// 选择(门店,物流)方式
			bindPickerChange(e) {
				this.index2 = e.target.value;
				if(e.target.value == 1) {
					this.isAddress = true
				}
				else {
					this.isAddress = false
				}
			},
			// 选择物流
			bindFlowChange(e) {
				this.index3 = e.target.value;
				this.co_id = this.addressList.express_company_list[this.index3].co_id;
			},
			// 选择门店
			bindShopChange(e) {
				this.list = e.target.value;
				// 门店自提地址的id
				this.shopId = this.res.pickup_point_list.data[this.list].id;
			},
			// 使用现金券
			money(event) {
				// 如果支付金额存在，显示输入支付密码输入框
				this.passwordWin = event.detail.value? true : false;
				this.cash = parseInt(event.detail.value) || 0;
				if(this.res.n_money == 0 || !this.res.n_money) {
					// uni的bug
					setTimeout(() => {this.cash = 0;},50)
					uni.showToast({
						title: '现金券为零',
						icon: 'none'
					})
					return
				}
				else {
				// 如果输入金额大于商品总额,显示商品总额
					// 如果用户存在现金券
					this.cash = parseInt(event.detail.value) || 0;
					// 当前商品的总价
					let price = (parseFloat(this.res.count_money) + parseFloat(this.addressList.express));
					// 当前用户拥有的现金券
					let userCash = parseFloat(this.res.n_money);
					// 当前用户输入的现金券和余额的总和
					let sum = this.cash + (parseInt(this.balance) ? parseInt(this.balance): 0);
					// 商品总额大于用户现有现金券,默认最大输入位当前现金券(this.res.n_money)
					if(this.balance == '') {
						// 如果用户现金券小于当前的商品价格
						if(userCash < price) {
							// 输入现金券大于用户的现金券
							if(this.cash > userCash) {
								setTimeout(() => {this.cash = userCash;this.add = (price - this.cash).toFixed(2)},50)
							}
							else {
								this.add = (price - this.cash).toFixed(2);
							}
						}
						// 如果用户现金券大于当前的商品价格
						else {
							// 输入现金券大于当前商品的总价
							if(this.cash > price) {
								setTimeout(() =>{this.cash = price},50)
								this.add = 0
							}
							else {
								this.add = (price - this.cash).toFixed(2)
							}
						}
					}
					// 如果用户输入的余额不为空
					else if(this.balance != '') {
						// 如果用户拥有的现金券大于当前商品的总价
						if(userCash > price) {
							// 当前余额+现金券大于商品的价格
							if(sum >= price) {
								// 输入的现金券小于当前商品价格
								if(this.cash < price) {
									setTimeout(()=> {this.balance = (price - this.cash).toFixed(2);},50)
									this.add = 0;
								}
								// 输入的现金券大于当前商品价格
								else {
									setTimeout(()=> {this.cash = price;this.balance = 0},50)
									this.add = 0;
								}
							}
							else {
								this.add = (price - this.balance - this.cash).toFixed(2)
							}
						}
						// 如果用户拥有的现金券小于当前商品的总价
						else {
							if(sum >= price) {
								// 如果输入的现金券大于用户的现金券
								if(this.cash > userCash) {
									setTimeout(()=> {this.cash = userCash;this.add = (price - this.balance - userCash).toFixed(2)},50)
								}
								else {
									this.add = (price - this.balance - this.cash).toFixed(2);
								}
							}
							else {
								this.add = (price - this.balance - this.cash).toFixed(2);
							}
						}
					}
				}
			},
			// 使用余额
			changeBalance(event) {
				// 如果支付金额存在，显示输入支付密码输入框
				this.passwordWin = event.detail.value? true : false;
				// 如果用户存在现金券
				this.balance = parseInt(event.target.value) || 0;
				// 当前商品的总价
				let price = (parseFloat(this.res.count_money) + parseFloat(this.addressList.express));
				// 当前用户拥有的现金券
				let userBalance = parseFloat(this.res.member_account.balance);
				// 当前用户输入的现金券和余额的总和
				let sum = this.balance + (parseInt(this.cash) ? parseInt(this.cash): 0);
				// 如果现金券等于价格，默认给0
				if(this.cash == price ) {
					setTimeout(()=> {this.balance = 0;},50)
				}
				// 如果用户没有输入现金券
				if(this.cash =='' || this.cash == 0) {
					// 如果余额存在且余额大于商品价格
					if(userBalance && userBalance >= price) {
						if(this.balance > price) {
							setTimeout(()=> {this.balance = price;},50);
							this.add = 0
						}
						else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
					// 余额存在且余额小于商品价格
					else {
						if(this.balance > userBalance) {
							setTimeout(()=> {this.balance = userBalance;this.add = (price - this.balance).toFixed(2)},50)
						}
						else {
							this.add = (price - this.balance).toFixed(2)
						}
					}
				}
				// 用户输入了现金券
				else {
					// 如果余额存在且余额大于商品价格
					if(userBalance && userBalance >= price) {
						if(this.balance > price - this.cash) {
							setTimeout(()=> {this.balance = price - this.cash;})
							this.add = 0;
						}
						else {
							this.add = (price - this.balance - this.cash).toFixed(2);
						}
					}
					// 余额小于商品价格
					else {
						if(this.balance > userBalance) {
							setTimeout(
							()=> {this.balance = userBalance;this.add = (price - this.balance - this.cash).toFixed(2)},50)
						}
						else {
							this.add = (price - this.balance - this.cash).toFixed(2)
						}
					}
				}
	
			},
			// 提交订单
			handleOrder(isAddress) {
				// 物流提交提交之前做判断
				if(!this.addressList.address_default &&　isAddress) {
					uni.showToast({
						title: '请填写收货地址',
						icon: 'none'
					});
					return
				}
				// 如果有输入现金券或余额则判断输入支付密码是否为空
				else if(this.cash || this.balance) {
					// 输入密码为空
					if(this.userPassword == '') {
						uni.showToast({
							title: '请输入支付密码',
							icon: 'none'
						});
						return
					}
					// 请求核对用户支付密码
					else {
						// 请求核对密码
						request({
							url: 'index.php?s=/wap/member/checkPayPass',
							method: 'post',
							data: {
								paypass: this.userPassword
							}
						}).then(res => {
							if(res.data.code < 0) {
								uni.showModal({
									title: res.data.msg,
									content: '是否前往设置支付密码？',
									success:res => {
										if(res.confirm) {
											uni.navigateTo({
												url: '/pages/components/setPayPassword/setPayPassword'
											})
										}
									}
								})
								// 测试用
								// this.handleFlowData();
							}
							else {
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								});
								// 物流配送
								if(this.isAddress) {
									this.handleFlowData();
								}
								// 门店自提
								else {
									this.handleShopData()
								}
							}
						})
					}
					
				}
				// 直接调起微信支付
				else if(!this.balance && !this.cash && this.payWay) {
					if(isAddress) {
						// 物流配送
						this.handleFlowData()
					}
					else {
						// 门店自提
						this.handleShopData()
					}
				}
			},
			// 跳转到添加收货地址页面
			goAddress() {
				uni.navigateTo({
					url:'/pages/components/address/address'
				})
			},
			// 余额支付
			handleBalance() {
				this.balanceWay = !this.balanceWay;
				this.payWay = !this.balanceWay;
				if(this.balanceWay) {
					this.passwordWin = true;
					// 如果当前用户的余额大于商品价格，默认填充
					if(parseInt(this.res.member_account.balance) > parseInt(this.res.count_money)) {
						// 如果当前用户有输入现金券
						if(this.cash) {
							this.balance = (this.res.count_money - this.cash).toFixed(2)
						}
						else {
							this.balance = this.res.count_money;
						}
						this.add = 0;
					}
					else {
						// 余额小于商品价格
						if(this.res.member_account.balance < this.res.count_money && this.res.member_account.balance) {
							// 如果用户有输入现金券res.n_money
							if(this.cash) {
								// 如果现金券+余额大于商品价格
								if(Number(this.balance) + Number(this.cash) > this.res.count_money) {
									this.balance = (this.res.count_money - this.cash).toFixed(2);
									this.add = 0;
								}
								else {
									let cash = this.cash || 0
									this.add = (this.res.count_money - this.balance - cash).toFixed(2)
								}
							}
							
							
						}
					}
					
				}
			},
			// 微信支付
			handlePayWay() {
				this.payWay = !this.payWay;
				this.balanceWay = !this.payWay;
				if(this.payWay) {
					this.balance = '';
					if(this.cash && this.balance) {
						this.add = (this.res.count_money - this.cash - this.balance).toFixed(2)
					}
					else if(this.cash){
						this.add = (this.res.count_money - this.cash).toFixed(2);
					}
					else if(this.balance){
						this.add = (this.res.count_money - this.balance).toFixed(2);
					}
					else {
						this.add = this.res.count_money
					}
					
				}
			},
			// 物流配送请求数据(isAddress为真时调用)
			handleFlowData() {
				uni.showToast({
					title: '订单提交中',
					icon: 'loading'
				})
				// !this.addressList.express_company_list[this.index3].co_id
				// 如果店家没有添加物流类型默认不请求
				if(!this.co_id ) {
					uni.showToast({
						title: '请联系商家添加物流类型',
						icon: 'none'
					});
					return
				}
				else {
					request({
						url: 'index.php?s=/wap/order/ordercreate',
						method: 'post',
						data: {
							goods_sku_list: this.res.goods_sku_list,
							leavemessage: '',
							use_coupon: 0,
							integral: 0,
							account_balance:this.balance ? this.balance : 0,
							pay_type: 0,
							buyer_invoice: '',
							shipping_company_id: this.co_id?this.co_id : this.addressList.express_company_list[this.index3].co_id ,
							cashback_price: this.res.cashback_price,
							n_money: this.cash ? this.cash : 0 ,
						}
					}).then(res => {
						uni.hideToast();
						// 如果输入的余额 + 现金券 > 商品总额，不调起微信支付
						let importBalance = parseInt(this.balance) ? parseInt(this.balance) : 0;
						let importCash = parseInt(this.cash) ? parseInt(this.cash) : 0;
						if(importCash + importBalance >= parseInt(this.res.count_money)) {
							uni.navigateTo({
								url: '/pages/components/order/order?status=2'
							})
						}		
						else {
							// 调起微信支付
							let tmp = res;
							var token = uni.getStorageSync('token')[0];
							if(token == '') {
								uni.showToast({
									title: '请先登录',
									icon: 'none'
								});
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/components/login/login'
									})
								},500)
							}
							else {
									// let token = res.data[0];
									let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+tmp.data.code_no+"&token="+token);
									let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
									window.location.href = url;
							}
							
							
							
							
							
							
						}
					})
				}

			},
			// 门店自提(isAddress为假时调用)
			handleShopData() {
				uni.showToast({
					title: '订单提交中',
					icon: 'loading'
				})
				request({
					url: 'index.php?s=/wap/order/ordercreate',
					method: 'post',
					data: {
						goods_sku_list: this.res.goods_sku_list,
						leavemessage: '',
						use_coupon: 0,
						integral: 0,
						account_balance:this.balance ? this.balance : 0,
						pay_type: 0,
						buyer_invoice: '',
						pick_up_id: this.shopId,
						cashback_price: this.res.cashback_price,
						n_money: this.cash ? this.cash : 0 ,
					}
				}).then(res => {
					uni.hideToast();
					// 如果输入的余额 + 现金券 > 商品总额，不调起微信支付
					let importCash = parseInt(this.cash) ? parseInt(this.cash) : 0;
					let importBalance = parseInt(this.balance) ? parseInt(this.balance) : 0;
					if(importCash + importBalance >= parseInt(this.res.count_money)) {
						uni.navigateTo({
							url: '/pages/components/order/order?status=1'
						})
					}
					
					// 调起微信支付
					else {
						let tmp = res;
						let token = uni.getStorageSync('token')[0];
						if(token == '') {
							uni.showToast({
								title: '请先登录',
								icon: 'none'
							});
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/components/login/login'
								})
							},500)
						}
						else {
								let redirectUrl = encodeURIComponent("https://admin.dxsc.vip/index.php?s=/wap/pay/ApiwchatPay&no="+tmp.data.code_no+"&token="+token);
								let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7cffa961be69b86e&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
								window.location.href = url;
						}
						
						
						
						
					}

				})
			},
			// 监听用户输入的密码
			getUserPassword(event) {
				// 去空
				this.userPassword = event.detail.value.replace(/\s+/g,"");
			},
			// 点击支付弹窗确定按钮核对支付密码
			passwordSure() {
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background: #EFEFF4;
	box-sizing: border-box;
	padding-bottom: 90rpx;
}
// 收货地址
.mode-box {
	box-sizing: border-box;
	padding: 30rpx;
	background: #fff;
	border-bottom: 1px solid #efefef;
	.mode {
		box-sizing: border-box;
		
		font-size: 28rpx;
		color: #444;
		.userInfo {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text {
				font-size: 32rpx;
				color: #444;
				flex: 1;
			}
		}
		.address {
			box-sizing: border-box;
			margin-top: 12rpx;
			color: #999;
		}
	}
}
// 订单详情
.order-box {
	background: #fff;
	box-sizing: border-box;
	padding: 0 18rpx;
	.order {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.order-left {
			box-sizing: border-box;
			.sketchy {
				font-size: 24rpx;
				color: #444;
				margin-top: 18rpx;
			}
			.detail-address {
				font-size: 28rpx;
				color: #000;
				font-weight: 700;
				margin-top: 18rpx
			}
		}
		.order-right {
			box-sizing: border-box;
			width: 30rpx;
			height: 30rpx;
			
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
// line
.line {
	background: #ccc;
	height: 4px;
	width: 100%;
}
// 订单商品
.product-box {
	background: #fff;
	box-sizing: border-box;
	.product {
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		border-bottom: 1px solid #E5E5E5;
		// align-items: center;
		.product-img {
			width: 140rpx;
			height: 140rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.product-title {
			flex: 1;
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-right: 48rpx;
			.title {
				font-size: 30rpx;
				color: #444444;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-weight: 700;
			}
			.params {
				font-size: 24rpx;
				color: #AAAAAA;
				margin-top: 10rpx;
			}
		}
		.product-price {
			box-sizing: border-box;
			.price {
				font-size: 30rpx;
				color: #C3000B;
			}
			.number {
				font-size: 24rpx;
				color: #AAAAAA;
				text-align: right;
			}
		}
	}
}
//送货,编辑订单地址
.delivery-box {
	background: #fff;
	box-sizing: border-box;
	.delivery-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E5E5E5;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		.delivery-radio {
			box-sizing: border-box;
		}
		.delivery-title {
			box-sizing: border-box;
			flex: 1;
		}
		.delivery-title-choose {
			color: #C7C7CC;
			image {
				width: 30rpx;
				height: 30rpx;
				position: relative;
				top: 4rpx;
			}
		}
	}
}
// 分割线
.cut-line {
	height: 18rpx;
	width: 100%;
	background: #EFEFF4;
}
// 付款金额 
.pay-box {
	background: #fff;
	box-sizing: border-box;
	.pay-item {
		box-sizing: border-box;
		padding: 30rpx;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #000;
	}
}
// 付款
.pay-money {
	box-sizing: border-box;
	display: flex;
	height: 100rpx;
	font-size: 30rpx;
	color: #fff;
	line-height: 100rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	view {
		flex: 1;
		text-align: center;
	}
	view:nth-child(1) {
		background: #333;
	
	}
	view:nth-child(2) {
		background: #FED22E;
		color: #333;
	}
}
// 支付弹窗
.password {
	box-sizing: border-box;
	.mask {
		background: rgba(0,0,0,0.5);
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 9;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
	}
	.password-main {
		background: #fff;
		width: 80%;
		position: absolute;
		top: 100rpx;
		margin-left: 10%;
		height: 410rpx;
		z-index: 19;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx 16rpx 16rpx 30rpx;
		font-size: 28rpx;
	}
	.btn {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		button {
			width: 48%;
		}
	}
}

</style>
