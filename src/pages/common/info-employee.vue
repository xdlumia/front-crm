<!--
/**
* @author 王晓冬
* @name 附件
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="团队成员" color="#4889f4" url="/pages/index/colleagueChoose">
            <div class="detail-list d-flex-lr bb">
                <image class="detail-list-img" data-name="徐丽丽" src="" alt=""></image>
                <p>
                    <b class="f16">徐丽丽</b>
                    <span class="f12 d-text-qgray">负责人</span>
                </p>
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
