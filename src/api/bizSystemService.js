// const MOCK_ADDRESS = 'http://39.105.103.188:7011/biz-system-service'
const MOCK_ADDRESS = 'http://39.105.103.188:9011'
const IS_MOCK = false

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
	// 短息验证码登录
	businessSmsLogin: {
		url: '/login/businessSmsLogin',
		mock: IS_MOCK,
		methods: 'post'
	}
}
