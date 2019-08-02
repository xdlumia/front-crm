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
	config.headers['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaW5nZXIiOiJjMDU0NGQzMDkxYjJkNDRkN2MzYmEzY2QxNzU5NmI5OCIsImNsaWVudElwIjoiMjIzLjcyLjgwLjI1MiIsImV4cCI6MTU2NDc3MDQ5MywidXNlcm5hbWUiOiJ1c2VyOjQ0NiJ9.svMxlttgxYX3eZpPu_5PpX05OCQ2x-3x-pEdRdAhbHA' || local.getItem('token') || ''
	config.headers['finger'] = 'c0544d3091b2d44d7c3ba3cd17596b98' || local.getItem('finger') || ''
	config.headers['uid'] = uuid()
	config.headers['verifycode'] = sha512(
		config.headers['__'] + config.headers['token'] + config.headers['finger']
	)

	return config
})

Api.interceptors.response.use(
	(response, promise) => {
		if (response.data && response.data.code === 200 && response.request.method === 'POST') {
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
