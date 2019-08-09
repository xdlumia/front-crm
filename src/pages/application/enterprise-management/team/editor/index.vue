<!--
/**
* @author王艳龙
* @name 编辑员工、添加员工
* @date 2019年8月2日
**/
-->
<template>
    <view>
		<NavBar v-if="isEditor == 1 || formData.isApply == 1 " title="编辑员工" />
        <NavBar v-if="isEditor == 0 && formData.isApply == 0" title="添加员工" />
        <!-- <view class="uni-common-mt wfull"> -->
            <m-form ref="mform" :model="formData" :rules="rules">
				<i-input v-model="formData.employeeName" label="姓名" placeholder="姓名" required />
				<i-input v-model="formData.phone" label="手机号" type="number" maxlength="11" placeholder="手机号" required />
				<view @click="selectDept(formData.deptId)">
					<i-input disabled v-model="formData.deptName" labelWidth="100" label="所属部门" placeholder="请选择所属部门" required>
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</view>
				<view @click="selectRole(formData.roleIds)">
					<i-input disabled v-model="formData.roleNames" labelWidth="100" label="角色权限" placeholder="请选择角色权限" required>
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
				<i-input v-model="formData.positionName" label="职位" placeholder="职位"/>
				<i-input v-model="formData.email" label="企业邮箱" placeholder="企业邮箱"/>
				<i-input v-model="formData.employeeNo" label="工号" placeholder="工号"/>
				<i-input type="textarea" v-model="formData.remark" label="备注" maxlength="300" placeholder="点击填写"/>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="d-absolute wfull d-fixed" style="bottom:0">
                    <!-- <i-button class="fl width50" v-if="isEditor == 1" type="warn" @click="deleteEmployee">刪除</i-button> -->
                    <i-button  v-if="isEditor == 1" type="primary" @click="update">保存</i-button>
                    <i-button v-if="isEditor == 0" type="primary" @click="save">保存</i-button>
                </view>
            </m-form>
        <!-- </view> -->
    </view>
</template>

<script>
export default {
	data () {
		return {
			formData: {
				employeeName: '',
				phone: '',
				positionName: '',
				email: '',
				employeeNo: '',
				remark: '',
				roleList: [],
				roleNames: '',
				roleIds: [],
				deptId: '',
				deptName: '',
				id: '',
				isApply: 0
			},
			isEditor: 0, // 是否是编辑页面0否1是
			rules: {
				employeeName: [{
					required: true,
					message: '请输入员工名称'
				}],
				phone: [{
					required: true,
					message: '请输入手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}],
				roleNames: [{
					required: true,
					message: '请选择角色'
				}],
				deptName: [{
					required: true,
					message: '请选择部门'
				}]
			}
		}
	},
	onLoad: function (option) {
		uni.$on('backFromOrg', function (data) {
			console.log('监听到事件来自 backFromOrg ，携带参数 msg 为：' + JSON.parse(data).id)
		})
		// 是否是编辑页面
		if (option.isEditor) {
			this.isEditor = option.isEditor
		}
		// 回显员工信息
		if (parseInt(this.isEditor) === 1 && option.employeeId) {
			this.$api.seeCrmService.organizationalStructureGetEmployeeDetail({}, option.employeeId).then((response) => {
				if (response.code === 200) {
					this.formData = response.data
					// 处理roleIds和roleNames
					this.formData.roleIds = []
					this.formData.roleNames = ''
					this.isApply = this.formData.isApply
					let items = this.formData.roleList
					for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						this.formData.roleIds.push(item.id)
						this.formData.roleNames = this.formData.roleNames + ' ' + item.roleName
					}
				}
			})
		}
		// 来自申请页面
		if (option.apply) {
			this.formData.isApply = option.isApply
			this.formData.employeeName = JSON.parse(option.apply).name
			this.formData.phone = JSON.parse(option.apply).phone
			this.formData.id = JSON.parse(option.apply).id
		}
	},
	// onShow () {
	// 	let pages = getCurrentPages()
	// 	let currPage = pages[pages.length - 1]
	// 	// 从“选择部门”页面返回的数据
	// 	if (currPage.data.backFromOrg) {
	// 		this.formData.deptId = currPage.data.deptId
	// 		this.formData.deptName = currPage.data.deptName
	// 	}
	// 	// 从“选择角色”页面返回的数据
	// 	if (currPage.data.backFromRole) {
	// 		let items = currPage.data.ckeckedRoles
	// 		this.formData.roleList = []
	// 		this.formData.roleList.push(items)
	// 		this.formData.roleNames = items.roleName
	// 		this.formData.roleIds = []
	// 		this.formData.roleIds.push(items.id)
	// 	}
	// },
	methods: {
		// 删除员工 deleteEmployee
		deleteEmployee () {
			try {
				this.$utils.showModal('确定要删除此员工？').then(async () => {
					let resulte = await this.$api.seeCrmService.organizationalStructureDeleteEmployee({ id: this.formData.id })
					if (resulte.code === 200) {
						this.$utils.toast.text('删除成功')
						setTimeout(() => {
							this.$routing.navigateBack()
						}, 800)
					}
				})
			} catch (err) {
				this.$utils.toast.text('删除失败')
			} finally {

			}
		},
		// 编辑完成
		async update () {
			await this.$refs.mform.validate()
			try {
				this.$api.seeCrmService.organizationalStructureUpdateEmployee(this.formData).then((response) => {
					if (response.code === 200) {
						this.$utils.toast.text('修改成功')
						setTimeout(() => {
							this.$routing.navigateBack()
						}, 800)
					}
				})
			} catch (error) {
				this.$utils.toast.text('修改失败')
			}
		},
		// 保存信息
		async save () {
			await this.$refs.mform.validate()
			try {
				this.$api.seeCrmService.organizationalStructureSaveEmployee(this.formData).then((response) => {
					if (response.code === 200) {
						this.$utils.toast.text('保存成功')
						setTimeout(() => {
							this.$routing.navigateBack()
						}, 800)
					}
				})
			} catch (error) {
				this.$utils.toast.text('保存失败')
			}
		},
		// 選擇部門
		selectDept (deptId) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/organizational-structure?deptId=' + deptId
			})
		},
		// 选择角色
		selectRole (roleIds) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/roles?roleIds=' + JSON.stringify(roleIds)
			})
		}
	}
}
</script>

<style>
    .width30{
        width: 30%;
    }
    .width70{
        width: 70%;
    }
    .width50{
        width: 50%;
    }
</style>
