// import {
// 	$message
// } from '@/utils/message'
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
Api.default.config.timeout = 300000
Api.interceptors.request.use(async config => {
	let token = local.getItem('token')
	let finger = local.getItem('finger')
	if ((!token || !finger) && !config.url.match('wxLogin/temporaryAuthorization')) {
		try {
			await getApp().$vm.temporaryAuthorization(true)
		} catch (error) { }
	}
	config.headers['token'] = local.getItem('token') || ''
	config.headers['finger'] = local.getItem('finger') || ''
	config.headers['uid'] = uuid()
	config.headers['verifycode'] = sha512(
		config.headers['__'] + config.headers['token'] + config.headers['finger']
	)
	if (config.method.toUpperCase === 'POST') {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}
	return config
})

Api.interceptors.response.use(async (response, promise) => {
	let res = response.data
	// uni.hideLoading()
	if (+response.data.code === 402 || +response.data.code === 403) {
		uni.$emit('loginout')
		throw promise.reject(response.data)
		// return Promise.resolve(
		// 	Object.assign({
		// 		data: []
		// 	},
		// 	response.data
		// 	)
		// )
	}
	if (res.code !== 200) {
		uni.showToast({ title: res.msg, icon: 'none' })
		throw promise.reject(response.data)
	}
	if (res.code === 200 && response.request.method !== 'GET') {
		uni.showToast({ title: res.msg, icon: 'none' })
	}
	return res
}, (err, promise) => {
	if (err) {
		// uni.hideLoading()
		return promise.reject(err)
	}
})

export default Api
