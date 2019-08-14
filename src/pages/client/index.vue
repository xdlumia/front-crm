<!--
/**
* @author 冀猛超
* @name 客户列表
* @date 2019年8月02日
**/
-->
<template>
    <div class="client-page">
        <NavBar isSearch placeholder='搜索客户' searchType='0' />
		<Filter :filterData='filterData' @filterSubmit='filterSubmit' ref='filter'>
			<filter-diy @submit='diyFilterSubmit' />
		</Filter>
		<div class='client-list-view d-relative'>

			<scroll-list
				:height="'calc(100vh - ' + navH +' - 40px)'"
				api="seeCrmService.clientinfoPagelist"
				:params="queryForm"
				@getList='getList'
				ref='list'>
				<div @click='handlerClient(item, index)' v-for="(item, index) of list" :key="item.id" class="d-center client-item pb5 pt5 pl15 pr15 d-bg-white" >
					<div class="d-cell">
						<div class="d-flex f14 mb5">
							<div class="d-text-black d-cell d-elip">{{item.name}}</div>
							<div class='d-text-cgray' v-if='!isSelect'>{{item.makeBargainCode || ''}}</div>
						</div>
						<div class="d-flex client-tags">
							<div class="iconfont iconqian f16 d-text-blue mr10" v-if='salesType === 1'></div>
							<div class="c-tag f12 mr10" v-show='item.gradeCode'>{{item.gradeCode | dictionary('CRM_KHJB')}}</div>
							<div class="c-tag f12 mr10">{{item.score || 0}}分</div>
							<div class="c-tag f12 mr10">{{item.createTime|timeToStr('yyyy-mm-dd')}}</div>
						</div>
					</div>
					<div v-if='isSelect'>
						<m-radio :label='item.id' v-model="chooseData" />
					</div>
				</div>
			</scroll-list>

			<div class="footer-fixed-menu d-center d-bg-white" v-if='!isSelect'>
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

			<div class="footer-fixed-menu" v-if='isSelect'>
				<i-button type="primary" i-class="f16" @click='submitChooseData'>确定</i-button>
			</div>

		</div>
    </div>
</template>

<script>
import Filter from '@/components/filter'
import FilterDiy from './components/filter-diy'

// 筛选数据
let queryType = ['全部客户', '我负责的', '我参与的', '我关注的', '7天未跟进的', '我下属负责的', '我下属参与的'].map((item, index) => {
	return {
		name: item,
		id: index - 1
	}
})

let sortType = ['最新跟进', '最新创建', '离我最近', '最高成交'].map((item, index) => {
	return {
		name: item,
		id: index
	}
})

export default {
	props: {
		// 是否为 选择 客户
		isSelect: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {
			queryForm: {
				name: '', // 搜索
				queryType: '', // 查询类型
				sortType: '', // 排序类型
				lonSort: '', // 经度
				latSort: '' // 纬度
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
			list: [], // 列表数据
			chooseDataIndex: '', // 已选择的索引
			chooseData: '' // 已选择的数据

		}
	},
	onLoad () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
			this.queryForm[item.prop] = selects[item.prop].id
		})
		this.filterSelect = selects

		// 设置经纬度
		let localtion = this.$local.fetch('localtion') || this.$store.state.localtion
		this.queryForm.lonSort = localtion.longitude
		this.queryForm.latSort = localtion.latitude

		uni.$on('updatedate', (name) => {
			this.form.name = name
		})
	},
	methods: {
		// 获取列表数据
		getList (list) {
			this.list = list
		},
		// 列表筛选方法
		filterSubmit (item) {
			this.queryForm[item.prop] = item.id
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},

		// 自定义筛选回调
		diyFilterSubmit (filterData) {
			this.queryForm = Object.assign({}, this.queryForm, filterData)
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},

		//
		handlerClient (item, index) {
			if (!this.isSelect) {
				this.$routing.navigateTo('/pages/client/detail?id=' + item.id)
				return
			}
			this.chooseDataIndex = index
			this.chooseData = item.id
		},

		// 确定选中
		submitChooseData () {
			if (!this.chooseData) {
				this.$utils.toast.text('请选择客户')
				return
			}
			let { id, name } = this.list[this.chooseDataIndex]
			uni.$emit('chooseClient', { id, name })

			this.$routing.navigateBack()
		}
	},
	watch: {
		'form.name' () {
			this.$refs.list.reload()
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
