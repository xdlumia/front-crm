<template>
  <div class="chance-bg">
    <NavBar title="联系人" />

	<div>
		<div class="page-search-box d-flex" :style="'top: '+ navH">
			<a @click="getSearch" class="search-input d-center d-cell pl10">
				<i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5">{{queryForm.linkmanNameOrMobile || '搜索联系人姓名,手机号'}}</span>
			</a>
		</div>

		<Filter :filterData="filterData" @filterSubmit="filterSubmit" ref="filter" :top='"calc("+ navH +" + 49px)"'>
			<filter-diy @submit="diyFilterSubmit" />
		</Filter>
	</div>

    <!-- 列表内容 -->
    <scroll-list
      class="d-absolute wfull"
      :style="{top:`calc(39px + ${navH} + 49px)`}"
      height="`calc(100vh - ${navH} - 39px - 49px)`"
      :api="api"
      :params="queryForm"
      @getList="getList"
      ref="list"
    >
      <div class="chance-item uni-flex uni-row" v-for="(item,index) of list" :key="item.id">
        <div @click="handlerClient(item, index)" class="wfull flex-item item-info d-elip">
          <h4 class="d-elip">{{item.linkmanName}}</h4>
          <p class="d-text-qgray d-elip f12">{{item.clientName}}</p>
          <div class="d-flex mt5" style="align-items: center;">
            <div class="c-tag f12 mr10">{{item.score || 0}}分</div>
            <div class="c-tag f12 mr10">{{item.createTime|timeToStr('yyyy-mm-dd')}}</div>
          </div>
        </div>
        <div class="flex-item item-progress" >
          <span v-if="select=='1'" @click="handlerClient(item, index)">
            <m-checkbox v-if="multiple" v-model="linkIds" disabled :label="item.id"></m-checkbox>
            <m-radio v-else v-model="linkIds" disabled :label="item.id"></m-radio>
          </span>
          <i v-else @click="callPhone(item.mobile)" class="iconfont f20 d-text-blue iconcall"></i>
        </div>
      </div>
    </scroll-list>
	<a url='/pages/client/add-client' class="d-cell al d-bg-white"  v-if="select && isAdd">
		<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建客户</span>
	</a>
    <!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt" v-if="!select">
      <a class="d-cell al" url="/pages/contact/add-contact">
        <uni-icon type="plus" size="16" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">新建联系人</span>
      </a>
      <a class="d-cell ar" url="/pages/contact/manage/index">
        <i-icon type="setup" size="18" color="#1890FF" />
        <span class="ml5 f13 d-text-gray">管理联系人</span>
      </a>
    </div>
    <div class="footer-fixed-menu" v-if="select">
      <i-button type="primary" i-class="f16" @click="submitChooseData">确定</i-button>
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
	{ id: '2', name: '我关注的' },
	{ id: '3', name: '7天未跟进的' },
	{ id: '4', name: '我下属负责的' },
	{ id: '5', name: '我下属参与的' }
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
			// 跳转参数
			isAdd: '', // 是否新增联系人
			select: '', // 是否选择
			multiple: '', // 是否多选
			linkIds: [], // 联系人ids 当为选择页面的时候选中的id

			list: [], // 联系人列表
			chooseRowIndex: '', // 选中行数据的下标
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
				name: '',
				limit: 10,
				page: 1,
				busId: '', // 业务id
				linkmanName: '', // 联系人名称
				linkmanNameOrMobile: '', // 姓名或手机号
				queryType: '0', // -1全部，0我负责的，1我参与的，2我关注的，3 7天未跟进的，4下属的，5下属参与的
				orderByStr: 'a.follow_up_time', // 排序字段（a.follow_up_time，a.modify_time阶段更新日期，a.create_time创建日期）
				createTimeType: '' // 创建时间（0-本周，1-本季，2-本年，3-上周，4-上月,5-本月，6-今天，7-下周）
			}
		}
	},
	onShow () {
		this.$refs.list.reload()
	},
	onLoad (option) {
		this.select = option.select || ''
		this.isAdd = option.add || ''
		this.queryForm.busId = option.busId || ''
		this.queryForm.busType = option.busType || ''
		this.queryForm.queryType = option.queryType || 0
		if (option.multiple) {
			this.multiple = option.multiple
			this.linkIds = JSON.parse(option.linkIds)
		} else {
			this.linkIds = option.id
		}

		// uni.$on('updatedate', ({ searchInfo }) => {
		// 	this.queryForm.linkmanNameOrMobile = searchInfo
		// 	this.$refs.list.reload()
		// })
	},
	onReady () {
		// 公共搜索反馈
		// uni.$on('updatedate', (data) => {
		// 	this.queryForm.linkmanName = data.searchInfo
		// 	this.$refs.list.reload()
		// })
	},
	methods: {
		getSearch () {
			uni.$once('updatedate', ({ searchInfo }) => {
				this.queryForm.linkmanNameOrMobile = searchInfo
				this.$refs.list.reload()
			})
			this.$routing.navigateTo('/pages/common/search?searchType=3')
		},
		// 获取列表数据
		getList (list) {
			this.list = list
		},
		// 当前行点击
		handlerClient (row, index) {
			if (!this.select) {
				this.$routing.navigateTo('/pages/contact/detail/index?id=' + row.id)
			} else {
				// 如过是多选
				if (this.multiple) {
					if (this.linkIds.includes(row.id)) {
						// 点击当前行 已经选中的取消
						this.linkIds.splice(this.linkIds.indexOf(row.id), 1)
					} else {
						this.linkIds.push(row.id)
					}
				} else {
					this.chooseRowIndex = index
					this.linkIds = row.id
				}
			}
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

		// 确定选中
		submitChooseData () {
			if (!this.linkIds) {
				this.$utils.toast.text('请选择客户')
				return
			}
			let data
			if (this.multiple) {
				data = this.list.filter(item => this.linkIds.includes(item.id))
			} else {
				data = this.list[this.chooseRowIndex]
			}
			uni.$emit('chooseContact', data)
			this.$routing.navigateBack()
		}
	},
	created () {
		// console.log()
	},
	computed: {
		api () {
			return this.multiple
				? 'seeCrmService.linkmanQueryList'
				: 'seeCrmService.linkmanQueryPageList'
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

 .page-search-box{
	height: 29px;
	padding: 10px 15px;
	background: #f2f2f2;
	position: fixed;
	right: 0;
	left: 0;
	z-index: 10;
	.search-input{
		display: block;
		height: 100%;
		border-radius: 3px;
		background: #fff;
		line-height: 29px;
	}
}
</style>
