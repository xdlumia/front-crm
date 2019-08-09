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
            <div class="detail-list uni-flex uni-row pb10" v-for="(item,index) of list" :key="index">
                <div class="flex-item item-progress mr10">
                    <circleProgress width="45px" :max="stageList.length" :progress="(stageList.findIndex(row => row.id == item.stageId)+1)" />
                </div>
                <div class="flex-item d-elip">
                    <div class="d-elip">{{item.chanceName}}</div>
                    <div class="d-elip d-text-qgray f12">销售阶段2 /需求确定</div>
                </div>
                <div class="flex-item item-progress">
                    <div class="d-elip f12">{{createTime | timeToStr}}</div> <div class="d-elip d-text-qgray f14">{{item.salesMoney}} 元</div>
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
		this.saleschanceQueryListt(this.query)
		this.salesstageQueryList()
	},
	methods: {
		// 获取联系人列表
		saleschanceQueryListt (params) {
			this.$api.seeCrmService.saleschanceQueryListt(params)
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

	}

}
</script>

<style scoped lang="scss">

</style>
