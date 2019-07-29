import filters from './filters'

/** 调用子组件生命周期 */
function CallChildrenHook (name) {
	return function (args) {
		this.$children.map(cmp => {
			cmp.__call_hook(name, args)
		})
	}
}

export default {
	filters: filters,
	onShow: CallChildrenHook('onShow'),
	onLoad: CallChildrenHook('onLoad'),
	onHide: CallChildrenHook('onHide'),
	onPullDownRefresh: [
		() => {
			wx.vibrateShort()
			uni.stopPullDownRefresh()
		},
		CallChildrenHook('onPullDownRefresh')
	],
	onReachBottom: CallChildrenHook('onReachBottom'),
	onPageScroll: CallChildrenHook('onPageScroll')
}
