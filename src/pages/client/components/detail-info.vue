<!--
/**
* @author 详细信息
* @date 2019年7月299日
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <mPanel title="基本信息" bg="#f8f9fc">
            <m-list label="机会名称">{{detailInfo.aaa}}</m-list>
            <m-list label="所属部门">{{detailInfo.aaa}}</m-list>
            <m-list label="客户名称">{{detailInfo.aaa}}</m-list>
            <m-list label="负责人">{{detailInfo.aaa}}</m-list>
            <m-list label="销售金额（元）">{{detailInfo.aaa}}</m-list>
            <m-list label="销售阶段">{{detailInfo.aaa}}</m-list>
            <m-list label="赢率">{{detailInfo.aaa}}</m-list>
            <m-list label="预计成交日期">{{detailInfo.aaa}}</m-list>
            <m-list label="行业">{{detailInfo.aaa}}</m-list>
            <m-list label="来源">{{detailInfo.aaa}}</m-list>
            <m-list label="备注">{{detailInfo.aaa}}</m-list>
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc">
            <m-list label="创建日期">{{detailInfo.aaa}}</m-list>
            <m-list label="最后跟进">{{detailInfo.aaa}}</m-list>
            <m-list label="最新修改">{{detailInfo.aaa}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['height'],
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
