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
	// uni.showLoading({
	// 	title: '加载中...',
	// 	mask: true
	// })
	config.headers['token'] = local.getItem('token') || ''
	config.headers['finger'] = local.getItem('finger') || ''
	config.headers['uid'] = uuid()
	config.headers['verifycode'] = sha512(
		config.headers['__'] + config.headers['token'] + config.headers['finger']
	)

	return config
})

Api.interceptors.response.use((response) => {
	let res = response.data
	// uni.hideLoading()
	if (+response.data.code === 402 || +response.data.code === 403) {
		uni.$emit('loginout')
		return Promise.reject(res.msg)
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
		return Promise.reject(res.msg)
	}
	if (res.code === 200 && response.request.method !== 'get') {
		uni.showToast({ title: res.msg, icon: 'none' })
	}
	return Promise.resolve(res)
}, (error) => {
	if (error) {
		// uni.hideLoading()
		return Promise.reject(error)
	}
})

export default Api
