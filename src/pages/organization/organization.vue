/*
 * @Author: web.冀猛超
 * @Date: 2019-09-10 15:28:34
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-20 16:25:10
 * @Description: 组织架构
 */

<template>
    <div>
        <NavBar title="组织架构" />
        <div class="uni-flex uni-column dept-page">
            <!-- 公司 -->
            <div class="flex-item flex-item-V mt10 mb10" v-if="breadCrumbs.length">
                <!-- <span class="p10 d-text-blue" @click="skipItem(-1)">{{userInfo.companyEntity.companyName}}</span> -->
                <span class="d-text-blue bread-item"
					v-for='(item, index) in breadCrumbs'
					:key="index"
					@click="skipItem(index)"
				>
					<span v-if="index">></span>
					<span class="p10">{{item.title}}</span>
				</span>
            </div>

            <div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></div>

			<div>
				<div class="d-bg-white dept-box">
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in currentDeptList.children" :key="item.id" @click="chooseDeptItem(item)">
						<span class='radio-box d-block mr15' :class="{active: chooseDeptIds.includes(item[deptKey].toString())}" v-if='!isOnlyEmployees'></span>
						<div class="d-cell f14 d-text-black d-elip">{{item.deptName}}</div>
						<div
							class="f14 pl10 d-text-blue"
							:class="{ disable: chooseDeptIds.includes(item[deptKey].toString())}"
							v-if="isOnlyDept ? item.children && item.children.length : (item.children && item.children.length) || (item.employeeList && item.employeeList.length)"
							@click.stop="getNext(item, index)"
						>下级</div>
					</div>
				</div>
				<div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;" v-if="!isOnlyDept"></div>
				<div class='d-bg-white' v-if="!isOnlyDept">
					<div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="item in currentDeptList.employeeList" :key="item.id" @click="chooseEmployeesItem(item)">
						<span class='radio-box d-block mr15' v-if="!isOnlyDept" :class="{active: chooseEmployeesIds.includes(item[employeesKey].toString())}"></span>
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
                        <span v-if="chooseEmployees.length">{{chooseEmployees.length}}人</span> <span class="ml5" v-if="chooseDepts.length">{{chooseDepts.length}}个部门</span>
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
	props: {
		// 是否多选 1 => 多选 0 => 单选
		isMultiple: {
			type: [String, Number],
			default: 1
		},
		type: {
			type: [String, Number],
			default: 0 // 0 => 部门和人员  1 => 只选择部门 2 => 只选择人员
		},
		deptKey: {
			type: String,
			default: 'id'
		},
		employeesKey: {
			type: String,
			default: 'id'
		},
		deptIds: {
			type: String
		},
		employeesIds: {
			type: String
		},
		// 是否必选 1 => 是 0 => 否
		isRequire: {
			type: [String, Number],
			default: 0
		}
	},
	data () {
		return {
			currentDeptList: {
				children: [],
				employeeList: []
			}, // 当前部门列表
			depts: [], //  人员数据
			// employees: [], // 人员数据
			breadCrumbs: [], // 面包屑
			deptsIndexs: [], // 已选中部门的索引
			chooseEmployeesIds: [], // 已选中人员的id
			chooseDeptIds: [], // 已选中的部门 id
			chooseDepts: [], // 已选中的部门
			chooseEmployees: [], // 已选中的人员
			isShow: false
		}
	},

	created (option) {
		// 获取部门数据
		this.getDeptData(this.userInfo.companyEntity.companyDeptId)
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
				item = index === 0 ? this.depts.children[itemIndex] : item.children[itemIndex]
				breadCrumbs.push({
					title: item.deptName,
					index,
					id: item.id
				})
				index++
			}
			this.breadCrumbs = breadCrumbs
			console.log(this.breadCrumbs.length)
		},

		// 获取下级
		getNext (item, index) {
			// 当前部门已选中的话 禁止选择下级
			if (this.chooseDeptIds.includes(item[this.deptKey].toString())) return
			this.deptsIndexs.push(index)
		},

		// 获取所点击的childred
		getItem () {
			return this.deptsIndexs.length ? this.deptsIndexs.reduce((cu, index) => {
				return cu && Object.keys(cu).length ? cu.children[index] : this.depts.children[index]
			}, {}) : this.depts
		},

		// 点击面包屑
		skipItem (index) {
			if (+index === +this.breadCrumbs.length) return
			this.deptsIndexs = index === 0 ? [] : this.deptsIndexs.slice(0, index + 1)
		},

		// 选中部门事件
		chooseDeptItem (item, index) {
			// 判断是否只能选择人员
			if (this.isOnlyEmployees) return

			let deptIdIndex = this.chooseDeptIds.indexOf(item[this.deptKey].toString())
			if (!~deptIdIndex) {
				// 过滤 children 字段
				let { children, ...deptItem } = item

				// 是否多选
				if (+this.isMultiple) {
					this.chooseDeptIds.push(deptItem[this.deptKey].toString())
					this.chooseDepts.push(deptItem)
					return
				}

				this.chooseDeptIds = [deptItem[this.deptKey].toString()]
				this.chooseDepts = [deptItem]
				this.chooseEmployeesIds = []
				this.chooseEmployees = []
				return
			}

			this.removeDept(deptIdIndex)
		},

		// 选中人员事件
		chooseEmployeesItem (item, index) {
			let employeesIndex = this.chooseEmployeesIds.indexOf(item[this.employeesKey].toString())

			if (!~employeesIndex) {
				let { children, ...employeesItem } = item
				if (+this.isMultiple) {
					this.chooseEmployeesIds.push(employeesItem[this.employeesKey].toString())
					this.chooseEmployees.push(employeesItem)
					return
				}

				this.chooseEmployeesIds = [employeesItem[this.employeesKey].toString()]
				this.chooseEmployees = [employeesItem]
				this.chooseDeptIds = []
				this.chooseDepts = []

				return
			}

			this.removeEmployees(employeesIndex)
		},

		// 删除人员
		removeEmployees (index) {
			this.chooseEmployeesIds.splice(index, 1)
			this.chooseEmployees.splice(index, 1)
			this.isShow && (this.isShow = this.chooseEmployeesIds.length || this.chooseDeptIds.length)
		},
		// 删除 部门
		removeDept (index) {
			this.chooseDeptIds.splice(index, 1)
			this.chooseDepts.splice(index, 1)
			this.isShow && (this.isShow = this.chooseEmployeesIds.length || this.chooseDeptIds.length)
		},

		// 初始化数据
		getDeptData (deptId) {
			// 获取部门数据
			this.$api.seeCrmService.organizationalStructureChildrenDepts({ deptId }).then((response) => {
				if (response.code === 200) {
					// 时间紧迫, 外层增加一级. 把公司展示出来
					let data = [
						{
							children: [...response.data],
							employeeList: []
						}
					]

					this.depts = data[0] || {}
					this.currentDeptList = data[0] || {
						children: [],
						employeeList: []
					}
					// 缓存部门信息
					this.$local.save('depts', response.data)
					// 回显
					this.getChildItem(this.chooseDeptIds, this.chooseEmployeesIds)
				} else {
					this.$utils.toast.text(response.msg)
				}
			})
		},

		submit () {
			// 判断 是否必填

			if (+this.isRequire === 1) {
				if (this.isOnlyEmployees && !this.chooseEmployees.length) {
					return this.$utils.toast.text('请选择人员')
				}

				if (this.isOnlyDept && !this.chooseDepts.length) {
					return this.$utils.toast.text('请选择部门')
				}

				if (!this.chooseEmployees.length && !this.chooseDepts.length) {
					return this.$utils.toast.text('请选择部门或人员')
				}
			}

			let data = {
				depts: this.chooseDepts,
				employees: this.chooseEmployees
			}
			this.$emit('submit', data)
		},

		// 递归查找已选择的项
		getChildItem (deptIds = [], employeesIds = []) {
			let getChild = data => {
				data.forEach(element => {
					(this.isOnlyEmployees || +this.type === 0) &&
						element.employeeList &&
						element.employeeList.forEach(eItem => employeesIds.includes(eItem[this.employeesKey].toString()) && this.chooseEmployees.push(eItem));

					(this.isOnlyDept || +this.type === 0) &&
						element.children &&
						element.children.forEach(eItem => deptIds.includes(eItem[this.deptKey].toString()) && this.chooseDepts.push(eItem))

					if (element.children && element.children.length) getChild(element.children)
				})
			}
			getChild([this.depts])
		}

	},
	watch: {
		deptsIndexs (value) {
			this.setBreadCrumbs()
			// 更新当前列表数据
			this.currentDeptList = this.getItem()
		},
		deptIds (ids) {
			this.chooseDeptIds = ids.split(',')
		},
		employeesIds (ids) {
			this.chooseEmployeesIds = ids.split(',')
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
	&:last-child:not(:first-child){
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
