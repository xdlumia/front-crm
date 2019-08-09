<template>
  <div class="chance-bg">
    <NavBar title="联系人详情" />
    <!-- 列表内容 -->
    <div style="height:100vh">
      <!-- 顶部信息 -->
      <div class="chance-datail-title d-bg-white pt10 pb10 pl15 pr15 f13 mb10">
        <div class="uni-flex uni-row">
          <div
            class="flex-item d-elip wfull f16"
            style="color:#333">{{detailInfo.linkkanName || '-'}}</div>
          <div class="flex-item datail-handle">
            <a class="d-inline" :url="`/pages/contact/add-contact?id=${detailsInfo.id}&editType=1`"><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></a>
			<span @click="updateAttention(detailsInfo.isWatchful)">
				<i-icon :type="detailsInfo.isWatchful?'like_fill':'like'" size="20" class="ml15" :color="detailsInfo.isWatchful?'#FF5533':'#999'" />
			</span>
			</div>
        </div>
        <div class="f12">负责人: {{detailInfo.leaderName || '-'}}</div>
        <div class="f12"><a :url="`/pages/client/detail/index?id=${detailInfo.clientId}`" class="d-elip d-text-blue" style="display:inline">{{detailInfo.clientName}}</a></div>
        <div class="f12">{{detailInfo.address || '-'}}</div>
      </div>
      <!-- tabs切换组件 -->
      <i-tabs :current="currTabIndex" :tabList='tabBars' @change="tagsChange">
			<i-tab index="0">
				<notesInfo :query="{salesFunnelId:id}" height="calc(100vh - 280px)"/>
			</i-tab>
			<i-tab index="1">
				<detailInfo :detailInfo="detailsInfo" height="calc(100vh - 280px)"/>
			</i-tab>
			<i-tab index="2">
				<correlationInfo :query="{busId:id,busType:1}" height="calc(100vh - 280px)"/>
			</i-tab>
		</i-tabs>
      <!-- 底部操作按钮 -->
      <div class="footer-fixed-menu d-center d-bg-white">
        <a class="d-cell al" url='/pages/chance/add-follow'>
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
  </div>
</template>

<script>
import detailInfo from './components/detail-info'
import notesInfo from '@/pages/client/components/follow-info'
import correlationInfo from './components/correlation-info'

let moreActionsTitle = ['更多操作', '转移', '删除', '复制']
let moreActions = moreActionsTitle.map(item => ({ name: item }))

export default {
	components: {
		detailInfo,
		notesInfo,
		correlationInfo
	},
	data () {
		return {
			tabBars: [
				{ title: '跟进记录' },
				{ title: '详细信息' },
				{ title: '相关信息' }
			],
			id: '', // 当前详情id
			// tab当前选中项
			currTabIndex: 0,
			detailInfo: {},
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions,
			phoneActions: []
		}
	},
	onLoad (option) {
		this.id = option.id
		// 获取详情
		this.linkmanInfo(option.id)
		// 获取联系人列表
		this.linkmanQueryList({ id: option.id, busType: 1 })
	},
	methods: {
		// 查询联系人详情
		linkmanInfo (id) {
			this.$api.seeCrmService.linkmanInfo(null, id)
				.then(res => {
					this.detailInfo = res.data || {}
				})
		},
		handlerAction (item) {
			this[item] = !this[item]
		},
		handlePhone ({ target: { index } }) {
			this.callPhone(this.phoneActions[index].phone)
		},
		// 标签切换
		tagsChange ({ index }) {
			this.currTabIndex = index
		},
		// 获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryList(params)
				.then(res => {
					let data = res.data || []
					this.phoneActions = data.map(item => {
						return { name: `${item.linkkanName} ${item.mobile}`, phone: item.mobile }
					})
					this.phoneActions.unshift({ name: '联系人电话' })
				})
		},
		// 关注状态切换
		updateAttention (val) {
			// 是否关注（0-未关注，1-已关注）
			if (val) {
				this.detailsInfo.isWatchful = 1
			} else {
				this.detailsInfo.isWatchful = 0
			}
		},
		handleMore ({ target: { index } }) {
			if (index === 0) return
			let fnType = {
				// 转移
				1: () => {
					this.$routing.navigateTo(`/pages/index/colleagueChoose?id=${datailInfo.id}`)
				},
				// 删除
				2: () => {
					this.$utils.showModal()
						.then(() => {
							this.$api.seeCrmService.linkmanDelete({ id: this.id })
								.then(res => {
									// 删除成功跳转到列表页
									this.$routing.navigateTo(`/pages/contact/index`)
								})
						})
						.catch(() => {})
				},
				// 复制 editType = 1编辑 2复制
				3: () => {
					this.$routing.navigateTo(`/pages/contact/add-catact?id=${datailInfo.id}&editType=2`)
				}
			}
			fnType[index]()
		}
	},
	created () {}
}
</script>

<style lang="scss">
.change-steps {
  padding:5px 15px;
}
.chance-bg {
  background-color: #f9f9f9;
  height: 100vh;
}
.chance-datail-title {
  background-color: #fff;
  color: #666;
  .datail-handle {
    min-width: 60px;
  }
}
</style>
