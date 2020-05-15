import Vue from 'vue'
import App from './App'
import store from './store'
import { API, SRC } from './common/index.js'
Vue.config.productionTip = false
Vue.prototype.$map = {
	url:"https://apis.map.qq.com/ws/geocoder/v1/?",
	key:"WXTBZ-6WERU-ECCVS-BZJCK-LW5OJ-SIBOS",
}
Vue.prototype.$api = API
Vue.prototype.$src = SRC
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
