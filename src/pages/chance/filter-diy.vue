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
            <filter-plane title='销售阶段' v-model='filterData.stageIds' :dataList='stageList'/>
            <filter-plane title='预计成交日期' v-model='filterData.transationTime' isSingle :dataList='dateList'/>
            <filter-plane title='机会来源' v-model='filterData.sourceCode' :dataList="dictionaryOptions('CRM_LY')"/>
        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'
let dateList = [
	{ code: '0', content: '本周' },
	{ code: '1', content: '本季' },
	{ code: '2', content: '本年' },
	{ code: '3', content: '上周' },
	{ code: '4', content: '上月' },
	{ code: '5', content: '本月' },
	{ code: '6', content: '今天' },
	{ code: '7', content: '下周' }
]
export default {
	props: ['stageList', 'form'],
	components: {
		FilterPlane
	},
	data () {
		return {
			principal: [],
			dateList: dateList,
			filterData: {
				stageIds: [], // 销售阶段
				transationTime: '', // 预计成交日期
				sourceCode: []
			}
		}
	},
	created () {
	},
	watch: {
	},
	computed: {
	},
	methods: {
		addPrincipal () {
			this.principal.push({
				name: '荒寂'
			})
		},
		clear () {
			Object.assign(this.filterData, this.$options.data().filterData)
		},
		submit (item) {
			this.$emit('submit', this.filterData)
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
