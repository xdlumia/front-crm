const MOCK_ADDRESS = 'http://localhost:9128'
const IS_MOCK = true
export default {
	__mockAddress: MOCK_ADDRESS,
	getSmsCode: {
		url: '/userapplicationinformation/getSmsCode/{phone}',
		methods: 'get',
		mock: IS_MOCK
	},
	validateSmsCode: {
		url: '/userapplicationinformation/validateSmsCode',
		methods: 'get',
		mock: IS_MOCK
	}

}
