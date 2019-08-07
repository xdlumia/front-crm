<!-- 更多条目 -->
<!-- 王晓冬 -->
<template>
<div class="d-bg-white">
    <NavBar title="添加更多标签"/>
	<scroll-view style="height:calc(100vh - 115px)" scroll-y>
        <i-input
        v-model="labelTitle"
        v-if="isEdit"
        disabled
        class="mb10"
        placeholder="来源"
        label="标签名称">
        </i-input>

        <i-input
        :label-width="isEdit?30:0"
        :disabled="!isEdit"
        v-model="item.labelName"
        v-for="(item, index) in tagList"
        :key="index"
        placeholder="请输入选项名称"
        @focus="focusChange(item,index)">
            <div slot="label" v-show="isEdit" @click="deleteMoreList(item.labelName)" class="uni-icon uni-icon-minus-filled f18 d-text-red"></div>
            <m-checkbox :max="5" v-if="!isEdit" v-model="selCheked"  :label="item.id" />
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
		<p class="f12 d-text-qgray pl15 mt10 mb10"><i class="uni-icon uni-icon-info-filled f12 mr5"></i>标签创建上限15，标签选择上限为5</p>
	</scroll-view>
	<!-- 客户 -->
    <div class="footer-fixed-menu">
      <i-button size="16" @click="submitForm()" type="primary">保存</i-button>
    </div>
</div>
</template>
<script>
let tagTitle = {
	0: '客户来源',
	1: '联系人来源',
	2: '销售机会来源',
	3: '成交来源'
}
export default {
	components: {
	},
	data () {
		return {
			// 标签列表
			tagList: [],
			selCheked: [],
			// 是否编辑
			isEdit: false,
			// 业务类型(0客户，1联系人，2机会，3成交)
			busType: ''

		}
	},
	onLoad (option) {
		this.busType = option.busType
		// 获取标签列表
		this.lableinfoList({ busType: this.busType })
	},
	methods: {
		submitForm () {
			// 如果是当前是编辑状态保存标签列表
			if (this.isEdit) {
				let tagParams = []
				for (let item of this.tagList) {
					if (!item.labelName) {
						uni.showToast({ title: '标签名称没有填写', icon: 'none' })
						return
					}
					tagParams.push({ busType: this.busType, labelName: item.labelName })
				}
				this.$api.seeCrmService.lableinfoSave(tagParams)
					.then(res => {
						this.isEdit = false
						// 获取标签列表
						this.lableinfoList({ busType: this.busType })
					})
			} else {
				let checkArray = this.tagList.filter(item => this.selCheked.includes(item.id))
				// 多选状态下保存
				uni.$emit('moreTags', checkArray)
				// 返回上一页
				this.$routing.navigateBack()
			}
		},
		// 获取标签列表
		lableinfoList (params) {
			this.$api.seeCrmService.lableinfoList(params)
				.then(res => {
					this.tagList = res.data || []
				})
		},
		// 添加标签
		moreAdd () {
			this.isEdit = true
			if (this.tagList.length >= 15) {
				uni.showToast({ title: '最大只能添加15条', icon: 'none' })
				return
			}
			this.tagList.push({ labelName: '' })
		},
		deleteMoreList (index) {
			this.tagList.splice(index, 1)
		},
		// 当前光标数据显示清除按钮
		focusChange (row, index) {
			this.tagList.forEach(item => {
				item.focus = false
			})
			row.focus = true
			this.tagList.splice(index, 1, row)
		},
		// 清空当前行
		clear (row, index) {
			row.labelName = ''
			this.tagList.splice(index, 1, row)
		}
	},
	created () {

	},
	computed: {
		labelTitle () {
			return tagTitle[this.busType]
		}
	},
	watch: {
		selCheked: {
			handler (val) {
				if (val.length === 5) {
					uni.showToast({ title: '最大只能选择5条', icon: 'none' })
				}
			},
			deep: true
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
