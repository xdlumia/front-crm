<template>
    <div class="client-detail-page">
        <NavBar title='成交详情' />
		<!-- 顶部信息 -->

        <div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
            <div class="uni-flex uni-row pt10 mb5">
                <div class="flex-item d-elip wfull f16 d-text-black">房屋买卖</div>
                <div class="flex-item datail-handle">
                    <i-icon type="brush" size="18" class="ml5" color="#1890FF" />
                    <i-icon type="like_fill" size="20" class="ml15" color="#ff5533" />
                </div>
            </div>

            <div class='d-text-gray f13 mb5'>
                总金额： <span class='d-text-blue'>778,997</span>
            </div>
            <div class="d-text-gray mb5 transaction">
				<i-select
					v-model="value"
					:props="{label:'name',value:'id'}"
					label="状态"
					placeholder="请选择"
					:options="upData">
				</i-select>
            </div>
            <div class='d-text-gray f13 mb5'>
                客户名称： <span>北京奥运会有限责任公司</span>
            </div>
        </div>

        <div class="">
            <detailSwiper />
        </div>

        <div class="footer-fixed-menu d-center d-bg-white" style="border-top:1px solid #E4E4E4">
            <div class="d-cell ac d-center" @click="handlerAction('phoneShow')">
                <span class="iconfont iconcall f18" style='color: #696969'></span><span class="ml5 f13  d-text-gray">打电话</span>
            </div>
            <div class="d-cell ar d-center" @click="handlerAction('moreShow')">
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

let moreActionsTitle = ['更多操作', '转移', '删除', '日程']
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
			value: '1',
			upData: [{ name: '已成交', id: '1' }, { name: '未成交', id: '2' }],
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
<style>
.transaction .detail-panel-item{border-bottom: none;width: 120px;padding: 0px !important;}
.transaction .uni-lh50{width: 50px !important;}
</style>
