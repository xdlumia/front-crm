<template>
    <div>
        <NavBar title="机会" :isSearch="true" placeholder="输入销售机会客户名称"/>
        <!-- 列表内容 -->
		<scroll-list
		ref="scrollList"
		height="calc(100vh - 100px)"
		api="bizSystemService.getUserAuth"
		:params="queryForm"
		v-slot="{row}">
			<div @click="openDetail(row)" class="chance-item uni-flex uni-row">
				<div class="flex-item item-progress">
					<circleProgress width="45px" :max="5" :progress="row.name" />
				</div>
				<div class="flex-item item-info d-elip">
					<h4 class="d-elip">{{row.name}}车公庄地铁 文华园小区朝南一局560万车公庄地铁 文华园小区朝南一局560万</h4>
					<p class="d-text-gray d-elip">华为技术有限公司</p>
					<div>
					<time class="d-text-gray f12 fl">2019-04-4</time>
					<span class="f14 fr">¥5,000,000.00</span>
					</div>
				</div>
			</div>
		</scroll-list>
    </div>
</template>

<script>
// import mPager from '@/components/m-pager-tip' // 页面加载提示组件
// import Pager from '@/utils/pager.js' // 翻页组件
import scrollList from '@/utils/scroll-list.js' //
export default {
	mixins: [scrollList],
	components: {
		// mPager
	},
	data () {
		return {
			queryForm: { limit: 10, page: 1 }
		}
	},
	onLoad (option) {
	},
	methods: {
		// // 滚动到顶部刷新
		// scrolltoupper (e) {
		// 	console.log(e)
		// },
		// // 滚动到底部加载
		// scrolltolower (e) {
		// 	console.log(e)
		// },
		// 打开列表详情
		openDetail (index) {
			this.$routing.navigateTo('./detail/index')
		}

	},
	// // 监听用户下拉动作，一般用于下拉刷新
	// onPullDownRefresh  () {
	// 	this.$refs.list.reload()
	// 	wx.vibrateShort()
	// 	wx.stopPullDownRefresh()
	// },
	// // 页面上拉触底事件的处理函数
	// onReachBottom () {
	// 	this.$refs.list.getNextPage()
	// },
	created () {}
}
</script>

<style scoped lang="scss">
.chance-item{
    border-bottom:1px solid #efefef;
    background-color:#fff;
    padding:10px;
    .item-progress{ display: flex; align-items: center; margin-right:10px; }
    .item-info{font-size:14px; color:#333}
 }
</style>
