<template>
    <div>
        <NavBar title="机会" :isSearch="true" placeholder="输入销售机会客户名称"/>
		<!-- <filter-diy @submit='submit' @clear='clear' /> -->
		<Filter :filterData='filterData' @filterSubmit='submit' ref='filter' :top='navH'>
		</Filter>
		<!-- 步骤 -->
		<i-steps :current="current" class="change-steps d-fixed wfull pt5 pb5" :style="{top:`calc(${navH} + 39px)`}">
			<i-step @click="click" content='填写资料' />
			<i-step content='客服回电确认' />
			<i-step content='小程序开通' />
			<i-step content='登录/管理客户' />
		</i-steps>
		<!-- 统计 -->
		<div class="chance-sts bt d-fixed wfull" :style="{top:`calc(${navH} + 39px + 65px)`}">
			<li class="sts-item">1个商机</li>
			<li class="sts-item">222元</li>
			<li class="sts-item">赢率30%</li>
		</div>
        <!-- 列表内容 -->
		<scroll-list
		class="d-absolute wfull"
		:style="{top:`calc(${navH} + 39px + 65px + 35px)`}"
		height="`calc(100vh - ${navH} - 39px - 65px)`"
		api="bizSystemService.getUserAuth"
		:params="queryForm"
		v-slot="{ row }">
			<a url="./detail/index" class="chance-item uni-flex uni-row">
				<div class="flex-item item-progress">
					<circleProgress width="45px" :max="5" :progress="2" />
				</div>
				<div class="flex-item item-info d-elip">
					<h4 class="d-elip">{{row}}车公庄地铁 文华园小区朝南一局560万车公庄地铁 文华园小区朝南一局560万</h4>
					<p class="d-text-gray d-elip">华为技术有限公司</p>
					<div>
					<time class="d-text-gray f12 fl">2019-04-4</time>
					<span class="f14 fr">¥5,000,000.00</span>
					</div>
				</div>
			</a>
		</scroll-list>
    </div>
</template>

<script>
// import mPager from '@/components/m-pager-tip' // 页面加载提示组件
// import Pager from '@/utils/pager.js' // 翻页组件
import Filter from '@/components/filter'
export default {
	mixins: [],
	components: {
		Filter
	},
	data () {
		return {
			current: 0,
			queryForm: {
				limit: 10,
				page: 1
			}
		}
	},
	onLoad (option) {
	},
	methods: {
		click () {
			console.log(1)
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
.change-steps{
	background-color: #f9f9f9;
	z-index: 1;
	&.i-steps{padding:5px 0}
}
.chance-sts{
	height: 35px;
	line-height: 35px;
	font-size:13px;
	color:#666;
	background-color: #fff;
	box-sizing: border-box;
	padding-left:15px;
	border-bottom:1px solid #efefef;
	z-index: 1;
	.sts-item{
		display: inline-block;
		height: 15px;
		line-height: 15px;
		padding-right:5px;
		margin-right: 5px;
		border-right:1px solid #999;
	}
}
.chance-item{
    border-bottom:1px solid #efefef;
    background-color:#fff;
    padding:10px;
    .item-progress{ display: flex; align-items: center; margin-right:10px; }
    .item-info{font-size:14px; color:#333}
 }
</style>
