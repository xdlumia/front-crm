<!--
/**
* @author 王晓冬
* @name 相关信息
* @date 2019年7月299日
**/
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <!-- 联系人 -->
        <infoContact :query="query"/>
        <!-- 成交记录 -->
        <infoTransaction :query="query"/>
        <!-- 日程 -->
        <infoSchedule :query="query"/>
        <!-- 附件 -->
        <infoFile :query="query"/>
        <!-- 团队成员 -->
        <infoEmployee  ref='employee' :query="query"/>
    </div>
</template>

<script>
import infoContact from '@/pages/common/info-contact' // 联系人
import infoTransaction from '@/pages/common/info-transaction' // 成交记录
import infoSchedule from '@/pages/common/info-schedule' //  日程
import infoFile from '@/pages/common/info-file' //  附件
import infoEmployee from '@/pages/common/info-employee' //  团队成员
export default {
	props: ['height', 'query'],
	components: {
		infoContact,
		infoTransaction,
		infoSchedule,
		infoFile,
		infoEmployee
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
