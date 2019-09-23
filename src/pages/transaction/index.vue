/*
 * @Author: web.徐贺
 * @Date: 2019-07-27 18:52:21
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-19 18:17:03
 * @Description: 成交记录
 */
<template>
    <div class="highseas-page">
        <NavBar title='成交记录' searchType='2' />
        <div>
            <div class="page-search-box d-flex" :style="'top: '+ navH">
                <a @click="getSearch" class="wfull">
                    <div class="search-input d-center d-cell pl10">
                        <i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5">{{queryForm.name || '搜成交记录名称'}}</span>
                    </div>
                </a>
            </div>
            <!-- <filter-diy @submit='submit' @clear='clear' /> -->
            <Filter :filterData='filterData' @filterSubmit='submit' ref='filter' :top='"calc("+ navH +" + 49px)"'>
                <div  style="padding-bottom:50px">
                    <!-- 成交状态 -->
                    <filter-plane v-model='queryForm.transactionStatus' title='成交状态' :dataList='CRM_CJZT' />
                    <div style="height:10px;background:#F2F2F2"></div>
                    <filter-plane title='总金额'>
                        <div class="d-flex wfull" style="justify-content:center;alibackground:#FFF;align-items:center;height:60px">
                            <div class="page-search-box d-flex" style="background:#f5f6fa;width:90%;position:relative">
                                <div class="search-input d-center d-cell pl10 wfull" style="display:flex !important;">
                                    <input v-model="queryForm.totalAmountMin" type="text" placeholder='最小值' style="width:40%">
                                    <div style="width:20%;color:#999">——</div>
                                    <input v-model="queryForm.totalAmountMax" type="text" placeholder='最大值' style="width:40%">
                                </div>
                            </div>
                        </div>
                    </filter-plane>
                    <div style="height:10px;background:#F2F2F2"></div>
                    <filter-plane v-model='queryForm.transationTime' title='成交时间' isSingle :dataList='transactionTime'/>
                </div>

                <div class='filter-btn d-center f18 d-text-blue'>
                    <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
                    <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
                </div>
            </Filter>
        </div>

        <div class='highseas-list-view d-relative'>
            <scroll-list
                :height="'calc(100vh - ' + navH +' - 129px)'"
                api="seeCrmService.transactionrecordList"
                @getList='getTransactionList'
                :params="queryForm"
                ref='list'
            >
            <div @click="handlerTransation(item, index)" v-for="(item,index) in transactionList" :key='index' class='d-relative'>
                <div class="pb10 pt10 pl15 pr15 highseas-item d-center d-bg-white">
                    <div class="d-cell">
                        <div class="f13 d-text-black">{{item.name}}</div>
                        <div class="f12 d-text-qgray">客户：{{item.clientName || ''}}</div>
                        <div class="f12 d-text-qgray">成交金额：{{item.totalAmount}}</div>
                    </div>
                    <div class="d-center">
                        <div v-if="chooseType == 0" class="f13 d-text-qgray">{{item.transactionStatus | dictionary('CRM_CJZT')}}</div>
                        <m-radio v-else :label='item.id' v-model="chooseData" />
                    </div>
                </div>
            </div>
            </scroll-list>

            <div v-if="chooseType == 0" class="footer-fixed-menu d-center d-bg-white">
                <a url='/pages/transaction/transaction-add' class="d-cell al">
                    <uni-icon type='plus' size='16' color='#666' /><span class="ml5 f13  d-text-gray">新建成交</span>
                </a>
                <a url='/pages/transaction/transaction-manage' class="d-cell ar">
                    <i-icon type='setup' size='18' color='#666' /><span class="ml5 f13  d-text-gray">管理成交记录</span>
                </a>
            </div>

            <div v-else class="footer-fixed-menu">
                <i-button @click="fsubmit" type="primary" i-class="f16">确 定</i-button>
            </div>
        </div>
    </div>
</template>

