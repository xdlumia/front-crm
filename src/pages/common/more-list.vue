<!-- 更多条目 -->
<!-- 王晓冬 -->
<template>
<div class="d-bg-white">
    <NavBar title="添加更多条目"/>
	<scroll-view scroll-y :style="'height:calc(100vh - ' + navH +' - 50px)'">
		<p class="pt10 d-text-gray f13 ac" v-if="!fieldList.length">暂无数据</p>
		<i-cell-group>
			<i-cell v-for="(item, index) of fieldList" :key="index" :title="item.fieldName">
				<m-checkbox v-model="selList" slot="footer" :label="item.id" />
			</i-cell>
		</i-cell-group>
	</scroll-view>
	<!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt">
      <div class="d-cell ac" @click="resetField()">
        <span class="ml5 f16 b d-text-gray d-text-blue" >重置</span>
      </div>
      <div class="d-cell ac d-bg-blue" @click="saveField()">
        <span class="ml5 f16 b d-text-white" >确定</span>
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
			isEnabled: option.isEnabled,
			limit: 20,
			page: 1
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
			// 选中的参数isEnabled=0  没选中=1
			// this.fieldList.forEach(item => {
			// 	if (this.selList.includes(item.id)) {
			// 		item.isEnabled = 0
			// 	} else {
			// 		item.isEnabled = 1
			// 	}
			// })
			this.$api.seeCrmService.formsfieldconfigUpdateBatch({ busType: this.busType, ids: this.selList })
				.then(res => {
					if (res.code !== 200) return
					// 多选状态下保存
					uni.$emit('moreList')
					// 返回上一页
					this.$routing.navigateBack()
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
