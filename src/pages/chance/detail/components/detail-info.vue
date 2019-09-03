/*
 * @Author: web.冀猛超
 * @Date: 2019-07-25 20:18:36
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-03 14:30:01
 * @Description: file content
 */
<!--
/**
* @author 详细信息
* @date 2019年7月299日
-->
<template>
    <div class="hfull d-auto-y ipx" :style="{height:height}">
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
            <div>
                <p v-for='item in detailInfo.formsFieldValueEntitys' :key='item.id'>
                    <m-list label-width="120" :label="item.fieldName" v-if="item.fieldType == 3">{{item.fieldValue | dictionary(item.groupCode || '')}}</m-list>
                    <m-list label-width="120" :label="item.fieldName" v-else-if="item.fieldType == 2">{{+item.fieldValue | timeToStr('yyyy-mm-dd')}}</m-list>
                    <m-list label-width="120" :label="item.fieldName" v-else>{{item.fieldValue || "-"}}</m-list>
                </p>
            </div>
            <m-list label-width="120" label="备注">{{detailInfo.note || '-'}}</m-list>
            <!-- <m-list label-width="120" v-for="(item,index) of detailInfo.formsFieldValueEntitys" :label="item.fieldName" :key="index">{{item.fieldValue || '-'}}</m-list> -->
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc" :isUrl='false'>
			<div>
				<m-list label="创建日期">
					{{detailInfo.createTime | timeToStr('y-m-d h:i')}}
				</m-list>
				<m-list label="最后跟进">
					{{detailInfo.followUpTime | timeToStr('y-m-d h:i')}}
				</m-list>
				<m-list label="最新修改">
					{{detailInfo.modifyTime | timeToStr('y-m-d h:i')}}
				</m-list>
				<m-list label="修改人">{{detailInfo.modifierName || '-'}}</m-list>
			</div>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: {
		height: {
			type: String
		},
		detailInfo: {
			type: Object
		}
	}
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
