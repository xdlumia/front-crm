<template>
    <div class="client-detail-page">
        <template v-if='!loading'>
        <NavBar title='成交详情' />
        <!-- 顶部信息 -->

        <div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
            <div class="uni-flex uni-row pt10 mb5">
                <div class="flex-item d-elip wfull f16 d-text-black">{{detailInfo.name || ''}}</div>
                <div class="flex-item datail-handle d-flex">
                    <div @click="detailClick">
                        <i-icon type="brush" size="18" class="ml5" color="#1890FF" />
                    </div>
                    <span @click="changeWatchful">
                        <i-icon type="like_fill" size="20" class="ml15" :color="!detailInfo.isWatchful ? '#999' : '#ff5533'" />
                    </span>
                </div>
            </div>

            <div class='d-text-gray f13 mb5'>
                总金额： <span class='d-text-blue'>{{detailInfo.totalAmount || ''}}</span>
            </div>
            <div class="d-text-gray mb5 transaction">
                <i-select
                    @input="transactionrecordUpdate"
                    v-model="detailInfo.transactionStatus"
                    :props="{label:'content',value:'code'}"
                    label="状态"
                    placeholder="请选择"
                    :options="CRM_CJZT"
                />
            </div>
            <div class='f13 mb5'>

                 <div @click="getClientInfo"
                    class="d-elip d-text-blue d-inline d-middle"
                    style="width:50%"
                ><span class="d-text-gray ">客户名称：</span>{{detailInfo.clientName || ''}}</div>
            </div>
        </div>

        <div class="">
            <i-tabs :current="currIndex" :tabList='tabBars' @change="handleChange">
                <i-tab index="0">
                    <detailInfo :detailInfo='detailInfo' :height="'calc(100vh  - 217px - 50px - ' + navH + ')'" />
                </i-tab>
                <i-tab index="1">
                    <correlationInfo ref='correlationInfo' v-if="Object.keys(detailInfo).length" :query='{busType:3,name:detailInfo.name,busId:detailInfo.id}' :height="'calc(100vh - 217px - 50px - ' + navH + ')'" />
                </i-tab>
            </i-tabs>
        </div>

        <div class="footer-fixed-menu d-center d-bg-white" style="border-top:1px solid #E4E4E4">
            <div class="d-cell ac d-center" @click="handlerAction('phoneShow')">
                <span class="iconfont iconcall f18" style='color: #696969'></span><span class="ml5 f13  d-text-gray">打电话</span>
            </div>
            <div class="d-cell ar d-center" @click="handlerAction('moreShow')">
                <i-icon type='more' size='20' color='#696969' /><span class="ml5 f13  d-text-gray">更多</span>
            </div>
        </div>
        </template>

        <i-spin fix fullscreen v-else></i-spin>
        <!-- 更多 action -->
        <i-actionSheet :visible="moreShow" :actions="moreActions" show-cancel @cancel="handlerAction('moreShow')" @click="handleMore" />

        <!-- 电话 action -->
        <i-actionSheet :visible="phoneShow" :actions="phoneActions" show-cancel @cancel="handlerAction('phoneShow')" @click='handlePhone' />
    </div>
</template>

<script>
import detailInfo from './components/detail-info'
import correlationInfo from './components/correlation-info'

