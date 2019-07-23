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

/** 全局注册UI组件 - BEGIN */
// iview UI component
import iIcon from './components/basic/iview/icon'
import iSpin from './components/basic/iview/spin'
import iRow from './components/basic/iview/row'
import iCol from './components/basic/iview/col'
import iAvatar from './components/basic/iview/avatar'
import iMessage from './components/basic/iview/message'
import iToast from './components/basic/iview/toast'
import iButton from './components/basic/iview/button'
// import iBadge from './components/basic/iview/badge'
import iActionSheet from './components/basic/iview/action-sheet'
import iInput from './components/basic/iview/input'
import iSteps from './components/basic/iview/steps'
import iStep from './components/basic/iview/step'

// uni UI component
import uniIcon from './components/basic/uni/uni-icon/uni-icon'
import uniLoadMore from './components/basic/uni/uni-load-more/uni-load-more'
import uniPopup from './components/basic/uni/uni-popup/uni-popup'
import uniSwipeAction from './components/basic/uni/uni-swipe-action/uni-swipe-action'
import uniParse from './components/basic/uni/uParse/src/wxParse.vue'
import uniFab from './components/basic/uni/uni-fab/uni-fab'

// 自定义
// 基础组件
// import mPanel from './components/m-panel'
// import mUpload from './components/m-upload'
// import mForm from './components/m-form'

// 业务组件
import authButton from './components/auth-button'
import NavBar from './components/nav-bar'
import circleProgress from './components/circle-progress'
// 自定义头部

Vue.config.productionTip = false
Vue.prototype.$store = store
// uni UI component

Vue.config.productionTip = false
Vue.prototype.$store = store

// iview UI
Vue.component('iIcon', iIcon)
Vue.component('iSpin', iSpin)
Vue.component('iRow', iRow)
Vue.component('iCol', iCol)
Vue.component('iAvatar', iAvatar)
Vue.component('iMessage', iMessage)
Vue.component('iToast', iToast)
Vue.component('iButton', iButton)
// Vue.component('iBadge', iBadge)
Vue.component('iActionSheet', iActionSheet)
Vue.component('iInput', iInput)
Vue.component('iSteps', iSteps)
Vue.component('iStep', iStep)

// uni UI component
Vue.component('uniIcon', uniIcon)
Vue.component('uniLoadMore', uniLoadMore)
Vue.component('uniPopup', uniPopup)
Vue.component('uniSwipeAction', uniSwipeAction)
Vue.component('uniParse', uniParse)
Vue.component('uniFab', uniFab)

// 自定义
// 基础组建
// Vue.component('mPanel', mPanel)
// Vue.component('mUpload', mUpload)
// Vue.component('mForm', mForm)

// 业务组件
Vue.component('authButton', authButton)
Vue.component('NavBar', NavBar)
Vue.component('circleProgress', circleProgress)
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

Vue.mixin({
	methods: {
		callPhone (phone) {
			phone && uni.makePhoneCall({
				phoneNumber: phone
			})
		}
	}
})

const app = new Vue({
	store,
	...App
})
app.$mount()
