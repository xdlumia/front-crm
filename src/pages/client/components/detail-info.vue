<!--
/**
* @author 冀猛超
* @name 相关信息
* @date 2019年8月02日
**/
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <mPanel title="基本信息" bg="#f8f9fc">
            <m-list label="客户名称">{{detailInfo.name}}</m-list>
            <m-list label="所属部门">{{detailInfo.aaa}}</m-list>
            <m-list label="负责人">{{detailInfo.leaderName}}</m-list>
            <m-list label="客户级别">{{detailInfo.gradeCode | dictionary('CRM_KHJB')}}</m-list>
            <m-list label="行业">{{detailInfo.tradeCode | dictionary('CRM_KH_HY')}}</m-list>
            <m-list label="来源">{{detailInfo.sourceCode | dictionary('CRM_LY')}}</m-list>
            <m-list label="成交状态">{{detailInfo.makeBargainCode | dictionary('CRM_CJZT')}}</m-list>
            <m-list label="备注">{{detailInfo.note}}</m-list>
            <!-- <m-list label="客户身份">{{detailInfo.aaa}}</m-list>
            <m-list label="客户积分">{{detailInfo.aaa}}</m-list> -->
            <m-list label="销售额（元）">{{detailInfo.totalSalesChanceMoney}}</m-list>
            <m-list v-for='item in basicInfo' :key='item.id' :label="item.fieldName">{{item.fieldValue}}</m-list>

        </mPanel>
		<mPanel title="联系信息" bg="#f8f9fc">
            <m-list label="手机号">{{detailInfo.phone}}</m-list>
            <m-list label="详细地址">{{detailInfo.address}}</m-list>
            <m-list v-for='item in contactInfo' :key='item.id' :label="item.fieldName">{{item.fieldValue}}</m-list>
            <!-- <m-list label="邮政编码">{{detailInfo.aaa}}</m-list>
            <m-list label="传真">{{detailInfo.aaa}}</m-list>
            <m-list label="公司网址">{{detailInfo.aaa}}</m-list>
            <m-list label="微博">{{detailInfo.aaa}}</m-list> -->
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc">
            <m-list label="创建日期">{{detailInfo.createTime | timeToStr('yyyy-mm-dd')}}</m-list>
            <m-list label="最后跟进">{{detailInfo.finallyFollowTime | timeToStr('yyyy-mm-dd')}}</m-list>
            <m-list label="最新修改">{{detailInfo.modifyTime | timeToStr('yyyy-mm-dd')}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: {
		height: String,
		detailInfo: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	data () {
		return {
			basicInfo: [], // 基本信息
			contactInfo: [] // 联系信息
		}
	},
	created () {
		this.$nextTick(() => {
			this.detailInfo.formsFieldValueEntities.forEach(item => {
				if (item.isContact === 1) {
					this.contactInfo.push(item)
				} else {
					this.basicInfo.push(item)
				}
			})
		})
	}
}
</script>

<style scoped lang="scss">

</style>
