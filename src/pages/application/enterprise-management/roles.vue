<template>
	<view>
		<NavBar title="企业管理" />
		<view class="uni-flex uni-column" v-for="(item,index) in roles" :key="item.id">
			<view class="flex-item flex-item-V bb p10" :class="{'active':isActive==index}" @touchstart="changBlue(index)">
				<view class="p5 name-font">{{item.name}}</view>
				<view class="p5 tip-font">管理范围: {{item.scopeControl}}</view>
				<view class="p5 tip-font">权限：{{item.permissions}}</view>
			</view>
        </view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			isActive: 0,
			roles: [
				{
					id: 0,
					name: '管理员', // 名称
					scopeControl: '全公司', // 管理范围
					permissions: '全部'// 权限
				},
				{
					id: 1,
					name: '销售总监', // 名称
					scopeControl: '销售部', // 管理范围
					permissions: '全部'// 权限
				},
				{
					id: 2,
					name: '销售员', // 名称
					scopeControl: '个人', // 管理范围
					permissions: '全部'// 权限
				}
			]
		}
	},
	methods: {
		changBlue (index) {
			this.isActive = index
		}
	}
}
</script>

<style>
	.name-font{
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		text-align: left;
	}
	.tip-font{
		font-size: 14px;
		color: #999999;
	}
	.active{
		background-color: #0080FF;
	}
</style>
