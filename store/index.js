import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../pages/request.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 储存搜索历史
		keywords: [],
		// 储存搜索结果
		searchResult: [],
		$api: 'https://admin.dxsc.vip/',
		// 读取购物车有没有货品存在
		goodsLength: false,
		// 存储用户点击的是哪个折扣
		discount: 0,
	},
	mutations: {
		// 搜索历史
		saveKeywords(state,payload) {
			state.keywords.unshift(payload.keywords);
			for(let i = 0;i < state.keywords.length;i++) {
				for(let j = i+1;j < state.keywords.length;j++) {
					if(state.keywords[i] == state.keywords[j]) {
						state.keywords.splice(j,1);
						j--
					}
				}
			}
			// 储存到本地
			uni.setStorage({
				key: 'keywords',
				data: state.keywords,
			})
		},
		// 搜索结果
		search(state,payload) {
			for(let i = 0;i < payload.goods_list.data.length;i++) {
				payload.goods_list.data[i].pic_cover_small = state.$api + payload.goods_list.data[i].pic_cover_small;
			}
			state.searchResult = payload.goods_list.data;
		},
		// 改变首页购物车图标
		getGoodsLength(state,payload) {
			state.goodsLength = payload.data.goods_list.length > 0? true: false;
		},
		// 改变折扣状态
		changeDiscount(state,payload) {
			state.discount = payload.index;
		},
	},
	getters:{

    },
	actions: {
		getGoods(context){
			request({
				url:"index.php?s=/wap/goods/Apicart",
				method:"POST",
			}).then(res=>{
				if(res.data.code < 0) { return }
				else {
					context.commit('getGoodsLength',{data: res.data})
				}
				
			});
		},
		
	}
})

export default store
