<template>
  <div class="chance-bg">
    <NavBar title="销售机会详情" />
    <!-- 列表内容 -->
    <div style="height:100vh">
      <!-- 顶部信息 -->
      <div class="chance-datail-title pt10 pb10 pl15 pr15 f13">
        <div class="uni-flex uni-row">
          <div
            class="flex-item d-elip wfull f16"
            style="color:#333"
          >{{datailInfo.chanceName}}</div>
          <div class="flex-item datail-handle">
            <a class="d-inline" :url="`/pages/chance/add-chance?id=${datailInfo.id}&editType=1`"><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></a>
            <span @click="updateAttention(datailInfo.isWatchful)">
				<i-icon :type="datailInfo.isWatchful?'like_fill':'like'" size="20" class="ml15" :color="datailInfo.isWatchful?'#FF5533':'#999'" />
			</span>
          </div>
        </div>
        <div class="f12">客户名称: <a :url="`/pages/client/detail?id=${datailInfo.id}`" class="d-elip d-text-blue" style="display:inline">{{datailInfo.clientName}}</a></div>
        <div class="f12">负责人: {{datailInfo.leaderName || '-'}}</div>
        <div class="f12">销售金额(元): {{datailInfo.salesMoney || '-'}}
          <span class="fr">预计成交日期<time class="d-inline d-text-blue f12">{{datailInfo.reckonFinishTime | timeToStr('y-m-d')}}</time></span>
        </div>
      </div>
      <!-- 当前阶段 -->
      <div class="mt10 mb10 change-steps " style="background-color:#fff">
        <i-steps
          :current="stageActive"
          class="wfull">
          <i-step
            @step="setpHandle(item,index)"
            v-for="(item,index) of stageList"
            :key="index"
            :content="item.stageName">
            <span slot="step">{{index+1}}</span>
          </i-step>
        </i-steps>
        <p class="f12 d-text-gray"> <i class="uni-icon uni-icon-info-filled f12 mr5"></i> 点击商机阶段，商机阶段变更</p>
      </div>
      <!-- tabs切换组件 -->
      <!-- <detail-swiper>
            <swiper-item slot='swiper'></swiper-item>
      </detail-swiper> -->
	<i-tabs :current="currTabIndex" :tabList='tabBars' @change="tagsChange">
        <i-tab index="0">
			<!-- 跟进: -->
            <followInfo :query="{salesFunnelId:id}" height="calc(100vh - 380px)"/>
        </i-tab>
        <i-tab index="1">
            <datailInfo :detailInfo="datailInfo" height="calc(100vh - 380px)"/>
        </i-tab>
        <i-tab index="2">
			<!-- 相关信息 -->
            <correlationInfo :query="{busId:id,busType:1}" height="calc(100vh - 380px)"/>
        </i-tab>
    </i-tabs>
      <!-- 底部操作按钮 -->
      <div class="footer-fixed-menu d-center d-bg-white">
        <a class="d-cell al" url='/pages/common/add-follow'>
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
import datailInfo from './components/detail-info'
import followInfo from '@/pages/client/components/follow-info'
import correlationInfo from './components/correlation-info'
let moreActionsTitle = ['更多操作', '复制', '转移给他人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		datailInfo,
		followInfo,
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
			currTabIndex: 0,
			// 商机阶段列表
			stageList: [],
			// 当前阶段
			stageActive: 1,
			// 机会详情
			datailInfo: {},
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions,
			phoneActions: []
		}
	},
	onLoad (option) {
		this.id = option.id
		// 获取详情
		this.saleschanceInfo(option.id)
		// 获取联系人列表
		this.linkmanQueryList({ id: option.id, busType: 1 })
	},
	created () {

	},
	methods: {
		// 查询机会详情
		saleschanceInfo (id) {
			this.$api.seeCrmService.saleschanceInfo(null, id)
				.then(res => {
					this.datailInfo = res.data || {}
					// 获取销售阶段
					this.salesstageQueryList()
				})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList()
				.then(res => {
					let data = res.data || []
					data.forEach((item, index) => {
						if (this.datailInfo === item.id) {
							this.stageActive = index + 1
							this.datailInfo.stageName = item.stageName
						}
					})
					this.stageList = data
				})
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
		// 标签切换
		tagsChange ({ index }) {
			this.currTabIndex = index
		},
		// 阶段更换
		setpHandle (row, index) {
			this.current = index
		},
		// 关注状态切换
		updateAttention (val) {
			// 是否关注（0-未关注，1-已关注）
			if (val) {
				this.datailInfo.isWatchful = 1
			} else {
				this.datailInfo.isWatchful = 0
			}
		},
		handlerAction (item) {
			this[item] = !this[item]
		},
		handlePhone ({ target: { index } }) {
			this.callPhone(this.phoneActions[index].phone)
		},

		handleMore ({ target: { index } }) {
			if (index === 0) return
			let fnType = {
				1: () => {
					// 1编辑 2复制
					this.$routing.navigateTo(`/pages/chance/add-chance?id=${datailInfo.id}&editType=2`)
				},
				// 转移
				2: () => {
					this.$routing.navigateTo(`/pages/index/colleagueChoose?id=${datailInfo.id}`)
				},
				// 删除
				3: () => {
					this.$utils.showModal()
						.then(() => {
							this.$api.seeCrmService.linkmanDelete({ id: this.id })
								.then(res => {
									this.$routing.navigateTo(`/pages/chance/index`)
								})
						})
						.catch(() => {})
				},
				4: () => {
					// 更多日程
					this.$routing.navigateTo(`/pages/index/scheduleAdd?id=${datailInfo.id}`)
				}
			}
			fnType[index]()
		}
	}
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
