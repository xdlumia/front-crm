// 公海池管理
import api from '@/utils/api'
/** 状态定义 */
let state = {
	pool: {}, // 当前所选的公海池 默认为列表的第一个
	list: [] // 公海池列表
}

let mutations = {
	setPool (state, info) {
		state.pool = info
	},

	setList (state, list) {
		state.list = list
	}
}

let actions = {
	getList ({ commit, state }, params = { page: 1, limit: 15 }) {
		api.seeCrmService.clientpublicpoolList(params).then(res => {
			if (res.data && res.data.length) {
				// 如果当前公海池没有数据 则设置
				!Object.keys(state.pool).length && commit('setPool', res.data[0])
				commit('setList', res.data)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
