<template>
	<view>
		<NavBar title="企业管理" />
		<view class="uni-flex uni-column">
			<view class="flex-item flex-item-V p10 ba" @tap="toTeam">
				<view class="view-style" style="float: left;">团队申请</view>
				<view class="view-style" style="float: right;">></view>
			</view>
			<view class="flex-item flex-item-V p10 bb" @tap="toOrganization">
				<view class="view-style" style="float: left;">组织架构</view>
				<view class="view-style" style="float: right;">></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {

		}
	},
	onLoad (option) {

	},
	methods: {
		toTeam () {
			uni.navigateTo({
				url: 'team/index'
			})
		},
		toOrganization () {
			uni.navigateTo({
				url: 'organization/index'
			})
		}
	},
	created () {

	}
}
</script>

<style scoped lang="scss">
	.view-style{
		font-family: '微软雅黑';
		font-weight: 200;
		font-style: normal;
		line-height: 30px;
		font-size: 13px;
	}
</style>
