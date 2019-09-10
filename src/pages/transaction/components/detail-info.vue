<template>
    <div class="d-auto-y ipx" :style="{height:height}">
        <mPanel title="基本信息" :isUrl='false'>
            <m-list  label-width="120" label="主题">{{detailInfo.name || '-'}}</m-list>
            <m-list  label-width="120" label="客户">{{detailInfo.clientName || '-'}}</m-list>
            <m-list label-width="120" label="总金额（元）">{{detailInfo.totalAmount || '-'}}</m-list>
            <m-list label-width="120" label="成交状态">{{detailInfo.transactionStatus | dictionary('CRM_CJZT')}}</m-list>
			<m-list label-width="120" label="开始时间">{{detailInfo.startTime | timeToStr('yyyy-mm-dd hh:ii')}}</m-list>
			<m-list label-width="120" label="结束时间">{{detailInfo.endTime | timeToStr('yyyy-mm-dd hh:ii')}}</m-list>
        </mPanel>
		<mPanel title="其他信息" top="10" :isUrl='false'>
			<m-list label-width="120" label="负责人">{{detailInfo.leaderName || '-'}}</m-list>
            <m-list label-width="120" label="创建日期">{{detailInfo.createTime | timeToStr('yyyy-mm-dd hh:ii')}}</m-list>
            <m-list label-width="120" label="创建人">{{detailInfo.creatorName || '-'}}</m-list>
            <m-list label-width="120" label="最后修改日">{{detailInfo.modifyTime | timeToStr('yyyy-mm-dd hh:ii')}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['detailInfo', 'height'],
	components: {
		// mPager
	},
	data () {
		return {
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
