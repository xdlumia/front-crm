
import store from '@/store/index'
export default {
	data () {
		return {
			SHARE: [
				// 单人聊天会话中的小程序消息卡片
				1007,
				// 群聊会话中的小程序消息卡片
				1008,
				// 小程序模板消息
				1014,
				// App 分享消息卡片
				1036,
				// shareTicket 的小程序消息卡片
				1044
			],
			// 扫码
			SCAN_CODE: [
				// 扫描二维码
				1011,
				// 长按图片识别二维码
				1012,
				// 扫描手机相册中选取的二维码
				1013,
				// 扫描小程序码
				1047,
				// 长按图片识别小程序码
				1048,
				// 扫描手机相册中选取的小程序码
				1049
			],
			launchOptions: {},
			sceneChecked: false
		}
	},
	computed: {
		targetType () {
			let query = this.launchOptions.query

			if (query) {
				// 如果是转发
				if (query.forwardType) {
					return query.forwardType
				}

				if (query.scene) {
					return query.scene.substring(6, 8) === 'MP' ? 'card' : 'product'
				}
			}

			return 'card'
		},
		currentCardCode () {
			let query = this.launchOptions.query

			if (query && this.targetType === 'card') {
				return query.targetCode || query.scene || this.$cardCode
			}

			return this.$cardCode
		},
		currentProductCode () {
			let query = this.launchOptions.query

			if (query && this.targetType === 'product') {
				return query.targetCode || query.scene
			}

			return this.$productCode
		}
	},
	methods: {
		async sceneCheck (option, type) {
			this.launchOptions = uni.getLaunchOptionsSync()
			this.launchOptions.query = option || {}

			console.log('获取到的当前场景值为：', this.launchOptions)

			if (this.targetType !== type) {
				this.sceneChecked = true
				console.log('ignore sceneCheck')
				return false
			}

			console.log('start sceneCheck')

			await this.temporaryAuthorization()

			let currentCardCode = this.currentCardCode
			let currentProductCode = this.currentProductCode
			let currentSystemTarget = this.$currentSystemTarget

			try {
				if (this.targetType === 'product') {
					let { data } = await this.$api.seeRealCustomerService.rcbusinesscardGetCardInfoByProductCode(null, this.currentProductCode)

					// 更新卡片信息
					store.commit('setCurrentCardInfo', data)
					// 设置官网tabbar显示或者隐藏
					this.$setCustomTabBarStatus({
						website: !!data.supportWebSite
					})
					currentCardCode = data.businessCode
					if (data.userId === this.$userInfo.id) {
						currentSystemTarget = 'b'
					} else {
						currentSystemTarget = 'c'
					}
				} else {
					let { data } = await this.$api.seeRealCustomerService.rcbusinesscardInfo()
					// 更新卡片信息
					store.commit('setCurrentCardInfo', data)
					if (data && data.businessCode === currentCardCode) {
						currentSystemTarget = 'b'
					} else {
						currentSystemTarget = 'c'
					}
				}

				let accessTypeCode = ''

				// 确定场景值，我们只区分三种，分享/扫码/小程序
				if (this.SHARE.includes(+this.launchOptions.scene)) {
					accessTypeCode = 'RC_KHLY_LX-1'
				} else if (this.SCAN_CODE.includes(+this.launchOptions.scene)) {
					accessTypeCode = 'RC_KHLY_LX-2'
				} else {
					accessTypeCode = 'RC_KHLY_LX-3'
				}

				if (currentSystemTarget === 'c') {
					this.$api.seeRealCustomerService.rcaccessrecordSaveRecord({
						shareInfo: JSON.stringify(this.launchOptions),
						accessTypeCode: accessTypeCode,
						currentCardCode: currentCardCode,
						currentProductCode: currentProductCode,
						forwardCode: this.launchOptions.query.forwardCode || '',
						forwardUserId: this.launchOptions.query.forwardUserId || ''
					})
				}
			} catch (e) {
				console.error('场景值检查发生异常', e)
			}

			// targetType: product,card
			this.$local.setItem('currentSystemTarget', currentSystemTarget)
			this.$local.setItem('cardCode', currentCardCode)
			this.$local.setItem('productCode', currentProductCode)

			this.sceneChecked = true

			return true
		}
	}
}
