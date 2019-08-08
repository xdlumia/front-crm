<template>
  <div class="chance-bg">
    <NavBar title="机会" :isSearch="true" placeholder="输入销售机会客户名称" searchType='1' />
    <!-- <filter-diy @submit='submit' @clear='clear' /> -->
    <Filter :filterData='filterData' @filterSubmit='filterSubmit' ref='filter'>
			<filter-diy :stageList="stageList"  @submit='diyFilterSubmit' @clear='clear' />
		</Filter>
    <!-- 步骤 -->
    <i-steps
      :current="currStage"
      :list="stageList"
      class="change-steps d-fixed wfull pt5 pb5"
      :style="{top:`calc(64px + 39px)`}">
      <i-step
        @step="setpHandle('all',0)"
        content="全部销售机会">
        <span slot="step">all</span>
      </i-step>
      <i-step
        @step="setpHandle(item,index+1)"
        v-for="(item,index) of stageList"
        :key="index"
        :content="item.stageName">
        <span slot="step">{{index+1}}</span>
      </i-step>
    </i-steps>
    <!-- 统计 -->
    <div class="chance-sts bt d-fixed wfull" :style="{top:`calc(64px + 39px + 65px)`}">
      <li class="sts-item">{{stageSts.stageCount}}个商机</li>
      <li class="sts-item">{{stageSts.totalSalesChanceMoney}}元</li>
      <li class="sts-item" v-if="currStage != 0">赢率{{stageSts.equityedge}}%</li>
    </div>
    <!-- 列表内容 -->
    <scroll-list
      class="d-absolute wfull"
      :style="{top:`calc(64px + 39px + 65px + 35px)`}"
      height="`calc(100vh - 64px - 39px - 65px + 35px)`"
      :api="api"
      :params="queryForm"
      @getList='getList'
      ref='list'>
	<div @click='handlerClient(item, index)' v-for="(item,index) of list" :key="item.id" class="chance-item uni-flex uni-row">
		<div class="flex-item item-progress">
		<circleProgress width="45px" :max="stageList.length" :progress="(stageList.findIndex(row => row.id == item.stageId)+1)" />
		</div>
		<div class="flex-item item-info d-elip wfull">
			<h4 class="d-elip">{{item.chanceName || '-'}}</h4>
			<p class="d-text-gray d-elip">{{item.clientName || '-'}}</p>
			<i-row>
				<i-col :span="12" class="d-text-gray f12">{{item.createTime | timeToStr}}</i-col>
				<i-col  v-if='!isSelect' :span="12" class="f14 ar">¥{{item.salesMoney}}</i-col>
			</i-row>
		</div>
		<div class="flex-item d-flex" style="width:50px;align-items: center;" v-if="isSelect">
			<m-radio v-model="busId" :label='item.id'></m-radio>
		</div>
	</div>
    </scroll-list>
    <!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt" v-if='!isSelect'>
      <a class="d-cell al" url='/pages/chance/add-chance'>
        <uni-icon type="plus" size="16" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">新建机会</span>
      </a>
      <a class="d-cell ar" url='./manage/index'>
        <i-icon type="setup" size="18" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">管理机会</span>
      </a>
    </div>
	<div class="footer-fixed-menu" v-if='isSelect'>
		<i-button type="primary" i-class="f16" @click='submitChooseData'>确定</i-button>
	</div>
  </div>
</template>

<script>

