function getCtx (selector) {
	if (process.env.PLATFORM_WX) {
		selector = '#' + selector

		const pages = getCurrentPages()
		const ctx = pages[pages.length - 1]
		const componentCtx = ctx.selectComponent(selector)

		if (!componentCtx) {
			let html = selector === '#toast' ? '<i-toast id="toast" />' : '<i-message id="message" />'
			let ref = selector === '#toast' ? '"i-toast": "/iview/toast/index"' : '"i-message": "/iview/message/index"'

			console.error(`无法找到对应的组件，请添加【${html}】到PAGE页面中,并且引用【${ref}】`)
			return null
		}
		return componentCtx
	} else {
		return document.getElementById(selector).__vue__
	}
}

function Toast (options) {
	const { selector = 'toast' } = options
	const ctx = getCtx(selector)

	ctx.handleShow(options)
}

Toast.hide = function (selector = 'toast') {
	const ctx = getCtx(selector)

	ctx.handleHide()
}

function Message (options) {
	const { selector = 'message' } = options
	const ctx = getCtx(selector)

	ctx.handleShow(options)
}

module.exports = {
	$toast: Toast,
	$message: Message
}
