<!-- /**
 * @author 冀猛超
 * @description 评分管理
 */ -->
<template>
	<div class="score-manage-page">
		<NavBar :title="`${typeform[busType]}评分`"/>

		<div class="pb20" v-for='(item, index) in scoreData' :key='index'>
			<div class='d-bg-white'>
				<i-select
					labelWidth='230'
					@handleLableClick='delItem(index)'
					:labelIcon='{type: "minus-filled", color: "#EB4D3D", size: 20}'
					:props="{label:'fieldName',value:'id'}"
					v-model='item.fieldConfigId'
					label="字段名称一"
					:options="fieldData"
					@input='getField($event, index)'
				/>
				<i-input
					labelWidth='150'
					:labelIcon='{type: "minus-filled", color: "#fff"}'
					i-class='ar pr5' label="权重" type='number'
					v-model='item.weight' placeholder="请输入"
				>
					<span class='pl5'>%</span>
				</i-input>
			</div>
			<div class='d-center score-rule pl15 pr15'>
				<div class="d-cell f13 d-text-black">评分规则条件</div>
				<div class="btn-score f12" @click='addChildField(index)'>添加</div>
			</div>

			<div class="mb5 d-bg-white" v-for='(subItem, subIndex) in item.fieldRuleEntityList' :key='subIndex'>

				<!-- filedType == 0 是填写数字 -->
				<i-input labelWidth='120' @handleLableClick='delItem(index, subIndex)' :labelIcon='{type: "minus-filled", color: "#EB4D3D", size: 20}' :label=" item.fieldDescribe + '一'" disabled v-if="item.filedType == 1">
					<div class='d-center' style='width:180px;'>
						<input
							type="number"
							v-model='subItem.minValue'
							class='input-box f13 d-text-black d-cell'
						/>
							<span class="ml5 mr5 d-text-qgray">-</span>
							<input type="number" v-model='subItem.maxValue' class='input-box d-text-black f13 d-cell'  />
					</div>
				</i-input>

				<!-- filedType == 1 是选择标签 -->
				<i-select
					v-if="item.filedType == 3"
					@handleLableClick='delItem(index, subIndex)'
					:labelIcon='{type: "minus-filled", color: "#EB4D3D", size: 20}'
					labelWidth='150' i-class='ar pr20'
					v-model='subItem.fieldAccordingTo'
					:props="{label:'content',value:'code'}"
					:label=" item.fieldDescribe + '一'"
					:options="subFieldData[index]"
				/>

				<i-input
					labelWidth='150'
					label="计算评分为"
					:labelIcon='{type: "minus-filled", color: "#fff"}'
					type='number' v-model='subItem.fieldGrade'
					placeholder="请输入"
					i-class='ar pr20'
				/>

			</div>
			<div v-if='item.fieldRuleEntityList.length' class='d-bg-white'>
				<i-input labelWidth='200' label="否则，计算项的评分为" :labelIcon='{type: "minus-filled", color: "#fff"}' type='number' v-model='item.elseFieldGrade' placeholder="请输入" i-class='ar pr20' ></i-input>
			</div>
		</div>

		<div class="d-center mt20" style='padding-bottom: 80px;'>
			<div class="btn-score f12" @click="addParentField">添加更多字段</div>
		</div>

		<div class="footer-fixed-menu" >
            <i-button type="primary" @click='submit' i-class="f16">保存</i-button>
        </div>

	</div>
