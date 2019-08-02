<template>
    <div>
        <scroll-view class='diy-filter' :style='"height: calc(100vh - "+ navH + " - 40px)"' scroll-y>
            <filter-plane title='负责人'>
                <div class="pb5">
                    <div class='f13 d-text-blue mb10' v-if='!principal.length' @click='addPrincipal'>无筛选项,点击添加 <i-icon type='enter' size='13' color='#4889F4' /></div>
                    <div class="d-flex" v-if='principal.length'>
                        <div class='ac'>
                            <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size='large'></i-avatar>
                            <div class='f14 mt5'>荒寂</div>
                        </div>
                    </div>
                </div>
            </filter-plane>
            <filter-plane :title='item.title' :dataList='item.datalist' :prop="item.prop" @click='getFilterData' v-for='(item, index) in filterList' :key="index" />
        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'
let closingDate = [
	{ id: '0', name: '本周' },
	{ id: '1', name: '本季' },
	{ id: '2', name: '本年' },
	{ id: '3', name: '上周' },
	{ id: '4', name: '上月' },
	{ id: '5', name: '本月' },
	{ id: '6', name: '今天' },
	{ id: '7', name: '下周' }
]
let source = [
	{ id: '0', name: '广告' },
	{ id: '1', name: '研讨会' },
	{ id: '2', name: '搜索引擎' }
]
export default {
	props: ['stageList'],
	components: {
		FilterPlane
	},
	data () {
		return {
			// filterList: [{
			// 	title: '销售阶段',
			// 	datalist: this.stageList
			// }, {
			// 	title: '预计成交日期',
			// 	datalist: this.stageList
			// }, {
			// 	title: '机会来源',
			// 	datalist: this.stageList
			// }
			// ],
			principal: []
		}
	},
	created () {

	},
	watch: {
	},
	computed: {
		filterList () {
			return [{
				prop: 'stageIds',
				title: '销售阶段',
				datalist: this.stageList
			}, {
				prop: 'transationTime',
				title: '预计成交日期',
				datalist: closingDate
			}, {
				prop: 'sourceCode',
				title: '机会来源',
				datalist: source
			}
			]
		}
	},
	methods: {
		addPrincipal () {
			this.principal.push({
				name: '荒寂'
			})
		},
		clear () {
			this.$emit('clear')
		},
		// 获取点击的数据
		getFilterData (item) {
			this.filterData[item.prop] = item.ids.map(item => item.id)
		},
		submit () {
			this.$emit('submit', this.getFilterData())
		}
	}
}
</script>

<style lang="scss" scoped>
	.filter-btn{
		position: absolute;
		width: 100%;
		background: #fff;
		height: 49px;
		bottom: 0;
		.btn-item{
			line-height: 49px;
		}
	}

	.diy-filter{
		padding-bottom: 50px;
		box-sizing: border-box;
		background: #f2f2f2;
	}
</style>
