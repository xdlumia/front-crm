// const MOCK_ADDRESS = 'http://39.105.103.188:7011/biz-system-service'
const MOCK_ADDRESS = 'http://39.105.103.188:8011'
const IS_MOCK = true

export default {
	__mockAddress: MOCK_ADDRESS,
	getUserAuth: {
		url: '/rmuserrole/list/training',
		mock: IS_MOCK,
		methods: 'get'
	},
	queryOpenRegistration: {
		url: '/rmemployee/queryOpenRegistration',
		mock: IS_MOCK,
		methods: 'get'
	},
	register: {
		url: '/rmemployee/register',
		mock: IS_MOCK,
		methods: 'post'
	},
	changePwd: {
		url: '/rmemployee/updatePasswordForTraing',
		mock: IS_MOCK,
		methods: 'post'
	},
	// 获取用户详细信息
	getUserDetail: {
		url: '/rmuserrole/getUserDetail',
		mock: IS_MOCK,
		methods: 'post'
	}
}
