<!--
/**
* @author 王晓冬
* @name 日程
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="日程" color="#4889f4" url="/pages/index/scheduleAdd">
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
