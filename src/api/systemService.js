export default {
	/**
   * @description 业务平台
   */
	// 登录
	login: {
		url: '/login/businessLogin',
		methods: 'post'
	},
	// 短息验证码登录
	businessSmsLogin: {
		url: '/login/businessSmsLogin',
		methods: 'post'
	},
	// 保存意见反馈
	suggestfeedbackrecordSave: {
		url: '/rmsuggestfeedbackrecord/save',
		methods: 'post'
	},
	// 业务系统获取帮助手册发布版
	getHandbookMenuListPublish: {
		url: '/rmhandbook/getHandbookMenuListPublish',
		methods: 'get'
	},
	// 获取帮助手册发布版单个详情
	getHandbookInfo: {
		url: '/rmhandbook/queryObject/{id}',
		methods: 'get'
	},
	// 保存客户管理反馈记录
	saveCustomerFeedback: {
		url: '/rmsuggestfeedbackrecord/saveCustomerFeedback',
		methods: 'post'
	},
	// 申请公司
	applyCompany: {
		url: '	/rmapplycompany/apply',
		methods: 'post'
	},
	// 查看当前微信用户是否绑定账号
	isBindByWx: {
		url: '/wx/isBindByWx',
		methods: 'get'
	},
	//	微信用户绑定
	userBinding: {
		url: '/wx/userBinding',
		methods: 'post'
	},
	// //第三方授权登录
	thirdpartyAuthorizationLogin: {
		url: '/login/thirdpartyAuthorizationLogin',
		methods: 'get'
	}
}
