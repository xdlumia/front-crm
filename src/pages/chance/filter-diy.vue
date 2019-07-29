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
            <filter-plane :title='item.title' :dataList='item.datalist' v-for='(item, index) in filterList' :key="index" />
        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'
let filterList = [];
['客户级别', '客户性质', '跟进状态', '成交状态', '来源', '销售阶段'].forEach(item => {
	filterList.push({
		title: item,
		datalist: [
			{
				id: 1,
				name: '非公海池客户'
			}
		]
	})
})

export default {
	components: {
		FilterPlane
	},
	data () {
		return {
			filterList: filterList,
			principal: []
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
		submit () {
			this.$emit('submit')
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
