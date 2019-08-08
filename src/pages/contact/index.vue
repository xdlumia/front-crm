<template>
  <div class="chance-bg">
    <NavBar title="机会" :isSearch="true" placeholder="输入联系人姓名,手机号" searchType='3' />
    <!-- <filter-diy @submit='submit' @clear='clear' /> -->
    <Filter :filterData='filterData' @filterSubmit='submit' ref='filter'>
			<filter-diy @submit='submit' @clear='clear' />
		</Filter>
    <!-- 列表内容 -->
    <scroll-list
      class="d-absolute wfull"
      :style="{top:`calc(39px + ${navH})`}"
      height="`calc(100vh - ${navH} - 39px)`"
      api="seeCrmService.linkmanQueryPageList"
      :params="queryForm"
      @getList='getList'
      ref='list'>
        <div @click='handlerClient(item, index)' class="chance-item uni-flex uni-row" v-for="(item,index) of list" :key="item.id">
          <div class="wfull flex-item item-info d-elip">
            <!-- <a url="./detail/index"> -->
              <h4 class="d-elip">{{item.linkkanName}}</h4>
              <p class="d-text-qgray d-elip f12 ">{{item.clientName}}</p>
              <time class="d-text-qgray f12 fl">创建日期: {{item.createTime}}</time>
            <!-- </a> -->
          </div>
          <div class="flex-item item-progress">
            <span v-if="select==1">
                  <m-radio v-model="busId" :label='item.id'></m-radio>
            </span>
            <i v-else @click="callPhone(item.mobile)" class="iconfont f20 d-text-blue iconcall"></i>
          </div>
        </div>
    </scroll-list>
    <!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt" v-if='!select'>
      <a class="d-cell al" url='/pages/contact/add-contact'>
        <uni-icon type="plus" size="16" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">新建联系人</span>
      </a>
      <a class="d-cell ar" url='/pages/contact/manage/index'>
        <i-icon type="setup" size="18" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">管理联系人</span>
      </a>
    </div>
    <div class="footer-fixed-menu" v-if='select'>
      <i-button type="primary" i-class="f16" @click='submitChooseData'>确定</i-button>
    </div>
  </div>
</template>

<script>

import Filter from '@/components/filter'
import FilterDiy from './filter-diy'
let queryType = [
	{ id: '0', name: '我负责的' },
	{ id: '1', name: '我参与的' },
	{ id: '-1', name: '全部' },
	{ id: '3', name: '7天未跟进的' },
	{ id: '4', name: '我下属的' }
]
// 列表排序数据
let sortType = [
	{ id: 'a.follow_up_time', name: '最新跟进日期' },
	{ id: 'a.create_time', name: '最新创建日期' },
	{ id: 'a.modify_time', name: '最新修改日期' }
]
export default {
	mixins: [],
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {
			list: [], // 联系人列表
			chooseRowIndex: '', // 选中行数据的下标
			busId: '', // 当为选择页面的时候选中的id
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
			// 查询vo
			queryForm: {
				limit: 10,
				page: 1,
				linkkanName: '', // 联系人名称
				linkanNameOrMobile: '', // 姓名或手机号
				queryType: '', // -1全部，0我负责的，1我参与的，2我关注的，3 7天未跟进的，4下属的，5下属参与的
				orderByStr: '', // 排序字段（a.follow_up_time，a.modify_time阶段更新日期，a.create_time创建日期）
				createTimeType: '' // 创建时间（0-本周，1-本季，2-本年，3-上周，4-上月,5-本月，6-今天，7-下周）
			}
		}
	},
	onLoad (option) {
		this.busId = option.id
		this.select = option.select
	},
	methods: {
		// 获取列表数据
		getList (list) {
			this.list = list
		},
		// 当前行点击
		handlerClient (row, index) {
			if (!this.select) {
				this.$routing.navigateTo('/pages/contact/detail/index?id=' + row.id)
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
			uni.$emit('chooseContact', row)
			this.$routing.navigateBack()
		}
	},
	created () {
		// console.log()
	},
	computed: {
		api () {
			return !this.isSelect ? 'seeCrmService.linkmanQueryList' : 'seeCrmService.linkmanQueryPageList'
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
