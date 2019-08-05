<!--
/**
* @author 王晓冬
* @name 附件
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="附件" color="#4889f4" url @add="handle">
            <div class="detail-list">
                <p class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> 我是附件名称</p>
                <p class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> 我是附件名称</p>
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
