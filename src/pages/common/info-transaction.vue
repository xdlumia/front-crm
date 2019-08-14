<!--
/**
* @author 王晓冬
* @name 成交记录
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="成交记录" color="#3cc695" :url="`/pages/transaction/transaction-add?busType=${query.busType}&name=${query.name}&id=${query.busId}&clientId=${query.clientId || ''}&chanceId=${query.chanceId || '55'}`">
            <div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
			<div v-else>
				<div class="detail-list d-flex" v-for="(item,index) in list" :key='index'>
					<div class="">
						<p class="f12 d-elip d-text-gray">{{item.name}}</p>
						<p class="f12 d-elip d-text-black">
							成交金额（元）<span class="ml10 d-text-gray">{{item.totalAmount}}元</span>
						</p>
					</div>
					<div class="hfull d-center">
						<span class="f14  d-text-qgray mt5">{{item.transactionStatus | dictionary('CRM_CJZT')}}</span>
					</div>
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
	computed: {
	},
	data () {
		return {
			list: []
		}
	},
	onLoad (option) {
	},
	onReady () {
		uni.$on('updatetransList', (data) => {
			this.transactionrecordQueryRecordListById()
		})
	},
	methods: {
		transactionrecordQueryRecordListById () {
			this.$api.seeCrmService.transactionrecordQueryRecordListById({ id: this.query.busId, type: this.query.busType }).then(res => {
				if (res.code === 200) {
					this.list = res.data || []
				}
			})
		}
	},
	created () {
		this.transactionrecordQueryRecordListById()
	}
}
</script>

<style scoped lang="scss">
.detail-list{justify-content: space-between}
</style>
