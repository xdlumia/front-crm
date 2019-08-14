<template>
  <div class="chance-bg">
    <NavBar title="销售机会详情" />
    <!-- 列表内容 -->
    <div style="height:100vh">
      <!-- 顶部信息 -->
      <div class="chance-datail-title pt10 pb10 pl15 pr15 f13">
        <div class="uni-flex uni-row">
          <div class="flex-item d-elip wfull f16" style="color:#333">{{detailInfo.chanceName}}</div>
          <div class="flex-item datail-handle">
            <a class="d-inline" :url="`/pages/chance/add-chance?id=${detailInfo.id}&editType=1`">
              <i-icon type="brush" size="18" class="ml5" color="#1890FF" />
            </a>
            <span @click="updateAttention(detailInfo.isWatchful)">
              <i-icon
                :type="detailInfo.isWatchful?'like_fill':'like'"
                size="20"
                class="ml15"
                :color="detailInfo.isWatchful?'#FF5533':'#999'"
              />
            </span>
          </div>
        </div>
        <div class="f12">
          客户名称:
          <a
            :url="`/pages/client/detail?id=${detailInfo.id}`"
            class="d-elip d-text-blue"
            style="display:inline"
          >{{detailInfo.clientName}}</a>
        </div>
        <div class="f12">负责人: {{detailInfo.leaderName || '-'}}</div>
        <div class="f12">
          销售金额(元): {{detailInfo.salesMoney || '-'}}
          <span class="fr">
            预计成交日期
            <time
              class="d-inline d-text-blue f12"
            >{{detailInfo.reckonFinishTime | timeToStr('y-m-d')}}</time>
          </span>
        </div>
      </div>
      <!-- 当前阶段 -->
      <div class="mt10 mb10 change-steps" style="background-color:#fff">
        <i-steps :current="stageActive" :list="stageList" class="wfull">
          <i-step
            @step="setpHandle(item,index)"
            v-for="(item,index) of stageList"
            :key="index"
            :content="item.stageName">
            <span slot="step">{{index+1}}</span>
          </i-step>
        </i-steps>
        <p class="f12 d-text-gray">
          <i class="uni-icon uni-icon-info-filled f12 mr5"></i> 点击商机阶段，商机阶段变更
        </p>
      </div>
      <!-- tabs切换组件 -->
      <!-- <detail-swiper>
            <swiper-item slot='swiper'></swiper-item>
      </detail-swiper>-->
      <i-tabs :current="currTabIndex" :tabList="tabBars" @change="tagsChange">
        <i-tab index="0">
          <!-- 跟进: -->
          <followInfo v-if="busId" :query='{salesFunnelId: busId}' height="calc(100vh - 380px)" />
        </i-tab>
        <i-tab index="1">
          <detailInfo :detailInfo="detailInfo" height="calc(100vh - 380px)" />
        </i-tab>
        <i-tab index="2">
          <!-- 相关信息 -->
          <correlationInfo v-if="detailInfo.clientId" :query="{busId:busId,busType:2,name:detailInfo.chanceName,clientId:detailInfo.clientId,chanceId:busId}" height="calc(100vh - 380px)" />
        </i-tab>
      </i-tabs>
      <!-- 底部操作按钮 -->
      <div class="footer-fixed-menu d-center d-bg-white">
        <a class="d-cell al" :url="'/pages/common/add-follow?busType=2&busId=' + busId">
          <span class="iconfont icontianjiajihua f16" style="color:#696969"></span>
          <span class="ml5 f13 d-text-gray">添加跟进</span>
        </a>
        <div class="d-cell ac d-center" @click="handlerAction('phoneShow')">
          <span class="iconfont iconcall f18" style="color: #696969"></span>
          <span class="ml5 f13 d-text-gray">打电话</span>
        </div>
        <div class="d-cell ar" @click="handlerAction('moreShow')">
          <i-icon type="more" size="20" color="#696969" />
          <span class="ml5 f13 d-text-gray">更多</span>
        </div>
      </div>
      <!-- 更多 action -->
      <i-actionSheet
        :visible="moreShow"
        :actions="moreActions"
        show-cancel
        @cancel="handlerAction('moreShow')"
        @click="handleMore"
      />

      <!-- 电话 action -->
      <i-actionSheet
        :visible="phoneShow"
        :actions="phoneActions"
        show-cancel
        @cancel="handlerAction('phoneShow')"
        @click="handlePhone"
      ></i-actionSheet>
    </div>
  </div>
