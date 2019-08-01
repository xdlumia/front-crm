<template>
    <div class="client-detail-page">
        <NavBar title='客户详情' />
		<!-- 顶部信息 -->

        <div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
            <div class="uni-flex uni-row pt10 mb5">
                <div class="flex-item d-elip wfull f16 d-text-black">华为技术有限公司</div>
                <div class="flex-item datail-handle">
                    <a url='./add-client' class='d-inline'><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></a>
                    <i-icon type="like_fill" size="20" class="ml15" color="#ff5533" />
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

        <div class="">
            <detailSwiper />
        </div>

        <div class="footer-fixed-menu d-center d-bg-white">
            <a url='/pages/client/add-follow' class="d-cell al">
				<span class='iconfont icontianjiajihua f16' style='color:#696969'></span><span class="ml5 f13  d-text-gray">添加跟进</span>
            </a>
            <div class="d-cell ac d-center" @click="handlerAction('phoneShow')">
                <span class="iconfont iconcall f18" style='color: #696969'></span><span class="ml5 f13  d-text-gray">打电话</span>
            </div>
            <div class="d-cell ar" @click="handlerAction('moreShow')">
                <i-icon type='more' size='20' color='#696969' /><span class="ml5 f13  d-text-gray">更多</span>
            </div>
        </div>

        <!-- 更多 action -->
        <i-actionSheet :visible="moreShow" :actions="moreActions" show-cancel @cancel="handlerAction('moreShow')" @click="handleMore" />

        <!-- 电话 action -->
        <i-actionSheet :visible="phoneShow" :actions="phoneActions" show-cancel @cancel="handlerAction('phoneShow')" @click='handlePhone' />
    </div>
</template>

<script>
import detailSwiper from './components/detail-swiper'

let moreActionsTitle = ['更多操作', '复制', '退回公海', '变更负责人', '删除', '日程', '领取', '分配']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		detailSwiper
	},
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
		},

		handleMore ({ target: { index } }) {
			let fnType = {
				1: () => {
					// 复制
					this.$routing.navigateTo('./add-client')
				},
				2: () => {
					this.$routing.navigateTo('/pages/highseas/return-client')
				},
				3: () => {
					this.$routing.navigateTo('/pages/index/colleagueChoose')
				},
				4: () => {
					this.$utils.showModal().then(() => {
						console.log('111')
					})
				},
				5: () => {
					// 更多日程
					this.$routing.navigateTo('/pages/index/scheduleAdd')
				}
			}
			fnType[index]()
		}
	},
	onUnload () {
		this.moreShow && (this.moreShow = false)
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
