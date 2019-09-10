
<template>
    <div>
        <NavBar title="组织架构" />
        <div class="uni-flex uni-column dept-page">
            <!-- 公司 -->
            <div class="flex-item flex-item-V mt10 mb10">
                <span class="p10 d-text-blue" @click="skipItem(-1)">{{userInfo.companyEntity.companyName}}</span>
                <span class="d-text-blue bread-item"
					v-for='(item, index) in breadCrumbs'
					:key="index"
					@click="skipItem(index)"
				>
					<span>></span>
					<span class="p10">{{item.title}}</span>
				</span>
            </div>

            <div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></div>

			<div>
				<div class="d-bg-white dept-box">
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in currentDeptList" :key="item.id" @click="chooseDeptItem(item)">
						<span class='radio-box d-block mr15' :class="{active: deptIds.includes(item.id)}" v-if='!isOnlyEmployees'></span>
						<div class="d-cell f14 d-text-black d-elip">{{item.deptName}}</div>
						<div class="f14 pl10 d-text-blue" :class="{ disable: deptIds.includes(item.id)}" v-if="item.children && item.children.length" @click.stop="getNext(item, index)">下级</div>
					</div>
				</div>
				<div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;" v-if="!isOnlyDept"></div>
				<div class='d-bg-white'>
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="item in employees" :key="item.id" @click="chooseEmployeesItem(item)">
						<span class='radio-box d-block mr15' :class="{active: employeesIds.includes(item.id)}"></span>
						<div class="">
							<mAvatat :text='item.employeeName' :url="item.avatarUrl" />
						</div>
						<div class="d-cell f14 d-text-black pl15 d-elip">
							{{item.employeeName}}
						</div>
					</div>
				</div>
			</div>

            <div style="height:50px;justify-content: space-between;align-items: center;position:fixed;bottom:0;z-index:30;background:#F8F8FA;border-top:1px solid #F2F2F2" class="d-flex wfull">
				<div class="d-text-blue ml15 d-elip">
                    已选择：<span v-if="chooseEmployees.length || chooseDepts.length" @click="isShow = true">
                        {{chooseEmployees.length}}人 <span class="ml5" v-if="chooseDepts.length">{{chooseDepts.length}}个部门</span>
                    </span>
                </div>
				<i-button class="mr15" @click="submit" type="primary" size='small'>确定</i-button>
            </div>

            <!-- 已选择人员部门 -->
			<div v-if="isShow && (chooseDepts.length || chooseEmployees.length)" class="d-relative d-fixed choose-box">
				<div class="d-bg-white dept-box">
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in chooseDepts" :key="item.id">
						<div class="d-cell f14 d-text-black d-elip">{{item.deptName}}</div>
						<div class="d-text-red f14" @click.stop="removeDept(index)">移除</div>
					</div>
				</div>
				<div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;" v-if="chooseDepts.length"></div>
				<div class='d-bg-white'>
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in chooseEmployees" :key="item.id" >
						<div class="">
							<mAvatat :text='item.employeeName' :url="item.avatarUrl" />
						</div>
						<div class="d-cell f14 d-text-black pl15 d-elip">
							{{item.employeeName}}
						</div>
						<div class="d-text-red f14" @click.stop="removeEmployees(index)">移除</div>
					</div>
				</div>

                <div class="footer-fixed-menu">
                    <i-button type="primary" i-class="f16" @click='isShow = false'>确定</i-button>
                </div>
			</div>

        </div>
    </div>
