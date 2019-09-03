/*
 * @Author: web.冀猛超
 * @Date: 2019-07-26 10:58:16
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-04 00:19:36
 * @Description: 客户详情
 */
<template>
    <div class="client-detail-page">

		<template v-if='!loading'>
			<NavBar title='客户详情' searchType='0' />
			<!-- 顶部信息 -->

			<div class="chance-datail-title pl15 pr15 pb10 f13 d-bg-white bb mb15">
				<div class="uni-flex uni-row pt10 mb5">
					<div class="flex-item d-elip wfull f16 d-text-black">{{detailInfo.name}}</div>
					<div class="flex-item datail-handle">
						<div @click='editClient(id)' class='d-inline' v-if='sendBackType'><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></div>
						<span @click='watchfulbusiness'>
							<i-icon type="like_fill" size="20" class="ml15" :color="!detailInfo.watchfulBusinessStatus ? '#999' : '#ff5533'" />
						</span>
					</div>
				</div>

				<div class='d-text-gray f13 mb5'>
					客户级别： <span class='d-text-black'>{{ detailInfo.gradeCode | dictionary('CRM_KHJB')}}</span>
				</div>

				<template v-if="!source">
					<div class="d-center d-text-gray mb5">
						<div class="d-cell f13">成交状态： <span class='d-text-blue'>{{detailInfo.makeBargainCode == 1 ? '已成交' : detailInfo.makeBargainCode == 2 ? '多次成交' : '未成交'}}</span></div>
						<div class="d-cell f13">负责人： <span>{{detailInfo.leaderName || ''}}</span></div>
					</div>
					<div class='d-text-gray f13 mb5'>
						最后跟进时间： <span>{{detailInfo.finallyFollowTime | timeToStr('yyyy-mm-dd')}}</span>
					</div>

					<div class="d-text-gray">
						<div class="f13"><span class="b">销售机会金额：</span> <span style='color: #FF9900'>{{detailInfo.totalSalesChanceMoney}}元</span></div>
						<div class="f13"><span class="b">成交金额：</span> <span style='color: #FF9900'>{{detailInfo.bargainSum}}元</span></div>
					</div>
				</template>
				<template v-if='source'>
					<div class='d-text-gray f13 mb5'>
						详细地址： <span class='d-text-gray'>{{ detailInfo.address}}</span>
					</div>
				</template>

			</div>

			<!-- 详情 -->
			<div class="">
				<i-tabs :current="currIndex" :tabList='tabBars' @change="handleChange">
					<i-tab index="0">
						<followInfo :query='{clientId: detailInfo.id, busId: detailInfo.id, busType: 0,}' @updateFollow='updateFollow' :height="'calc(100vh - 49px - 240px - 50px - ' + navH + ' + ' + infoH + ')'" />
					</i-tab>
					<i-tab index="1">
						<detailInfo :detailInfo='detailInfo' :height="'calc(100vh  - 240px - 50px - ' + navH + ' + ' + infoH + ')'" />
					</i-tab>
					<i-tab index="2">
						<correlationInfo ref='info' :query='{busId: detailInfo.id, busType: 0, name: detailInfo.name, clientId: detailInfo.id}' :sendBackType='detailInfo.sendBackType' :height="'calc(100vh  - 240px - 50px - ' + navH + ' + ' + infoH+ ')'" />
					</i-tab>
					<i-tab index='3'>
						<attrInfo :query='{clientId: detailInfo.id, busType: 0}' :height="`calc(100vh - 240px - 100px - ${ipxH} - ${navH} + ${infoH})`" />
					</i-tab>
				</i-tabs>
			</div>

			<div class="footer-fixed-menu d-center d-bg-white">
				<a :url="'/pages/common/add-follow?busId='+ id +'&busType=0'" class="d-cell" :class='!sendBackType ? "ac" : "al"'>
					<span class='iconfont icontianjiajihua f16' style='color:#696969'></span><span class="ml5 f13  d-text-gray">添加跟进</span>
				</a>
				<div class="d-cell ac d-center" @click="handlerAction('phoneShow')">
					<span class="iconfont iconcall f18" style='color: #696969'></span><span class="ml5 f13  d-text-gray">打电话</span>
				</div>
				<div class="d-cell ar" @click="handlerAction('moreShow')" v-if='sendBackType'>
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

// 普通客户

let moreActions = [
	{ name: '更多操作', id: 0 },
	{ name: '复制', id: 1 },
	{ name: '退回公海', id: 2 },
	{ name: '变更负责人', id: 3 },
	{ name: '删除', id: 4 },
	{ name: '日程', id: 5 }
]

let moreActionsPool = [
	{ name: '更多操作', id: 0 },
	{ name: '分配', id: 6 },
	{ name: '删除', id: 4 },
	{ name: '领取', id: 7 },
	{ name: '日程', id: 5 }
]

