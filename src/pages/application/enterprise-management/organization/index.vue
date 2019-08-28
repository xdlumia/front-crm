<!--
/**
* @author王艳龙
* @name 组织架构
* @date 2019年8月2日
**/
-->
<template>
    <view>
        <NavBar title="组织架构" />
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V mt10 mb10">
                <span class="p10 d-text-blue">{{companyName}}</span>
            </view>
            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>
            <view class="flex-item flex-item-V uni-flex uni-column" >
                <i-cell-group v-for="(item) in depts" :key="item.id">
                    <i-cell is-link @click="toNextHierarchy(item.id,item.deptName)" >{{item.deptName}}({{item.children.length + item.employeeList.length}})</i-cell>
                </i-cell-group>
            </view>
            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>
            <view class="flex-item flex-item-V uni-flex uni-column" v-for="(item) in users" :key="item.id" @click="editEmployee(item.id)">
                <view class="flex-item flex-item-V bb p10">
                    <view class="fl width20">
						<mAvatat :text='item.employeeName' :url='item.avatarUrl'></mAvatat>
                    </view>
                    <view class="fl width33 pl10 mt15">{{item.employeeName}}</view>
                    <view v-if="item.roleNames" class="fl ac ml10 pl5 pr5 mt15 d-text-blue" style="border: 1px solid #457FF5;border-radius: 5px;">
                        {{item.roleNames.split(',')[0]}}
                    </view>
                </view>
            </view>
            <view class="flex-item flex-item-V bb pl10 d-flex-lr" >
               <i class="iconfont f35 iconxinjian fl d-text-blue"></i>
               <button  class="pl5 fl d-text-cgray ml0" style="border: none;" @click="invite" plain="true">邀请同事加入</button >
            </view>
            <view class="flex-item flex-item-V bt pt15 pb15 wfull" style="position: fixed;bottom: 0;background-color: rgba(255,255,255,1)">
                <view class="uni-flex uni-row">
                    <a :class="['flex-item', {'width33': hierarchy != 0},{'width50': hierarchy == 0}]" class="d-text-blue"
                        style="text-align: center;"
                        url="/pages/application/enterprise-management/team/editor/index?isEditor=0">
                        添加员工
                    </a>
                    <a :class="['flex-item', {'width33': hierarchy != 0},{'width50': hierarchy == 0}]"
						class="d-text-blue"
                        style="text-align: center;"
                        :url="'/pages/application/enterprise-management/organization/add-dept?isEditor=0&deptName=' + deptName + '&deptId=' + deptId">
                        添加子部门
                    </a>
                    <a :class="['flex-item', {'width33': hierarchy != 0},{'width50': hierarchy == 0}]"
                        v-if="hierarchy != 0"
						class="d-text-blue"
                        style="text-align: center;"
                        :url="'/pages/application/enterprise-management/organization/add-dept?isEditor=1&deptName=' + deptName + '&deptId=' + deptId">
                        部门设置
                    </a>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
	components: {

	},
	data () {
		return {
			companyName: '',
			depts: [],
			users: [],
			hierarchy: 0,
			deptName: '',
			deptId: 1,
			superDeptName: ''
		}
	},
	onLoad (option) {
		if (option.deptId) {
			this.deptId = option.deptId
		} else {
			// let companyInfo = this.$local.fetch('companyInfo')
			// if(companyInfo.companyTypeId === 1){
			// 	//虚拟企业

			// }else{
			// 	//实体企业
			// 	this.deptId = 1
			// }
		}
		this.init()
		if (option.hierarchy) {
			this.hierarchy = option.hierarchy
		}

		// 动态修改追加部门名称
		if (option.companyName && option.deptName) {
			this.companyName = option.companyName + '>' + option.deptName
			this.deptName = option.deptName
		} else {
			this.companyName = this.$local.fetch('companyInfo').companyName
			this.deptName = this.companyName
		}
	},
	onShow () {
		let pages = getCurrentPages()
		let currPage = pages[pages.length - 1]
		// 回显修改的部门设置
		if (currPage.data.backFromUpdateDept) {
			this.deptName = currPage.data.deptName
			let names = this.companyName.split('>')
			names[names.length - 1] = currPage.data.deptName
			this.companyName = names.join('>')
		}

		this.init()
	},
	methods: {
		// 初始化数据
		init () {
			// 获取部门数据
			this.$api.seeCrmService.organizationalStructureChildrenDepts({ 'deptId': this.deptId }).then((response) => {
				if (response.code === 200) {
					this.depts = response.data[0].children
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
			// 获取用户数据
			this.$api.seeCrmService.organizationalStructureChildrenEmployees({ 'deptId': this.deptId }).then((response) => {
				if (response.code === 200) {
					this.users = response.data
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		},
		// 为避免微信小程序只能进入5级层级的问题，通过控制this.hierarchy的值，使在点击返回按钮时页面直接返回到公司层级所在的页面
		toNextHierarchy (id, deptName) {
			if (parseInt(this.hierarchy) > 0) {
				uni.redirectTo({
					url: '/pages/application/enterprise-management/organization/index?hierarchy=' + this.hierarchy + '&deptId=' + id + '&companyName=' + this.companyName + '&deptName=' + deptName
				})
			} else {
				let param = parseInt(this.hierarchy) + 1
				uni.navigateTo({
					url: '/pages/application/enterprise-management/organization/index?hierarchy=' + param + '&deptId=' + id + '&companyName=' + this.companyName + '&deptName=' + deptName
				})
			}
		},
		// 邀请成员加入
		invite (data) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/organization/invite/index?avatarUrl=' + this.$local.fetch('userInfo').avatarUrl
			})
		},
		// 编辑员工
		editEmployee (id) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/team/editor/index?isEditor=1&employeeId=' + JSON.stringify(id)
			})
		}
	}
}
</script>

<style>
    .width20{
        width: 20%;
    }
    .width33{
        width: 33%;
    }
    .width50{
        width: 50%;
    }
</style>
