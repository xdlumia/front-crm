<template>
    <div style="wfull">
        <NavBar title="首页" />
        <div class="d-flex mt5">
            <div @click="current = 0,clickDay = todayDate" class="f16 d-text-gray b ml15 ac" :class="current == 0 ? 'brblur' : ''">今天</div>
            <div @click="current = 1,clickDay = todayDate" class="f16 d-text-gray b ml15 ac" :class="current == 1 ? 'brblur' : ''">仪表盘 </div>
        </div>

        <!-- 今天 -->
        <div v-if='current == 0'>
            <!--显示本周-->

            <div v-if="timelong == 7">
                <div class="d-text-black ml15" style="margin-top:8px" @click='timelong = 30,clickDay = todayDate'>{{thisDate}}
                    <uni-icon type="arrowdown" class="pl5" size="18"/>
                </div>
                <div class="d-flex mt15">
                    <div v-for="item in aweek" :key='item' style="flex:1;color:#CCCCCC" class="d-text-qgray ac b">{{item}}</div>
                </div>
                <div class="d-flex" style="flex-wrap:wrap;">
                    <div v-for="(item,index) in allTime" :key='index' style="" @click="fclickThisDay(item)" class="d-text-qgray ac b d-flex cirle-all">
                        <div class="ac mb5" style="font-weight: normal;color: #666;min-height: 32px;line-height: 32px;" :class="item.otherTime == clickDay ? 'haveClick' : ''">
                            {{item.dayTime}}
                        </div>
                            <i style="height: 5px;" v-if="allcolleagues.includes(item.otherTime)" class="cirle-blue"></i>
                            <i style="height: 5px;" v-else></i>
                    </div>
                </div>
            </div>
            <!--日历插件-->
            <div style="position: relative;" v-if="timelong == 30">
                <uni-calendar ref="calendar" insert="true" :selected='selected' @haveClick='confirm'/>
                <uni-icon @click='timelong = 7,clickDay = todayDate' type="arrowup" class="pl5 d-pointer" size="18" style='position: absolute;top: 8px;left: 85px;'/>
            </div>

            <!--暂无日程-->
            <div v-if="!allcolleagues.includes(clickDay)" style="justify-content: center;align-items: center;flex-direction: column;" class="d-flex p10 mt15">
                <img src="../../assets/img/nothing.png" style="width: 132px;height: 111px;"/>
                <span class="d-text-qgray">今天还没有安排日程哦</span>
            </div>

            <!--日程列表-->
            <div v-for="(item,index) in indexList" :key="index">
                <a :url="`/pages/index/scheduleAdd?scheId=${item.id}`" v-if="changeTime(item.startTime) == clickDay" style="border-top: 1px solid #e4e4e4;border-left: none;border-right: none;">
                    <div class="p10 ml5" style="box-sizing: border-box;">
                        <div class="wfull d-flex">
                            <div class="d-flex cirle-blue" style="margin-top: 7px;">
                            </div>
                            <span class="d-text-gray ml10 d-elip" style="max-width:60%">{{item.content}}</span>
                            <div class="ac ml10 pl5 pr5 f12" style="height: 18px;line-height: 18px;color:#457FF5;border: 1px solid #457FF5;border-radius: 5px;">
                                <span>{{ item.remindSecond&lt;3600 ? ((item.remindSecond/60) + '分钟') : (item.remindSecond/3600 + '小时') }}</span>
                            </div>
                        </div>
                        <div class="d-text-gray ml15">
                            {{item.startTime | timeToStr('hh:ii')}} - {{item.endTime | timeToStr('hh:ii')}}
                        </div>
                    </div>
                </a>
            </div>

            <!--新建日程-->
            <div class="d-flex mt10 mb15" style="justify-content: center;">
                <div @click="scheduleAdd">
                    <div class="ac" style="width: 131px;height: 37px;border: 1px solid #457FF5;line-height: 37px;border-radius: 50px;color: #457FF5;">
                        <span>新建日程</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 仪表盘 -->
        <div v-if='current == 1'>
            <div class="h40 d-flex-level mt10" style="background:#F9F9F9;">
                <div class="d-flex ml15" style="height: 26px;align-items: center;">
                    <m-avatar :nameLength='1' :url='avatarUrl' :text='userName' :width='24' :height='24'></m-avatar>
                    <div @click="getColleagueChoose">
                        <span class="d-text-qgray f13 ml5">{{userName}}</span>
                    </div>
                    <uni-icon color='#999' type="arrowdown" class="pl5 d-text-qgray" size="16"/>
                </div>
                <div class="mr15" style="height:26px;line-height:26px">
                     <i class="iconfont f16 iconshouye_chengjiaoshujurili" style="color: #B9C5CF;"></i>
                     <span class="d-text-qgray f12 ml5">本月</span>
                </div>
            </div>
            <div style="height: 10px;background: #F1F1F1;"></div>
            <div style="height: 250px;">
                <div class="h50" style="line-height: 50px;">
                    <i class="iconfont f13 icontongyekehuguanli ml15" style="color: #54D1C7;"></i>
                    <span class="b ml10 f13">销售简报</span>
                </div>
                <div class="d-flex flexconm h200">
                    <div class="flexalone d-flex mt5">
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 kehuquan lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.clientCount}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增客户</span>
                            </div>
                        </div>
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 lianxirenquan lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.linkCount}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增联系人</span>
                            </div>
                        </div>
                    </div>
                    <div class="flexalone d-flex mt5">
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconshangji lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.salesChanceCount}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增销售机会</span>
                            </div>
                        </div>
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconzhuzhuangtu lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.salesChanceChange}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">阶段变化的商机</span>
                            </div>
                        </div>
                    </div>
                    <div class="flexalone d-flex mt5">
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconkehugenjin lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.followUpCount}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增客户跟进</span>
                            </div>
                        </div>
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconjilu lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">{{salesKitForm.tranRecordCount}}</span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增成交记录</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 10px;background: #F1F1F1;"></div>
            <div>
                <div class="h50" style="align-items: center">
                    <i class="iconfont f20 iconxiaoshouloudou ml15" style="color: #E55FD4;"></i>
                    <span class="b ml5 f13">销售漏斗</span><span class="f13 b">( 商机金额 )</span>
                </div>
                <div class="wfull" style="height:200px;">
                   <view class="echartsBox">
                         <ec-canvas :ec="ec" ref='echart'></ec-canvas>
                    </view>
                </div>
            </div>
            <div style="height: 10px;background: #F1F1F1;"></div>
            <div>
                <div class="h50" style="line-height: 50px;">
                    <i class="iconfont f16 iconpaihangbang ml10" style="color: #FECC00;"></i>
                    <span class="b f13">排行榜</span><span class="f13 b">( 全公司 )</span>
                </div>
                <div>
                    <div class="d-flex">
                        <div style="width: 70px;" class="ml15"><span class="f12 d-hui">排名</span></div>
                        <div style="width: 120px;"><span class="f12 d-hui">前十名</span></div>
                        <div><span class="f12 d-hui">新建成交金额（元）</span></div>
                    </div>

                    <div class="d-flex" v-for='(item,index) in rankingList' :key='index'>
                        <div style="width: 70px;" class="ml15"><span class="d-text-black">{{item.rownum}}</span></div>
                        <div style="width: 120px;"><span class="d-text-black">{{item.leaderName}}</span></div>
                        <div><span class=" d-text-black">{{item.amount}}</span></div>
                    </div>

                </div>
            </div>
            <!-- <div class="mt15" style="height: 10px;background: #F1F1F1;"></div> -->
        </div>

    </div>