// 参与人权限
const joinAuth = [0, 1, 5]

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
			poolId: 0, // 公海池id
			detailInfo: {},
			moreShow: false, // 更多按钮 选项
			phoneShow: false, // 打电话选项
			moreActions: [], // 更多按钮
			phoneActions: [],
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
			currIndex: 0,
			source: 0 // 来源是否为公海池 0为客户列表进入 1 为公海池列表进入的详情
		}
	},
	onLoad (data) {
		this.id = data.id
		this.source = data.source || 0
		this.poolId = data.poolId || 0
		// 区分 更多按钮选项
		// this.moreActions = data.source ? moreActionsPool : this.participantAuth
	},
	onShow () {
		// 获取客户详情
		this.getDetailInfo()
		// 获取联系人列表
		this.linkmanQueryBusList({ busId: this.id, busType: 0 })
	},
	computed: {
		ipxH () {
			return this.isIpx ? '34px' : '0px'
		},
		// 是否为保留退回的客户
		sendBackType () {
			return +this.detailInfo.sendBackType !== 1
		},
		// 判断 是否为客户列表进入的详情
		infoH () {
			return !this.source ? '0px' : '48px'
		},
		participantAuth () {
			return +this.$store.state.userInfo.id === +this.detailInfo.leaderId
				? moreActions
				: moreActions.filter(item => joinAuth.includes(item.id))
		}
	},
	methods: {

		editClient (id = '', isCopy = 0) {
			this.$routing.navigateTo('./add-client?id=' + id + '&isCopy=' + isCopy + '&poolId=' + this.poolId || '')
			this.$store.commit('client/setClientInfo', this.detailInfo)
		},

		// 获取详情信息
		async getDetailInfo () {
			try {
				let resulte = await this.$api.seeCrmService.clientinfoInfo(null, this.id)
				if (resulte.code === 200) {
					this.detailInfo = resulte.data || {}

					// 区分 更多按钮选项
					this.moreActions = this.source ? moreActionsPool : this.participantAuth
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
			if (!index) return
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

		// 获取联系人列表
		linkmanQueryBusList (params) {
			this.$api.seeCrmService.linkmanQueryBusList(params)
				.then(res => {
					let data = res.data || []
					let phones = data.map(item => {
						return { name: `${item.linkmanName} ${item.mobile}`, phone: item.mobile }
					})
					this.phoneActions = [{ name: '联系人电话' }, ...phones]
				})
		},
		// 更多 点击事件
		handleMore ({ target: { index } }) {
			// 如果index 为 false 则 return
			if (!index) return
			// 获取 id 项
			let itemIndex = this.moreActions[index].id

			let fnType = {
				1: () => {
					// 复制
					this.editClient('', 1)
				},
				2: () => {
					// 退回公海
					this.$routing.navigateTo('/pages/highseas/return-client?clientId=' + this.id + '&leaderId=' + this.detailInfo.leaderId + '&sendBackType=' + this.detailInfo.sendBackType)
				},
				3: () => {
					// 变更负责人
					uni.$once('colleagueChoose', data => {
						this.updateLeader(data.data.map(item => item.userId)[0])
					})
					this.$routing.navigateTo('/pages/index/colleagueChoose?isRadio=1&partiType=0')
				},
				4: () => {
					// 删除
					this.clientinfoDelete()
				},
				5: () => {
					uni.$off('updateIndexList')
					// 日程
					uni.$once('updateIndexList', data => {
						this.$refs.info.$refs.infoSchedule.colleagueChoose()
					})
					// 更多日程
					this.$routing.navigateTo('/pages/index/scheduleAdd?busId=' + this.id + '&busType=0&name=' + this.detailInfo.name + '&id=' + this.detailInfo.id)
				},
				6: () => {
					// 分配
					uni.$once('colleagueChoose', data => {
						this.allocation(data.data.map(item => item.id)[0])
					})
					// 设置当前选中的 客户项
					this.$routing.navigateTo('/pages/index/colleagueChoose?isRadio=1&partiType=0')
				},
				7: () => {
					// 领取
					this.$api.seeCrmService.clientinfoClaimClient({
						clientId: this.id,
						poolId: this.poolId,
						sendBackType: this.detailInfo.sendBackType,
						leaderId: this.detailInfo.leaderId
					}).then(res => {
						if (res.code === 200) {
							this.moreShow = false
							this.getDetailInfo()
						}
					})
				}
			}
			fnType[itemIndex]()
		},

		// 更新负责人
		updateLeader (leaderId) {
			this.$api.seeCrmService.teammemberinfoUpdate({
				busId: this.id,
				busType: 0,
				leaderId: leaderId,
				partiType: 0
			}).then(res => {
				if (res.code === 200) {
					this.$refs.info.$refs.employee.getEmployeeList()
					this.getDetailInfo()
				}
			})
		},

		// 分配公海池客户
		allocation (leaderId) {
			this.$api.seeCrmService.clientinfoAllocation({
				clientId: this.id,
				poolId: this.poolId,
				sendBackType: this.detailInfo.sendBackType,
				leaderId: leaderId
			})
		},
		updateFollow () {
			this.detailInfo.finallyFollowTime = new Date().getTime()
		}
	},
	onHide () {
		this.moreShow && (this.moreShow = false)
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
