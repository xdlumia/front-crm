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
			isActive: 0,
			current: '管理员',
			position: 'left',
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
		handleFruitChange ({ detail = {} }) {
			this.setData({
				current: detail.value
			})
		},
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
