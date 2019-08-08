<template>
    <div>
        <scroll-view class='diy-filter' :style='"height: calc(100vh - "+ navH + " - 49px - 40px)"' scroll-y>

            <!-- 客户级别 -->
            <filter-plane v-model='filterData.gradeCodes' title='客户级别' :dataList='CRM_KHJB' />

            <!-- 跟进状态 -->
            <filter-plane v-model='filterData.followStatuss' isSingle title='跟进状态' :dataList='followStatuss' />

            <!-- 成交状态 -->
            <filter-plane v-model='filterData.makeBargainCodes' title='成交状态' :dataList='CRM_CJZT' />

            <!-- 来源 -->
            <filter-plane v-model='filterData.sourceCodes' title='来源' :dataList='CRM_LY' />

        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>

import FilterPlane from '@/components/filter-plane'
let followStatuss = ['暂无', '跟进1次', '跟进多次'].map((content, code) => ({ code, content }))
let property = ['非公海客户', '共享客户'].map((content, code) => ({ code, content }))

export default {
	components: {
		FilterPlane
	},
	data () {
		return {
			property, // 客户性质
			followStatuss, // 跟进状态
			principal: [],
			filterData: {
				followStatuss: '', // 跟进状态
				gradeCodes: [], // 客户级别
				makeBargainCodes: [], // 成交状态
				sourceCodes: [] // 来源
			}
		}
	},
	computed: {
		CRM_KHJB () {
			return this.dictionaryOptions('CRM_KHJB')
		},
		CRM_CJZT () {
			return this.dictionaryOptions('CRM_CJZT')
		},
		CRM_LY () {
			return this.dictionaryOptions('CRM_LY')
		}
	},
	methods: {
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
