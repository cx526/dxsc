(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-components-shop-shop"],{"04e3":function(t,i,e){},"0a89":function(t,i,e){"use strict";e.r(i);var o=e("8743"),n=e("a013");for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);e("f063");var s,r=e("f0c5"),c=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,"a775943a",null,!1,o["a"],s);i["default"]=c.exports},1148:function(t,i,e){"use strict";var o=e("b0d6"),n=e.n(o);n.a},2280:function(t,i,e){"use strict";var o,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("v-uni-image",{staticClass:"loading",attrs:{src:"/static/images/loading.gif"}})],1)},a=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return o}))},"36f4":function(t,i,e){"use strict";e.r(i);var o=e("2280"),n=e("f9b7");for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);e("1148");var s,r=e("f0c5"),c=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,"14d7e8dc",null,!1,o["a"],s);i["default"]=c.exports},4457:function(t,i,e){var o=e("24fb");i=o(!1),i.push([t.i,".loading[data-v-14d7e8dc]{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}",""]),t.exports=i},8743:function(t,i,e){"use strict";var o,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticStyle:{"padding-bottom":"100rpx"}},[t.flag?e("v-uni-view",[t.imgUrl&&t.swiperShow?e("v-uni-view",{staticClass:"swiper-box"},[e("v-uni-swiper",{staticStyle:{height:"600rpx"},attrs:{"indicator-dots":!0,"indicator-color":"rgba(187,187,187,0.4)","indicator-active-color":"rgba(255,255,255,0.7)"}},[t.imgUrl&&t.imgUrl.length>0?t._l(t.imgUrl,(function(i,o){return e("v-uni-swiper-item",{key:o,staticStyle:{height:"600rpx"}},[e("v-uni-view",{staticStyle:{height:"100%"}},["https://admin.dxsc.vip/"!=i?e("v-uni-image",{staticStyle:{height:"600rpx"},attrs:{src:i}}):t._e()],1)],1)})):t._e()],2)],1):t._e(),e("v-uni-view",{staticClass:"shop-box"},[e("v-uni-view",{staticClass:"shop"},[e("v-uni-view",{staticClass:"shop-item"},[e("v-uni-text",[t._v("店名：")]),t.shop_name?e("v-uni-text",{staticStyle:{"font-weight":"700"}},[t._v(t._s(t.shop_name))]):t._e()],1),e("v-uni-view",{staticClass:"shop-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.call.apply(void 0,arguments)}}},[e("v-uni-text",[t._v("预约电话：")]),""!=t.shop_phone?e("v-uni-text",[t._v(t._s(t.shop_phone))]):e("v-uni-text",[t._v("暂无资料")])],1),t.shopImg?e("v-uni-view",{staticClass:"shop-item"},[e("v-uni-text",[t._v("店铺二维码：")]),e("v-uni-image",{ref:"shopImg",staticStyle:{width:"100px",height:"100px"},attrs:{src:t.baseURL+"index.php?s=/wap/shop/apiShopQrcode?shop_id="+t.shop_id,mode:""},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.preview.apply(void 0,arguments)},error:function(i){arguments[0]=i=t.$handleEvent(i),t.imgLoadError()}}})],1):t._e(),e("v-uni-view",{staticClass:"shop-item"},[e("v-uni-text",[t._v("店铺地址：")]),e("v-uni-view",{staticStyle:{display:"flex","align-items":"center"}},[t.shop_address?e("v-uni-text",{staticStyle:{color:"#BEBEBE"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getLocation.apply(void 0,arguments)}}},[t._v(t._s(t.shop_address))]):e("v-uni-text",[t._v("暂无资料")])],1)],1)],1)],1),e("v-uni-view",{staticClass:"product-show"},[e("v-uni-view",{staticClass:"product-title"},[e("v-uni-text",{staticStyle:{"border-bottom":"3px solid #FED940",display:"inline-block"}},[t._v("为你推荐")])],1),t.goods&&t.goods.length>0?e("v-uni-view",{staticClass:"product"},[t._l(t.goods,(function(i,o){return[e("v-uni-view",{key:o+"_0",staticClass:"product-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goodsinfo(i.goods_id)}}},[e("v-uni-view",{staticClass:"product-img"},[e("v-uni-image",{attrs:{src:t.baseURL+i.img,mode:""}})],1),e("v-uni-view",{staticClass:"product-context",staticStyle:{"text-align":"left",display:"flex","flex-direction":"column"}},[e("v-uni-text",{staticStyle:{display:"-webkit-box","-webkit-line-clamp":"2","-webkit-box-orient":"vertical",overflow:"hidden",margin:"12rpx 0"}},[t._v(t._s(i.goods_name))]),e("v-uni-view",[e("v-uni-text",{staticStyle:{color:"#C3000B","font-size":"26rpx","margin-right":"10rpx"}},[t._v("平台价："+t._s(i.price))]),e("v-uni-text",{staticStyle:{color:"#AAAAAA","font-size":"24rpx","text-decoration":"line-through"}},[t._v("市场价："+t._s(i.market_price))])],1)],1)],1)]}))],2):e("v-uni-view",{staticStyle:{"text-align":"center","box-sizing":"border-box",padding:"30rpx","font-size":"24rpx"}},[t._v("暂无相关推荐")])],1),e("v-uni-view",{staticClass:"footer-box"},[e("v-uni-view",{staticClass:"footer"},[e("v-uni-view",{staticClass:"cart",staticStyle:{background:"#333333"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goMoney.apply(void 0,arguments)}}},[e("v-uni-text",[t._v("充值会员")])],1),e("v-uni-view",{staticClass:"buy",staticStyle:{background:"#FED22E",color:"#1F0A00"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goRefer.apply(void 0,arguments)}}},[e("v-uni-text",[t._v("咨询买单")])],1)],1)],1)],1):e("Loading")],1)},a=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return o}))},a013:function(t,i,e){"use strict";e.r(i);var o=e("eb43"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);i["default"]=n.a},b0d6:function(t,i,e){var o=e("4457");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=e("4f06").default;n("923ed3a4",o,!0,{sourceMap:!1,shadowMode:!1})},cd1d:function(t,i,e){var o=e("fbf4");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=e("4f06").default;n("2f1c818a",o,!0,{sourceMap:!1,shadowMode:!1})},eb43:function(t,i,e){"use strict";var o=e("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e("0708"),a=o(e("36f4")),s={data:function(){return{location:"",baseURL:this.$api,imgUrl:[],shop_name:"",shop_address:"",shop_phone:"",goods:[],QRcodeUrl:"123",$api:"",qr:"",isLogin:"",shopSrc:[],flag:!1,latitude:"",longitude:"",shopImg:!0,swiperShow:!0}},components:{Loading:a.default},onShow:function(){this.getUserInfo()},onLoad:function(t){this.shop_id=t.id,this.getUserInfo(),this.checkLogin()},mounted:function(){var t=this;this.shopImg&&setTimeout((function(){t.shopSrc.push(t.$refs.shopImg.src)}),2e3)},methods:{imgLoadError:function(){this.shopImg=!1},getLocation:function(){var t=this;""==this.latitude||""==this.location?uni.showToast({title:"该商家暂未提供经纬度",icon:"none"}):uni.getLocation({type:"wgs84 ",success:function(i){uni.openLocation({latitude:i.latitude,longitude:i.longitude,name:t,shop_address:shop_address})}})},checkLogin:function(){var t=this;(0,n.request)({url:"index.php?s=/wap/member/checkLogin",method:"POST"}).then((function(i){201==i.data.code?t.isLogin=!1:t.isLogin=!0}))},getUserInfo:function(){var t=this;(0,n.request)({url:"index.php?s=/wap/shop/apiIndex",method:"POST",data:{shop_id:this.shop_id}}).then((function(i){t.flag=!0,t.shop_name=i.data.shop_info.shop_name,t.shop_address=i.data.shop_info.shop_address,t.shop_phone=i.data.shop_info.shop_phone,t.latitude=i.data.shop_info.latitude,t.longitude=i.data.shop_info.longitude,i.data.shop_info.shop_logo?t.imgUrl=[t.baseURL+i.data.shop_info.shop_logo]:t.swiperShow=!1,t.goods=i.data.goods,t.qr=i.data.qr}))},goMoney:function(){this.isLogin?uni.navigateTo({url:"/pages/components/money/money"}):uni.showToast({title:"请先登录",icon:"none"})},goRefer:function(){this.isLogin?uni.navigateTo({url:"/pages/components/refer-member/refer-member?shop_id="+this.shop_id}):uni.showToast({title:"请先登录",icon:"none"})},goodsinfo:function(t){uni.navigateTo({url:"/pages/common/goods-detail/goods-detail?id="+t})},preview:function(){uni.previewImage({urls:this.shopSrc})},call:function(){""==this.shop_phone?uni.showToast({title:"该商家暂未提供预约号码",icon:"none"}):uni.makePhoneCall({phoneNumber:this.shop_phone})}}};i.default=s},f063:function(t,i,e){"use strict";var o=e("cd1d"),n=e.n(o);n.a},f9b7:function(t,i,e){"use strict";e.r(i);var o=e("04e3"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);i["default"]=n.a},fbf4:function(t,i,e){var o=e("24fb");i=o(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.swiper-box[data-v-a775943a]{box-sizing:border-box;padding:%?21?% %?21?% 0 %?21?%;background:#fff}.swiper-box uni-swiper[data-v-a775943a]{box-sizing:border-box;width:100%}.swiper-box uni-swiper uni-swiper-item[data-v-a775943a]{box-sizing:border-box;width:100%}.swiper-box uni-swiper uni-swiper-item uni-view[data-v-a775943a]{box-sizing:border-box;height:100%}.swiper-box uni-swiper uni-swiper-item uni-view uni-image[data-v-a775943a]{width:100%;height:%?600?%}.shop-box[data-v-a775943a]{box-sizing:border-box;border-top:1px solid #efefef}.shop-box .shop[data-v-a775943a]{box-sizing:border-box}.shop-box .shop .shop-item[data-v-a775943a]{padding:%?30?%;font-size:%?30?%;color:#444;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border-bottom:1px solid #efefef}.product-show[data-v-a775943a]{box-sizing:border-box}.product-show .product-title[data-v-a775943a]{box-sizing:border-box;padding:0 %?30?%;font-size:%?32?%;font-weight:700;line-height:%?80?%}.product-show .product[data-v-a775943a]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?24?%;padding:0 %?24?%}.product-show .product .product-item[data-v-a775943a]{box-sizing:border-box;margin-bottom:%?20?%;width:48%}.product-show .product .product-item .product-img[data-v-a775943a]{width:100%;height:%?300?%}.product-show .product .product-item .product-img uni-image[data-v-a775943a]{width:100%;height:100%}.product-show .product .product-context[data-v-a775943a]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;font-size:%?28?%;text-align:center}.footer-box[data-v-a775943a]{box-sizing:border-box;height:%?100?%;position:fixed;bottom:0;left:0;width:100%;z-index:90}.footer-box .footer[data-v-a775943a]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?100?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer-box .footer .collect[data-v-a775943a],\n    .footer-box .footer .buy[data-v-a775943a],\n    .footer-box .footer .cart[data-v-a775943a]{-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box;height:%?100?%;background:red;text-align:center;font-size:%?30?%;color:#fff;background:#b4302d}.footer-box .footer .collect[data-v-a775943a]{padding-top:%?20?%;background:#522121;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.footer-box .footer .collect uni-view[data-v-a775943a]{box-sizing:border-box;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;position:relative}.footer-box .footer .collect uni-view uni-image[data-v-a775943a]{width:%?40?%;height:%?40?%;position:absolute;left:50%;top:%?15?%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.footer-box .footer .collect uni-view uni-view[data-v-a775943a]{box-sizing:border-box;margin-top:%?25?%}.footer-box .footer .collect uni-view uni-view uni-text[data-v-a775943a]{font-size:%?20?%;color:#fff}.footer-box .footer .cart[data-v-a775943a]{background:#6c2e2e}.loading[data-v-a775943a]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}',""]),t.exports=i}}]);