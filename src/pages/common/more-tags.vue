<!-- 更多条目 -->
<!-- 王晓冬 -->
<template>
<div class="d-bg-white">
    <NavBar title="添加更多标签"/>
	<scroll-view style="height:calc(100vh - 115px)" scroll-y>
        <i-input
        v-model="labelName"
        v-if="isEdit"
        disabled
        class="mb10"
        placeholder="销售机会来源"
        @focus="focusChange(item,index)"
        label="标签名称">
        </i-input>

        <i-input
        :label-width="isEdit?30:0"
        :disabled="!isEdit"
        v-model="item.name"
        v-for="(item, index) in statusTypes"
        :key="index"
        placeholder="请输入选项名称"
        @focus="focusChange(item,index)">
            <div slot="label" v-show="isEdit" @click="deleteMoreList(index)" class="uni-icon uni-icon-minus-filled f18 d-text-red"></div>
            <m-checkbox v-if="!isEdit" v-model="check"  :label="index" />
            <span v-if="isEdit" class="d-block ar" style="width:90px;">
                <i @click="clear(item,index)" v-if="item.focus" class="uni-icon uni-icon-clear mr10 f18 d-text-qgray"></i>
                <i class="uni-icon uni-icon-bars f18 ml10"></i>
            </span>
        </i-input>
        <i-cell>
            <p @click="moreAdd">
                <uni-icon type='plus-filled' size='18' color='#4889F4' />
                <span class="d-text-black ml10">添加标签选项</span>
            </p>
        </i-cell>
	</scroll-view>
	<!-- 客户 -->
    <div class="footer-fixed-menu">
      <i-button size="16" type="primary">保存</i-button>
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
			status: '',
			check: [1],
			isEdit: false,
			labelName: ''

		}
	},
	onLoad (option) {
		console.log('onLoad')
	},
	methods: {
		// 获取标签列表
		lableinfoList () {
			this.$api.seeCrmService.lableinfoList()
				.then(res => {

				})
		},
		// 添加标签
		moreAdd () {
			this.isEdit = false
			this.statusTypes.push({ name: '', id: 1 })
		},
		deleteMoreList (index) {
			this.statusTypes.splice(index, 1)
		},
		// 当前光标数据显示清除按钮
		focusChange (row, index) {
			this.statusTypes.forEach(item => {
				item.focus = false
			})
			row.focus = true
			this.statusTypes.splice(index, 1, row)
		},
		// 清空当前行
		clear (row, index) {
			console.log(row)
			row.name = ''
			this.statusTypes.splice(index, 1, row)
		}
	},
	created () {
		this.lableinfoList()
	},
	computed: {
	}
}
</script>

<style lang="scss" scoped>

</style>
