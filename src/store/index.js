import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** 状态定义 */
let state = {
	/** 当前系统端类型，b或者c */
	currentSystemTarget: 'c',

	/* 当前系统信息 */
	systemInfo: {}

}

let mutations = {
	setCurrentSystemTarget (state, data) {
		state.currentSystemTarget = data
	},
	// 设置系统信息
	setSystemInfo (state, data) {
		state.systemInfo = data
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	strict: true
})

export default store
