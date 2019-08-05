// 客户管理模块

/** 状态定义 */
let state = {
	clientInfo: {}
}

let mutations = {
	setClientInfo (state, info) {
		state.clientInfo = info
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
