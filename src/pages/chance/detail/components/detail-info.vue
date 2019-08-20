<!--
/**
* @author 详细信息
* @date 2019年7月299日
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <mPanel title="基本信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label-width="120" label="机会名称">{{detailInfo.chanceName || '-'}}</m-list>
            <m-list label-width="120" label="所属部门">{{detailInfo.deptName || '-'}}</m-list>
            <m-list label-width="120" label="客户名称">{{detailInfo.clientName || '-'}}</m-list>
            <m-list label-width="120" label="负责人">{{detailInfo.leaderName || '-'}}</m-list>
            <m-list label-width="130" label="销售金额（元）">{{detailInfo.salesMoney || '-'}}</m-list>
            <m-list label-width="120" label="销售阶段">{{detailInfo.stageName || '-'}}</m-list>
            <m-list label-width="120" label="赢率">{{detailInfo.salesStageEntity.equityedge || '0'}}%</m-list>
            <m-list label-width="120" label="预计成交日期">{{detailInfo.reckonFinishTime | timeToStr('y-m-d')}}</m-list>
            <m-list label-width="120" label="行业">{{detailInfo.tradeCode | dictionary('CRM_KH_HY')}}</m-list>
            <m-list label-width="120" label="来源">{{detailInfo.sourceCode | dictionary('CRM_LY')}}</m-list>
            <m-list label-width="120" label="备注">{{detailInfo.note || '-'}}</m-list>
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc" :isUrl='false'>
			<div class="pt5 pb5 d-text-gray ac f14" v-if="!detailInfo.formsFieldValueEntitys.length">暂无数据</div>
            <m-list label-width="120" v-for="(item,index) of detailInfo.formsFieldValueEntitys" :label="item.fieldName" :key="index">{{item.fieldValue || '-'}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['height', 'detailInfo'],
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
