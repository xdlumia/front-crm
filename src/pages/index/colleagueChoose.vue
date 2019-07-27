<!-- /**
 * @author 徐贺
 * @param label 选择同事
 */ -->
<template>
    <div>
        <NavBar title="首页" />
        <div>
            <div class="d-flex mt5">
                <div @click="isColleague = false" class="f16 d-text-gray b ml10 ac w50" :class="!isColleague ? 'brblur' : ''">最近</div>
                <div @click="isColleague = true" class="f16 d-text-gray b ml10 ac w50" :class="isColleague ? 'brblur' : ''">同事 </div>
            </div>
            <!--  -->
            <div v-show="!isColleague">
                <block v-for="(child,index) in dataArr" :key="index">
                    <view class="wxaSortPickerItem" :data-text="child.name" :data-value="child.value"  @click="wxaSortPickerItemTap(child)">
                        <uni-icon class="ml15" type='checkbox-filled' :color="child.value == isCheckedData.value ? '#1890FF' : '#999'" size='26' />
                        <span class="ml5">{{child.name}}</span>
                    </view>
                </block>
            </div>

            <div v-show="isColleague">
                <indexed-list :isRadio='isRadio' :dadchild='isCheckedData' ref="sortPickerList" @clickData="clickData"></indexed-list>
            </div>

        </div>
        <div style="height:50px;justify-content: space-between;align-items: center;position:fixed;bottom:0;z-index:30;background:#FFF;border-top:1px solid #F2F2F2" class="d-flex wfull">
                <div class="d-text-blue ml15">已选择：{{isCheckedData.name || ''}}</div>
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
			isColleague: true,
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
			isRadio: true,
			isCheckedData: { name: '', value: '' }
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
		this.$refs.sortPickerList.initPage(this.dataArr)
	},
	onLoad (option) {
	},
	methods: {
		clickData (data) {
			this.isCheckedData = data
		},
		handleClick () {
			this.$emit('clickAllData', this.isCheckedData)
		},
		wxaSortPickerItemTap (child) {
			this.isCheckedData.value === child.value ? this.isCheckedData = {} : this.isCheckedData = child
			this.$refs.sortPickerList.wxaSortPickerItemTap(this.isCheckedData, 'dad')
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
