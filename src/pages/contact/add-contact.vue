<!-- 添加机会 -->
<!-- wangxiaodong -->
<template>
<div class="d-bg-white">
    <NavBar title="新建联系人"/>
    <scroll-view scroll-y style="height:calc(100vh - 115px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <i-input v-model="form.userName" label="姓名" placeholder="请填写" required />
            <a url="/pages/client/choose-client" openType="switchTab">
				<i-input disabled v-model="clientName" label="客户名称" placeholder="请填写客户名称" required>
					<i-icon type="enter" size="16" color="#999" />
				</i-input>
			</a>
            <i-input v-model="form.userPosition" label="职位" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="电话" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="手机" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="电子邮件" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="地址" placeholder="请填写"/>
            <i-select v-model="form.phone" :props="{label:'name',value:'id'}" label="所属部门" :options="upData"/>
            <i-select v-model="form.phone" :props="{label:'name',value:'id'}" label="联系人角色" :options="upData"/>
            <i-input v-model="form.personalProfile" label="备注" placeholder="备注" type="textarea" />

        </m-form>
        <a url="/pages/common/more-list" class="ac d-text-gray lh40 d-block"><i-icon type="add" size="18" color="#999" />添加更多条目</a>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <i-button type="primary" i-class="f16">保存</i-button>
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
			clientName: '', // 客户名称
			labelNames: '', // 标签名称组合
			form: {
				address: '', // 示例：地址',
				busId: '', // 业务id
				busType: 0, // 业务类型0客户，1联系人，2机会，3成交,4业务属性
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
				linkkanName: '', // 示例：联系人名称',
				mobile: '', // 示例：手机号',
				note: '', // 示例：备注',
				phone: '', // 示例：电话',
				position: '', // 示例：职位',
				roleCode: '' // 联系人角色code'
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
				}],
				reckonFinishTime: [{
					required: true,
					message: '请选择日期'
				}]
			}
		}
	},
	onShow () {
		if (this.busId) {
			// 获取详情
			this.saleschanceInfo(this.busId)
		} else {
			// 获取字段列表
			this.formsfieldconfigQueryList()
		}
	},
	onLoad (option) {
		if (option.id) {
			this.busId = option.id
			this.editType = option.editType
		}
		// 客户回调
		uni.$once('chooseClient', data => {
			this.clientName = data.name
			this.form.clientId = data.id
		})
		// 标签回掉
		uni.$once('moreTags', data => {
			this.labelNames = data.map(item => item.labelName).join(',')
			this.form.lableBusinessSaveVo.labelIdArray = data.map(item => item.id)
		})
	},
	created () {
		// 获取销售阶段
		this.salesstageQueryList()
		// 获取部门列表
		this.getDepts()
	},
	methods: {
		// 保存
		async saveChance () {
			await this.$refs.mform.validate()
			// 验证机会名称
			this.$api.seeCrmService.saleschanceVerifyChanceName({ chanceName: this.form.chanceName })
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
			if (this.editType === '1') {
				api = 'saleschanceUpdate'
			}
			this.$api.seeCrmService[api](this.form)
				.then(res => {
					// 返回上一页
					this.$routing.navigateBack()
				})
		},
		// 获取部门列表
		getDepts () {
			this.$api.enterpriseManagementService.getDepts({ limit: 100, paeg: 1 })
				.then(res => {
					this.deptList = res.data || []
				})
		},
		// 查询机会详情
		saleschanceInfo (id) {
			this.$api.seeCrmService.saleschanceInfo(null, id)
				.then(res => {
					let data = res.data || {}
					for (let key in this.form) {
						this.form[key] = data[key]
					}
				})
		},
		// 获取表单字典配置列表
		formsfieldconfigQueryList () {
			this.$api.seeCrmService.formsfieldconfigQueryList({ busType: 1, isEnabled: '-1' })
				.then(res => {
					this.fieldList = res.data || []
				})
		},
		// 获取销售阶段
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList()
				.then(res => {
					let data = res.data || []
					this.stageList = data
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
