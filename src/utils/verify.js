/**
* @desc 公共验证方法
* @author web-王晓冬
* @date 2018年9月18号
* @example 调用示例
*          :rules="{ type:'phone',message:'请输入正确的手机号'}"
**/

// 身份证计算是否真实
let validateIdCard = (code) => {
	let city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }

	if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		return false
	} else if (!city[code.substr(0, 2)]) {
		return false
	} else {
		// 18位身份证需要验证最后一位校验位
		if (code.length === 18) {
			code = code.split('')
			// ∑(ai×Wi)(mod 11)
			// 加权因子
			let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
			// 校验位
			let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
			let sum = 0
			let ai = 0
			let wi = 0
			for (let i = 0; i < 17; i++) {
				ai = code[i]
				wi = factor[i]
				sum += ai * wi
			}

        if (parity[sum % 11] != code[17]) {//eslint-disable-line
				return false
			}
		}
	}
	return true
}
const verify = {
	// 正整数
	positiveNum: (_rule, value, callback) => {
		// /^\d+(?=\.{0,1}\d+$|$)/
		let reg = new RegExp('^(0|([1-9][0-9]*))$')
		if (value === '' || reg.test(value)) {
			callback()
		} else {
			return callback(new Error('只能是正整数'))
		}
	},
	// 年龄
	age: (_rule, value, callback) => {
		let reg = new RegExp('^(0|[1-9]|[1-9][0-9]|1[0-1][0-9]|120)$')
		if (value === '' || reg.test(value)) {
			callback()
		} else {
			return callback(new Error('只能是0到120的正整数'))
		}
	},

	// 手机号验证
	phone: (_rule, value, callback) => {
		let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
		if (value === '' || reg.test(value)) {
			callback()
		} else {
			return callback(new Error('请输入正确的手机号码'))
		}
	},

	// 用户名验证
	name: (_rule, value, callback) => {
		let reg = new RegExp('^([\u4e00-\u9fa5]|[a-zA-Z])+$')
		if (value === '' || reg.test(value)) {
			callback()
		} else {
			return callback(new Error('只能是中文或者英文！'))
		}
	},
	// 身份证验证
	IDCard: (_rule, value, callback) => {
		if (value === '' || validateIdCard(value)) {
			callback()
		} else {
			return callback(new Error('身份证号码不合法'))
		}
	},
	// 判断是否是数字
	number: (_rule, value, callback) => {
		// /^\d+(?=\.{0,1}\d+$|$)/
		let reg = /^(\+|-)?\d+($|\.\d+$)/
		if (value === '' || reg.test(value)) {
			callback()
		} else {
			return callback(new Error('只能是数字'))
		}
	},
	price (_rule, value, callback) {
		let reg = /^((-)?([0-9]\d*(\.\d{1,2})?)|((0)|((-)?0(\.(([0-9][0-9]?)|(0[0-9]))))))$/
		if (value === '' || (reg.test(value) && value < 99999999999.99 && value >= 0)) {
			callback()
		} else {
			return callback(new Error('金额不合法,金额整数位不能超过11位,小数不能超过两位'))
		}
	}
}

export default verify
