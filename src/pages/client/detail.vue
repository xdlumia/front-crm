<template>
    <div class="client-detail-page">
        <NavBar title='客户详情' />
		<!-- 顶部信息 -->

        <div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
            <div class="uni-flex uni-row pt10 mb5">
                <div class="flex-item d-elip wfull f16 d-text-black">华为技术有限公司</div>
                <div class="flex-item datail-handle">
                    <i-icon type="brush" size="18" class="ml5" color="#1890FF" />
                    <i-icon type="like_fill" size="20" class="ml15" color="#1890FF" />
                </div>
            </div>

            <div class='d-text-gray f13 mb5'>
                客户级别： <span class='d-text-black'>A(重点客户)</span>
            </div>
            <div class="d-center d-text-gray mb5">
                <div class="d-cell f13">成交状态： <span class='d-text-blue'>已成交</span></div>
                <div class="d-cell f13">负责人： <span>徐莉莉</span></div>
            </div>
            <div class='d-text-gray f13 mb5'>
                最后跟进时间： <span>2019-06-17 20:23:07</span>
            </div>
            <div class="d-center d-text-gray">
                <div class="d-cell f13"><span class="b">销售机会金额：</span> <span style='color: #FF9900'>12022元</span></div>
                <div class="d-cell f13"><span class="b">成交金额: </span>： <span style='color: #FF9900'>12022元</span></div>
            </div>
        </div>

        <div class="d-fec">

        </div>

        <div class="footer-fixed-menu d-center d-bg-white">
            <a url='/pages/client/' class="d-cell al">
                <uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">添加跟进</span>
            </a>
            <div class="d-cell ac" @click="handlerAction('phoneShow')">
                <span class="iconfont iconrenzheng f16"></span><span class="ml5 f13  d-text-gray">打电话</span>
            </div>
            <div class="d-cell ar" @click="handlerAction('moreShow')">
                <i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">更多</span>
            </div>
        </div>
        <!-- 更多 action -->
        <i-actionSheet :visible="moreShow" :actions="moreActions" show-cancel @cancel="handlerAction('moreShow')" />

        <!-- 电话 action -->
        <i-actionSheet :visible="phoneShow" :actions="phoneActions" show-cancel @cancel="handlerAction('phoneShow')" @click='handlePhone' />
    </div>
</template>

<script>
let moreActionsTitle = ['更多操作', '复制', '退回公海', '变更负责人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	data () {
		return {
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions,
			phoneActions: [
				{
					name: '联系人电话'
				},
				{
					name: '赵利春 18910453728',
					phone: 18910453728
				}
			],
			detailInfo: {},
			tabBars: [
				{
					name: '跟进记录',
					id: '1'
				},
				{
					name: '详细信息',
					id: '2'
				},
				{
					name: '相关信息',
					id: '3'
				}
			],
			currIndex: 2
		}
	},
	methods: {
		handlerAction (item) {
			this[item] = !this[item]
		},

		handlePhone ({ target: { index } }) {
			this.callPhone(this.phoneActions[index].phone)
		}
	}
}
</script>

<style scoped lang="scss">
    .client-detail-page{
        height: 100vh;
        background: #f2f2f2;
    }
	.chance-datail-title {
        background-color: #fff;
        color: #666;
        .datail-handle {
            min-width: 60px;
        }
    }
</style>
