<!--
/**
* @author 王晓冬
* @name 联系人
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel title="联系人" color="#7765cc" url="/pages/contact/index?select=1">
            <div class="detail-list">
                <div class="list-title">
                    <title>黄玉里</title> <span class="d-text-qgray">总精力</span>
                    <span @click="callPhone(18210256005)" class="fr iconfont iconcall f18 d-text-gray" ></span>
                </div>
                <p class="f12 d-elip d-text-qgray">华为技术有限公司</p>
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
