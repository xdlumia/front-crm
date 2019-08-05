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
	// 公司角色列表
	getRoles: {
		url: '/organizationalStructure/roles',
		methods: 'get',
		mock: IS_MOCK
	},
	// 保存员工信息
	saveEmployee: {
		url: '/organizationalStructure/saveEmployee',
		methods: 'post',
		mock: IS_MOCK
	},
	// 修改员工信息
	updateEmployee: {
		url: '/organizationalStructure/updateEmployee',
		methods: 'post',
		mock: IS_MOCK
	},
	// 获取员工信息详情
	getEmployeeDetail: {
		url: '/organizationalStructure/getEmployeeDetail/{id}',
		methods: 'get',
		mock: IS_MOCK
	},
	// 删除员工
	deleteEmployee: {
		url: '/organizationalStructure/deleteEmployee',
		methods: 'delete',
		mock: IS_MOCK
	},
	// 保存部门信息
	saveDept: {
		url: '/organizationalStructure/saveDept',
		methods: 'post',
		mock: IS_MOCK
	},
	// 修改部门信息
	updateDept: {
		url: '/organizationalStructure/updateDept',
		methods: 'post',
		mock: IS_MOCK
	},
	// 获取上级部门
	getSuperDept: {
		url: '/organizationalStructure/getSuperDept',
		methods: 'get',
		mock: IS_MOCK
	},
	// 删除部门
	deleteDept: {
		url: '/organizationalStructure/deleteDept',
		methods: 'delete',
		mock: IS_MOCK
	}
}
