<template>
    <div>
        <scroll-view class='diy-filter' :style='"height: calc(100vh - "+ navH + " - 40px)"' scroll-y>
            <filter-plane title='销售机会负责人'>
                <div class="pb5">
                    <div class='f13 d-text-blue mb10' v-if='!filterData.leaderId' @click='chooseLeader'>无筛选项,点击添加 <i-icon type='enter' size='13' color='#4889F4' /></div>
                    <div class="d-flex" v-if="filterData.leaderId">
                        <div class='ac' @click='chooseLeader'>
                            <m-avatar :url='avatarUrl' :text='userName' :width='40' :height='40' />
                            <div class='f14 mt5'>{{userName}}</div>
                        </div>
                    </div>
                </div>
            </filter-plane>
            <filter-plane title='销售阶段' v-model='filterData.stageIds' :dataList='stageLists'/>
            <filter-plane title='预计成交日期' v-model='filterData.transationTime' isSingle :dataList='dateList'/>
            <filter-plane title='机会来源' v-model='filterData.sourceCode' :dataList="dictionaryOptions('CRM_LY')"/>
        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'
import mAvatar from '@/components/m-avatar'

let dateList = [
	{ code: '5', content: '本月' },
	{ code: '1', content: '本季度' },
	{ code: '2', content: '本年' },
	{ code: '8', content: '昨天' },
	{ code: '6', content: '今天' },
	{ code: '3', content: '上周' },
	{ code: '0', content: '本周' },
	{ code: '7', content: '下周' }
]
export default {
	props: ['stageList', 'form'],
	components: {
		FilterPlane,
		mAvatar
	},
	data () {
		return {
			principal: [],
			dateList: dateList,
			filterData: {
				stageIds: [], // 销售阶段
				transationTime: '', // 预计成交日期
				sourceCode: [],
				leaderId: ''
			},
			userInfo: {},
			userName: '',
			avatarUrl: ''
		}
	},
	computed: {
		stageLists () {
			return this.stageList.map(item => { return { content: item.stageName, code: item.id } })
		}
	},
	methods: {
		chooseLeader () {
			uni.$once('colleagueChoose', data => {
				if (data.data.length > 0) {
					this.filterData.leaderId = data.data[0].userId
					this.userName = data.data[0].employeeName
					this.avatarUrl = data.data[0].avatarUrl
				} else {
					this.filterData.leaderId = this.userInfo.id
					this.userName = this.userInfo.name
					this.avatarUrl = this.userInfo.avatarUrl
				}
			})
			this.$routing.navigateTo(`/pages/index/colleagueChoose?subordinate=1&userId=${this.$store.state.userInfo.id || ''}&ids=${this.filterData.leaderId}`)
		},
		clear () {
			Object.assign(this.filterData, this.$options.data().filterData)
		},
		submit (item) {
			this.$emit('submit', this.filterData)
		}
	}
}
</script>

<style lang="scss" scoped>
	.filter-btn{
		position: absolute;
		width: 100%;
		background: #fff;
		height: 49px;
		bottom: 0;
		.btn-item{
			line-height: 49px;
		}
	}

	.diy-filter{
		padding-bottom: 50px;
		box-sizing: border-box;
		background: #f2f2f2;
	}
</style>
