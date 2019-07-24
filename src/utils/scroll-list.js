/**
 * @description 通用列表mixin
 * @author 赵伦 2019-6-14
 */
export default {
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh  () {
		this.$refs.scrollList.reload()
		wx.vibrateShort()
		wx.stopPullDownRefresh()
	},
	// 页面上拉触底事件的处理函数
	onReachBottom () {
		this.$refs.scrollList.getNextPage()
	},
	onShow () {
		// let mapkey = this.pager.searchMapKey
		// let key = this.pager.querySearchKey
		// if (key && mapkey) {
		// 	let pre = this.query[key]
		// 	this.query[key] = this.$store.state.searchTextMap[mapkey] || ''
		// 	if (this.pager.isLoaded && pre != this.query[key]) {
		// 		this.$startPullDownRefresh()
		// 	}
		// }
	},
	methods: {
		refreshList () {
			this.$startPullDownRefresh()
		}
	}
}
