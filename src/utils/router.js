function getParam (param) {
	if (!isNaN(+param) && typeof +param === 'number') {
		param = {
			delta: param
		}
	} else if (typeof param === 'string') {
		param = {
			url: param
		}
	}
	return param
}
export default {
	navigateTo (param) {
		uni.navigateTo(getParam(param))
	},
	redirectTo (param) {
		uni.redirectTo(getParam(param))
	},
	reLaunch (param) {
		uni.reLaunch(getParam(param))
	},
	switchTab (param) {
		uni.switchTab(getParam(param))
	},
	navigateBack (param) {
		uni.navigateBack(getParam(param))
	}
}
