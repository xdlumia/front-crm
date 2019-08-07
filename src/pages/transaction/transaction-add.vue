<template>
<div class="d-bg-white" style="heigth:100vh">
    <NavBar title="新增成交记录"/>
    <div>
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <i-input maxlength='32' v-model="form.userName" label="名称" placeholder="请输入" required />
			<i-select
                v-model="form.name"
                :props="{label:'name',value:'id'}"
                label="销售机会"
                placeholder="请选择"
                required
                :options="upData">
            </i-select>
            <i-input maxlength='32' v-model="form.clientId" disabled label="客户名称" placeholder="请输入"/>
            <i-select
                v-model="form.linkId"
                :props="{label:'name',value:'id'}"
                label="联系人"
                placeholder="请选择"
                required
                :options="upData">
            </i-select>
			<i-select
                v-model="form.transactionStatus"
                :props="{label:'name',value:'id'}"
                label="成交状态"
                placeholder="请选择"
                required
                :options="upData">
            </i-select>
			<picker-date v-model="form.startTime" label="开始时间" placeholder="请选择" required>
            </picker-date>
			<picker-date v-model="form.endTime" label="结束时间" placeholder="请选择" required>
            </picker-date>
			<i-input maxlength='32' type='number' v-model="form.totalAmount" label="总金额" placeholder="请输入" required/>
			<i-select
                v-model="form.belongDeptCode"
                :props="{label:'name',value:'id'}"
                label="所属部门"
                placeholder="请选择"
                required
                :options="upData">
            </i-select>
            <picker-date v-model="form.signDate" label="签约日期" placeholder="请选择日期">
            </picker-date>
        </m-form>
        <a url="/pages/common/more-list" class="ac d-text-gray lh40 d-block"><i-icon type="add" size="18" color="#999" />添加更多条目</a>
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
			upData: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			form: {
				name: '', // 名称
				salesFunnelId: '', // 销售机会id
				clientId: '', // 客户名称id
				linkId: '', // 联系人id
				transactionStatus: '', // 成交状态(数据字典)
				startTime: '', // 开始时间
				endTime: '', // 结束时间
				belongDeptCode: '', // 所属部门code
				signDate: ''// 签约日期
			},
			rules: {
				userName: [{
					required: true,
					message: '请输入名称'
				}],
				clientId: [{
					required: true,
					message: '请输入客户名称'
				}],
				linkId: [{
					required: true,
					message: '请选择联系人',
					trigger: 'change'
				}],
				transactionStatus: [{
					required: true,
					message: '请选择成交状态',
					trigger: 'change'
				}],
				startTime: [{
					required: true,
					message: '请选择开始时间',
					trigger: 'change'
				}],
				endTime: [{
					required: true,
					message: '请选择结束时间',
					trigger: 'change'
				}],
				totalAmount: [{
					required: true,
					message: '请输入总金额'
				}],
				phone: [{
					required: true,
					message: '请输入手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}]
			}
		}
	},
	onLoad (option) {
		this.type = option.type || 'add'
		this.cardCode = option.cardCode || ''
		if (this.type === 'edit') {
			this.getCardInfo()
		}
	},
	methods: {
		async fsubmit () {
			await this.$refs.mform.validate()
			this.$api.seeCrmService.transactionrecordSave(this.form)
				.then(res => {
					console.log(res)
					this.$routing.navigateBack()
					uni.$emit('updatetransList', { params: '' })
				})
		}
	},
	created () {},
	computed: {
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
