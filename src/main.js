import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import store from './store'

// 其他资源
import '@/static/IPconfig'
import globalConfig from '@/utils/global-config.js'
import '@/assets/css/app.css'

/** 全局注册UI组件 - BEGIN */
// iview UI component
import iIcon from './components/basic/iview/icon'
import iToast from './components/basic/iview/toast'
import iMessage from './components/basic/iview/message'

// 自定义头部
import NavBar from './components/nav-bar'

Vue.config.productionTip = false
Vue.prototype.$store = store
// uni UI component

// 全局注册iview组件
Vue.component('iIcon', iIcon)
Vue.component('iToast', iToast)
Vue.component('iMessage', iMessage)

Vue.component('NavBar', NavBar)

// 全局注册uni扩展组件

/** 全局注册UI组件 - END */

// 获取系统信息
try {
	uni.getSystemInfo().then(([err, data]) => {
		!err && store.commit('setSystemInfo', data)
	})
} catch (err) {
	store.commit('setSystemInfo', {})
}

App.mpType = 'app'

Vue.prototype.$store = store
Vue.use(Vuex)
Vue.use(globalConfig)

const app = new Vue({
	store,
	...App
})
app.$mount()
