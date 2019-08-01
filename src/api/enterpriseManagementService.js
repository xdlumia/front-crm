const MOCK_ADDRESS = 'http://localhost:9128'
const IS_MOCK = true
export default {
	__mockAddress: MOCK_ADDRESS,
	// 发送验证码
	getSmsCode: {
		url: '/userapplicationinformation/getSmsCode/{phone}',
		methods: 'get',
		mock: IS_MOCK
	},
	// 校验验证码
	validateSmsCode: {
		url: '/userapplicationinformation/validateSmsCode',
		methods: 'get',
		mock: IS_MOCK
	},
	// 获取申请列表
	getUserapplicationinformationList: {
		url: '/userapplicationinformation/list',
		methods: 'get',
		mock: IS_MOCK
	},
	// 提交申请
	saveUserapplicationinformation: {
		url: '/userapplicationinformation/save',
		methods: 'post',
		mock: IS_MOCK
	}

}