let moreActionsTitle = ['更多操作', '变更负责人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		detailInfo,
		correlationInfo
	},
	data () {
		return {
			loading: true,
			detailId: '',
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions,
			phoneActions: [
				{
					name: '联系人电话'
				}
			],
			detailInfo: {},
			value: '1',
			upData: [{ name: '已成交', id: '1' }, { name: '未成交', id: '2' }],
			tabBars: [
				{
					title: '详细信息'
				},
				{
					title: '相关信息'
				}
			],
			currIndex: 0
		}
	},
	onLoad (option) {
		this.detailId = option.id || ''
	},
	onShow () {
		this.getTransactionDetail()
		// 获取联系人列表
		this.linkmanQueryList({ busId: this.detailId, busType: 3 })
	},
	onReady () {
	},
	methods: {
		// 点击客户名称进入客户详情界面
		getClientInfo () {
			let url = `/pages/client/detail?id=${this.detailInfo.clientId}`
             if(this.detailInfo.clientIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该客户已删除！')
			}
		},
		detailClick () {
			uni.$once('updatetransList', data => {
				this.$refs.correlationInfo.$refs.infoContact.linkmanQueryBusList()
				this.$refs.correlationInfo.$refs.infoChance.saleschanceQueryList()
			})
			this.$routing.navigateTo(`/pages/transaction/transaction-add?type=edit&id=${this.detailId}`)
		},
		// 请求成交记录详情
		getTransactionDetail () {
			this.$api.seeCrmService.transactionrecordInfo(null, this.detailId)
				.then(res => {
					this.detailInfo = res.data || {}
					this.loading = false
				})
		},
		// 成交状态编辑
		transactionrecordUpdate () {
			this.$api.seeCrmService.transactionrecordUpdate({ id: this.detailId, transactionStatus: this.detailInfo.transactionStatus })
				.then(res => {
					this.getTransactionDetail()
				})
		},
		// 切换 tab
		handleChange ({ index }) {
			this.currIndex = index
		},
		handlerAction (item) {
			this[item] = !this[item]
		},
		// 获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryBusList(params)
				.then(res => {
					let data = res.data || []
					let phones = data.map(item => {
						return { name: `${item.linkmanName} ${item.mobile}`, phone: item.mobile }
					})
					this.phoneActions = [{ name: '联系人电话' }, ...phones]
				})
		},
		// 拨打电话
		handlePhone ({ target: { index } }) {
			if (!index) return
			this.callPhone(this.phoneActions[index].phone)
		},
		// 关注  取关
		changeWatchful () {
			let type = this.detailInfo.isWatchful ? 'watchfulbusinessDelete' : 'watchfulbusinessSave'
			this.$api.seeCrmService[type]({
				busId: this.detailInfo.id,
				busType: 3
			})
				.then(res => {
					this.getTransactionDetail()
				})
		},
		handleMore ({ target: { index } }) {
			let fnType = {
				1: () => {
					// 变更负责人
					uni.$once('colleagueChoose', data => {
						this.updateLeader(data.data.map(item => item.userId)[0])
					})
					this.$routing.navigateTo('/pages/index/colleagueChoose?isRadio=1&partiType=0')
				},
				2: () => {
					// 删除
					this.$utils.showModal('确定删除当前成交记录？')
						.then(() => {
							this.$api.seeCrmService.transactionrecordLogicDelete({ id: this.detailId })
								.then(res => {
									this.$utils.toast.text('删除成功')
									setTimeout(() => {
										this.$routing.navigateBack()
										uni.$emit('updatetransList', { params: '' })
									}, 800)
								})
						})
				},
				3: () => {
					// 日程
					uni.$once('updateIndexList', data => {
						this.$refs.correlationInfo.colleagueChoose()
					})
					this.$routing.navigateTo(`/pages/index/scheduleAdd?busType=3&name=${this.detailInfo.name}&id=${this.detailInfo.id}`)
				}
			}
			fnType[index]()
		},
		// 变更负责人
		updateLeader (leaderId) {
			this.$api.seeCrmService.teammemberinfoUpdate({
				busId: this.detailId,
				busType: 3,
				leaderId: leaderId,
				partiType: 0
			}).then(res => {
				if (res.code === 200) {
					this.$refs.correlationInfo.$refs.employee.getEmployeeList()
					this.getTransactionDetail()
					// 完成
				}
			})
		}
	},
	onUnload () {
		this.moreShow && (this.moreShow = false)
	},
	onHide () {
		this.moreShow && (this.moreShow = false)
	},
	computed: {
		CRM_CJZT () {
			return this.dictionaryOptions('CRM_CJZT')
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
<style>
.transaction .detail-panel-item{border-bottom: none;width: 120px;padding: 0px !important;}
.transaction .uni-lh50{width: 50px !important;}
</style>
