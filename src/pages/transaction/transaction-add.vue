<template>
  <div class="d-bg-white" style="heigth:100vh">
    <NavBar :title="type=='add' ? '新增成交记录' : '编辑成交记录'"/>
    <div>
      <m-form ref="form" class="uni-pb100" :model="form" :rules="rules">
        <i-input maxlength="32" v-model="form.name" label="名称" placeholder="请输入" required/>
        <a :url="`/pages/chance/choose-chance?id=${form.salesFunnelId}&clientId=${clientId}`">
          <i-input label="销售机会" disabled v-model="form.salesFunnelName" placeholder=" " required>
            <uni-icon type="forward" size="18" color="#999"/>
          </i-input>
        </a>
        <i-input maxlength="32" v-model="form.clientName" disabled label="客户名称" placeholder="请输入"/>

        <a :url="form.salesFunnelId ? (`/pages/contact/index?busType=2&select=1&multiple=1&linkIds=${JSON.stringify(linkIds) || '[]'}&busId=${form.salesFunnelId}`) : ''">
          <i-input label="联系人" disabled v-model="form.linkkanNames" placeholder=" " required>
            <uni-icon type="forward" size="18" color="#999"/>
          </i-input>
        </a>
        <i-select
          v-model="form.transactionStatus"
          :props="{label:'content',value:'code'}"
          label="成交状态"
          placeholder="请选择"
          required
          :options="CRM_CJZT"
        ></i-select>
        <picker-date v-model="form.startTime" label="开始时间" placeholder="请选择" required></picker-date>
        <picker-date v-model="form.endTime" label="结束时间" placeholder="请选择" required></picker-date>
        <i-input
          maxlength="32"
          type="number"
          v-model="form.totalAmount"
          label="总金额"
          placeholder="请输入"
          required
        />
     <i-input maxlength="32" v-model="deptInfo.deptName" disabled label="所属部门" placeholder="请输入"/>
        <picker-date v-model="form.signDate" label="签约日期" placeholder="请选择日期"></picker-date>
      </m-form>
			<div class="pt10 pl15 pr15 d-bg-white bb">
					<div class='f13 mb10 d-text-black'>备注</div>
					<textarea rows="5" v-model="form.note" class="f12 d-text-gray" maxlength="300" style='width: auto; height:60px' placeholder="点击填写"></textarea>
			</div>
			<div class='d-bg-white pb10'>
					<div v-for="(item,index) of form.formsFieldValueSaveVos" :key='index'>
						<i-input v-if='item.fieldType == 0' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
						<i-input v-if='item.fieldType == 1' type='number' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
						<picker-date v-if='item.fieldType == 2' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName"  placeholder="请选择日期" />
						<i-select
							v-if='item.fieldType == 3'
							v-model="form.formsFieldValueSaveVos[index].fieldValue"
							:props="{label:'content',value:'code'}"
							:label="item.fieldName"
							placeholder="请选择"
							:options="dictionaryOptions(item.groupCode || '')"
						/>
					</div>
				</div>
      <a url="/pages/common/more-list?busType=3&isEnabled=-1" class="ac d-text-gray lh40 d-block">
        <i-icon type="add" size="18" color="#999"/>添加更多条目
      </a>
      <div class="footer-fixed-menu">
        <i-button @click="fsubmit" type="primary" i-class="f16">保 存</i-button>
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
			upTypeIndex: '',
			linkManData: [], // 关联的联系人列表
			type: 'add',
			clientId: '',
			linkIds: [], // 联系人ids，用于选择联系人回显
			form: {
				salesFunnelName: '', // 销售机会名称
				clientName: '', // 客户名称
				name: '', // 名称
				salesFunnelId: '', // 销售机会id
				clientId: '', // 客户名称id
				linkId: '', // 联系人id
				linkkanNames: '', // 联系人名称
				transactionStatus: '', // 成交状态(数据字典)
				startTime: '', // 开始时间
				totalAmount: '', // 总金额
				endTime: '', // 结束时间
				belongDeptCode: '', // 所属部门code
				note: '', // 备注
				formsFieldValueSaveVos: [], // 更多条目里面的数据
				signDate: ''// 签约日期
			},
			rules: {
				name: [{
					required: true,
					message: '请输入名称'
				}],
				salesFunnelId: [{
					required: true,
					message: '请选择销售机会'
				}],
				linkkanNames: [{
					required: true,
					message: '请选择联系人'
				}],
				transactionStatus: [{
					required: true,
					message: '请选择成交状态'
				}],
				startTime: [{
					required: true,
					message: '请选择开始时间'
				}],
				endTime: [{
					required: true,
					message: '请选择结束时间'
				}],
				totalAmount: [{
					required: true,
					message: '请输入总金额'
				}, {
					type: 'price',
					message: '金额格式不正确'
				}]
			}
		}
	},
	onLoad (option) {
		this.type = option.type || 'add'
		this.cardCode = option.cardCode || ''

		if (this.type === 'edit') {
			this.detailId = option.id
			this.getTransactionDetail()
		} else {
			this.getMoreField()
		}

		// 更多条目回掉
		uni.$on('moreList', data => {
			// 获取字段列表
			this.getMoreField()
		})
		// 在客户里边调用成交记录的话，需要将客户id带给销售机会，用来筛选当前客户关联的销售机会
		// 在机会里边调用成交记录的话，需要取到当前机会的id，用id去查询详情，填充客户名称，并且传到联系人，走正常成交记录流程
		if (option.busType == 0) { // eslint-disable-line
			this.clientId = option.id || ''
		} else if (option.busType == 2) { // eslint-disable-line
			this.$api.seeCrmService.saleschanceInfo(null, option.id).then(res => {
				let data = res.data || {}
				this.form.salesFunnelName = data.chanceName || ''
				this.form.salesFunnelId = data.id || ''
				this.form.clientId = data.clientId || ''
				this.form.clientName = data.clientName || ''
			})
		}

		// 销售机会回调
		uni.$on('chooseChance', data => {
			// this.chanceData = data
			this.form.salesFunnelName = data.chanceName || ''
			this.form.salesFunnelId = data.id || ''
			this.form.clientId = data.clientId || ''
			this.form.clientName = data.clientName || ''
		})

		// 联系人回调
		uni.$on('chooseContact', data => {
			if (data.length > 0) {
				let nameArr = []
				data.forEach((item) => {
					this.linkIds.push(item.id)
					nameArr.push(item.linkmanName)
				})
				this.form.linkkanNames = nameArr.join(',')
			}
		})
	},
	methods: {
		// 获取当前详情
		getTransactionDetail () {
			this.$api.seeCrmService.transactionrecordInfo(null, this.detailId)
				.then(res => {
					this.form = res.data || {}
					if (res.data.formsFieldValueEntityList.length > 0) {
						this.form.formsFieldValueSaveVos = res.data.formsFieldValueEntityList
					}
					this.linkmanQueryList({ busId: this.form.id, busType: 3 })
				})
		},
		// 根据成交id获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryBusList(params)
				.then(res => {
					let data = res.data || []
					if (data.length > 0) {
						let nameArr = []
						data.forEach((item) => {
							this.linkIds.push(item.id)
							nameArr.push(item.linkmanName)
						})
						this.form.linkkanNames = nameArr.join(',')
					}
				})
		},
		// 获取已选中的更多条目
		getMoreField () {
			this.$api.seeCrmService.formsfieldconfigQueryList({
				busType: 3,
				isEnabled: 0
			}).then(res => {
				if (res.code === 200) {
					this.form.formsFieldValueSaveVos = res.data || []
				}
			})
		},
		// 保存transactionrecordUpdate
		async fsubmit () {
			if (this.form.startTime > this.form.endTime) {
				this.$utils.toast.text('开始时间不能大于结束时间！')
				return
			}
			let name = this.type === 'add' ? 'transactionrecordSave' : 'transactionrecordUpdate'
			if (this.form.formsFieldValueSaveVos.length > 0) {
				this.form.formsFieldValueSaveVos.forEach((item) => {
					if (!item.fieldConfigId) {
						item.fieldConfigId = item.id
					}
				})
			}
			await this.$refs.form.validate()
			this.form.belongDeptCode = this.deptInfo.deptName
			this.form.linkId = this.linkIds
			this.$api.seeCrmService[name](this.form)
				.then(res => {
					this.$routing.navigateBack()
					uni.$emit('updatetransList', { params: '' })
				})
		}
	},
	created () {},
	computed: {
		CRM_CJZT () {
			return this.dictionaryOptions('CRM_CJZT')
		}
	}
}
</script>

<style lang="scss" scoped>
</style><style lang="scss">
page {
  background-color: #f2f2f2;
  padding-bottom: 140upx;
}
</style>
