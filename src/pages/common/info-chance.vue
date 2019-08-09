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
            <div class="detail-list uni-flex uni-row pb10">
                <div class="flex-item item-progress mr10">
                    <circleProgress width="45px" :max="5" :progress="2" />
                </div>
                <div class="flex-item d-elip">
                    <div class="d-elip">购买房源6603A/500W</div>
                    <div class="d-elip d-text-qgray f12">销售阶段2 /需求确定</div>
                </div>
                <div class="flex-item item-progress">
                    <div class="d-elip f12">2019年06月04日</div>
                    <div class="d-elip d-text-qgray f14">2,222.00 元</div>
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
			contactList: []
		}
	},
	onLoad (option) {
	},
	created () {
		this.linkmanQueryList(this.query)
	},
	methods: {
		// 获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryList(params)
				.then(res => {
					this.contactList = res.data || []
				})
		}
	}

}
</script>

<style scoped lang="scss">

</style>
