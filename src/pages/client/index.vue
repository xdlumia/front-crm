<template>
    <div class="client-page">
        <NavBar isSearch placeholder='搜索客户' />
		<Filter :filterData='filterData' @filterSubmit='submit' ref='filter'>
			<filter-diy @submit='submit' @clear='clear' />
		</Filter>
		<div class='client-list-view d-relative'>

			<scroll-list
				:height="'calc(100vh - ' + navH +' - 40px)'"
				api="bizSystemService.getUserAuth"
				:params="queryForm"
				v-slot="{ row }"
			>
				<a url='/pages/client/detail?id' class="client-item pb5 pt5 pl15 pr15 d-bg-white">
					<div class="d-flex f14 mb5">
						<div class="d-text-black d-cell d-elip">华盛顿有限成功华盛顿有限成功华盛顿有限成功华盛顿有限成功华盛顿有限成功华盛顿有限成功</div>
						<div class='d-text-cgray'>多次成交</div>
					</div>
					<div class="d-flex client-tags">
						<div class="iconfont iconqian f16 d-text-blue mr10"></div>
						<div class="c-tag f12 mr10">普通客户</div>
						<div class="c-tag f12 mr10">70分</div>
						<div class="c-tag f12 mr10">2019-10-10</div>
					</div>
				</a>
			</scroll-list>

			<div class="footer-fixed-menu d-center d-bg-white">
				<a class="d-cell al">
					<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建客户</span>
				</a>
				<a url='/pages/highseas/index' class="d-cell ac">
					<span class="iconfont iconrenzheng f16"></span><span class="ml5 f13  d-text-gray">到公海池</span>
				</a>
				<a class="d-cell ar">
					<i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">管理</span>
				</a>
			</div>

		</div>
    </div>
</template>

<script>
import Filter from '@/components/filter'
import FilterDiy from './components/filter-diy'
export default {
	components: {
		Filter,
		FilterDiy
	},
	data () {
		return {
			queryForm: {},
			filterData: [
				{
					prop: 'a',
					current: { id: 0, name: '全部' },
					list: [
						{
							id: 0,
							name: '全部'
						},
						{
							id: 1,
							name: '我负责的'
						}
					]
				},
				{
					prop: 'b',
					current: { id: 0, name: '时间' },
					list: [
						{
							id: 0,
							name: '时间'
						},
						{
							id: 1,
							name: '最新跟进时期'
						}
					]
				}
			]
		}
	},
	onReady () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
		})
		this.filterSelect = selects
	},
	methods: {
		submit (item) {
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