</template>
<script>
export default {
	data () {
		return {
			busType: '',
			fieldData: [],
			subFieldData: [],
			scoreData: [],
			scoreList: [],
			typeform: {
				'0': '客户',
				'1': '联系人',
				'2': '销售机会',
				'3': '成交记录'
			}
		}
	},
	onLoad (option) {
		this.busType = option.busType // busType

		this.getFormsfieldconfig(option.busType).then(res => {
			this.getWeightList(option.busType)
		})
	},
	methods: {
		async getFormsfieldconfig (busType) {
			let resulte = await this.$api.seeCrmService.formsfieldconfigQueryList({
				fieldTypes: [1, 3],
				busType
			})
			this.fieldData = resulte.data
			resulte.data.forEach(item => {
				+item.fieldType === 3 && item.groupCode && this.dictionaryOptions(item.groupCode)
			})
			return Promise.resolve()
		},
		// 获取列表
		getWeightList (busType) {
			this.$api.seeCrmService.fieldweightList({
				busType
			}).then(res => {
				// 设置 数据
				res.data.forEach((item, index) => {
					this.$set(this.subFieldData, index, [])
					this.setDisCodeData(item.groupCode, index)
				})

				this.scoreData = res.data
			})
		},
		// 添加 字段
		addParentField (index) {
			this.scoreData.push({
				busType: '',
				fieldConfigId: '',
				fieldDescribe: '',
				fieldName: '',
				fieldRuleEntityList: [],
				filedType: '',
				userDefinedType: '',
				weight: '',
				groupCode: '',
				elseFieldGrade: ''
			})

			// 添加子段 添加 空数据 用来展示字典数据
			this.subFieldData.push([])
		},
		// 添加 子项字段
		addChildField (index) {
			// 添加子项先判断是否选择了 字段
			if (!this.scoreData[index].fieldDescribe) {
				return this.$utils.toast.text('请先选择字段')
			}
			let len = this.scoreData[index].fieldRuleEntityList.length
			this.scoreData[index].fieldRuleEntityList.push({
				fieldAccordingTo: '',
				fieldGrade: '',
				fieldName: this.scoreData[index].fieldCode || '',
				fieldDescribe: this.scoreData[index].fieldDescribe,
				maxValue: '',
				minValue: '',
				sort: len + 1
			})

			// 设置 当前字段下 字段数据
			if (+this.scoreData[index].filedType === 3) {
				this.setDisCodeData(this.scoreData[index].groupCode, index, len)
			}
		},

		// 选择 字段
		getField (id, index) {
			let fieldItem = this.fieldData.filter(item => item.id === id)[0]

			if (!fieldItem) return
			// 字段变化 更新下面的值
			this.$set(this.scoreData, index, {
				busType: fieldItem.busType,
				fieldConfigId: fieldItem.id,
				fieldDescribe: fieldItem.fieldName, // 描述
				fieldName: fieldItem.fieldCode || '',
				fieldRuleEntityList: [],
				filedType: fieldItem.fieldType,
				groupCode: fieldItem.groupCode,
				userDefinedType: !fieldItem.isOriginal ? 1 : 0
			})
		},

		// 添加数据字典数据
		setDisCodeData (code, parentIndex) {
			let data = this.dictionaryOptions(code)
			this.$set(this.subFieldData, parentIndex, data)
		},

		delItem (index, subIndex) {
			if (typeof subIndex === 'undefined') {
				this.scoreData.splice(index, 1)
			} else {
				this.scoreData[index].fieldRuleEntityList.splice(subIndex, 1)
			}
		},

		// 保存方法
		submit () {
			let count = 0
			const len = this.scoreData.length
			// if (!len) return this.$utils.toast.text('请添加字段')

			for (let i = 0; i < len; i++) {
				const scoreItem = this.scoreData[i]

				count += +scoreItem.weight

				// 判断字段名称
				if (!scoreItem.fieldConfigId) {
					return this.$utils.toast.text('请选择字段名称')
				}

				// 判断权重
				if (!scoreItem.weight) {
					return this.$utils.toast.text('请填写权重')
				}

				// 判断权重值
				if (+scoreItem.weight < 1 || +scoreItem.weight > 100) {
					return this.$utils.toast.text('权重值为1~100')
				}

				// 判断计算评分
				const subLen = scoreItem.fieldRuleEntityList.length

				if (!subLen) {
					return this.$utils.toast.text('请添加评分规则')
				}

				for (let subI = 0; subI < subLen; subI++) {
					const scoreSubList = this.scoreData[i].fieldRuleEntityList

					const scoreSubItem = scoreSubList[subI]

					// 数字 判断
					if (+scoreItem.filedType === 1) {
						if (!scoreSubItem.maxValue || !scoreSubItem.minValue) {
							return this.$utils.toast.text('请填写' + scoreSubItem.fieldDescribe)
						}

						if (+scoreSubItem.maxValue < +scoreSubItem.minValue) {
							return this.$utils.toast.text(scoreSubItem.fieldDescribe + '格式不正确')
						}
						if (scoreSubList[subI - 1] && (+scoreSubItem.minValue <= +scoreSubList[subI - 1].maxValue)) {
							return this.$utils.toast.text(scoreSubItem.fieldDescribe + '格式不正确1')
						}
					}
					// 标签判断
					if (+scoreItem.filedType === 3) {
						if (!scoreSubItem.fieldAccordingTo) {
							return this.$utils.toast.text('请选择' + scoreSubItem.fieldDescribe)
						}
					}

					if (scoreSubItem.fieldGrade === '') {
						return this.$utils.toast.text('请填写' + scoreSubItem.fieldDescribe + '计算评分')
					}
				}

				if (scoreItem.elseFieldGrade === '') {
					return this.$utils.toast.text('否则项评分不能为空')
				}
			}

			if (len && +count !== 100) {
				return this.$utils.toast.text('权重必须为100%')
			}
			this.$utils.showLoading('保存中')
			this.$api.seeCrmService.fieldweightSave({ saveVo: this.scoreData }).then(res => {
				this.$utils.hideLoading()
				this.$routing.navigateBack()
			})
		}

	}

}
</script>

<style lang="scss" scoped>
.score-manage-page{
	min-height: 100vh;
	background: #f2f2f2;
}

.score-rule{
	height: 46px;
}

.btn-score{
	padding: 0 20px;
	height: 27px;
	border-radius: 3px;
	border: 1px solid #1890ff;
	text-align: center;
	line-height: 27px;
	color: #1890ff;
	background: #fff;
}

.input-box{
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 5px;
}

</style>