</template>

<script>
import mAvatar from '@/components/m-avatar'
export default {
	data () {
		return {
			current: 0,
			aweek: ['日', '一', '二', '三', '四', '五', '六'],
			allTime: [],
			userInfo: {},
			timelong: 7,
			opts: {}, // 传给漏斗图的数据
			clickDay: '',
			selected: [],
			ec: {
				option: {
					color: ['#FF9900', '#ffe06c', '#b1e289', '#72daa3', '#53d1c6', '#5CBFF8', '#5cA1ff'],
					title: {
						left: 'left',
						top: 'bottom'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c}%'
					},
					calculable: true,
					series: [
						{
							type: 'funnel',
							width: '60%',
							sort: 'none',
							height: '80%',
							left: '10%',
							top: '5%',
							data: this.funnelList,
							label: {
								fontSize: 12,
								color: '#333'
							}
						}
					]
				}
			},
			hour: 3600, // 区分小时还是分钟
			mint: 60,
			userId: 1,
			popaic: '',
			avatarUrl: '', // 用户头像
			userName: '',
			allcolleagues: [], // 有日程的所有时间
			salesKitForm: {}, // 销售简报
			rankingList: [], // 排行榜
			funnelList: [], // 漏斗数据
			indexList: []// 首页所有日程列表
		}
	},
	components: {
		mAvatar
	},
	computed: {
		todayDate () {
			return (new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())
		},
		thisDate () {
			return (new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月')
		}
	},
	created () {
		this.userInfo = this.$store.state.userInfo || this.$local.fetch('userInfo') || {}
		this.userId = this.userInfo.id
		this.userName = this.userInfo.name
		this.avatarUrl = this.userInfo.avatarUrl
	},
	onShow () {
		this.scheduleSelectSalesKit()
		this.scheduleSelectCompanyRanking()
		this.scheduleSelectSalesFunnel()

		this.getIndexList()
		this.changeTime()
		this.getDates()
		this.getTodayDate()
	},
	onLoad (option) {
	},
	methods: {
		// 点击切换人员
		getColleagueChoose () {
			if (this.authorityButtons.includes('crm_index_001')) {
				// 选择的当前人
				uni.$once('colleagueChoose', data => {
					if (data.data.length > 0) {
						this.userId = data.data[0].userId
						this.userName = data.data[0].employeeName
						this.avatarUrl = data.data[0].avatarUrl
					} else {
						this.userId = this.userInfo.id
						this.userName = this.userInfo.name
						this.avatarUrl = this.userInfo.avatarUrl
					}
					this.scheduleSelectSalesKit()
					this.scheduleSelectSalesFunnel()
				})
				this.$routing.navigateTo(`/pages/index/colleagueChoose?subordinate=1&userId=${this.userInfo.employeeId}&ids=${this.userId}`)
			}
		},
		// 点击新建日程
		scheduleAdd () {
			uni.$once('updateIndexList', data => {
				this.getIndexList()
			})
			this.$routing.navigateTo('/pages/index/scheduleAdd')
		},
		// 获取日程列表
		getIndexList () {
			this.$api.seeCrmService.scheduleList({
				userId: this.userInfo.id,
				page: 1,
				limit: 1000
			})
				.then(res => {
					this.indexList = res.data || []
					this.indexList.forEach((item) => {
						this.allcolleagues.push(this.changeTime(item.startTime))
						this.selected.push({ date: this.changeTime(item.startTime) })
					})
				})
		},
		// 查询本月当前人的销售简报
		scheduleSelectSalesKit () {
			this.$api.seeCrmService.scheduleSelectSalesKit(null, this.userId)
				.then(res => {
					this.salesKitForm = res.data || []
				})
		},
		// 查询本月的排行榜
		scheduleSelectCompanyRanking () {
			this.$api.seeCrmService.scheduleSelectCompanyRanking()
				.then(res => {
					this.rankingList = res.data || []
				})
		},
		// 查询本月当前人的销售漏斗
		scheduleSelectSalesFunnel () {
			this.$api.seeCrmService.scheduleSelectSalesFunnel(null, this.userId)
				.then(res => {
					this.funnelList = []
					let arr = res.data || []
					arr.forEach((item, index) => {
						this.funnelList.push({ value: item.amount, name: (index + 1) + '.' + item.stageName + '：' + item.amount })
					})
					// this.funnelList = [{value:2000,name:'阶段1 - 5000'},{value:5000,name:'阶段2 - 5000'},{value:2000,name:'阶段3 - 2000'}]
					this.ec.option.series[0].data = this.funnelList || []
					this.$nextTick(() => {
						if (this.$refs.echart) {
							this.$refs.echart.init()
						}
					})
				})
		},
		// 日历的点击
		confirm (value) {
			this.clickDay = value.fulldate.replace(/-/g, '/')
		},
		// 进来默认获取今天日期
		getTodayDate () {
			this.clickDay = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
		},
		handleChange () {

		},
		// 将时间戳转换成年月日
		changeTime (time) {
			return new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
		},
		// getSelectedDate (time) {
		// 	return new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate()
		// },
		getDates () {
			var indexDate = new Date()
			var timesStamp = indexDate.getTime()
			var currenDay = indexDate.getDay()
			var dates = []
			for (var i = 0; i < 7; i++) {
				let param = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7))
				dates.push({ dayTime: param.getDate(), otherTime: param.getFullYear() + '/' + (param.getMonth() + 1) + '/' + param.getDate() })
			}
			this.allTime = [...dates]
		},
		// 点击某天
		fclickThisDay (item) {
			this.clickDay = item.otherTime
		}
	}

}
</script>

<style scoped lang="scss">
.mt25{margin-top: 25px;}
.haveClick{width:32px;height:32px;border-radius:20px;color:#FFF !important;background:#457FF5;line-height: 32px;font-weight: normal;}
.cirle-blue{width: 5px;height: 5px;display: block;border-radius: 6px;background:#457FF5;}
.cirle-all{width:calc( 100vw / 7);justify-content:center;min-height:70px;flex-direction:column;align-items: center;}
.brblur{border-bottom:2px solid #457FF5;color:#333}
.flexcenter{display: flex;justify-content: center;align-items: center;}
.flexalone{flex: 1;}
.flexconm{flex-direction: column;}
.whalf{width: 50%;}
.borright{border-right: 1px solid #B9C5CF;}
.lintauto{line-height: auto;}
.d-gray{color: #B9C5CF;}
.d-hui{color: #999;}
.h200{height: 200px;}
.iconbox{height: 30px;width: 108px;box-sizing: border-box;}
.echartsBox {width: 100%;height: 100%;}
.ec-canvas{width: 100%;height: 200px;}

</style>
<style>
.detail-panel-item{border-bottom:none !important;}
</style>
