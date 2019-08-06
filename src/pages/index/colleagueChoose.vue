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
                <div class="d-text-blue ml15 d-elip">已选择：<span v-for="(item,index) in isCheckedAllData" :key="index" class="ml5">{{item.name}}<span></div>
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
				{ name: '中国', value: 'China' },
				{ name: '俄罗斯', value: 'Russia' },
				{ name: '美国', value: 'America' },
				{ name: '澳大利亚', value: 'Australia' },
				{ name: '巴西', value: 'Brazil' },
				{ name: '韩国', value: 'Korea' },
				{ name: '朝鲜', value: 'North Korea' },
				{ name: '英国', value: 'Britain' },
				{ name: '德国', value: 'Germany' },
				{ name: '加拿大', value: 'Canada' },
				{ name: '非洲', value: 'New Zealand' }
			],
			clickDatas: {},
			isRadio: false,
			isCheckedAllData: [{ name: '', value: '' }],
			echodata: ['Australia']// 用来做回显的数据
		}
	},
	components: {
		indexedList
	},
	computed: {

	},
	created () {
		this.init()
	},
	mounted () {
		this.$refs.sortPickerList.initPage(this.dataArr)
	},
	onLoad (option) {

	},
	methods: {
		init () {
			this.isCheckedAllData = this.dataArr.filter((item) => {
				return this.echodata.includes(item.value)
			})
		},
		clickData (data) {
			this.isCheckedAllData = data
		},
		// 点击确定
		handleClick () {
			this.$emit('clickAllData', this.isCheckedData)
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
