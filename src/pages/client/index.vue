<template>
    <div class="client-page">
        <NavBar isSearch placeholder='搜索客户' />
		<Filter :filterData='filterData' @filterSubmit='submit' ref='filter'>
			<filter-diy @submit='submit' @clear='clear' />
		</Filter>
		<div class='client-list-view d-relative'>

			<scroll-list
				:height="'calc(100vh - ' + navH +' - 40px)'"
				api="seeCrmService.clientinfoPagelist"
				:params="queryForm"
				@getList='getList'
				ref='list'>
				<a v-for="item of list" :key="item.id" :url="'/pages/client/detail?id=' + item.id" class="client-item pb5 pt5 pl15 pr15 d-bg-white" >
					<div class="d-flex f14 mb5">
						<div class="d-text-black d-cell d-elip">{{item.name}}</div>
						<div class='d-text-cgray'>{{item.makeBargainCode}}</div>
					</div>
					<div class="d-flex client-tags">
						<div class="iconfont iconqian f16 d-text-blue mr10"></div>
						<div class="c-tag f12 mr10">{{item.gradeCode}}</div>
						<div class="c-tag f12 mr10">{{item.score || 0}}分</div>
						<div class="c-tag f12 mr10">{{item.finallyFollowTime|timeToStr('yyyy-mm-dd')}}</div>
					</div>
				</a>
			</scroll-list>

			<div class="footer-fixed-menu d-center d-bg-white">
				<a url='/pages/client/add-client' class="d-cell al">
					<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建客户</span>
				</a>
				<a url='/pages/highseas/index' class="d-cell ac">
					<span class="iconfont iconrenzheng f16"></span><span class="ml5 f13  d-text-gray">到公海池</span>
				</a>
				<a url='./manage/index' class="d-cell ar">
					<i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">管理</span>
				</a>
			</div>

		</div>
    </div>
</template>

<script>
import Filter from '@/components/filter'
import FilterDiy from './components/filter-diy'

// 筛选数据
let queryType = ['全部客户', '我负责的客户', '我下属负责的客户', '我参与的客户', '我关注的', '7天未跟进的客户', '我下属参与的'].map((item, index) => {
	return {
		name: item,
		id: index
	}
})

let sortType = ['最新跟进', '最新创建', '离我最近', '最高成交'].map((item, index) => {
	return {
		name: item,
		id: index
	}
})

export default {
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {
			queryForm: {
				name: '', // 姓名
				gradeCode: '', // 客户级别
				leaderId: '', // 负责人id
				makeBargainCode: '', // 成交状态
				queryType: '', // 查询类型
				sortType: '', // 排序类型
				property: '', // 客户性质
				followStatus: '', // 跟进状态
				stageId: 0, // 销售阶段
				sourceCode: 0 // 来源
			},
			// 筛选数据
			filterData: [
				{
					prop: 'queryType',
					current: queryType[0],
					list: queryType
				},
				{
					prop: 'sortType',
					current: sortType[0],
					list: sortType
				}
			],
			list: []
		}
	},
	filters: {

	},
	onReady () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
		})
		this.filterSelect = selects
	},
	methods: {
		// 获取列表数据
		getList (list) {
			this.list = list
		},
		// 列表筛选方法
		submit (item) {
			this.queryForm[item.prop] = item.id
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},
		clear () {
			this.$refs.filter.hide()
		}
	}
}
</script>

<style scoped lang="scss">
	.client-page{
		height: 100vh;
		background: #f2f2f2;
	}
	.client-list-view{
		margin-top: 38px;
		box-sizing: border-box;
	}
	.client-item{
		border-bottom:1px solid #efefef;
	}
	.client-tags{
		align-items: center;
	}
	.c-tag{
		padding: 0 10px;
		height: 20px;
		background: #f2f2f2;
		color: #ccc;
		line-height: 20px;
		text-align: center;
		border-radius: 100px;
	}

</style>
