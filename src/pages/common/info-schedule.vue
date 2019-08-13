<!--
/**
* @author 王晓冬
* @name 日程
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="日程" color="#4889f4" :url="`/pages/index/scheduleAdd?busType=${query.busType}&name=${query.name}&id=${query.busId}`">
            <div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
            <div class="detail-list">
                <p class="f13 d-elip d-text-gray">明天粉色扥发东风东</p>
                <p class="f12 d-elip d-text-gray">2019/01/03 13:20 至2019/01/31 15:20</p>
                <p class="f12 d-elip d-text-blue" style="background-colr:#efefef"><i-icon type="coordinates" size="18" color="#4788F4" />我是尝尝的遗传地址</p>
            </div>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['query'],
	components: {

	},
	data () {
		return {
			list: []
		}
	},
	onLoad (option) {

	},
	created () {
		this.scheduleQueryRecordListById()
	},
	methods: {
		scheduleQueryRecordListById () {
			this.$api.seeCrmService.scheduleQueryRecordListById({ id: this.query.busId, type: this.query.busType }).then(res => {
				if (res.code === 200) {
					console.log(res)
					// this.list = res.data || []
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">

</style>