</template>

<script>
import detailInfo from './components/detail-info'
import followInfo from '@/pages/client/components/follow-info'
import correlationInfo from './components/correlation-info'
let moreActionsTitle = ['更多操作', '复制', '转移给他人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		detailInfo,
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
			busId: '', // 当前详情id
			currTabIndex: 0,
			// 商机阶段列表
			stageList: [],
			// 当前阶段
			stageActive: 0,
			// 机会详情
			detailInfo: {},
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions,
			phoneActions: []
		}
	},
	onShow () {

	},
	onLoad (option) {
		this.busId = option.id
		// 获取详情
		this.saleschanceInfo(option.id)
		// 获取联系人列表
		this.linkmanQueryList({ busId: option.id, busType: 2 })
		// 编辑成功刷新列表
		uni.$on('addChance', data => {
			// 获取详情
			this.saleschanceInfo(this.busId)
		})
	},
	created () {
		// 获取销售阶段
		// this.salesstageQueryList()
	},
	methods: {
		// 查询机会详情
		saleschanceInfo (id) {
			this.$api.seeCrmService.saleschanceInfo(null, id).then(res => {
				this.detailInfo = res.data || {}
				// 获取销售阶段
				this.salesstageQueryList()
			})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList().then(res => {
				let data = res.data || []
				data.forEach((item, index) => {
					if (this.detailInfo.stageId === item.id) {
						this.stageActive = index
						this.detailInfo.stageName = item.stageName
					}
				})
				this.stageList = data
			})
		},
		// 获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryList(params).then(res => {
				let data = res.data || []
				this.phoneActions = data.map(item => {
					return {
						name: `${item.linkkanName} ${item.mobile}`,
						phone: item.mobile
					}
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
			this.stageActive = index
			this.$api.seeCrmService.updatelStagePrope({ id: this.detailInfo.id, stageId: row.id })
				.then(res => {
					// console.log('阶段更改成功')
				})
		},
		// 关注状态切换
		updateAttention (val) {
			// 是否关注（0-未关注，1-已关注）
			if (!val) {
				this.$api.seeCrmService.watchfulbusinessSave({ busId: this.detailInfo.id, busType: 2 })
					.then(res => {
						if (res.code !== 200) return
						this.detailInfo.isWatchful = 1
					// console.log('关注成功')
					})
			} else {
				this.$api.seeCrmService.watchfulbusinessDelete({ busId: this.detailInfo.id, busType: 2 })
					.then(res => {
						if (res.code !== 200) return
						this.detailInfo.isWatchful = 0
					// console.log('删除关注成功')
					})
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
					this.$routing.navigateTo(
						`/pages/chance/add-chance?id=${this.detailInfo.id}&editType=2`
					)
				},
				// 转移
				2: () => {
					this.$routing.navigateTo(
						`/pages/index/colleagueChoose?id=${this.detailInfo.id}`
					)
				},
				// 删除
				3: () => {
					this.$utils
						.showModal()
						.then(() => {
							this.$api.seeCrmService
								.linkmanDelete({ id: this.id })
								.then(res => {
									this.$routing.navigateTo(`/pages/chance/index`)
								})
						})
						.catch(() => {})
				},
				4: () => {
					// 更多日程
					this.$routing.navigateTo(
						`/pages/index/scheduleAdd?id=${detailInfo.id}`
					)
				}
			}
			fnType[index]()
		}
	}
}
</script>

<style lang="scss">
.change-steps {
  padding: 5px 15px;
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
