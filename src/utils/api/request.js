import {
	$message
} from '@/utils/message'
import local from '@/utils/localStorage'
import sha512 from 'js-sha512'
import uuid from 'uuid'
let Api

// #ifdef  H5
Api = require('flyio')
// #endif

// #ifdef  MP-WEIXIN
let Flyio = require('flyio/dist/npm/wx')
Api = new Flyio()
// #endif

Api.interceptors.request.use((config, promise) => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	})
	config.headers['token'] = local.getItem('token') || ''
	config.headers['finger'] = local.getItem('finger') || ''
	config.headers['uid'] = uuid()
	config.headers['verifycode'] = sha512(
		config.headers['__'] + config.headers['token'] + config.headers['finger']
	)

	return config
})

Api.interceptors.response.use(
	(response, promise) => {
		if (response.data && response.request.method === 'POST') {
			uni.showToast({ title: response.data.msg, icon: 'none' })
		} else {
			uni.hideLoading()
		}
		if (+response.data.code === 402) {
			local.remove('finger')
			local.remove('token')
			local.remove('userInfo')
			if (global.g.redirectUrl) {
				console.warn('未登录')
				// uni.redirectTo({
				// 	url: global.g.redirectUrl
				// })
			}
			return promise.resolve(
				Object.assign({
					data: []
				},
				response.data
				)
			)
		}
		return promise.resolve(response.data)
	},
	(err, promise) => {
		if (err) {
			$message({
				content: err.message,
				type: 'error'
			})
			return promise.reject(err.response)
		}
		return promise.resolve()
	}
)

export default Api
