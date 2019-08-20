// 机会管理模块

/** 状态定义 */
let state = {
	contactList: []
}

let mutations = {
	setContactList (state, info) {
		state.contactList = info
	}
}

export default {
	namespaced: true,
	state,
	mutations
}
