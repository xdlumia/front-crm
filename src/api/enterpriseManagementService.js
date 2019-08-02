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
	},
	// 根据部门id获取子部门数据
	getChildrenDepts: {
		url: '/organizationalStructure/childrenDepts',
		methods: 'get',
		mock: IS_MOCK
	},
	// 根据部门id获取用户数据
	getChildrenEmployees: {
		url: '/organizationalStructure/childrenEmployees',
		methods: 'get',
		mock: IS_MOCK
	},
	// 公司部门列表
	getDepts: {
		url: '/organizationalStructure/depts',
		methods: 'get',
		mock: IS_MOCK
	},
	// 公司部门列表
	getRoles: {
		url: '/organizationalStructure/roles',
		methods: 'get',
		mock: IS_MOCK
	}
}
