<!--
/**
* @author 冀猛超
* @name 客户详情
* @date 2019年8月02日
**/
-->
<template>
    <div class="client-detail-page">
		<template v-if='!loading'>
			<NavBar title='客户详情' />
			<!-- 顶部信息 -->

			<div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
				<div class="uni-flex uni-row pt10 mb5">
					<div class="flex-item d-elip wfull f16 d-text-black">{{detailInfo.name}}</div>
					<div class="flex-item datail-handle">
						<div @click='editClient(id)' class='d-inline'><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></div>
						<span @click='watchfulbusiness'>
							<i-icon type="like_fill" size="20" class="ml15" :color="!detailInfo.watchfulBusinessStatus ? '#999' : '#ff5533'" />
						</span>
					</div>
				</div>

				<div class='d-text-gray f13 mb5'>
					客户级别： <span class='d-text-black'>{{ detailInfo.gradeCode | dictionary('CRM_KHJB')}}</span>
				</div>
				<div class="d-center d-text-gray mb5">
					<div class="d-cell f13">成交状态： <span class='d-text-blue'>{{detailInfo.makeBargainCode | dictionary('CRM_CJZT')}}</span></div>
					<div class="d-cell f13">负责人： <span>{{detailInfo.leaderName}}</span></div>
				</div>
				<div class='d-text-gray f13 mb5'>
					最后跟进时间： <span>{{detailInfo.finallyFollowTime | timeToStr('yyyy-mm-dd')}}</span>
				</div>
				<div class="d-center d-text-gray">
					<div class="d-cell f13"><span class="b">销售机会金额：</span> <span style='color: #FF9900'>{{detailInfo.totalSalesChanceMoney}}元</span></div>
					<div class="d-cell f13"><span class="b">成交金额: </span>： <span style='color: #FF9900'>{{detailInfo.totalAmount}}元</span></div>
				</div>
			</div>

			<!-- 详情 -->
			<div class="">
				<i-tabs :current="currIndex" :tabList='tabBars' @change="handleChange">
					<i-tab index="0">
						<followInfo :query='notesQuery' :height="'calc(100vh - 49px - 217px - 50px - ' + navH + ')'" />
					</i-tab>
					<i-tab index="1">
						<detailInfo :detailInfo='detailInfo' :height="'calc(100vh  - 217px - 50px - ' + navH + ')'" />
					</i-tab>
					<i-tab index="2">
						<correlationInfo :height="'calc(100vh  - 217px - 50px - ' + navH + ')'" />
					</i-tab>
					<i-tab index='3'>
						<attrInfo :query='{cilentId: detailInfo.id}' :height="'calc(100vh - 217px - 100px - ' + navH + ')'" />
					</i-tab>
				</i-tabs>
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
import followInfo from './components/follow-info'
import correlationInfo from './components/correlation-info'
import attrInfo from './components/attr-info'
import { setTimeout } from 'timers'

let moreActionsTitle = ['更多操作', '复制', '退回公海', '变更负责人', '删除', '日程', '领取', '分配']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		detailInfo,
		followInfo,
		correlationInfo,
		attrInfo
	},
	data () {
		return {
			loading: true,
			id: 0, // 业务id
			detailInfo: {},
			moreShow: false, // 更多按钮 选项
			phoneShow: false, // 打电话选项
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
			tabBars: [
				{
					title: '跟进记录'
				},
				{
					title: '详细信息'
				},
				{
					title: '相关信息'
				},
				{
					title: '业务属性'
				}
			],
			currIndex: 0
		}
	},
	onLoad (data) {
		this.id = data.id
	},
	onShow () {
		this.getDetailInfo()
	},
	computed: {
		notesQuery () {
			let data = this.detailInfo
			return {
				clientId: data.id,
				busId: data.id,
				busType: 3
			}
		}
	},
	methods: {

		editClient (id = '') {
			this.$routing.navigateTo('./add-client?id=' + id)
			this.$store.commit('client/setClientInfo', this.detailInfo)
		},

		// 获取详情信息
		async getDetailInfo () {
			try {
				let resulte = await this.$api.seeCrmService.clientinfoInfo(null, this.id)
				if (resulte.code === 200) {
					this.detailInfo = resulte.data || {}
				}
			} catch (err) {
				this.detailInfo = {}
			} finally {
				this.loading = false
			}
		},

		// 关注/取消 客户
		async watchfulbusiness () {
			// watchfulbusinessSave 关注用户
			// watchfulbusinessDelete 取消用户
			let fn = !this.detailInfo.watchfulBusinessStatus ? 'watchfulbusinessSave' : 'watchfulbusinessDelete'
			try {
				let resulte = await this.$api.seeCrmService[fn]({
					id: this.id,
					busId: this.id,
					busType: 0
				})
				if (resulte.code === 200) {
					this.detailInfo.watchfulBusinessStatus = +!this.detailInfo.watchfulBusinessStatus
				}
			} catch (err) {

			}
		},

		handlerAction (item) {
			this[item] = !this[item]
		},
		// 拨打电话
		handlePhone ({ target: { index } }) {
			this.callPhone(this.phoneActions[index].phone)
		},
		// 切换 tab
		handleChange ({ index }) {
			this.currIndex = index
		},

		// 删除客户
		clientinfoDelete () {
			try {
				this.$utils.showModal('确定要删除此客户？').then(async () => {
					let resulte = await this.$api.seeCrmService.clientinfoDelete({ id: this.id })
					if (resulte.code === 200) {
						this.$utils.toast.text('删除成功')
						setTimeout(() => {
							this.$routing.navigateBack()
						}, 800)
					}
				})
			} catch (err) {
				this.$utils.toast.text('删除失败')
			} finally {

			}
		},

		handleMore ({ target: { index } }) {
			let fnType = {
				1: () => {
					// 复制
					this.editClient()
				},
				2: () => {
					this.$routing.navigateTo('/pages/highseas/return-client')
				},
				3: () => {
					this.$routing.navigateTo('/pages/index/colleagueChoose')
				},
				4: () => {
					this.clientinfoDelete()
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
