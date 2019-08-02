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
            <form @submit="formSubmit" @reset="formReset">
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <label class="fl width30"><span style="color:#FF0000;">*</span>姓名</label>
                        <input class="fl width70" v-model="form.employeeName" placeholder="姓名" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30"><span style="color:#FF0000;">*</span>手机号</view>
                        <input class="fl width70" v-model="form.phone" placeholder="手机号" />
                    </view>
                </view>
                <view class="uni-form-item wfull">
                    <view class="wfull" @click="selectDept(form.roleList)">
                        <i-cell is-link v-model='form.deptName'><span style="color:#FF0000;">*</span>所属部门</i-cell>
                        <i-cell v-if="false" v-model='form.deptId'></i-cell>
                    </view>
                </view>
                <view class="uni-form-item wfull">
                    <view  class="wfull" @click="selectRole(form.roleIds)">
                        <i-cell is-link v-model="form.roleNames"><span style="color:#FF0000;">*</span>角色权限</i-cell>
                        <i-cell v-if="false" v-model="form.roleIds"></i-cell>
                    </view>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">职位</view>
                        <input class="fl width70" v-model="form.positionName" placeholder="职位" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">企业邮箱</view>
                        <input class="fl width70" v-model="form.email" placeholder="企业邮箱" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">工号</view>
                        <input class="fl width70" v-model="form.employeeNo" placeholder="工号" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl width30">备注</view>
                        <textarea class="fl" v-model="form.remark" placeholder="备注" ></textarea>
                    </view>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="d-absolute wfull d-fixed" style="bottom:0">
                    <i-button class="fl width50" v-if="isEditor == 0" type="warn">刪除</i-button>
                    <i-button class="fl width50" v-if="isEditor == 0" type="primary">完成</i-button>
                    <i-button v-if="isEditor == 1" type="primary">保存</i-button>
                </view>

            </form>
        </view>
    </view>
</template>

<script>
export default {
	data () {
		return {
			isEditor: 0, // 是否是编辑页面0否1是
			// roleList:[],
			// roleIds:[],
			// roleNames:'',
			form: {
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
				deptName: ''
			}
		}
	},
	onLoad: function (option) {
		// 是否是编辑页面
		if (option.isEditor) {
			this.isEditor = option.isEditor
		}
		// 回显员工信息
		if (option.employee) {
			this.form = JSON.parse(option.employee)
		}
	},
	onShow () {
		let that = this
		let pages = getCurrentPages()
		let currPage = pages[pages.length - 1]
		// 从“选择部门”页面返回的数据
		// 从“选择角色”页面返回的数据
		if (currPage.data.backFromOrg) {
			this.form.deptId = currPage.data.deptId
			this.form.deptName = currPage.data.deptName
		}
		if (currPage.data.backFromRole) {
			let items = currPage.data.ckeckedRoles
			let form = that.form
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]
				form.roleList.push(item)
				form.roleIds.push(item.id)
				form.roleNames = form.roleNames + ',' + item.roleName
			}
		}
	},
	methods: {
		// 選擇部門
		selectDept (deptId) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/organizational-structure?deptId=' + deptId
			})
		},
		selectRole (roleList) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/roles?roleList=' + JSON.stringify(roleList)
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
