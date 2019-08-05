import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/localStorage'

Vue.use(Vuex)

/** 状态定义 */
let state = {
	/** 当前系统端类型，b或者c */
	currentSystemTarget: 'c',
	/* 阿里云oss ticket */
	oss: storage.fetch('ossPublic') || {},
	/* 搜索内容 */
	searchTextMap: {},
	/* 当前系统信息 */
	systemInfo: {},
	/* 用户信息 */
	userInfo: {}
}

let mutations = {
	setCurrentSystemTarget (state, data) {
		state.currentSystemTarget = data
	},
	// 设置系统信息
	setSystemInfo (state, data) {
		state.systemInfo = data
	},

	setUserInfo (state, data) {
		state.userInfo = data
	}
}

let actions = {
	async checkOssTicket ({ commit, state }, component) {
		if (state.oss.expiration && state.oss.expiration > +new Date()) return
		let { code, data } = await component.$api.seeExternService.ossGetOssTicket()
		if (+code === 200) {
			storage.save('ossPublic', data)
			commit('setOssTicket', data)
		} else {
			return Promise.reject(new Error('OSSTicket获取失败'))
		}
	}
}
const store = new Vuex.Store({
	state,
	mutations,
	actions,
	strict: true
})

export default store