<script>
import Filter from '@/components/filter'
import FilterPlane from '@/components/filter-plane'
export default {
	components: {
		Filter,
		FilterPlane
		// FilterDiy
	},
	data () {
		return {
			queryForm: {
				totalAmountMin: '', // 总金额最小值
				totalAmountMax: '', // 总金额最大值
				name: '', // 名称
				transactionStatus: [], // 成交记录状态
				transationTime: '', // 成交时间
				queryType: 0,	 // 查询类型（-1 -全部，0-我负责的，1-我参与的，4-我下属负责的，5-我下属参与的, 2-我关注的）
				sortType: ''// 排序查询类型（0-创建日期，1-最新修改日期）
			},
			transactionTime: [
				{
					content: '本周',
					code: '0'
				},
				{
					content: '本季',
					code: '1'
				},
				{
					content: '本年',
					code: '2'
				},
				{
					content: '上周',
					code: '3'
				},
				{
					content: '上月',
					code: '4'
				}
			],
			filterData: [
				{
					prop: 'queryType',
					current: { id: 0, name: '我负责的' },
					list: [
						{
							id: -1,
							name: '全部'
						},
						{
							id: 0,
							name: '我负责的'
						},
						{
							id: 1,
							name: '我参与的'
						},
						{
							id: 4,
							name: '我下属负责的'
						},
						{
							id: 5,
							name: '我下属参与的'
						},
						{
							id: 2,
							name: '我关注的'
						}
					]
				},
				{
					prop: 'sortType',
					current: { id: 0, name: '创建日期' },
					list: [
						{
							id: 0,
							name: '创建日期'
						},
						{
							id: 1,
							name: '最新修改日期'
						}
					]
				}
			],
			chooseType: 0, // 是否被选择
			chooseData: '', // 被选中的id
			transactionList: []// 列表数据
		}
	},
	onLoad (options) {
		this.chooseType = options.select || 0
		this.chooseData = options.id || ''

		this.queryForm.queryType = options.queryType || 0
		let name = this.queryForm.queryType == 2 ? '我关注的' : '我负责的'// eslint-disable-line
		this.$set(this.filterData[0], 'current', { id: 2, name: name })
	},
	computed: {
		CRM_CJZT () {
			return this.dictionaryOptions('CRM_CJZT')
		}
	},
	onReady () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
		})
		this.filterSelect = selects
	},
	onShow () {
		// uni.$on('updatetransList', (data) => {
		this.$refs.list.reload()
		// })
	},
	onHide () {
		this.$local.remove('queryType')
	},
	onUnload () {
		// 移除监听事件
		this.$local.remove('queryType')
	},
	methods: {
		getTransactionList (list) {
			this.transactionList = list
		},
		// 筛选提交
		submit (item) {
			if (item) {
				this.queryForm[item.prop] = item.id
				this.$refs.list.reload()
			} else {
				this.$refs.list.reload()
			}
			this.$refs.filter.hide()
		},
		clear () {
			this.queryForm = {
				name: '', // 名称
				totalAmountMin: '', // 总金额最小值
				totalAmountMax: '', // 总金额最大值
				transactionStatus: [], // 成交记录状态
				transationTime: '', // 成交时间
				queryType: 0, // 查询类型（-1 -全部，0-我负责的，1-我参与的，4-我下属负责的，5-我下属参与的, 2-我关注的）
				sortType: ''// 排序查询类型（0-创建日期，1-最新修改日期）
			}
			this.$refs.list.reload()
			this.$refs.filter.hide()
		},
		getSearch () {
			uni.$once('updatedate', (data) => {
				this.queryForm.name = data.searchInfo
				this.$refs.list.reload()
			})
			this.$routing.navigateTo('/pages/common/search?searchType=2')
		},
		handlerTransation (item, index) {
			if (!this.chooseType) {
				this.$routing.navigateTo('/pages/transaction/detail?id=' + item.id)
				return
			}
			this.chooseData = item.id
		},
		// 被选中的确定
		fsubmit () {
			if (!this.chooseData) {
				this.$utils.toast.text('请选择成交记录')
			} else {
				let form = this.transactionList.filter((item) => {
                    return item.id == this.chooseData // eslint-disable-line
				})
				uni.$emit('chooseTransaction', { id: form[0].id, name: form[0].name })
				this.$routing.navigateBack()
			}
		}
	}
}
</script>

<style scoped lang="scss">

    .highseas-page{
        height: 100vh;
        background: #f2f2f2;
    }
    .highseas-list-view{
        margin-top: 87px;
        box-sizing: border-box;
        // padding-bottom: 110px;
    }
    .highseas-item{
        border-bottom:1px solid #d7d7d7;
    }

    .page-search-box{
        height: 29px;
        padding: 10px 15px;
        background: #f2f2f2;
        position: fixed;
        right: 0;
        left: 0;
        z-index:10;
        .search-input{
            display: block;
            height: 100%;
            border-radius: 3px;
            background: #fff;
            line-height: 29px;
        }
    }

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

</style>
