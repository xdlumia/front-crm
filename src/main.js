/* eslint-disable indent */
import '@/static/IPconfig'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

import store from './store'

// 其他资源
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
import iSelect from './components/select'
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
import uniPopup from './components/basic/uni/uni-popup/uni-popup'
import uniSwipeAction from './components/basic/uni/uni-swipe-action/uni-swipe-action'
import uniCalendar from './components/basic/uni/uni-calendar/uni-calendar'
import uniTag from './components/basic/uni/uni-tag/uni-tag'
// import dragSort from './components/basic/uni/drag-sort'
// import tabPane from './components/basic/uni/uni-tabs/tabPane'
// import tabs from './components/basic/uni/uni-tabs/tabs'
// 自定义
// 基础组件
import mPanel from './components/m-panel'
import mList from './components/m-list'
import pickerDate from './components/picker-date'
import mRadio from './components/m-radio'
import mAvatat from './components/m-avatar'
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
import uParse from './components/parse/parse.vue' // 富文本
import './components/parse/parse.css' // 富文本
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
// Vue.component('dragSort', dragSort)

// uni UI component
Vue.component('uniIcon', uniIcon)
Vue.component('uniPopup', uniPopup)
Vue.component('uniSwipeAction', uniSwipeAction)
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
Vue.component('mAvatat', mAvatat)
Vue.component('mCheckbox', mCheckbox)
// Vue.component('mUpload', mUpload)
// Vue.component('mForm', mForm)

// 业务组件
Vue.component('authButton', authButton)
Vue.component('NavBar', NavBar)
Vue.component('circleProgress', circleProgress)
Vue.component('scrollList', scrollList)
Vue.component('mForm', mForm)
Vue.component('uParse', uParse)

/** 全局注册UI组件 - END */

// 获取系统信息
try {
	uni.getSystemInfo().then(([err, data]) => {
		!err && store.commit('setSystemInfo', data)
	})
} catch (err) {
	store.commit('setSystemInfo', {})
}

// 注册登录事件
uni.$on('login', data => {
	// 保存token finger sysCode
	local.setItem('token', data.token)
	local.setItem('finger', data.finger)
	local.setItem('sysCode', data.sysCode)
})

uni.$on('setUserInfo', (data) => {
	local.save('userInfo', data)
	local.save('companyInfo', data.companyEntity)
	local.save('deptInfo', data.rmDeptEntity)
	local.save('roleInfo', data.rmRoleEntities)
	local.setItem('token', data.token)
	local.setItem('finger', data.finger)
	store.commit('setUserInfo', data)
})

// 注册退出事件
uni.$on('loginout', () => {
	local.remove('userInfo')
	local.remove('finger')
	local.remove('sysCode')
	uni.reLaunch({
		url: global.g.redirectUrl || '/pages/login/index'
	})
})

uni.getLocation({
	type: 'gcj02',
	success: data => {
		if (data.errMsg === 'getLocation:ok') {
			let localtion = {
				latitude: data.latitude,
				longitude: data.longitude
			}
			local.save('localtion', localtion)
			store.commit('setLocation', localtion)
		}
	}
})

App.mpType = 'app'

Vue.prototype.$store = store
Vue.use(Vuex)
Vue.use(globalConfig)
let generateButtonCodes = (authorityBtn, arr) => {
	return authorityBtn.reduce((arr, current) => {
		arr.push.apply(arr, current.buttonsCode)
		current.code && (arr.push(current.code))
			if (current.children) {
			generateButtonCodes(current.children, arr)
		}
		return arr
	}, arr || [])
}
Vue.mixin({
	computed: {
		authorityButtons () {
			let authorityBtn = local.fetch('sourceList')
			return generateButtonCodes(authorityBtn)
		},
		navH () {
			return local.fetch('navH') + 'rpx'
		},
		deptInfo () {
			return this.$local.fetch('deptInfo') || {}
		}
	},
	methods: {
		callPhone (phone) {
			phone && uni.makePhoneCall({
				phoneNumber: phone.toString()
			})
		},
		async chooseMap () {
			try {
				let [err, resulte] = await uni.chooseLocation()
				if (err) return Promise.reject(new Error(err))
				return resulte
			} catch (err) {
				return Promise.reject(new Error(err))
			}
		}
	}
})

const app = new Vue({
	store,
	...App
})
app.$mount()
