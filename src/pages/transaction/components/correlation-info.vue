<!--
/**
* @author 王晓冬
* @name 相关信息
* @date 2019年7月29日
**/
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <!-- 联系人 -->
        <infoContact :query="query" :isUrl='false'/>
        <!-- 销售机会 -->
         <infoChance :query="query" :isUrl='false'/>
        <!-- 日程 -->
        <infoSchedule ref="infoSchedule" :query="query"/>
        <!-- 附件 -->
        <infoFile :query="query"/>
        <!-- 团队成员 -->
        <infoEmployee :query="query" ref='employee'/>
    </div>
</template>

<script>
import infoContact from '@/pages/common/info-contact' // 联系人
import infoSchedule from '@/pages/common/info-schedule' //  日程
import infoFile from '@/pages/common/info-file' //  附件
import infoEmployee from '@/pages/common/info-employee' //  团队成员
import infoChance from '@/pages/common/info-chance' // 机会
export default {
	props: ['height', 'query'],
	components: {
		infoContact,
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
	methods: {
		openDetail (index) {
			this.$routing.navigateTo('./detail/index')
		},
		colleagueChoose () {
			this.$refs.infoSchedule.colleagueChoose()
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
