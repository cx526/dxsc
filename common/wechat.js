var jweixin = require('./weixin.js');
import { request } from '../pages/request.js'
export default {
    //判断是否在微信中  
    isWechat: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == 'micromessenger') {
            // console.log('是微信客户端')
            return true;
        } else {
            // console.log('不是微信客户端')
            return false;
        }
    },
    //初始化sdk配置  
    initJssdkShare: function(callback, url) {
        request({
        	url:'index.php?s=/wap/index/apiGetWechatPackage',
				data:{
					url:window.location.href,
				}
        }).then(function(res){
        	if (res.data) {
        	    jweixin.config({
        	        debug: false,
        	        appId: res.data.data.appId,
        	        timestamp: res.data.data.jsTimesTamp,
        	        nonceStr: res.data.data.jsNonceStr,
        	        signature: res.data.data.jsSignature,
        	        jsApiList: [
										'checkJsApi',
										'onMenuShareTimeline',
										'onMenuShareAppMessage',
										'getLocation'
        	        ]
        	    });
        	    //配置完成后，再执行分享等功能  
        	    if (callback) {
        	        callback(res.data);
        	    }
        	}
        });
    },
    initJssdk:function(callback){
		request({
			url:'index.php?s=/wap/index/apiGetWechatPackage',
			data:{
				url:window.location.href,
			}
		}).then(function(res){
			if(res.data){
			    jweixin.config({
			        debug: false,
			        appId: res.data.data.appId,
			        timestamp: res.data.data.jsTimesTamp,
			        nonceStr: res.data.data.jsNonceStr,
			        signature: res.data.data.jsSignature,
			        jsApiList: [
			            'checkJsApi',
			            'getLocation',
									'scanQRCode',
									'getBrandWCPayRequest',
									'chooseWXPay'
			        ]
			    });
			    //配置完成后，再执行分享等功能  
			    if (callback) {
			        callback(res.data);
			    }
			}
		});
    },
		//初始化微信支付配置
		initJssdkPay:function(callback){
			request({
				url:'index.php?s=/wap/index/apiGetWechatPackage',
				data:{
					url:window.location.href,
				}
			}).then(function(res){
				if (res.data) {
						jweixin.config({
								debug: false,
								appId: res.data.data.appId,
								timestamp: res.data.data.jsTimesTamp,
								nonceStr: res.data.data.jsNonceStr,
								signature: res.data.data.jsSignature,
								jsApiList: [
										'checkJsApi',
										'onMenuShareTimeline',
										'onMenuShareAppMessage',
										'getLocation',
							'chooseWXPay',
							"getBrandWCPayRequest",
								]
						});
						//配置完成后，再执行支付等功能  
						if (callback) {
								callback();
						}
				}
			});
		},
    //在需要自定义分享的页面中调用  
    share: function(data, url) {
        url = url ? url : window.location.href;
        if (!this.isWechat()) {
            return;
        }
        //每次都需要重新初始化配置，才可以进行分享  
        this.initJssdkShare(function(signData) {
					jweixin.ready(function() {
						var shareData = {
								title: data && data.title ? data.title : signData.site_name,
								desc: data && data.desc ? data.desc : signData.site_description,
								link: url,
								imgUrl: data && data.img ? data.img : signData.site_logo,
								success: function(res) {
										//用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的  
										// post('/api/member/share');
								},
								cancel: function(res) {}
						};
							
							//分享给朋友接口  
							jweixin.onMenuShareAppMessage(shareData);
							//分享到朋友圈接口  
							jweixin.onMenuShareTimeline(shareData);
					});
        }, url);
    },
    //在需要定位页面调用
		location: function(callback) {
					if (!this.isWechat()) {
							console.log('不是微信客户端')
							return;
					}
					console.info('定位')
					this.initJssdk(function(res) {
							jweixin.ready(function() {
									console.info('定位ready')
									jweixin.getLocation({
											type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
											success: function (res) {
													console.log(res);
													callback(res)
											},
											fail:function(res){
													console.log(res)
											},
									});
							});
					});
			},
		sacn: function(callback) {
				if (!this.isWechat()) {
						uni.showToast({
							title: '请在微信里打开',
							icon: 'none'
						})
						return;
				}
				this.initJssdk(function(res) {
						jweixin.ready(function() {
								console.info('扫一扫ready')
								jweixin.scanQRCode({
									needResult: 0,
									scanType: ["qrCode","barCode"],
									success: function (res) {
										var result = res.resultStr;
										callback()
									}
								});
						});
				});
		},
		//微信支付
		wchatpay:function(data){
			this.initJssdk(function(){
				let times = data.timeStamp;
				jweixin.ready(function(res){
					jweixin.chooseWXPay({
						appId:data.appId,
						nonceStr:data.nonceStr,
						package:data.package,
						signType:data.signType,
						paySign:data.paySign,
						timestamp:data.timeStamp,
						success:function(res){
							
						},
						fail:function(res){
							alert("失败");
						}
					});
				});
			});
		},
		wchatapply:function(data,callback,failCallback){
			this.initJssdk(function(){
				let times = data.timeStamp;
				jweixin.ready(function(res){
					jweixin.chooseWXPay({
						appId:data.appId,
						nonceStr:data.nonceStr,
						package:data.package,
						signType:data.signType,
						paySign:data.paySign,
						timestamp:data.timeStamp,
						success:function(res){
							if(res.errMsg == "chooseWXPay:ok") {
								if(callback) {
									callback()
								}
							}
						},
						cancel:function(res) {
							if(res.errMsg == "chooseWXPay:cancel") {
								if(failCallback) {
									failCallback()
								}
							}
						},
						fail:function(res){
		
						}
					});
				});
			});
		},
}