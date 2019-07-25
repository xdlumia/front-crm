<template>
    <div>
        <NavBar title="机会销售详情"/>
        <!-- 列表内容 -->
        <div class="pl10 pr10 pt10" style="background-color:#f9f9f9; height:100vh">
			<!-- 顶部信息 -->
			<div class="chance-datail-title f13">
				<div class="uni-flex uni-row">
					<div class="flex-item d-elip wfull f16" style="color:#333">车公庄地铁 文华园小区朝南一局560万车公庄地铁 文华园小区朝南一局560万</div>
					<div class="flex-item datail-handle">
						<i-icon type="brush" size="18" color="#1890FF" />
						<i-icon type="like" size="20" class="ml15" color="#1890FF" />
					</div>
				</div>
				<div>客户名称: {{detailInfo.name}}</div>
				<div>负责人: {{detailInfo.name}}</div>
				<div>销售金额(元): {{detailInfo.name}}</div>
			</div>

			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap(index)">
					<text class="uni-tab-item-title" :class="currIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</scroll-view>
			<swiper :current="currIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
				<swiper-item>
					1
				</swiper-item>
				<swiper-item>
					2
				</swiper-item>
				<swiper-item>
					3
				</swiper-item>
			</swiper>
		</div>
    </div>
</template>

<script>
export default {

	components: {
		// mPager
	},
	data () {
		return {
			detailInfo: {
				name: '客户名称'
			},
			tabBars: [{
				name: '跟进记录',
				id: 'guanzhu'
			}, {
				name: '详细信息',
				id: 'tuijian'
			}, {
				name: '详细信息',
				id: 'tuijian'
			}],
			currIndex: 0
		}
	},
	onLoad (option) {
	},
	methods: {
		ontabtap (e) {
			console.log(e)
			// let index = e.target.dataset.current || e.currentTarget.dataset.current
			this.currIndex = e
		},
		ontabchange (e) {
			let index = e.target.current || e.detail.current
			this.currIndex = index
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
.chance-datail-title{
	background-color:#fff;
	color:#666;
	.datail-handle{ min-width: 60px}
}
.uni-tab-item-title-active{color:red}
</style>
