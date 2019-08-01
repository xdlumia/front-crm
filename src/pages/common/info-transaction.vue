<!--
/**
* @author 王晓冬
* @name 成交记录
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="成交记录" color="#3cc695" url="/pages/transaction/index">
            <div class="detail-list">
                <p class="f12 d-elip d-text-gray">购买房源6603A/500W</p>
                <p class="f12 d-elip d-text-gray">
                    成交金额（元）5,000.00
                    <span class="f14">成交</span>
                </p>
            </div>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['id', 'busType'],
	components: {
		// mPager
	},
	data () {
		return {
			list: []
		}
	},
	onLoad (option) {
	},
	methods: {
	},
	created () {}
}
</script>

<style scoped lang="scss">

</style>