</template>
<script>
export default {
	// props: {
	// 	// 是否多选
	// 	isMultiple: {
	// 		type: Boolean,
	// 		default: true
	// 	},
	// 	type: {
	// 		type: [String, Number],
	// 		default: 0 // 0 => 部门和人员  1 => 只选择部门 2 => 只选择人员
	// 	}
	// },
	data () {
		return {
			currentDeptList: [], // 当前部门列表
			depts: [], //  人员数据
			employees: [], // 人员数据
			breadCrumbs: [], // 面包屑
			deptsIndexs: [], // 已选中部门的索引
			employeesIds: [], // 已选中人员的id
			deptIds: [], // 已选中的部门 id
			chooseDepts: [], // 已选中的部门
			chooseEmployees: [], // 已选中的人员
			isShow: false,
			type: 0,
			isMultiple: true
		}
	},

	created (option) {
		// 获取部门数据
		this.getDeptData(this.userInfo.companyEntity.companyTypeId)
		this.getEmployeesData(this.userInfo.companyEntity.companyTypeId)
	},

	computed: {
		// 是否只选择人员
		isOnlyEmployees () {
			return +this.type === 2
		},
		// 是否只选择部门
		isOnlyDept () {
			return +this.type === 1
		},
		userInfo () {
			return this.$store.state.userInfo
		}
	},

	methods: {
		// 设置面包屑
		setBreadCrumbs () {
			let breadCrumbs = []
			let item = {}
			let index = 0
			while (this.deptsIndexs.length > index) {
				let itemIndex = this.deptsIndexs[index]
				item = index === 0 ? this.depts[itemIndex] : item.children[itemIndex]
				breadCrumbs.push({
					title: item.deptName,
					index,
					id: item.id
				})
				index++
			}
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
			if (+index === +this.breadCrumbs.length) return
			this.deptsIndexs = index === -1 ? [] : this.deptsIndexs.slice(0, index + 1)
		},

		// 选中部门事件
		chooseDeptItem (item, index) {
			// 判断是否只能选择人员
			if (this.isOnlyEmployees) return

			let deptIdIndex = this.deptIds.indexOf(item.id)
			if (!~deptIdIndex) {
				// 过滤 children 字段
				let { children, ...deptItem } = item

				// 是否多选
				if (this.isMultiple) {
					this.deptIds.push(deptItem.id)
					this.chooseDepts.push(deptItem)
					return
				}

				this.deptIds = [deptItem.id]
				this.chooseDepts = [deptItem]
				return
			}

			this.removeDept(deptIdIndex)
		},

		// 选中人员事件
		chooseEmployeesItem (item, index) {
			let employeesIndex = this.employeesIds.indexOf(item.id)

			if (!~employeesIndex) {
				let { children, ...employeesItem } = item

				if (this.isMultiple) {
					this.employeesIds.push(employeesItem.id)
					this.chooseEmployees.push(employeesItem)
					return
				}

				this.employeesIds = [employeesItem.id]
				this.chooseEmployees = [employeesItem]

				return
			}

			this.removeEmployees(employeesIndex)
		},

		// 删除人员
		removeEmployees (index) {
			this.employeesIds.splice(index, 1)
			this.chooseEmployees.splice(index, 1)
			this.isShow && (this.isShow = this.employeesIds.length || this.deptIds.length)
		},
		// 删除 部门
		removeDept (index) {
			this.deptIds.splice(index, 1)
			this.chooseDepts.splice(index, 1)
			this.isShow && (this.isShow = this.employeesIds.length || this.deptIds.length)
		},

		// 初始化数据
		getDeptData (deptId) {
			// 获取部门数据
			this.$api.seeCrmService.organizationalStructureChildrenDepts({ deptId }).then((response) => {
				if (response.code === 200) {
					this.depts = response.data[0].children
					this.currentDeptList = response.data[0].children
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		},

		// 获取人员数据
		getEmployeesData (deptId) {
			if (this.isOnlyDept) {
				this.currentDeptList = this.getItem()
				return
			};

			this.$api.seeCrmService.organizationalStructureChildrenEmployees({ deptId }).then((response) => {
				if (response.code === 200) {
					this.employees = response.data
					this.currentDeptList = this.getItem()
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		},
		submit () {
			let data = {
				depts: this.chooseDepts,
				employees: this.chooseEmployees
			}
			this.$emit('submit', data)
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

.bread-item{
	&:last-child{
		color: #a2a2a4
	}
}

.choose-box{
	z-index: 31;
	width: 100%;
	height: 100%;
	background: #fff;
    padding-bottom: 45px;
    overflow-y: auto;
}
</style>
