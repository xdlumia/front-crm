/*
 * @Author: web.王晓冬
 * @Date: 2019-08-28 14:54:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-03 14:40:16
 * @Description: 新建机会
 */
<template>
<div class="d-bg-white">
    <NavBar :title="`${titleType}销售机会`"/>
    <scroll-view class="ipx" scroll-y :style="'height:calc(100vh - ' + navH +' - 50px)'">
        <m-form ref="mform" class="uni-pb100" :model="editForm" :rules="rules">
            <div class="d-bg-white">
				<i-input v-model="editForm.chanceName" label="机会名称" placeholder="请填写销售机会名称" required />
				<a :url="`/pages/client/choose-client?id=${editForm.clientId}`">
					<i-input disabled v-model="editForm.clientName" label="客户名称" placeholder="请填写客户名称" required>
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</a>
				<i-input v-model="deptName" label="所属部门" placeholder="请选择所属部门" required />
				<i-input v-model="editForm.salesMoney" label="销售金额" placeholder="请填写销售金额" type='digit' maxlength='15' required />
				<i-select
					v-model="editForm.stageId"
					:props="{label:'stageName',value:'id'}"
					label="销售阶段"
					placeholder="请选择销售阶段"
					required
					:options="stageList">
				</i-select>
				<picker-date v-model="editForm.reckonFinishTime" label="预计成交日期" placeholder="请选择日期">
				</picker-date>
				<i-select v-model="editForm.tradeCode" :props="{label:'content',value:'code'}" label="行业" :options="dictionaryOptions('CRM_KH_HY')"/>
				<i-select v-model="editForm.sourceCode" :props="{label:'content',value:'code'}" label="来源" :options="dictionaryOptions('CRM_JH_JHLY')"/>
				<a :url="`/pages/common/more-tags?busType=2&ids=${ids}`">
					<i-input disabled v-model="labelNames" label="标签" placeholder="请选择">
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</a>
				<p v-for="(item,index) of editForm.formsFieldValueSaveVos" :key="index">
					<i-input v-if='item.fieldType == 0' v-model="editForm.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
					<i-input v-if='item.fieldType == 1' type='number' v-model="editForm.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
					<picker-date v-if='item.fieldType == 2' v-model="editForm.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName"  placeholder="请选择日期" />
					<i-select
					v-if='item.fieldType == 3'
					v-model="editForm.formsFieldValueSaveVos[index].fieldValue"
					:props="{label:'content',value:'code'}"
					:label="item.fieldName"
					placeholder="请选择"
					:options="dictionaryOptions(item.groupCode || '')"/>
				</p>
            </div>
            <i-input v-model="editForm.note" label="备注" placeholder="点击填写" type="textarea" />

        </m-form>
        <a url="/pages/common/more-list?busType=2&isEnabled=-1" class="ac d-text-gray lh40 d-block"><i-icon type="add" size="18" color="#999" />添加更多条目</a>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <i-button type="primary" i-class="f16" @click="saveChance()">保存</i-button>
    </div>
