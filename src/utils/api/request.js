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
	config.headers['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaW5nZXIiOiJmZDE1N2Y4NzUwOGZlY2FmNWE3NzAyZGEyNDU3M2NkMCIsImNsaWVudElwIjoiMjIzLjcyLjc4LjM5IiwiZXhwIjoxNTY1MDMyNzM2LCJ1c2VybmFtZSI6InVzZXI6NDQxIn0.6vGeB_u3rdf89VWOFdRbX7hJ7E4FHlYITlPNX6cdIvQ' || local.getItem('token') || ''
	config.headers['finger'] = 'fd157f87508fecaf5a7702da24573cd0' || local.getItem('finger') || ''
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
