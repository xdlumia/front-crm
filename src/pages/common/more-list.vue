<!-- 更多条目 -->
<!-- 王晓冬 -->
<template>
<div class="d-bg-white">
    <NavBar title="添加更多条目"/>
	<scroll-view style="height:calc(100vh - 115px)" scroll-y>
		<i-cell-group>
			<i-cell v-for="(item, index) of fieldList" :key="index" :title="item.fieldName">
				<m-checkbox v-model="selList" slot="footer" :label="item.id" />
			</i-cell>
		</i-cell-group>
	</scroll-view>
	<!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt">
      <div class="d-cell ac">
        <span class="ml5 f16 b d-text-gray d-text-blue" @click="resetField()">重置</span>
      </div>
      <div class="d-cell ac d-bg-blue">
        <span class="ml5 f16 b d-text-white" @click="saveField()">确定</span>
      </div>
    </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			// 全部字段列表
			fieldList: [],
			// 选中的字段列表
			selList: [],
			busType: '',
			busId: ''
		}
	},
	onLoad (option) {
		this.busType = option.busType
		let params = {
			busType: option.busType,
			isEnabled: option.isEnabled
		}

		this.formsfieldconfigQueryList(params)
	},
	methods: {
		// 获取表单字典配置列表
		formsfieldconfigQueryList (params) {
			this.$api.seeCrmService.formsfieldconfigQueryList(params)
				.then(res => {
					this.fieldList = res.data || []
					this.selList = this.fieldList.map(item => {
						if (item.isEnabled === 0) {
							return item.id
						}
					})
				})
		},
		// 重置选中字段
		resetField () {
			this.selList = []
		},
		// 保存字段
		saveField () {
			let params = this.fieldList.filter(item => this.selList.includes(item.id))
			this.$api.seeCrmService.formsfieldconfigSave(params)
				.then(res => {

				})
		}
	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>

</style>
