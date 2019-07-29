
export default {
	timeToStr (time, format = 'y-m-d h:i:s') {
		function ParseDate (time, cFormat) {
			let format = cFormat
			let date = new Date(time)
			let formatObj = {
				y: date.getFullYear(),
				m: date.getMonth() + 1,
				d: date.getDate(),
				h: date.getHours(),
				i: date.getMinutes(),
				s: date.getSeconds(),
				a: date.getDay()
			}
			let timeStr = format.replace(/(y|m|d|h|i|s|a)+/ig, function (result, key) {
				key = key.toLowerCase()
				let value = formatObj[key]
				// Note: getDay() returns 0 on Sunday
				if (key === 'a') {
					return ['日', '一', '二', '三', '四', '五', '六'][value]
				}
				if (result.length > 0 && value < 10) {
					value = '0' + value
				}
				return value || 0
			})
			return timeStr
		}

		if (time) {
			return ParseDate(time, format)
		} else {
			return ''
		}
	}
}
