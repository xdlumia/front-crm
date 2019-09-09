<!--
/**
* @author王艳龙
* @name 组织架构
* @date 2019年8月2日
**/
-->
<template>
    <div>
        <NavBar title="组织架构" />
        <div class="uni-flex uni-column dept-page">
            <!-- 公司 -->
            <div class="flex-item flex-item-V mt10 mb10">
                <span class="p10 d-text-blue" @click="skipItem(-1)">{{userInfo.companyEntity.companyName}}</span>
                <span class="d-text-blue" v-for='(item, index) in breadCrumbs' :key="index" @click="skipItem(index)"> <span>></span> <span class="p10">{{item.title}}</span> </span>
            </div>

            <div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></div>

			<div>
				<div class="d-bg-white dept-box">
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in cuList" :key="item.id" @click="chooseDeptItem(item)">
						<span class='radio-box d-block' :class="{active: deptIds.includes(item.id)}"></span>
						<div class="d-cell f14 d-text-black pl15 d-elip">{{item.deptName}}</div>
						<div class="f14 pl10 d-text-blue" :class="{ disable: deptIds.includes(item.id)}" v-if="item.children && item.children.length" @click.stop="getNext(item, index)">下级</div>
					</div>
				</div>
				<div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></div>
				<div class='d-bg-white'>
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="item in employees" :key="item.id" @click="chooseEmployeesItem(item)">
						<span class='radio-box d-block' :class="{active: employeesIds.includes(item.id)}"></span>
						<div class="ml15">
							<mAvatat :text='item.employeeName' :url="item.avatarUrl" />
						</div>
						<div class="d-cell f14 d-text-black pl15 d-elip">
							{{item.employeeName}}
						</div>
					</div>
				</div>
			</div>

            <div style="height:50px;justify-content: space-between;align-items: center;position:fixed;bottom:0;z-index:30;background:#F8F8FA;border-top:1px solid #F2F2F2" class="d-flex wfull">
                    <div class="d-text-blue ml15 d-elip">已选择：2323</div>
                    <i-button class="mr15" @click="handleClick" type="primary" size='small'>确定</i-button>
            </div>

        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			cuList: [],
			depts: [], // 部门数据
			employees: [], //
			breadCrumbs: [], // 面包屑
			deptsIndexs: [], // 已选中部门的索引
			employeesIds: [], // 已选中人员的id
			deptIds: [], // 已选中的部门 id
			chooseDepts: [], // 已选中的部门
			chooseEmployees: [] // 已选中的人员
		}
	},

	onLoad (option) {
		// 获取部门数据
		this.getDeptData(this.userInfo.companyEntity.companyTypeId)
		this.getEmployeesData(this.userInfo.companyEntity.companyTypeId)
	},

	computed: {
		userInfo () {
			return this.$store.state.userInfo
		}
	},

	methods: {
		// 设置面包屑
		setBreadCrumbs () {
			let breadCrumbs = []
			this.deptsIndexs.forEach((index) => {
				breadCrumbs.push({
					title: this.depts[index].deptName,
					index,
					id: this.depts[index].id
				})
			})
			this.breadCrumbs = breadCrumbs

			// 面包屑变更 获取当前部门下的人员
			let lastItem = [...breadCrumbs].pop()
			this.getEmployeesData((lastItem && lastItem.id) || this.userInfo.companyEntity.companyTypeId)
		},

		// 获取下级
		getNext (item, index) {
			// 当前部门已选中的话 禁止选择下级
			if (this.deptIds.includes(item.id)) return
			this.deptsIndexs.push(index)
		},
		// 获取所点击的childred
		getItem () {
			return this.deptsIndexs.length ? this.deptsIndexs.reduce((cu, index) => {
				return cu.length ? cu[index].children : this.depts[index].children
			}, []) : [...this.depts]
		},
		// 点击面包屑
		skipItem (index) {
			this.deptsIndexs = index === -1 ? [] : this.deptsIndexs.slice(0, index + 1)
		},
		// 选中部门事件
		chooseDeptItem (item, index) {
			let deptIdIndex = this.deptIds.indexOf(item.id)
			if (~deptIdIndex) {
				this.deptIds.splice(deptIdIndex, 1)
			} else {
				this.deptIds.push(item.id)
				// this.deptIds = [item.id]
			}
		},

		// 选中人员事件
		chooseEmployeesItem (item, index) {
			let employeesIndex = this.employeesIds.indexOf(item.id)
			let o = ~employeesIndex
			console.log(o)
			if (o) {
				this.employeesIds.splice(employeesIndex, 1)
			} else {
				this.employeesIds.push(item.id)
			}
		},
		// 初始化数据
		getDeptData (deptId) {
			// 获取部门数据
			this.$api.seeCrmService.organizationalStructureChildrenDepts({ deptId }).then((response) => {
				if (response.code === 200) {
					// this.depts = response.data[0].children
					this.depts = response.data[0].children
					this.cuList = response.data[0].children
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		},
		// 获取人员数据
		getEmployeesData (deptId) {
			this.$api.seeCrmService.organizationalStructureChildrenEmployees({ deptId }).then((response) => {
				if (response.code === 200) {
					this.employees = response.data
					this.cuList = this.getItem()
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		}
	},
	watch: {
		deptsIndexs (value) {
			this.setBreadCrumbs()
		}
	}

}
</script>

<style lang="scss" >

.dept-page{
    padding-bottom: 50px;
}
.radio-box{
    width: 15px;
    height: 15px;
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    position: relative;
    &.active{
        border-color: #1890ff;
        &::before{
            content: '';
            width: 11px;
            height: 11px;
            background: #1890ff;
            border-radius: 100px;
            position: absolute;
            left: 2px;
            top: 2px;
        }
    }
}

.disable{
    opacity: .6;
}
</style>
