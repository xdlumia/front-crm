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
				api="enterpriseManagementService.getDepts"
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
			let pages = getCurrentPages()
			// 获取当前页面js里面的pages里的所有信息。
			let prevPage = pages[ pages.length - 2 ]
			// prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
			prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
				deptId: this.depts[this.current].id,
				deptName: this.depts[this.current].deptName,
				backFromOrg: true
			})
			// 上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕
			// 最后就是返回上一个页面。
			uni.navigateBack({
				delta: 1 // 返回上一级页面。
			})
			// 此时页面数据已经改变为我们传递过来的数据。如果想要返回之后处理这些数据，那么要在onShow函数里执行，因为我们执行的是返回，所以不会触发onLoad函数，所以我们要在onShow里执行我们想要使用的函数。
		}
	}
}
</script>

<style>

</style>
