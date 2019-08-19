<!--
/**
* @author 详细信息
* @date 2019年7月299日
-->
<template>
    <div class="hfull d-auto-y" :style="{height:height}">
        <mPanel title="基本信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label="姓名">{{detailInfo.linkmanName}}</m-list>
            <m-list label="负责人">{{detailInfo.leaderName}}</m-list>
            <m-list label="公司名称">{{detailInfo.clientName}}</m-list>
        </mPanel>
		<mPanel title="联系信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label="手机">{{detailInfo.mobile}}</m-list>
            <m-list label="地址">{{detailInfo.address}}</m-list>
        </mPanel>
		<mPanel title="其他信息" bg="#f8f9fc" :isUrl='false'>
            <m-list label="最后跟进">{{detailInfo.followUpTime | timeToStr}}</m-list>
            <m-list label="最新修改">{{detailInfo.modifyTime | timeToStr}}</m-list>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['height', 'detailInfo'],
	components: {
		// mPager
	},
	data () {
		return {
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
