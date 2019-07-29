export default {
	settingAuth (authName, authCode, callback) {
		uni.getSetting({
			success: (res) => {
				if (!res.authSetting[`scope.${authCode}`]) {
					wx.authorize({
						scope: `scope.${authCode}`,
						success: () => {
							callback && callback()
						},
						fail: () => {
							uni.showModal({
								title: '授权提示',
								content: `请点击“去设置”并勾选${authName}功能, 然后去确定即可正常使用`,
								confirmText: '去设置',
								success () {
									if (res.confirm) {
										wx.openSetting()
									}
								}
							})
						}
					})
				} else {
					callback && callback()
				}
			}
		})
	},
	/**
     * 遍历对象并且将字符串两端空白去除
     */
	objectTrim (obj) {
		Object.keys(obj).map(key => {
			if (typeof obj[key] === 'string') {
				obj[key] = obj[key].trim()
			}
			if (obj[key] instanceof Array) {
				obj[key].map((v, i) => {
					if (typeof obj[key][i] === 'object') {
						obj[key][i] = this.objectTrim(v)
					} else if (typeof obj[key][i] === 'string') {
						obj[key][i] = obj[key][i].trim()
					}
				})
			}
		})
		return obj
	},

	toast: {
		text (title) {
			uni.showToast({
				title: title,
				icon: 'none',
				mask: true
			})
		},

		success (title = '操作成功') {
			uni.showToast({
				title: title,
				icon: 'success',
				mask: true
			})
		}
	},

	showLoading (title = '加载中') {
		uni.showLoading({
			title: title,
			mask: true
		})
	},

	hideLoading () {
		uni.hideLoading()
	},

	showModal (content) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '提示',
				content: content || '确定要删除选择的记录？'
			}).then(([err, res]) => {
				if (err || !res.confirm) {
					reject(new Error(err))
				}
				resolve()
			})
		})
	}
}