import Filter from '@/components/filter'
import FilterDiy from './filter-diy'
// 筛选数据
let queryType = [
	{ id: '-1', name: '全部' },
	{ id: '0', name: '我负责的' },
	{ id: '4', name: '我下属的' },
	{ id: '2', name: '我关注的' },
	{ id: '3', name: '7天未跟进' }
]
// 列表排序数据
let sortType = [
	{ id: 'a.follow_up_time', name: '最新跟进时间' },
	{ id: 'a.stage_propel_time', name: '阶段更新时间' },
	{ id: 'a.sales_money', name: '销售金额' },
	{ id: 'c.equityedge', name: '盈率(从高到底)' }
]
export default {
	props: {
		busId: {},
		// 是否为 选择 客户
		isSelect: {
			type: Boolean,
			default: true
		}
	},
	mixins: [],
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {

			// 销售机会列表
			list: [],
			chooseRowIndex: '', // radio选中的下标
			// busId: '', // 当为选择页面的时候选中的id
			filterData: [
				{
					prop: 'queryType',
					current: queryType[0],
					list: queryType
				},
				{
					prop: 'orderByStr',
					current: sortType[0],
					list: sortType
				}
			],
			// 步骤列表
			stageList: [],
			stageSts: {},
			currStage: 0,
			queryForm: {
				limit: 10,
				page: 1,
				leaderIds: [], // 负责人id
				chanceName: '', // 销售机会名称
				stageIds: [], // 阶段ids
				clientOrChanceName: '', // 客户名称或机会名称（模糊查询）
				sourceCode: [], // 来源
				transationTime: '', // 成交时间（0-本周，1-本季，2-本年，3-上周，4-上月,5-本月，6-今天，7-下周）
				queryType: '', // -1全部，0我负责的，1我参与的，2我关注的，3 7天未跟进的，4下属的，5下属参与的
				orderByStr: '' // 排序字段（a.follow_up_time跟进日期，a.stage_propel_time阶段更新日期，a.sales_money销售金额，c.equityedge赢率）
			}
		}
	},
	onLoad (option) {
		// console.log(option)
	},
	created () {
		// this.busId = this.id
		// 获取销售阶段
		this.salesstageQueryList()
		// 获取销售机会阶段统计
		this.saleschanceSalesChanceStatistics()
	},
	computed: {
		api () {
			return !this.isSelect ? 'seeCrmService.saleschanceQueryPageList' : 'seeCrmService.saleschanceQueryList'
		}
	},
	methods: {
		// 获取列表数据
		getList (list) {
			this.list = list
		},
		// 当前行点击
		handlerClient (row, index) {
			if (!this.isSelect) {
				this.$routing.navigateTo('/pages/chance/detail?id=' + item.id)
			} else {
				this.chooseRowIndex = index
				this.busId = row.id
			}
		},
		// 确定选中
		submitChooseData () {
			if (!this.busId) {
				this.$utils.toast.text('请选择客户')
				return
			}
			let row = this.list[this.chooseRowIndex]
			uni.$emit('chooseChance', row)

			this.$routing.navigateBack()
		},
		// 列表筛选方法
		filterSubmit (item) {
			let arrayType = ['sourceCode', 'stageIds']
			if (arrayType.includes(item.prop)) {
				this.queryForm[item.prop].push(item.id)
			}
			this.queryForm[item.prop] = item.id
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},
		diyFilterSubmit (filterData) {
			this.queryForm = Object.assign({}, this.queryForm, filterData)
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},
		// 销售阶段筛选
		setpHandle (row, index) {
			this.currStage = index
			if (index !== 0) {
				this.queryForm.stageIds = [row.id]
				this.stageSts.equityedge = row.equityedge
			}
			// 获取销售机会阶段统计
			this.saleschanceSalesChanceStatistics({ stageId: [row.id] })
			// 刷新列表
			this.$refs.list.reload()
		},
		// 获取销售统计
		saleschanceSalesChanceStatistics (params) {
			this.$api.seeCrmService.saleschanceSalesChanceStatistics(params)
				.then(res => {
					this.stageSts = res.data || {}
				})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList()
				.then(res => {
					let data = res.data || []
					data.forEach(item => {
						item.name = item.stageName
					})
					this.stageList = data
				})
		}
	}
}
</script>

<style scoped lang="scss">
.chance-bg {
  background-color: #f9f9f9;
  height: 100vh;
}
.change-steps {
  background-color: #f9f9f9;
  z-index: 1;
  &.i-steps {
    padding: 5px 0;
  }
}
.chance-sts {
  height: 35px;
  line-height: 35px;
  font-size: 13px;
  color: #666;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 15px;
  border-bottom: 1px solid #efefef;
  z-index: 1;
  .sts-item {
    display: inline-block;
    height: 15px;
    line-height: 15px;
    padding-right: 5px;
    margin-right: 5px;
    border-right: 1px solid #999;
    &::last-child{border:none}
  }
}
.chance-item {
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  padding: 10px 15px;
  .item-progress {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .item-info {
    font-size: 14px;
    color: #333;
  }
}
.client-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
}
</style>
