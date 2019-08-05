<!--
/**
* @author王艳龙
* @name 部门设置
* @date 2019年8月2日
**/
-->
<template>
    <view>
        <NavBar v-if="isEditor == 1" title="部门设置" />
        <NavBar v-else title="添加子部门" />
        <view class="uni-padding-wrap uni-common-mt">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <label class="title-font width30">部门名称</label>
                    <input class="width70" name="name" v-model="deptName" placeholder="部门名称" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <view class="title-font width30">上级部门</view>
                    <input class="width70" :value="superDeptName" disabled="true" placeholder="上级部门" />
                </view>
            </form>
        </view>
        <i-button  v-if="isEditor == 1" class="mt30 ba title-font wfull" style="text-align: center;" @click="deleteDept">删除部门</i-button>
        <i-button style="position: fixed;bottom: 0;" class="wfull" type="primary" @click="makeSure">完成</i-button>
    </view>
</template>
<script>
export default {
	onLoad: function (option) {
		// 添加
		if (parseInt(option.isEditor) === 0 && option.deptName) {
			this.superDeptName = option.deptName
			this.superDeptId = option.deptId
		}
		// 修改
		if (parseInt(option.isEditor) === 1 && option.deptName) {
			this.deptName = option.deptName
			this.deptId = option.deptId
			// 修改时上级部门名称从后端获取getSuperDept
			this.getSuperDept()
		}
		if (option.isEditor) {
			this.isEditor = option.isEditor
		}
	},
	data () {
		return {
			deptName: '',
			isEditor: 0,
			superDeptName: '',
			superDeptId: 0,
			deptId: 0
		}
	},
	methods: {
		// 获取上级部门
		getSuperDept () {
			try {
				this.$api.enterpriseManagementService.getSuperDept({
					'id': this.deptId
				}).then((response) => {
					if (response.code === 200) {
						this.superDeptName = response.data.deptName
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			} catch (error) {
				this.$utils.toast.text('获取上级部门信息失败')
			}
		},
		// 添加 or 修改
		makeSure () {
			if (parseInt(this.isEditor) === 0) {
				// 保存
				try {
					this.$api.enterpriseManagementService.saveDept({
						'deptName': this.deptName,
						'parentId': this.superDeptId
					}).then((response) => {
						if (response.code === 200) {
							this.$utils.toast.text('保存成功')
							setTimeout(() => {
								this.$routing.navigateBack()
							}, 800)
						} else {
							this.$utils.toast.text(response.msg)
						}
					})
				} catch (error) {
					this.$utils.toast.text('保存失败')
				}
			} else {
				// 修改
				try {
					this.$api.enterpriseManagementService.updateDept({
						'deptName': this.deptName,
						'id': this.deptId
					}).then((response) => {
						if (response.code === 200) {
							this.$utils.toast.text('修改成功')
							setTimeout(() => {
								this.$routing.navigateBack()
							}, 800)
						} else {
							this.$utils.toast.text(response.msg)
						}
					})
				} catch (error) {
					this.$utils.toast.text('修改失败')
				}
			}
		},
		// 删除
		deleteDept () {
			try {
				this.$api.enterpriseManagementService.deleteDept({
					'id': this.deptId
				}).then((response) => {
					if (response.code === 200) {
						this.$utils.toast.text('删除成功')
						setTimeout(() => {
							this.$routing.navigateBack()
						}, 800)
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			} catch (error) {
				this.$utils.toast.text('删除失败')
			}
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
    .title-font{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
    }
</style>
