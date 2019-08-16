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
				api="seeCrmService.organizationalStructureRoles"
				:params="queryForm"
				@getList='getRoles'
				ref='roles'>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item) in roles" :key="item.id">
						<view>
							<radio :value="item.id" :checked="ckeckedRoleIds.includes('' +item.id)" color="#4788F4"/>
						</view>
						<view style="width:85%">
							<view >{{item.roleName}}</view>
						</view>
					</label>
				</radio-group>
			</view>
		</scroll-list>
		<i-button style="position: fixed;bottom: 0;" class="wfull" type="primary" @click="makeSure">确定</i-button>
	</view>
</template>

<script>
export default {
	data () {
		return {
			queryForm: {
				page: 1,
				limit: 100
			},
			roles: [],
			roleId: 0,
			ckeckedRoleIds: [],
			ckeckedRoles: [],
			current: 0
		}
	},
	onLoad (option) {
		// 回显选中角色
		if (option.roleIds) {
			this.ckeckedRoleIds = option.roleIds
		}
	},
	methods: {
		radioChange: function (evt) {
			for (let i = 0; i < this.roles.length; i++) {
				if (parseInt(this.roles[i].id) === parseInt(evt.target.value)) {
					this.current = i
					break
				}
			}
		},
		// 获取列表数据
		getRoles (roles) {
			this.roles = roles
		},
		// 确定
		makeSure () {
			uni.$emit('backFromRole', JSON.stringify(this.roles[this.current]))
			this.$routing.navigateBack()

			// 返回参数给上一级页面
			// let pages = getCurrentPages()
			// let prevPage = pages[ pages.length - 2 ]
			// prevPage.setData({
			// 	ckeckedRoles: this.roles[this.current],
			// 	backFromRole: true
			// })
			// uni.navigateBack({
			// 	delta: 1
			// })
		}
	}
}
</script>

<style>
</style>
