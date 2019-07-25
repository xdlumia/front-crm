<template>
	<view>
		<NavBar title="企业管理" />
		<view class="company-font m10" style="color: #0074D9;">{{companyName}}</view>
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in depts" :key="item.id">
					<view>
						<radio :value="item.id" :checked="index === current" />
					</view>
					<view class="this-font pr15">{{item.deptName}}</view>
				</label>
			</radio-group>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;text-align: center;">
			<button class="this-font" style="background-color: #0074D9;width: 100%;" type="primary">确定</button>
		</view>
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
		// 点击最后一级时触发该事件
		/* treeItemClick(item) {
				let {
					id,
					name,
					parentId
				} = item;
				uni.showModal({
					content: `点击了${parentId.length+1}级菜单, ${name}, id为${id}, 父id为${parentId.toString()}`
				})
				console.log(item)
			} */
	}
}
</script>

<style>
	.this-font{
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
	}
	.company-font{
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 13px;
	}
</style>
