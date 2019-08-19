<!--
/**
* @author 徐贺
* @name 日程
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="日程" color="#00BCD4" @click='click' :isUrl='isUrl'>
            <div class="detail-list ac f12 d-text-gray" v-if="list.length < 1">暂无数据</div>
			<div v-else>
				<div class="detail-list" v-for="(item,index) in list" :key="index">
					<p class="f13 d-elip d-text-gray">{{item.content || ''}}</p>
					<p class="f12 d-elip d-text-gray">{{item.startTime | timeToStr('yyyy-mm-dd hh:ii')}} 至 {{item.endTime | timeToStr('yyyy-mm-dd hh:ii')}}</p>
					<p class="f12 d-elip d-text-blue" style="background-colr:#efefef"><i-icon type="coordinates" size="18" color="#4788F4" />{{item.address || ''}}</p>
				</div>
			</div>
        </mPanel>
    </div>
</template>

<script>
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

	},
	data () {
		return {
			list: []
		}
	},
	onLoad (option) {

	},
	onReady () {

	},
	created () {
		this.scheduleQueryRecordListById()
	},
	methods: {
		scheduleQueryRecordListById () {
			this.$api.seeCrmService.scheduleQueryRecordListById({ id: this.query.busId, type: this.query.busType }).then(res => {
				if (res.code === 200) {
					this.list = res.data || []
				}
			})
		},
		click () {
			uni.$once('updateIndexList', (data) => {
				this.scheduleQueryRecordListById()
			})
			this.$routing.navigateTo(`/pages/index/scheduleAdd?busType=${this.query.busType}&name=${this.query.name}&id=${this.query.busId}`)
		},
		colleagueChoose () {
			this.scheduleQueryRecordListById()
		}
	}
}
</script>

<style scoped lang="scss">

</style>
