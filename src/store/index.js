import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** 状态定义 */
let state = {
	/** 当前系统端类型，b或者c */
	currentSystemTarget: 'c',
	/** 搜索内容 */
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

const store = new Vuex.Store({
	state,
	mutations,
	strict: true
})

export default store
