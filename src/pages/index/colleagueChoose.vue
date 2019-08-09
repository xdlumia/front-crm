<!-- /**
 * @author 徐贺
 * @param label 选择同事
 */ -->
<template>
    <div>
        <NavBar title="首页" />
        <div>
            <div class="d-flex mt5">
                <div class="f16 d-text-gray b ml10 ac w50">同事 </div>
            </div>
			<indexed-list :isRadio='isRadio' ref="sortPickerList" :isCheckedAllData='isCheckedAllData' @clickData="clickData" :echodata='echodata'></indexed-list>

        </div>
        <div style="height:50px;justify-content: space-between;align-items: center;position:fixed;bottom:0;z-index:30;background:#FFF;border-top:1px solid #F2F2F2" class="d-flex wfull">
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
			dataArr: [
				{ employeeName: '中国', userId: 'China' },
				{ employeeName: '俄罗斯', userId: 'Russia' },
				{ employeeName: '美国', userId: 'America' },
				{ employeeName: '澳大利亚', userId: 'Australia' },
				{ employeeName: '巴西', userId: 'Brazil' },
				{ employeeName: '韩国', userId: 'Korea' },
				{ employeeName: '朝鲜', userId: 'North Korea' },
				{ employeeName: '英国', userId: 'Britain' },
				{ employeeName: '德国', userId: 'Germany' },
				{ employeeName: '加拿大', userId: 'Canada' },
				{ employeeName: '非洲', userId: 'New Zealand' }
			],
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
		this.getAlllist()
	},
	mounted () {

	},
	onLoad (option) {
		this.isRadio = option.isRadio == 0 ? false : true// eslint-disable-line
		this.query = option
		this.echodata = option.ids ? option.ids.split(',') : []
	},
	methods: {
		// 同事列表(公司内部的所有员工)
		getAlllist () {
			this.$api.seeCrmService.organizationalStructureColleagues(this.queryform)
				.then(res => {
					this.dataArr = res.data
					this.$refs.sortPickerList.initPage(this.dataArr)
					this.init()
				})
		},
		init () {
			this.isCheckedAllData = this.dataArr.filter((item) => {
				return this.echodata.includes(item.userId)
			})
			// console.log(this.isCheckedAllData)
		},
		clickData (data) {
			this.isCheckedAllData = data
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
