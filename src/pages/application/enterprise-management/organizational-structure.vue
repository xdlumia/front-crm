<template>
	<view>
		<NavBar title="组织架构" />
		<view class="m10" style="color: #0074D9;">{{companyName}}</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in depts" :key="item.id">
					<view style="width:15%">
						<radio :value="item.id" :checked="index === current" />
					</view>
					<view class="fl" style="width:85%">{{item.deptName}}</view>
				</label>
			</radio-group>
		</view>
		<i-button style="position: fixed;bottom: 0;" class="wfull" type="primary">确定</i-button>
	</view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			current: 0,
			depts: [
				{
					id: 0,
					deptName: '全公司'
				},
				{
					id: 1,
					deptName: '销售部'
				},
				{
					id: 2,
					deptName: '市场部'
				}
			],
			list: [],
			companyName: '北京凡特仁有限公司'
		}
	},
	onLoad () {
		/* setTimeout(()=>{
				this.list = testList;
			}, 300) */
	},
	methods: {
		radioChange: function (evt) {
			for (let i = 0; i < this.depts.length; i++) {
				if (this.depts[i].id === evt.target.id) {
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
