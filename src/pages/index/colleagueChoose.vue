<!-- /**
 * @author 徐贺
 * @param label 选择同事
 */ -->
<template>
    <div style="background-color: #f9f9f9;">
        <NavBar title="选择同事" />
        <div>
			<indexed-list @getList='getSearchList' :isRadio='isRadio' ref="sortPickerList" :isCheckedAllData='isCheckedAllData' @clickData="clickData" :echodata='echodata'></indexed-list>
        </div>
        <div style="height:50px;justify-content: space-between;align-items: center;position:fixed;bottom:0;z-index:30;background:#F8F8FA;border-top:1px solid #F2F2F2" class="d-flex wfull">
                <div class="d-text-blue ml15 d-elip">已选择：<span v-for="(item,index) in isCheckedAllData" :key="index" class="ml5">{{item.employeeName}}</span></div>
                <i-button class="mr15" @click="handleClick" type="primary" size='small'>确定</i-button>
        </div>

    </div>
</template>

<script>
import indexedList from '@/components/indexed-list'
export default {
	props: {

	},
	data () {
		return {
			dataArr: [],
			clickDatas: {},
			isRadio: true,
			queryform: {
				page: 1,
				limit: 5000,
				condition: ''// 姓名或者手机号
			},
			option: {},
			isCheckedAllData: [],
			echodata: [], // 用来做回显的数据
			query: {}
		}
	},
	components: {
		indexedList
	},
	computed: {

	},
	created () {

	},
	mounted () {

	},
	onLoad (option) {
		this.isRadio = option.isRadio == 0 ? false : true// eslint-disable-line
		this.query = option
		if (option.ids) {
			let arr = option.ids.split(',')
			if (arr.length > 1) {
				arr.forEach((item) => {
					this.echodata.push(Number(item))
				})
			} else {
				this.echodata = [Number(option.ids)]
			}
		}
		if (option.subordinate) { // 首页请求下属的数据
			this.userId = option.userId
			// this.getAlllist()
			this.getChildrenEmployee()
		} else if (option.deptId) { // 客户根据部门id查询部门下的所有人员
			this.getDeptEmployee(option.deptId)
		} else {
			this.getAlllist()
		}
	},
	methods: {
		getSearchList (val) {
			let arr = []
			arr = this.dataArr.filter((item) => {
				return item.employeeName.includes(val) || item.phone.includes(val)
			})
			this.$refs.sortPickerList.initPage(arr)
		},
		// 同事列表(公司内部的所有员工)
		getAlllist () {
			this.$api.seeCrmService.organizationalStructureColleagues(this.queryform)
				.then(res => {
					this.dataArr = res.data || []
					this.init()
				})
		},
		// 获取下属人员列表（包括自己）)
		getChildrenEmployee () {
			this.$api.seeCrmService.organizationalStructureGetChildrenEmployee({ employeeId: this.userId })
				.then(res => {
					this.dataArr = res.data || []
					this.init()
				})
		},
		// 客户根据部门id查询部门下的所有人员
		getDeptEmployee (id) {
			this.$api.seeCrmService.organizationalStructureChildrenEmployees({ deptId: id })
				.then(res => {
					this.dataArr = res.data || []
					this.init()
				})
		},
		init () {
			this.isCheckedAllData = this.dataArr.filter((item) => {
				return this.echodata.includes(item.userId)
			})
			this.$refs.sortPickerList.initPage(this.dataArr)
		},
		clickData (data) {
			this.isCheckedAllData = data
			let arr = []
			this.isCheckedAllData.forEach((item) => {
				arr.push(item.userId)
			})
			this.echodata = arr
		},
		// 点击确定
		handleClick () {
			this.$routing.navigateBack()
			uni.$emit('colleagueChoose', { data: this.isCheckedAllData, query: this.query })
		}
	},
	onReady () {
		// console.log(this.$store.state)
	}
}
</script>

<style scoped lang="scss">
.brblur{border-bottom:2px solid #457FF5;color:#333}
.wxaSortPickerItem{
        height: 88upx;
        line-height: 88upx;
        border-bottom: 1px solid #DEE4E4;
        color: #46595F;
        font-size: 30upx;
    }
</style>
