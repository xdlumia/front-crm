<template>
    <div class="d-auto-y" style="height:calc( 100vh - 350px )">
        <mPanel title="联系人" color="#7765cc" add>
            <div class="detail-list">
                <div class="list-title">
                    <title>黄玉里</title> <span class="d-text-qgray">总经理</span>
                </div>
                <p class="f12 d-elip d-text-qgray">华为技术有限公司</p>
            </div>
        </mPanel>
        <mPanel top="10" title="日程" color="#4889f4" add url="/pages/index/scheduleAdd">
            <div class="detail-list">
                <p class="f13 d-elip d-text-gray">明天粉色扥发东风东</p>
                <p class="f12 d-elip d-text-gray">2019/01/03 13:20 至2019/01/31 15:20</p>
                <p class="f12 d-elip d-text-blue" style="background-colr:#efefef"><i-icon type="coordinates" size="18" color="#4788F4" />我是尝尝的遗传地址</p>
            </div>
        </mPanel>
        <mPanel top="10" title="附件" color="#4889f4" add url="/pages/transaction/index">
            <div class="detail-list">
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont icon-adjunct"> 我是附件名称</p>
            </div>
        </mPanel>
        <mPanel top="10" title="团队成员" color="#4889f4" add url="/pages/index/colleagueChoose">
            <div class="detail-list d-flex-lr bb">
                <image class="detail-list-img" data-name="徐丽丽" src="" alt=""></image>
                <p>
                    <b class="f16">徐丽丽</b>
                    <span class="f12 d-text-qgray">负责人</span>
                </p>
            </div>
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
		// 图片如果加载失败显示名称
		defaultImg (e) {
			e.setAttribute('data-name', '改变')
			// let title = e.target.dataset.title
		},
		// 打开列表详情
		openDetail (index) {
			this.$routing.navigateTo('./detail/index')
		}

	},
	created () {}
}
</script>

<style scoped lang="scss">
.detail-list{
    padding:10px 15px;
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
