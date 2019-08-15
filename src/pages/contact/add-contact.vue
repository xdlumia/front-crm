<!-- 添加联系人 -->
<!-- wangxiaodong -->
<template>
<div class="d-bg-white">
    <NavBar  :title="`${titleType}联系人`"/>
    <scroll-view scroll-y style="height:calc(100vh - 120px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <i-input v-model="form.linkmanName" label="姓名" placeholder="请填写" required />
            <a url="/pages/client/choose-client">
				<i-input disabled v-model="form.clientName" label="客户名称" placeholder="请填写客户名称" required>
					<i-icon type="enter" size="16" color="#999" />
				</i-input>
			</a>
            <i-input v-model="form.mobile" label="手机" maxlength='11' placeholder="请填写" required />
            <i-select v-model="form.roleCode" :props="{label:'content',value:'code'}" label="联系人角色" :options="dictionaryOptions('CRM_LXR_JS')"/>
            <i-input v-model="form.position" label="职位" placeholder="请填写"/>
            <i-input v-model="form.phone" label="电话" placeholder="请填写"/>
            <i-input v-model="form.email" label="电子邮件" placeholder="请填写"/>
            <i-input v-model="form.address" label="地址" placeholder="请填写"/>
			<i-input v-model="deptName" label="所属部门" placeholder="请填写"/>
            <i-input v-model="form.note" label="备注" placeholder="备注" type="textarea" />
            <p v-for="(item,index) of form.formsFieldValueSaveVos" :key="index">
				<i-input v-if='item.fieldType == 0' v-model="item.fieldValue" :label="item.fieldName" placeholder="点击填写" />
				<i-input v-if='item.fieldType == 1' type='number' v-model="item.fieldValue" :label="item.fieldName" placeholder="点击填写" />
				<picker-date v-if='item.fieldType == 2' v-model="item.fieldValue" :label="item.fieldName"  placeholder="请选择日期" />
				<i-select
				v-if='item.fieldType == 3'
				v-model="form.fieldValue"
				:props="{label:'content',value:'code'}"
				:label="item.fieldName"
				placeholder="请选择"
				:options="dictionaryOptions(item.groupCode)"/>
			</p>
        </m-form>
        <a url="/pages/common/more-list?busType=1&isEnabled=-1" class="ac d-text-gray lh40 d-block"><i-icon type="add" size="18" color="#999" />添加更多条目</a>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <i-button type="primary" i-class="f16" @click="submitForm">保存</i-button>
    </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			stageList: [], // 销售阶段列表
			busId: '', // 业务id
			editType: '', // 编辑类型 1为编辑. 2为复制 空为新建
			fieldList: [], // 自定义字段列表
			labelNames: '', // 标签名称组合
			deptName: this.$local.fetch('deptInfo').deptName,
			form: {
				id: 0,
				address: '', // 示例：地址',
				busId: '', // 业务id
				busType: 1, // 业务类型0客户，1联系人，2机会，3成交,4业务属性
				clientName: '', // 客户名称
				clientId: '', // 客户id
				email: '', // 示例：电子邮件',
				formsFieldValueSaveVos: [
					// {
					// 	busId: '', //业务id
					// 	busType: 0, //0客户，1联系人，2机会，3成交,4业务属性
					// 	fieldConfigId: 100000,
					// 	fieldValue: '' // 示例：字段值'
					// }
				],
				lableBusinessSaveVos: {
					// busId: 100000,
					// busType: 0,
					// labelIdArray: [
					// 	0
					// ]
				},
				leaderId: '', // 责任人id
				linkmanName: '', // 示例：联系人名称',
				mobile: '', // 示例：手机号',
				note: '', // 示例：备注',
				phone: '', // 示例：电话',
				position: '', // 示例：职位',
				roleCode: '' // 联系人角色code'
			},
			rules: {
				email: [{
					required: false
				}, {
					type: 'email',
					message: '邮箱格式不正确'
				}],
				mobile: [{
					required: true,
					message: '请填写手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}]
			}
		}
	},
	onShow () {
		if (this.busId) {
			// 获取详情
			this.linkmanInfo(this.busId)
		} else {
			// 获取字段列表
			this.formsfieldconfigQueryList()
		}
	},
	onLoad (option) {
		// 获取字段列表
		console.log(option.id)
		this.formsfieldconfigQueryList()
		if (option.id) {
			this.busId = option.id
			this.editType = option.editType
			this.form.id = option.id
		}

		if (option.clientId && option.clientName) {
			this.form.clientName = option.clientName
			this.form.clientId = option.clientId
		}

		// 客户回调
		uni.$on('chooseClient', data => {
			this.form.clientName = data.name
			this.form.clientId = data.id
		})
		// 标签回掉
		uni.$on('moreTags', data => {
			this.labelNames = data.map(item => item.labelName).join(',')
			this.form.lableBusinessSaveVo.labelIdArray = data.map(item => item.id)
		})
		// 更多条目回掉
		uni.$on('moreList', data => {
			// 获取字段列表
			this.formsfieldconfigQueryList()
		})
	},
	created () {
	},
	methods: {
		// 保存
		async submitForm () {
			await this.$refs.mform.validate()
			let api = 'linkmanSave'
			// this.editType 1编辑 2复制
			if (this.editType === '1') {
				api = 'linkmanUpdate'
			}
			let params = JSON.parse(JSON.stringify(this.form))
			params.formsFieldValueSaveVos = params.formsFieldValueSaveVos.map(item => {
				return { busId: this.busId, busType: 1, fieldConfigId: item.id, fieldValue: item.fieldValue }
			})
			this.$api.seeCrmService[api](params)
				.then(res => {
					if (res.code !== 200) return
					if (this.editType === '2') {
						this.$routing.navigateTo(`/pages/contact/index`)
					} else {
						// 编辑成功emit给返回页
						uni.$emit('addContact')
						// 返回上一页
						this.$routing.navigateBack()
					}
				})
		},
		// 查询联系人详情
		linkmanInfo (id) {
			this.$api.seeCrmService.linkmanInfo(null, id)
				.then(res => {
					let data = res.data || {}
					for (let key in this.form) {
						if (key === 'formsFieldValueSaveVos') {
							this.form.formsFieldValueSaveVos = data.formsFieldValueEntitys
						} else {
							this.form[key] = data[key]
						}
					}
				})
		},
		// 获取表单字典配置列表
		formsfieldconfigQueryList () {
			this.$api.seeCrmService.formsfieldconfigQueryList({ busType: 1, isEnabled: '0' })
				.then(res => {
					this.form.formsFieldValueSaveVos = res.data || []
				})
		}
	},
	computed: {
		titleType () {
			return this.editType === '1' ? '编辑' : this.editType === '2' ? '复制' : '新建'
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
