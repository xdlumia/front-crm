<template>
    <div>
        <NavBar title="机会" :isSearch="true" placeholder="输入销售机会客户名称"/>
        <!-- 列表内容 -->
        <view style="height:calc(100vh - 100px)" >
            <change-list :data="index" v-for="(item,index) of 25" @click="openDetail(item)" :key="index"></change-list>
			<!-- <mPager :list="list" :pager="pager" /> -->
        </view>
    </div>
</template>

<script>
export default {
	components: {
		// mPager
	},
	data () {
		return {
			// list: [{ name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 } ],
			query: {}
		}
	},
	onLoad (option) {
	},
	methods: {
		/** 获取客户列表 */
		async getList () {
			return this.$api.bizSystemService.getUserAuth()
		},

		// // 滚动到顶部刷新
		// scrolltoupper (e) {
		// 	console.log(e)
		// },
		// // 滚动到底部加载
		// scrolltolower (e) {
		// 	console.log(e)
		// },
		// 打开列表详情
		openDetail ({ id }) {
			this.$routing.navigateTo('/pages/customer/detail?id=' + id)
		}

	},
	created () {}
}
</script>

<style scoped lang="scss">

</style>
