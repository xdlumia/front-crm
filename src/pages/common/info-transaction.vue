/*
 * @Author: web.王晓冬
 * @Date: 2019-08-01 18:13:09
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-03 22:19:26
 * @Description: 成交记录
 */
<template>
    <div>
        <mPanel top="10" title="成交记录" color="#1FC695"  @click='click' :isUrl='isUrl'>
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

	},
	created () {
		this.transactionrecordQueryRecordListById()
	},
	methods: {
		transactionrecordQueryRecordListById () {
			this.$api.seeCrmService.transactionrecordQueryRecordListById({ id: this.query.busId, type: this.query.busType }).then(res => {
				if (res.code === 200) {
					this.list = res.data || []
				}
			})
		},
		click () {
			uni.$off('updatetransList')
			uni.$once('updatetransList', (data) => {
				this.transactionrecordQueryRecordListById()
			})
			this.$routing.navigateTo(`/pages/transaction/transaction-add?busType=${this.query.busType}&name=${this.query.name}&id=${this.query.busId}`)
		}
	}

}
</script>

<style scoped lang="scss">
.detail-list{justify-content: space-between}
</style>
