<template>
	<view>
		<NavBar title="选择角色" />
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in roles" :key="item.id">
					<view style="width:15%">
						<radio :value="item.id" :checked="index === current" />
					</view>
					<view class="fl" style="width:85%">
						<view >{{item.name}}</view>
						<view style="color: #999999">管理范围: {{item.scopeControl}}</view>
						<view style="color: #999999">权限：{{item.permissions}}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<i-button style="position: fixed;bottom: 0;" class="wfull" type="primary">确定</i-button>
	</view>
</template>

<script>
export default {
	data () {
		return {
			current: 0,
			roles: [
				{
					id: 0,
					name: '管理员', // 名称
					scopeControl: '全公司', // 管理范围
					permissions: '全部'// 权限
				},
				{
					id: 1,
					name: '销售主管', // 名称
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
		radioChange: function (evt) {
			for (let i = 0; i < this.roles.length; i++) {
				if (this.roles[i].id === evt.target.id) {
					this.current = i
					break
				}
			}
		}
	}
}
</script>

<style>
</style>
