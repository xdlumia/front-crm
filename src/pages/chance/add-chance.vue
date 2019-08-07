<!-- 添加机会 -->
<!-- wangxiaodong -->
<template>
<div class="d-bg-white">
    <NavBar :title="`${titleType}销售机会`"/>
    <scroll-view scroll-y style="height:calc(100vh - 115px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <i-input v-model="form.chanceName" label="机会名称" placeholder="请填写销售机会名称" required />
			<a url="/pages/client/choose-client">
				<i-input disabled v-model="clientName" label="客户名称" placeholder="请填写客户名称" required>
					<i-icon type="enter" size="16" color="#999" />
				</i-input>
			</a>
            <i-select
                v-model="form.phone"
                :props="{label:'name',value:'id'}"
                label="所属部门"
                placeholder="请选择所属部门"
                required
                :options="deptList">
            </i-select>
            <i-input v-model="form.salesMoney" label="销售金额" placeholder="请填写销售金额" required />
            <i-select
                v-model="form.stageId"
                :props="{label:'stageName',value:'id'}"
                label="销售阶段"
                placeholder="请选择销售阶段"
                required
                :options="stageList">
            </i-select>
            <picker-date v-model="form.reckonFinishTime" label="预计成交日期" placeholder="请选择日期">
            </picker-date>
            <i-select v-model="form.tradeCode" :props="{label:'content',value:'code'}" label="行业" :options="dictionaryOptions('CRM_HY')"/>
            <i-select v-model="form.sourceCode" :props="{label:'content',value:'code'}" label="来源" :options="dictionaryOptions('CRM_LY')"/>
			<a url="/pages/common/more-tags?busType=2">
				<i-input disabled v-model="labelNames" label="标签" placeholder="请选择">
					<i-icon type="enter" size="16" color="#999" />
				</i-input>
			</a>
            <i-input v-model="form.note" label="备注" placeholder="点击填写" type="textarea" />
            <i-input v-for="(item,index) of fieldList" :key="index" v-model="form.note" :label="item.fieldName" placeholder="点击填写" />
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
export default {
	components: {
	},
	data () {
		return {
			stageList: [], // 销售阶段列表
			busId: '',
			editType: '', // 编辑类型 1为编辑. 2为复制 空为新建
			fieldList: [], // 自定义字段列表
			clientName: '', // 客户名称
			labelNames: '', // 标签名称组合
			form: {
				id: '', // 主键id
				chanceName: '', // '示例：机会名称',
				clientId: '', // 客户id
				formsFieldValueSaveVos: [
					// {
					// busId:'', // 100000,
					// busType:'', // 0,
					// fieldConfigId:'', // 100000,
					// fieldValue:'', // '示例：字段值'
					// }
				],
				lableBusinessSaveVo: {
					busId: this.busId, // 100000,
					busType: 2, // 业务类型(0客户，1联系人，2机会，3成交)
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
	},
	methods: {
		// 保存
		async saveChance () {
			await this.$refs.mform.validate()
			// saleschance/verifyChanceName
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
		getChildrenEmployees () {
			this.$api.enterpriseManagementService.organizationalStructureDepts({ limit: 100, paeg: 1 })
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
			this.$api.seeCrmService.formsfieldconfigQueryList({ busType: 2, isEnabled: '-1' })
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
