<template>
  <div class="chance-bg">
    <NavBar title="机会销售详情" />
    <!-- 列表内容 -->
    <div style="height:100vh">
      <!-- 顶部信息 -->
      <div class="chance-datail-title pt10 pb10 pl15 pr15 f13">
        <div class="uni-flex uni-row">
          <div
            class="flex-item d-elip wfull f16"
            style="color:#333"
          >车公庄地铁 文华园小区朝南一局560万车公庄地铁 文华园小区朝南一局560万</div>
          <div class="flex-item datail-handle">
            <a class="d-inline" url="/pages/chance/add-chance"><i-icon type="brush" size="18" class="ml5" color="#1890FF" /></a>
            <i-icon type="like" size="20" class="ml15" color="#1890FF" />
          </div>
        </div>
        <div class="f12">客户名称: <a url="/pages/client/detail" class="d-elip d-text-blue" style="display:inline">华为技术有限公司</a></div>
        <div class="f12">负责人: {{detailInfo.name}}</div>
        <div class="f12">销售金额(元): {{detailInfo.name}}
          <span class="fr">预计成交日期<time class="d-inline d-text-blue f12">2019-09-03</time></span>
        </div>
      </div>
      <!-- 当前阶段 -->
      <div class="mt10 mb10 change-steps " style="background-color:#fff">
        <i-steps
          :current="current"
          class="wfull">
          <i-step
            @step="setpHandle(item,index)"
            v-for="(item,index) of stepList"
            :key="index"
            :content="item.label"
          >
            <span slot="step">{{item.index}}</span>
          </i-step>
        </i-steps>
        <p class="f12 d-text-gray"> <i class="uni-icon uni-icon-info-filled f12 mr5"></i> 点击商机阶段，商机阶段变更</p>
      </div>
      <!-- tabs切换组件 -->
      <detail-swiper :tabBars='tabBars'>
            <swiper-item slot='swiper'></swiper-item>
      </detail-swiper>
      <!-- 底部操作按钮 -->
      <div class="footer-fixed-menu d-center d-bg-white">
        <a class="d-cell al" url='/pages/chance/add-follow'>
          <uni-icon type="plus" size="16" color="#1890FF" />
          <span class="ml5 f13 d-text-gray">添加跟进</span>
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
import detailSwiper from './components/detail-swiper'

let moreActionsTitle = ['更多操作', '复制', '转移给他人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))

export default {
	components: {
		detailSwiper
	},
	data () {
		return {
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
				},
				{
					name: '相关信息',
					id: '3'
				}
			],
			// 步骤列表
			stepList: [
				{ label: '验证机会', index: 1 },
				{ label: '需求确定', index: 2 },
				{ label: '方案报价', index: 3 },
				{ label: '谈判审核', index: 4 }
			],
			current: '1',
			detailInfo: {
				name: '客户名称'
			},
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
			]
		}
	},
	onLoad (option) {},
	methods: {
		setpHandle (row, index) {
			this.current = index
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
					// 复制
					this.$routing.navigateTo('/pages/chance/add-chance')
				},
				2: () => {
					this.$routing.navigateTo('/pages/index/colleagueChoose')
				},
				3: () => {
					this.$utils.showModal().then(() => {
						console.log('111')
					}).catch(() => {})
				},
				4: () => {
					// 更多日程
					this.$routing.navigateTo('/pages/index/scheduleAdd')
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
