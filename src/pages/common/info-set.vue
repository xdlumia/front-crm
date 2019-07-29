<!-- 更多条目 -->
<!-- 王晓冬 -->
<template>
<div class="d-bg-white">
    <NavBar title="添加更多条目"/>
	<scroll-view style="height:calc(100vh - 115px)" scroll-y>
		<radio-group class="uni-list" @change="onChange">
			<i-cell-group>
				<i-cell v-for="(item, index) in 30" :key="index" :title="`测试${index}`">
					<radio slot="footer" value="32" :checked="item.checked" />
				</i-cell>
			</i-cell-group>
		</radio-group>
	</scroll-view>
	<!-- 客户 -->
    <div class="footer-fixed-menu d-center d-bg-white bt">
      <div class="d-cell ac">
        <span class="ml5 f16 b d-text-gray d-text-blue">重置</span>
      </div>
      <div class="d-cell ac d-bg-blue">
        <span class="ml5 f16 b d-text-white">确定</span>
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
			statusTypes: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			status: ''

		}
	},
	onLoad (option) {
	},
	methods: {
		onChange (e) {
			this.status = e.detail.value
		}
	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>

</style>
