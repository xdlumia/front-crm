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
            <!-- 客户性质 -->
            <filter-plane :title='property.title' ref='filterplane' :prop='property.prop' @click='getFilterData' :dataList='property.list' />
            <!-- 跟进状态 -->
            <filter-plane :title='followStatuss.title' ref='filterplane' :prop='followStatuss.prop' @click='getFilterData' :dataList='followStatuss.list' />

        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'

let followStatuss = ['暂无', '跟进1次', '跟进多次'].map((name, id) => ({ id, name }))
let property = ['非公海客户', '共享客户'].map((name, id) => ({ id, name }))

export default {
	components: {
		FilterPlane
	},
	data () {
		return {
			property: {
				prop: 'property',
				title: '客户性质',
				list: property
			},
			followStatuss: {
				prop: 'followStatuss',
				title: '跟进状态',
				list: followStatuss
			},
			principal: [],
			filterData: {}
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
