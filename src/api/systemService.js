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
		mock: IS_MOCK,
		methods: 'post'
	}
}
