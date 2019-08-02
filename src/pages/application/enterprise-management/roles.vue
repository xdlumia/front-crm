<!--
/**
* @author王艳龙
* @name 选择角色
* @date 2019年8月2日
**/
-->
<template>
	<view>
		<NavBar title="选择角色" />
		<scroll-list
				api="enterpriseManagementService.getRoles"
				:params="queryForm"
				@getList='getRoles'
				ref='roles'>
			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item) in roles" :key="item.id">
						<view>
							<checkbox :value="item.id" :checked="item.checked" />
						</view>
						<view style="width:85%">
							<view >{{item.roleName}}</view>
							<view style="color: #999999">管理范围: 全公司</view>
							<view style="color: #999999">权限：全部</view>
						</view>
					</label>
				</checkbox-group>
			</view>
		</scroll-list>
		<i-button style="position: fixed;bottom: 0;" class="wfull" type="primary" @click="makeSure">确定</i-button>
	</view>
</template>

<script>
export default {
	data () {
		return {
			current: 0,
			roles: [],
			roleId: 0,
			ckeckedRoleIds: [],
			ckeckedRoles: []
		}
	},
	onLoad (option) {
		// 回显选中角色
		if (option.roleList) {
		}
	},
	methods: {
		checkboxChange: function (e) {
			var items = this.roles
			var values = e.detail.value
			this.ckeckedRoleIds = values
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				if (values.includes(item.id)) {
					this.$set(item, 'checked', true)
				} else {
					this.$set(item, 'checked', false)
				}
			}
		},
		// 获取列表数据
		getRoles (roles) {
			this.roles = roles
		},
		// 确定
		makeSure () {
			var items = this.roles
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				if (this.ckeckedRoleIds.includes('' + item.id)) {
					this.ckeckedRoles.push(item)
				}
			}
			// 返回参数给上一级页面
			let pages = getCurrentPages()
			let prevPage = pages[ pages.length - 2 ]
			prevPage.setData({
				ckeckedRoles: this.ckeckedRoles,
				backFromRole: true
			})
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style>
</style>
