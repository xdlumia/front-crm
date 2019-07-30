<template>
    <div class="d-auto-y" style="height:calc( 100vh - 350px )">
        <mPanel title="基本信息" bg="#f8f9fc">
            <m-list label="主题">{{detailInfo.aaa}}</m-list>
            <m-list label="客户">{{detailInfo.aaa}}</m-list>
            <m-list label="总金额（元）">{{detailInfo.aaa}}</m-list>
            <m-list label="成交状态">{{detailInfo.aaa}}</m-list>
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc">
			<m-list label="负责人">{{detailInfo.aaa}}</m-list>
            <m-list label="创建日期">{{detailInfo.aaa}}</m-list>
            <m-list label="创建人">{{detailInfo.aaa}}</m-list>
            <m-list label="最后修改日">{{detailInfo.aaa}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	components: {
		// mPager
	},
	data () {
		return {
			detailInfo: {
				aaa: '王晓冬1'
			}
		}
	},
	onLoad (option) {
	},
	methods: {
		// // 滚动到顶部刷新
		// scrolltoupper (e) {
		// 	console.log(e)
		// },
		// // 滚动到底部加载
		// scrolltolower (e) {
		// 	console.log(e)
		// },
		// 打开列表详情
		openDetail (index) {
			this.$routing.navigateTo('./detail/index')
		}

	},
	// // 监听用户下拉动作，一般用于下拉刷新
	// onPullDownRefresh  () {
	// 	this.$refs.list.reload()
	// 	wx.vibrateShort()
	// 	wx.stopPullDownRefresh()
	// },
	// // 页面上拉触底事件的处理函数
	// onReachBottom () {
	// 	this.$refs.list.getNextPage()
	// },
	created () {}
}
</script>

<style scoped lang="scss">
.chance-item{
    border-bottom:1px solid #efefef;
    background-color:#fff;
    padding:10px;
    .item-progress{ display: flex; align-items: center; margin-right:10px; }
    .item-info{font-size:14px; color:#333}
 }
</style>
