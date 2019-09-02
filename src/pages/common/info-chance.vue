/*
 * @Author: web.王晓冬
 * @Date: 2019-08-22 21:33:06
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-02 17:42:36
 * @Description: 详情机会列表
 */
<template>
    <div>
        <mPanel top="10" title="销售机会" color="#FFBA59" @click="click" :isUrl='isUrl'>
			<div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
            <div v-else class="detail-list uni-flex uni-row pb10" v-for="(item,index) of list" :key="index">
                <div class="flex-item item-progress mr10">
					<progressC :percentMax="stageListMax" :list="stageListAll" :row="item"/>
                    <!-- <circleProgress width="45px" :max="stageList.length" :progress="(stageList.findIndex(row => row.id == item.stageId)+1)" /> -->
                </div>
                <div class="flex-item d-elip wfull">
                    <div class="d-elip">{{item.chanceName}}</div>
                    <!-- <div class="d-elip d-text-qgray f12">{{formatStage(item)}}</div> -->
                    <div class="d-elip d-text-qgray f12">{{item.stateName}}</div>
                </div>
                <div class="flex-item item-progress" style="width:110px">
                    <div class="d-elip f12">{{item.createTime | timeToStr('y年m月d日')}}</div>
					<div class="d-elip d-text-qgray f14">{{item.salesMoney}} 元</div>
                </div>
            </div>
        </mPanel>
    </div>
</template>

<script>
import progressC from '@/pages/chance/component/progress'
export default {
	props: {
		query: {
			type: Object
		},
		isUrl: {
			type: Boolean,
			default: true
		}
	},
	components: {
		progressC
	},
	data () {
		return {
			list: [],
			stageList: [], // 内置阶段
			stageListAll: [] // 全部阶段
		}
	},
	onLoad (option) {
	},
	created () {
		this.saleschanceQueryList()
		this.salesstageQueryList()
	},
	computed: {
		stageListMax () {
			return this.stageList.length
		}
	},
	methods: {
		// 获取联系人列表
		saleschanceQueryList () {
			this.$api.seeCrmService.saleschanceQueryList({ busId: this.query.busId, busType: this.query.busType })
				.then(res => {
					this.list = res.data || []
				})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList()
				.then(res => {
					let data = res.data || []
					data.forEach(item => {
						item.name = item.stageName
					})
					this.stageList = data.filter(item => +item.isOriginal === 0)
					this.stageListAll = data
				})
		},
		click () {
			uni.$once('addChance', data => {
				this.saleschanceQueryList()
			})
			this.$routing.navigateTo(`/pages/chance/add-chance?clientId=${this.query.busId}&clientName=${this.query.name}`)
		}
	}

}
</script>

<style scoped lang="scss">

</style>
