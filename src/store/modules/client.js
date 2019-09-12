// 客户管理模块

/** 状态定义 */
let state = {
	clientInfo: {},
	canvasIsShow: false
}

let mutations = {
	setClientInfo (state, info) {
		state.clientInfo = info
	},
	getCanvasShow (state, info) {
		state.canvasIsShow = info
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
