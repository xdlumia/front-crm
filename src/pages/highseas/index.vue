<!--
/**
* @author 冀猛超
* @name 公海池列表
* @date 2019年8月09日
**/
-->
<template>
    <div class="highseas-page">
        <NavBar :title='select ? "公海池" : ""'>
			<a :url="'./choose-highseas?poolId=' + pool.id" class='d-center f16' v-if='!select'>
				{{pool.name || ''}}<i-icon type="unfold" size='18' color='#000' />
			</a>
		</NavBar>
        <div>
            <div class="page-search-box d-flex" :style="'top: '+ navH">
                <a @click="getSearch" class="search-input d-center d-cell pl10">
                    <i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5">{{queryForm.name || '搜索客户名称'}}</span>
                </a>
            </div>

            <Filter :filterData='filterData' @filterSubmit='filterSubmit' ref='filter' :top='"calc("+ navH +" + 49px)"'>
				<filter-diy @submit='diyFilterSubmit' />
            </Filter>
        </div>

		<div class='highseas-list-view d-relative' v-if='queryForm.poolId'>
			<scroll-list
				ref='list'
				:height="'calc(100vh - ' + navH +' - 40px - 49px - 45px)'"
				api="seeCrmService.clientinfoPagelist"
				:params="queryForm"
				@getList='getList'
			>
				<div  @click='handlerClient(item, index)'  v-for="(item, index) of list" :key="item.id" class="pb10 pt10 pl15 pr15 highseas-item d-center d-bg-white">
					<div class="d-cell d-center">
						<div class="d-cell">
							<div class="f13 d-text-black">{{item.name}}</div>
							<div class="f12 d-text-qgray">退回时间：{{item.sendBackTime | timeToStr('yyyy-mm-dd hh:ii')}}</div>
							<div class="f12 d-text-qgray">退回次数：{{item.sendBackNum || 0}}</div>
						</div>
						<div class="d-center" v-if='!select && item.sendBackType != 1'>
							<div class="mr15" @click.stop='receive(item)'>
								<uni-tag text="领取" type='primary' inverted size='small'></uni-tag>
							</div>
							<div @click.stop='handlerAllocation(item, index)' class="mr10">
								<uni-tag text="分配" type='primary' inverted size='small'></uni-tag>
							</div>
						</div>
					</div>
					<div v-if='select'>
						<m-radio :label='item.id' v-model="chooseData" />
					</div>
                </div>
			</scroll-list>
		</div>
		<div class="footer-fixed-menu d-center d-bg-white" v-if="!select">
			<a :url="'/pages/client/add-client?poolId=' + pool.id" class="d-cell al">
				<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建客户</span>
			</a>
			<a url='./setting' class="d-cell ar">
				<i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">管理</span>
			</a>
		</div>

		<div class="footer-fixed-menu" v-if='select'>
			<i-button type="primary" i-class="f16" @click='submitChooseData'>确定</i-button>
		</div>
    </div>
</template>

<script>

import Filter from '@/components/filter'
import FilterDiy from './components/filter-diy'
let sortType = ['最新跟进', '最新创建', '离我最近'].map((item, index) => {
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
			select: 0, // 是否选择
			queryForm: {
				queryType: '', // 查询类型
				sortType: '', // 排序类型
				poolId: '', // 公海池id
				lonSort: '',
				latSort: '',
				name: '',
				belongType: 1 // 是否为 0 为 客户列表 1 为公海池
			},
			list: [],
			filterData: [
				{
					prop: 'queryType',
					current: {
						name: '全部客户',
						id: 6
					},
					list: [
						{
							name: '全部客户',
							id: 6
						}, {
							name: '我负责的客户',
							id: 7
						}, {
							name: '我关注的客户',
							id: 8
						}, {
							name: '其他人的客户',
							id: 9
						}
					]
				},
				{
					prop: 'sortType',
					current: sortType[1],
					list: sortType
				}
			],
			cuClient: {},
			chooseDataIndex: 0,
			chooseData: 0
		}
	},
	onLoad (option) {
		this.select = option.select || 0
		this.$store.dispatch('highseas/getList')

		// 设置经纬度
		let localtion = this.$local.fetch('localtion') || this.$store.state.localtion
		this.queryForm.lonSort = localtion.longitude
		this.queryForm.latSort = localtion.latitude

		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
			this.queryForm[item.prop] = selects[item.prop].id
		})
		this.filterSelect = selects
	},
	onShow () {
		this.$refs.list.reload()
	},
	computed: {
		pool () {
			return this.$store.state.highseas.pool
		}
	},
	methods: {
		//
		handlerClient (item, index) {
			if (!this.select) {
				this.$api.seeCrmService.getclientlogCheckClientInfoNum({
					clientId: item.id,
					leaderId: this.$store.state.userInfo.id || '',
					poolId: this.pool.id,
					sendBackType: item.sendBackType
				}).then(res => {
					this.$routing.navigateTo('/pages/client/detail?source=1&id=' + item.id + '&poolId=' + this.pool.id)
				})
				return
			}

			this.chooseDataIndex = index
			this.chooseData = item.id
		},
		getSearch () {
			uni.$once('updatedate', (data) => {
				this.queryForm.name = data.searchInfo
				this.$refs.list.reload()
			})
			this.$routing.navigateTo('/pages/common/search?searchType=4')
		},
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
		// 领取客户
		receive (item, index) {
			this.$api.seeCrmService.clientinfoClaimClient({
				clientId: item.id,
				poolId: this.queryForm.poolId,
				sendBackType: item.sendBackType,
				leaderId: item.leaderId
			}).then(res => {
				if (res.code === 200) {
					this.$refs.list.reload()
				}
			})
		},
		// 分配事件
		handlerAllocation (item, index) {
			// 注册 事件
			uni.$once('colleagueChoose', data => {
				this.allocation(data.data.map(item => item.userId)[0], item, index)
			})
			// 设置当前选中的 客户项
			this.cuClient = item
			this.$routing.navigateTo('/pages/index/colleagueChoose?isRadio=1&partiType=1')
		},

		// 选择 公海池客户 回调
		submitChooseData () {
			if (!this.chooseData) {
				this.$utils.toast.text('请选择客户')
				return
			}
			let { id, name } = this.list[this.chooseDataIndex]
			uni.$emit('choosePool', { id, name })

			this.$routing.navigateBack()
		},

		// 分配公海池客户
		allocation (leaderId, item, index) {
			this.$api.seeCrmService.clientinfoAllocation({
				clientId: item.id,
				poolId: this.queryForm.poolId,
				sendBackType: item.sendBackType || '',
				leaderId: leaderId
			}).then(res => {
				this.$refs.list.reload()
			})
		}

	},
	watch: {
		pool: {
			immediate: true,
			deep: true,
			handler (pool) {
				this.queryForm.poolId = pool.id
				try {
					this.$refs.list.reload()
				} catch (err) {

				}
			}
		}
	}
}
</script>

<style scoped lang="scss">

	.highseas-page{
		height: 100vh;
		background: #f2f2f2;
	}
	.highseas-list-view{
		margin-top: 87px;
		box-sizing: border-box;
		// padding-bottom: 110px;
	}
	.highseas-item{
		border-bottom:1px solid #d7d7d7;
	}
	.highseas-tags{
		align-items: center;
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
