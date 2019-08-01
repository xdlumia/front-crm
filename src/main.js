import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import store from './store'

// 其他资源
import '@/static/IPconfig'
import globalConfig from '@/utils/global-config.js'
import local from '@/utils/localStorage'
import '@/assets/css/app.css'
import '@/assets/css/common.scss'

/** 全局注册UI组件 - BEGIN */
// iview UI component

/** 全局注册UI组件 - BEGIN */
// iview UI component
import iIcon from './components/basic/iview/icon'
import iSpin from './components/basic/iview/spin'
import iRow from './components/basic/iview/row'
import iCol from './components/basic/iview/col'
import iCellGroup from './components/basic/iview/cell-group'
import iCell from './components/basic/iview/cell'
import iAvatar from './components/basic/iview/avatar'
import iMessage from './components/basic/iview/message'
import iToast from './components/basic/iview/toast'
import iButton from './components/basic/iview/button'
// import iBadge from './components/basic/iview/badge'
import iActionSheet from './components/basic/iview/action-sheet'
import iInput from './components/basic/iview/input'
import iSelect from './components/basic/iview/select'
import iSteps from './components/basic/iview/steps'
import iStep from './components/basic/iview/step'
import iLoadMore from './components/basic/iview/load-more'
import iSwipeout from './components/basic/iview/swipeout'
import iSwitch from './components/basic/iview/switch'
import iTabs from './components/basic/iview/tabs'
import iTab from './components/basic/iview/tab'

// import iTab from './components/basic/iview/tab'
// import iTabs from './components/basic/iview/tabs'

// uni UI component
import uniIcon from './components/basic/uni/uni-icon/uni-icon'
import uniLoadMore from './components/basic/uni/uni-load-more/uni-load-more'
import uniPopup from './components/basic/uni/uni-popup/uni-popup'
import uniSwipeAction from './components/basic/uni/uni-swipe-action/uni-swipe-action'
import uniParse from './components/basic/uni/uParse/src/wxParse.vue'
import uniFab from './components/basic/uni/uni-fab/uni-fab'
import uniCalendar from './components/basic/uni/uni-calendar/uni-calendar'
import uniTag from './components/basic/uni/uni-tag/uni-tag'
// import tabPane from './components/basic/uni/uni-tabs/tabPane'
// import tabs from './components/basic/uni/uni-tabs/tabs'
// 自定义
// 基础组件
import mPanel from './components/m-panel'
import mList from './components/m-list'
import pickerDate from './components/picker-date'
import mRadio from './components/m-radio'
import mCheckbox from './components/m-checkbox'
// import mUpload from './components/m-upload'
// import mForm from './components/m-form'

// 业务组件
import authButton from './components/auth-button'
import ecCanvas from './components/ec-canvas'
import NavBar from './components/nav-bar'
import circleProgress from './components/circle-progress'
import scrollList from './components/scroll-list'
import mForm from './components/m-form'
// 自定义头部

Vue.config.productionTip = false
Vue.prototype.$store = store
// uni UI component

Vue.config.productionTip = false
Vue.prototype.$store = store

// iview UI
Vue.component('ecCanvas', ecCanvas)
Vue.component('iIcon', iIcon)
Vue.component('iSpin', iSpin)
Vue.component('iRow', iRow)
Vue.component('iCol', iCol)
Vue.component('iCellGroup', iCellGroup)
Vue.component('iCell', iCell)
Vue.component('iAvatar', iAvatar)
Vue.component('iMessage', iMessage)
Vue.component('iToast', iToast)
Vue.component('iButton', iButton)
// Vue.component('iBadge', iBadge)
Vue.component('iActionSheet', iActionSheet)
Vue.component('iInput', iInput)
Vue.component('iSelect', iSelect)
Vue.component('iSteps', iSteps)
Vue.component('iStep', iStep)
Vue.component('iLoadMore', iLoadMore)
Vue.component('iSwipeout', iSwipeout)
Vue.component('iSwitch', iSwitch)
Vue.component('iTab', iTab)
Vue.component('iTabs', iTabs)

// uni UI component
Vue.component('uniIcon', uniIcon)
Vue.component('uniLoadMore', uniLoadMore)
Vue.component('uniPopup', uniPopup)
Vue.component('uniSwipeAction', uniSwipeAction)
Vue.component('uniParse', uniParse)
Vue.component('uniFab', uniFab)
Vue.component('uniCalendar', uniCalendar)
Vue.component('uniTag', uniTag)

// Vue.component('tabPane', tabPane)
// Vue.component('tabs', tabs)
// 自定义
// 基础组建
Vue.component('mPanel', mPanel)
Vue.component('mList', mList)
Vue.component('pickerDate', pickerDate)
Vue.component('mRadio', mRadio)
Vue.component('mCheckbox', mCheckbox)
// Vue.component('mUpload', mUpload)
// Vue.component('mForm', mForm)

// 业务组件
Vue.component('authButton', authButton)
Vue.component('NavBar', NavBar)
Vue.component('circleProgress', circleProgress)
Vue.component('scrollList', scrollList)
Vue.component('mForm', mForm)

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
	computed: {
		navH () {
			return local.fetch('navH') + 'rpx'
		}
	},
	methods: {
		callPhone (phone) {
			phone && uni.makePhoneCall({
				phoneNumber: phone.toString()
			})
		},
		chooseMap () {
			uni.chooseLocation({
				success: function (res) {
					// console.log('位置名称：' + res.name)
					// console.log('详细地址：' + res.address)
					// console.log('纬度：' + res.latitude)
					// console.log('经度：' + res.longitude)
				}
			})
		}
	}
})

const app = new Vue({
	store,
	...App
})
app.$mount()
