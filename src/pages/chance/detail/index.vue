<template>
    <div>
        <NavBar title="机会销售详情"/>
        <!-- 列表内容 -->
        <div class="pl10 pr10 pt10" style="background-color:#f9f9f9">
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

			<uniTabs
				:TabList="['跟进记录','详细信息','相关信息']"
				:currentTab="currentTab"
				@tabs="tabsChange"
			>
			</uniTabs>
			<!-- <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">

				<view v-for="(tab,index) in ['跟进记录','详细信息','相关信息']" :key="tab" class="uni-tab-item" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="currentTab==index ? 'uni-tab-item-title-active' : ''">{{tab}}</text>
				</view>
			</scroll-view> -->
			<swiper :current="currentTab" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
				<swiper-item class="swiper-item" v-for="(tab,index1) in 5" :key="index1">
					<scroll-view class="scroll-v list" scroll-y @scrolltolower="loadMore(index1)">
						<!-- #ifdef APP-PLUS-NVUE -->
						<refresh class="refresh" @refresh="onrefresh(index1)" @pullingdown="onpullingdown" :display="tab.refreshing ? 'show' : 'hide'">
							<div class="refresh-view">
								<image class="refresh-icon" :src="refreshIcon" :style="{width: (tab.refreshing || pulling) ? 0: '32px'}" :class="{'refresh-icon-active': tab.refreshFlag}"></image>
								<image class="loading-icon" :src="loadingIcon" v-if="tab.refreshing"></image>
								<text class="loading-text">{{tab.refreshText}}</text>
							</div>
						</refresh>
						<!-- #endif -->
						<view v-for="(newsitem,index2) in tab.data" :key="newsitem.id">
							<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
						</view>
						<view class="loading-more">
							<text class="loading-more-text">{{tab.loadingText}}</text>
						</view>
					</scroll-view>
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
			tabs: [],
			currentTab: ''
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
.chance-datail-title{
	color:#666;
	.datail-handle{ min-width: 60px}
}
</style>
