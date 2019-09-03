/*
 * @Author: web.冀猛超
 * @Date: 2019-08-06 12:03:18
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-04 00:16:53
 * @Description: file content
 */
<template>
    <div class="hfull d-auto-y ipx" :style="{height:height}">
        <!-- 联系人 -->
        <infoContact :query="query" :isUrl='isUrl' />
        <!-- 销售机会 -->
         <infoChance :query="query" :isUrl='isUrl' />
        <!-- 成交记录 -->
        <infoTransaction :query="query" :isUrl='isUrl' />
        <!-- 日程 -->
        <infoSchedule ref="infoSchedule" :query="query" :isUrl='isUrl' />
        <!-- 附件 -->
        <infoFile :query="query" :isUrl='isUrl' />
        <!-- 团队成员 -->
        <infoEmployee ref='employee' :query="query" :isUrl='isUrl' />
    </div>
</template>

<script>
import infoContact from '@/pages/common/info-contact' // 联系人
import infoTransaction from '@/pages/common/info-transaction' // 成交记录
import infoSchedule from '@/pages/common/info-schedule' //  日程
import infoFile from '@/pages/common/info-file' //  附件
import infoEmployee from '@/pages/common/info-employee' //  团队成员
import infoChance from '@/pages/common/info-chance' // 机会
export default {
	props: ['height', 'query', 'sendBackType'],
	components: {
		infoContact,
		infoTransaction,
		infoSchedule,
		infoFile,
		infoEmployee,
		infoChance
	},
	data () {
		return {
		}
	},
	onLoad (option) {
	},
	computed: {
		isUrl () {
			return +this.sendBackType !== 1
		}
	},
	methods: {
		openDetail (index) {
			this.$routing.navigateTo('./detail/index')
		}

	}

}
</script>

<style scoped lang="scss">
.detail-list{
    padding:10px 15px 0;
    .detail-list-img{
        display: block;
        width:44px;
        height: 44px;
        border-radius: 50%;
        margin-right: 10px;
        background-color:#eee;
        overflow: hidden;
        text-align: center;
        line-height: 44px;
        font-size:12px;
        color:#999;
        &:before{
            content: attr(data-name)
        }
    }
    .list-title{
        title{ color:#333;font-size: 15px; border-right:1px solid #eee; padding-right:10px;}
        span{ font-size:13px; margin-left: 10px;}
    }
 }
</style>