</div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
	components: {
	},
	data () {
		return {
			stageList: [], // 销售阶段列表
			busId: '',
			editType: '', // 编辑类型 1为编辑. 2为复制 空为新建
			fieldList: [], // 自定义字段列表
			labelNames: '', // 标签名称组合
			deptName: this.$local.fetch('deptInfo').deptName,
			editForm: {
				id: '', // 主键id
				chanceName: '', // '示例：机会名称',
				clientId: '', // 客户id
				clientName: '',
				formsFieldValueSaveVos: [
					// {
					// busId:'', // 100000,
					// busType:'', // 0,
					// fieldConfigId:'', // 100000,
					// fieldValue:'', // '示例：字段值'
					// }
				],
				lableBusinessSaveVos: {
					busId: this.busId || '', // 100000,
					busType: 2, // 业务类型(0客户，1联系人，2机会，3成交,4业务属性)
					labelIdArray: []
				},
				leaderId: '', // 100000,
				note: '', // '示例：备注',
				reckonFinishTime: '', // 预计成交日期,
				salesMoney: '', // 销售金额,
				sourceCode: '', // '示例：来源',
				stageId: '', // 阶段id,
				stagePropelTime: '', // 1564043542293,
				tradeCode: '' // '示例：行业'
			},
			rules: {
				chanceName: [{
					required: true,
					message: '请输入机会名称'
				}],
				clientId: [{
					required: true,
					message: '请选择客户名称'
				}],
				salesMoney: [{
					required: true,
					message: '请输入金额'
				}, {
					type: 'price',
					message: '金额格式不正确'
				}],
				stageId: [{
					required: true,
					message: '请选择阶段'
				}]
			}
		}
	},
	onLoad (option) {
		// 客户详情，新增机会
		if (option.clientId) {
			this.editForm.clientName = option.clientName
			this.editForm.clientId = option.clientId
		}

		if (option.id) {
			this.busId = option.id
			this.editType = option.editType
			// 获取详情
			this.saleschanceInfo(this.busId)
		}
		// 编辑和复制从详情里获取 新增的时候才调取字段列表  editType ==1 编辑 2复制
		if (!option.editType) {
			// 获取字段列表
			this.formsfieldconfigQueryList()
		}
		// 客户回调
		uni.$on('chooseClient', data => {
			this.editForm.clientName = data.name
			this.editForm.clientId = data.id
		})
		// 标签回掉
		uni.$on('moreTags', data => {
			this.labelNames = data.map(item => item.labelName).join(',')
			this.editForm.lableBusinessSaveVos.labelIdArray = data.map(item => item.id)
		})

		// 更多条目回掉
		uni.$on('moreList', data => {
			// 获取字段列表
			this.formsfieldconfigQueryList()
		})
	},
	onUnload () {
		// this.$store.commit('client/setClientInfo', {})
		uni.$off('moreTags')
		uni.$off('chooseClient')
		uni.$off('moreList')
	},
	created () {
		// 获取销售阶段
		this.salesstageQueryList()
		// 获取部门列表
		// this.getDepts()
	},
	methods: {
		// 保存
		async saveChance () {
			await this.$refs.mform.validate()
			// 验证机会名称
			let params = {
				chanceName: this.editForm.chanceName,
				chanceId: this.editType === '1' ? this.busId : '',
				clientId: this.editForm.clientId
			}
			this.$api.seeCrmService.saleschanceVerifyChanceName(params)
				.then(res => {
					if (res.data) {
						// 如果没有重复提交表单
						this.submitForm()
						return
					}
					this.$utils.showModal('已有重复的销售机会,是否继续创建?')
						.then(async () => {
							// 如果没有重复提交表单
							this.submitForm()
						})
						.catch(() => {})
				})
			// saleschance/verifyChanceName
		},
		// 提交表单
		submitForm () {
			let api = 'saleschanceSave'
			// this.editType 1编辑 2复制
			if (this.editType === '1') {
				api = 'saleschanceUpdate'
			}
			// eslint-disable-next-line no-unused-vars
			let params = JSON.parse(JSON.stringify(this.editForm))
			params.formsFieldValueSaveVos = params.formsFieldValueSaveVos.map(item => {
				return { busId: this.busId, fieldType: item.fieldType, busType: 2, fieldConfigId: item.fieldConfigId, fieldValue: item.fieldValue }
			})
			this.$api.seeCrmService[api](params)
				.then(res => {
					if (res.code !== 200) return
					if (this.editType === '2') {
						setTimeout(() => {
							this.$routing.switchTab('/pages/chance/index')
						}, 1000)
					} else {
						// 编辑成功emit给返回页
						uni.$emit('addChance')
						// 返回上一页
						this.$routing.navigateBack()
					}
				})
		},
		// 查询机会详情
		saleschanceInfo (id) {
			this.$api.seeCrmService.saleschanceInfo(null, id)
				.then(res => {
					let data = res.data || {}
					for (let key in this.editForm) {
						if (key === 'formsFieldValueSaveVos') {
							this.editForm.formsFieldValueSaveVos = data.formsFieldValueEntitys
						} else if (key === 'lableBusinessSaveVos') {
							this.labelNames = data.lableBusinessEntitys.map(item => item.labelName).join(',')
							this.editForm.lableBusinessSaveVos.busId = data.id
							this.editForm.lableBusinessSaveVos.labelIdArray = data.lableBusinessEntitys.map(item => item.labelId)
						} else {
							this.editForm[key] = data[key]
						}
					}
				})
		},
		// 获取表单字典配置列表
		formsfieldconfigQueryList () {
			this.$api.seeCrmService.formsfieldconfigQueryList({ busType: 2, isEnabled: '0', isOriginal: 0 })
				.then(res => {
					let data = res.data || []
					data.forEach(item => {
						item.fieldConfigId = item.id
						delete item.id
						let i = this.editForm.formsFieldValueSaveVos.findIndex(v => item.fieldConfigId === v.fieldConfigId)
						if (i !== -1) {
							item.fieldValue = this.editForm.formsFieldValueSaveVos[i].fieldValue
						}
					})
					this.$set(this.editForm, 'formsFieldValueSaveVos', data)
					// this.form.formsFieldValueSaveVos = this.fieldList
				})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList({ isOriginal: -1 })
				.then(res => {
					let data = res.data || []
					this.stageList = data
				})
		}
	},
	computed: {
		titleType () {
			return this.editType === '1' ? '编辑' : this.editType === '2' ? '复制' : '新建'
		},
		ids () {
			let ids = this.editForm.lableBusinessSaveVos.labelIdArray
			return JSON.stringify(ids)
		}
	}
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  padding-bottom: 140upx;
}
</style>
