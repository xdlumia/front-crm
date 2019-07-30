<template>
  <div class="chance-bg">
    <NavBar title="机会" :isSearch="true" placeholder="输入联系人姓名,手机号" />
    <!-- <filter-diy @submit='submit' @clear='clear' /> -->
    <Filter :filterData='filterData' @filterSubmit='submit' ref='filter'>
			<filter-diy @submit='submit' @clear='clear' />
		</Filter>
    <!-- 列表内容 -->
    <scroll-list
      class="d-absolute wfull"
      :style="{top:`calc(39px + ${navH})`}"
      height="`calc(100vh - ${navH} - 39px)`"
      api="bizSystemService.getUserAuth"
      :params="queryForm"
      :select="select"
      v-slot="{ row, index, select }">

        <div class="chance-item uni-flex uni-row">
          <div class="wfull flex-item item-info d-elip">
            <a url="./detail/index">
              <h4 class="d-elip">{{row}}王东亮</h4>
              <p class="d-text-qgray d-elip f12 ">华为技术有限公司</p>
              <time class="d-text-qgray f12 fl">创建日期: 2019-04-4 17:23</time>
            </a>
          </div>
          <div class="flex-item item-progress">
            <span v-if="select==1">
                  <m-radio v-model="current" :label='1'>12</m-radio>
            </span>
            <i v-else @click="callPhone(18210286644)" class="iconfont f20 d-text-blue iconcall"></i>
          </div>
        </div>
    </scroll-list>
    <!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt">
      <a class="d-cell al" url='/pages/contact/add-contact'>
        <uni-icon type="plus" size="16" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">新建联系人</span>
      </a>
      <a class="d-cell ar" url='/pages/contact/manage/index'>
        <i-icon type="setup" size="18" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">管理联系人</span>
      </a>
    </div>
  </div>
</template>

<script>

import Filter from '@/components/filter'
import FilterDiy from './filter-diy'
export default {
	mixins: [],
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {
			select: 1,
			filterData: [
				{
					prop: 'a',
					current: { id: 0, name: '我参与的' },
					list: [
						{ id: 0, name: '我负责的' },
						{ id: 1, name: '我参与的' },
						{ id: 1, name: '全部' },
						{ id: 1, name: '7天未跟进' },
						{ id: 1, name: '最近浏览' },
						{ id: 1, name: '我下属的' }
					]
				},
				{
					prop: 'b',
					current: { id: 0, name: '最新跟进日期' },
					list: [
						{ id: 0, name: '最新跟进日期' },
						{ id: 1, name: '最新创建日期' },
						{ id: 1, name: '最新修改日期' }
					]
				}
			],
			// 步骤列表
			stepList: [
				{ label: '全部销售机会', index: 'all' },
				{ label: '验证机会', index: 1 },
				{ label: '需求确定', index: 2 },
				{ label: '方案报价', index: 3 },
				{ label: '谈判审核', index: 4 }
			],
			current: 2,
			queryForm: {
				limit: 10,
				page: 1
			}
		}
	},
	onLoad (option) {
		this.select = option.select
	},
	methods: {
		setpHandle (row, index) {
			this.current = index
		},
		radioChange () {
			// console.log(111)
		}
	},
	created () {
		// console.log()
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
