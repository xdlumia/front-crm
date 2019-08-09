<!--
/**
* @author王艳龙
* @name 选择部门
* @date 2019年8月2日
**/
-->
<template>
	<view>
		<NavBar title="选择部门" />
		<view class="p10 d-bg-gray d-text-blue">{{companyName}}</view>
		<scroll-list
				api="seeCrmService.organizationalStructureDepts"
				:params="queryForm"
				@getList='getDepts'
				ref='depts'>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item) in depts" :key="item.id">
						<view style="width:15%">
							<radio :value="item.id" :checked="item.id == deptId" />
						</view>
						<view class="fl" style="width:85%">{{item.deptName}}</view>
					</label>
				</radio-group>
			</view>
		</scroll-list>
		<i-button style="position: fixed;bottom: 0;" class="wfull" type="primary" @click="makeSure">确定</i-button>
	</view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			queryForm: {
				page: 1,
				limit: 100
			},
			current: 0,
			deptId: 0,
			depts: [],
			companyName: '北京凡特仁有限公司'
		}
	},
	onLoad (option) {
		// 设置默认选中
		if (option.deptId) {
			this.deptId = option.deptId
		}
	},
	methods: {
		radioChange: function (evt) {
			for (let i = 0; i < this.depts.length; i++) {
				if (parseInt(this.depts[i].id) === parseInt(evt.target.value)) {
					this.current = i
					break
				}
			}
		},
		// 獲取部門列表
		getDepts (depts) {
			this.depts = depts
		},
		// 确定
		makeSure () {
			uni.$emit('backFromOrg', JSON.stringify(this.depts[this.current]))
			this.$routing.navigateBack()
		}
	}
}
</script>

<style>

</style>
