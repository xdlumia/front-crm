<!--
/**
* @author 王晓冬
* @name 销售机会
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel title="销售机会" color="#7765cc">
			<div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
            <div class="detail-list uni-flex uni-row pb10" v-for="(item,index) of list" :key="index">
                <div class="flex-item item-progress mr10">
                    <circleProgress width="45px" :max="stageList.length" :progress="(stageList.findIndex(row => row.id == item.stageId)+1)" />
                </div>
                <div class="flex-item d-elip wfull">
                    <div class="d-elip">{{item.chanceName}}</div>
                    <!-- <div class="d-elip d-text-qgray f12">{{formatStage(item)}}</div> -->
                    <div class="d-elip d-text-qgray f12">12</div>
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
export default {
	props: ['query'],
	components: {
		// mPager
	},
	data () {
		return {
			list: [],
			stageList: []
		}
	},
	onLoad (option) {
	},
	created () {
		this.saleschanceQueryList({ busId: this.query.busId, busType: this.query.busType })
		this.salesstageQueryList()
	},
	methods: {
		// 获取联系人列表
		saleschanceQueryList (params) {
			this.$api.seeCrmService.saleschanceQueryList(params)
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
					this.stageList = data
				})
		}
		// formatStage (row) {
		// 	let [ stage ] = this.stageList.filter(row => row.id === item.stageId)
		// 	return 'stage.stageName || '''
		// }

	}

}
</script>

<style scoped lang="scss">

</style>
