/* eslint-disable */

import _getIterator from 'babel-runtime/core-js/get-iterator'
/** 前台字典表缓存
 * @author web-闫超
 * @date 2018年7月26日
 *
 *  提供一个获取字典表的方法和字典表过滤器
 * 1、字典表方法
 *  v-for="(item,index) of dictionaryOptions('FM_CONGSHI_HANGYE')"
 * 2、 字典表过滤器
 *  v-model="form.tenantCertificatesTypeCode | dictionary('FM_HT_ZJLX')"
 **/

import api from './api'
import Vue from 'vue'

var dictionaryCache = {}
var getDictionaryArr = function getDictionaryArr (dicName) {
	var dictionaryArr = dictionaryCache[dicName]

	if (!dictionaryArr) {
		Vue.util.defineReactive(dictionaryCache, dicName, [])
		dictionaryArr = dictionaryCache[dicName]

		var success = false
		api.seeDataDictionaryService.valueListCode({}, dicName).then(function (res) {
			dictionaryCache[dicName] = res.data || []
			success = true
		}).then(function () {
			// 简单处理下，如果没加载成功，下次重新加载
			!success && delete dictionaryCache[dicName]
		})
	}

	return dictionaryArr
}
var findInArr = function findInArr (arr, key, idKey, valueKey) {
	if (key && arr && arr.length) {
		var _iteratorNormalCompletion = true
		var _didIteratorError = false
		var _iteratorError

		try {
			for (var _iterator = _getIterator(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value

				if (item[idKey] === key) {
					return item[valueKey]
				}
			}
		} catch (err) {
			_didIteratorError = true
			_iteratorError = err
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return()
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError
				}
			}
		}
	}

	return ''
}

function dictionary (key, dicName) {
	var idKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'code'
	var valueKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'content'

	var dictionaryArr = void 0

	if (typeof dicName === 'string') {
		dictionaryArr = getDictionaryArr(dicName)
	} else {
		if (Array.isArray(dicName)) {
			dictionaryArr = dicName
		} else {
			console.error('The param [key] of filter [dictionary]  must be string!')
			return
		}
	}

	return findInArr(dictionaryArr, key, idKey, valueKey)
}

export default {
	methods: {
		dictionaryOptions: function dictionaryOptions (dicName) {
			if (typeof dicName !== 'string') {
				console.error('The param [key] of method [dictionaryOptions]  must be string!')
				return []
			}

			return getDictionaryArr(dicName)
		},
		getDictionary: dictionary
	},
	filters: {
		dictionary: dictionary
	},
	// 供外部直接调用的,自定义字典
	defineDictionary: function defineDictionary (dicName, arr) {
		Vue.util.defineReactive(dictionaryCache, dicName, arr)
	},

	// 供外部直接调用的,当字典表发生变化时，刷新缓存
	refreshCache: function refreshCache (dicName) {
		if (dictionaryCache.hasOwnProperty(dicName)) {
			delete dictionaryCache[dicName]
		}
	}
}
