(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-components-forget-forget"],{"0518":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.register[data-v-6337c837]{box-sizing:border-box}.register .logo[data-v-6337c837]{width:%?220?%;height:%?170?%;margin:0 auto;padding-top:%?80?%}.register .logo uni-image[data-v-6337c837]{width:100%;height:100%}.register .choose[data-v-6337c837]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.register .choose uni-view[data-v-6337c837]{box-sizing:border-box;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.register .choose uni-view[data-v-6337c837]:nth-child(1){color:#5e5a5a;font-size:%?40?%}.register .choose uni-view[data-v-6337c837]:nth-child(2){font-size:%?50?%;color:#c8c7cc}.register .form-list[data-v-6337c837]{box-sizing:border-box;margin-top:%?80?%}.register .form-list .form-item[data-v-6337c837]{box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 10%;height:%?100?%;line-height:%?100?%;position:relative}.register .form-list .form-item uni-image[data-v-6337c837]{width:%?50?%;height:%?50?%;margin-right:%?24?%}.register .form-list .form-item uni-input[data-v-6337c837]{-webkit-box-flex:1;-webkit-flex:1;flex:1;box-sizing:border-box;border-bottom:1px solid #c8c7cc}.register .form-list .form-item .QRcode[data-v-6337c837]{border:1px solid #c8c7cc;position:absolute;right:%?72?%;background:#fff;border-radius:%?48?%;color:#c8c7cc;font-size:%?24?%;top:0}.register .btn[data-v-6337c837]{position:absolute;bottom:%?110?%;left:0;width:100%;box-sizing:border-box}.register .btn .login[data-v-6337c837], .register .btn .register[data-v-6337c837]{box-sizing:border-box;height:%?90?%}.register .btn .login uni-button[data-v-6337c837], .register .btn .register uni-button[data-v-6337c837]{width:60%;height:100%;text-align:center;font-size:%?32?%;color:#c8c7cc;border-radius:%?60?%}.register .btn .login[data-v-6337c837]{margin-bottom:%?24?%}.register .btn .login uni-button[data-v-6337c837]{box-sizing:border-box;border:1px solid #fff}.register .btn .login uni-button[data-v-6337c837]:after{border:none}.register .btn .register uni-button[data-v-6337c837]{background:#e64340;color:#fff}.placeholder[data-v-6337c837]{font-size:%?28?%;color:#c8c7cc}',""]),t.exports=e},1416:function(t,e,i){"use strict";var n=i("2d35"),o=i.n(n);o.a},"2d35":function(t,e,i){var n=i("0518");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("5ba176f8",n,!0,{sourceMap:!1,shadowMode:!1})},"315f":function(t,e,i){"use strict";i.r(e);var n=i("c58b"),o=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=o.a},"8b84":function(t,e,i){"use strict";i.r(e);var n=i("b370"),o=i("315f");for(var r in o)"default"!==r&&function(t){i.d(e,t,(function(){return o[t]}))}(r);i("1416");var a,s=i("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"6337c837",null,!1,n["a"],a);e["default"]=c.exports},b370:function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"register"},[i("v-uni-view",{staticClass:"logo"},[i("v-uni-image",{attrs:{src:t.$src+"/images/user-logo.png",mode:""}})],1),i("v-uni-view",{staticClass:"form-list"},[i("v-uni-view",{staticClass:"form-item"},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入手机号","placeholder-class":"placeholder"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.phone()},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)}},model:{value:t.cellphone,callback:function(e){t.cellphone=e},expression:"cellphone"}})],1),i("v-uni-view",{staticClass:"form-item",staticStyle:{"margin-top":"24rpx"}},[i("v-uni-input",{attrs:{type:"text",value:"",placeholder:"请输入手机验证码","placeholder-class":"placeholder"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.QRcode()},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)}},model:{value:t.vertification,callback:function(e){t.vertification=e},expression:"vertification"}}),i("v-uni-button",{staticClass:"QRcode",attrs:{size:"mini",disabled:t.disabled},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode()}}},[t.get?i("v-uni-text",[t._v("获取验证码")]):t._e(),t.down?i("v-uni-text",[t._v("还剩"+t._s(t.count)+"秒")]):t._e(),t.again?i("v-uni-text",[t._v("重新获取")]):t._e()],1)],1)],1),t.tabbar?i("v-uni-view",{staticClass:"btn"},[i("v-uni-view",{staticClass:"register"},[i("v-uni-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.reset.apply(void 0,arguments)}}},[t._v("下一步")])],1)],1):t._e()],1)],1)},r=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},c58b:function(t,e,i){"use strict";var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var o=n(i("3b8d")),r=i("0708"),a={data:function(){return{username:"",code:"",cellphone:"",vertification:"",disabled:!1,get:!0,down:!1,again:!1,count:60,clientHeight:"",tabbar:!0,$src:this.$src}},onLoad:function(){var t=this;uni.getSystemInfo({success:function(e){console.log(e.windowHeight),t.clientHeight=e.windowHeight}}),uni.onWindowResize((function(e){e.size.windowHeight<t.clientHeight?t.tabbar=!1:t.tabbar=!0}))},methods:{login:function(){uni.redirectTo({url:"../login/login"})},phone:function(){var t=(0,o.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!=this.cellphone&&/^1[3456789]\d{9}$/.test(this.cellphone)){t.next=3;break}return uni.showToast({title:"请输入合法的手机号",icon:"none"}),t.abrupt("return",!1);case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),QRcode:function(){""==this.vertification&&uni.navigateTo({title:"请输入合法验证码",icon:"none"})},getCode:function(){var t=this;if(""!=this.cellphone&&/^1[3456789]\d{9}$/.test(this.cellphone)){uni.showToast({title:"短信发送成功",icon:"none"}),this.disabled=!0,this.get=!1,this.down=!0,this.again=!1;var e=setInterval((function(){t.count=t.count-1,t.count<=0&&(t.disabled=!1,t.down=!1,t.again=!0,t.count=5,clearInterval(e))}),1e3);(0,r.request)({url:"/index.php?s=/wap/Login/sendSmsRegisterCode",method:"post",data:{vertification:123,mobile:this.cellphone}}).then((function(t){}))}else uni.showToast({title:"请输入合法手机号",icon:"none"})}}};e.default=a}}]);