<!--
/**
* @author王艳龙
* @name 编辑员工、添加员工
* @date 2019年8月2日
**/
-->
<template>
    <view>
		<NavBar v-if="isEditor == 1" title="编辑员工" />
        <NavBar v-if="isEditor == 0" title="添加员工" />
        <view class="uni-common-mt wfull">
            <m-form ref="mform" :model="formData" :rules="rules">
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <label class="fl width30"><span style="color:#FF0000;">*</span>姓名</label>
                        <input class="fl width70"  v-model="formData.employeeName" placeholder="姓名" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30"><span style="color:#FF0000;">*</span>手机号</view>
                        <input class="fl width70"  v-model="formData.phone" placeholder="手机号" />
                    </view>
                </view>
                <view class="uni-form-item wfull">
                    <view class="wfull" @click="selectDept(formData.deptId)">
                        <i-cell is-link  v-model='formData.deptName'><span style="color:#FF0000;">*</span>所属部门</i-cell>
                    </view>
                </view>
                <view class="uni-form-item wfull">
                    <view  class="wfull" @click="selectRole(formData.roleIds)">
                        <i-cell is-link  v-model="formData.roleNames"><span style="color:#FF0000;">*</span>角色权限</i-cell>
                    </view>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">职位</view>
                        <input class="fl width70"  v-model="formData.positionName" placeholder="职位" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">企业邮箱</view>
                        <input class="fl width70"  v-model="formData.email" placeholder="企业邮箱" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">工号</view>
                        <input class="fl width70"  v-model="formData.employeeNo" placeholder="工号" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl width30">备注</view>
                        <textarea class="fl"  v-model="formData.remark" placeholder="备注" ></textarea>
                    </view>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="d-absolute wfull d-fixed" style="bottom:0">
                    <!-- <i-button class="fl width50" v-if="isEditor == 1" type="warn" @click="deleteEmployee">刪除</i-button> -->
                    <i-button  v-if="isEditor == 1" type="primary" @click="update">保存</i-button>
                    <i-button v-if="isEditor == 0" type="primary" @click="save">保存</i-button>
                </view>
            </m-form>
        </view>
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
		// 是否是编辑页面
		if (option.isEditor) {
			this.isEditor = option.isEditor
		}
		// 回显员工信息
		if (parseInt(this.isEditor) === 1 && option.employeeId) {
			this.$api.enterpriseManagementService.getEmployeeDetail({}, option.employeeId).then((response) => {
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
	onShow () {
		let pages = getCurrentPages()
		let currPage = pages[pages.length - 1]
		// 从“选择部门”页面返回的数据
		if (currPage.data.backFromOrg) {
			this.formData.deptId = currPage.data.deptId
			this.formData.deptName = currPage.data.deptName
		}
		// 从“选择角色”页面返回的数据
		if (currPage.data.backFromRole) {
			this.formData.roleNames = ''
			this.formData.roleIds = []
			let items = currPage.data.ckeckedRoles
			this.formData.roleList = items
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				this.formData.roleIds.push(item.id)
				this.formData.roleNames = this.formData.roleNames + ' ' + item.roleName
			}
		}
	},
	methods: {
		// 删除员工 deleteEmployee
		deleteEmployee () {
			try {
				this.$utils.showModal('确定要删除此员工？').then(async () => {
					let resulte = await this.$api.enterpriseManagementService.deleteEmployee({ id: this.formData.id })
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
				this.$api.enterpriseManagementService.updateEmployee(this.formData).then((response) => {
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
				this.$api.enterpriseManagementService.saveEmployee(this.formData).then((response) => {
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
