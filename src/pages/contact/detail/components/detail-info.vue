/*
 * @Author: web.冀猛超
 * @Date: 2019-07-27 09:16:04
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-03 11:21:19
 * @Description: 详细信息
 */
<template>
    <div class="hfull d-auto-y ipx" :style="{height:height}">
        <mPanel title="基本信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label-width="120" label="姓名">{{detailInfo.linkmanName}}</m-list>
            <m-list label-width="120" label="负责人">{{detailInfo.leaderName}}</m-list>
            <m-list label-width="120" label="公司名称">{{detailInfo.clientName}}</m-list>
			<div v-for='item in detailInfo.formsFieldValueEntitys' :key='item.id'>
                <m-list label-width="120" :label="item.fieldName" v-if="item.fieldType == 3">{{item.fieldValue | dictionary(item.groupCode || '-')}}</m-list>
                <m-list label-width="120" :label="item.fieldName" v-else-if="item.fieldType == 2">{{+item.fieldValue | timeToStr('yyyy-mm-dd')}}</m-list>
                <m-list label-width="120" :label="item.fieldName" v-else>{{item.fieldValue || "-"}}</m-list>
            </div>
        </mPanel>
		<mPanel title="联系信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label-width="120" label="手机">{{detailInfo.mobile}}</m-list>
            <m-list label-width="120" label="地址">{{detailInfo.address}}</m-list>
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label-width="120" label="最后跟进">{{detailInfo.followUpTime | timeToStr}}</m-list>
            <m-list label-width="120" label="最新修改">{{detailInfo.modifyTime | timeToStr}}</m-list>
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
	created () {}
}
</script>

<style scoped lang="scss">

</style>
