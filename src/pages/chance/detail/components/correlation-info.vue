<template>
    <div>
        <mPanel title="联系人" color="#7765cc" add>
            <div class="detail-list">
                <div class="list-title">
                    <title>黄玉里</title> <span class="d-text-qgray">总精力</span>
                    <span class="fr iconfont icondadianhua f18"></span>
                </div>
                <p class="f12 d-elip d-text-qgray">华为技术有限公司</p>
            </div>
        </mPanel>
		<mPanel top="10" title="成交记录" color="#3cc695" add>
            <div class="detail-list">
                <p class="f12 d-elip d-text-gray">购买房源6603A/500W</p>
                <p class="f12 d-elip d-text-gray">
                    成交金额（元）5,000.00
                    <span class="f14">成交</span>
                </p>
            </div>
        </mPanel>
        <mPanel top="10" title="日程" color="#4889f4" add>
            <div class="detail-list">
                <p class="f13 d-elip d-text-gray">明天粉色扥发东风东</p>
                <p class="f12 d-elip d-text-gray">2019/01/03 13:20 至2019/01/31 15:20</p>
                <p class="f12 d-elip d-text-blue" style="background-colr:#efefef"><i-icon type="coordinates" size="18" color="#4788F4" />我是尝尝的遗传地址</p>
            </div>
        </mPanel>
        <mPanel top="10" title="附件" color="#4889f4" add>
            <div class="detail-list">
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
            </div>
        </mPanel>
        <mPanel top="10" title="团队成员" color="#4889f4" add>
            <m-list label="创建日期">{{detailInfo.aaa}}</m-list>
            <m-list label="最后跟进">{{detailInfo.aaa}}</m-list>
            <m-list label="最新修改">{{detailInfo.aaa}}</m-list>
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
				aaa: '王晓冬'
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
.detail-list{
    padding:10px 15px 0;
    .list-title{
        title{ color:#333;font-size: 15px; border-right:1px solid #eee; padding-right:10px;}
        span{ font-size:13px; margin-left: 10px;}
    }
 }
</style>
