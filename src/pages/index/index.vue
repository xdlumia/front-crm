<template>
    <div>
        <NavBar title="首页" />
        <div class="d-flex mt5">
            <div @click="current = 0" class="f16 d-text-gray b ml10 ac w50" :class="current == 0 ? 'brblur' : ''">今天</div>
            <div @click="current = 1" class="f16 d-text-gray b ml10 ac w50" :class="current == 1 ? 'brblur' : ''">仪表盘 </div>
        </div>

        <!-- 今天 -->
        <div v-if='current == 0'>
            <!--显示本周-->

            <div v-if="timelong == 7">
                <div class="d-text-black ml15 mt10">{{todayDate}}
                    <uni-icon type="arrowdown" class="pl5" size="18" @click='timelong = 30'/>
                </div>
                <div class="d-flex mt15">
                    <div v-for="item in aweek" :key='item' style="flex:1;color:#CCCCCC" class="d-text-qgray ac b">{{item}}</div>
                </div>
                <div class="d-flex" style="flex-wrap:wrap;">
                    <div v-for="item in allTime" :key='item' style="" @click="fclickThisDay(item)" class="d-text-qgray ac b d-flex cirle-all">
                        <div class="ac mb5" style="font-weight: normal;color: #666;min-height: 32px;line-height: 32px;" :class="item == clickDay ? 'haveClick' : ''">
                            {{item}}
                        </div>
                        <i style="height: 5px;" :class="item == 31 ? 'cirle-blue' : ''"></i>
                    </div>
                </div>
            </div>
            <!--日历插件-->
            <div style="position: relative;" v-if="timelong == 30">
                <uni-calendar ref="calendar" :insert="false" :selected='selected' @confirm="confirm" />
                <uni-icon @click='timelong = 7' type="arrowup" class="pl5 d-pointer" size="18" style='position: absolute;top: 8px;left: 85px;'/>
            </div>

            <!--暂无日程-->
            <div v-if="clickDay != 31" style="justify-content: center;align-items: center;flex-direction: column;" class="d-flex p10 mt15">
                <img src="../../assets/img/schedule.png" style="width: 132px;height: 111px;"/>
                <span class="d-text-qgray">今天还没有安排日程哦</span>
            </div>

            <!--日程列表-->
            <a url="/pages/index/scheduleAdd" v-if="clickDay == 31" style="border: 1px solid #e4e4e4;border-left: none;border-right: none;">
                <div class="p10 wfull">
                    <div class="wfull d-flex">
                        <div class="d-flex cirle-blue" style="margin-top: 7px;">
                        </div>
                        <span class="d-text-gray ml10">明天去西直门拜访王总</span>
                        <div class="ac ml10 pl5 pr5 f12" style="height: 18px;line-height: 18px;color:#457FF5;border: 1px solid #457FF5;border-radius: 5px;">
                            10分钟
                        </div>
                    </div>
                    <div class="d-text-gray ml15">
                        10:00 - 11:00
                    </div>
                </div>
            </a>

            <!--新建日程-->
            <div class="d-flex mt10" style="justify-content: center;">
                <a url="/pages/index/scheduleAdd">
                    <div class="ac" style="width: 131px;height: 37px;border: 1px solid #457FF5;line-height: 37px;border-radius: 50px;color: #457FF5;">
                        <span>新建日程</span>
                    </div>
                </a>
            </div>
        </div>

        <!-- 仪表盘 -->
        <div v-if='current == 1'>
            <div class="h40 d-flex-level mt10" style="background:#F9F9F9;">
                <div class="d-flex ml15" style="height: 26px;align-items: center;">
                    <i-avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small"></i-avatar>
                    <a url="/pages/index/colleagueChoose">
                        <span class="d-text-qgray f13 ml5">小家伙</span>
                    </a>
                    <uni-icon type="arrowdown" class="pl5 d-text-qgray" size="16"/>
                </div>
                <div class="mr15" style="height:26px;line-height:26px">
                     <i class="iconfont f16 iconshouye_chengjiaoshujurili" style="color: #B9C5CF;"></i>
                     <span class="d-text-qgray f12 ml5">本月(截至昨日)</span>
                </div>
            </div>
            <div style="height: 10px;background: #F1F1F1;"></div>
            <div style="height: 250px;">
                <div class="h50" style="line-height: 50px;">
                    <i class="iconfont f13 icontongyekehuguanli ml15" style="color: #54D1C7;"></i>
                    <span class="b ml10">销售简报</span>
                </div>
                <div class="d-flex flexconm h200">
                    <div class="flexalone d-flex mt5">
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconwode lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
                                </div>
                            </div>
                            <div style="margin-left:53px;">
                                <span class="d-text-black f12">新增客户</span>
                            </div>
                        </div>
                        <div class="whalf">
                            <div class="d-flex iconbox">
                                <div class="borright flexcenter d-flex" style="width: 50px;">
                                    <i class="iconfont f24 iconduoren lh30 d-gray"></i>
                                </div>
                                <div class="whalf flexcenter d-flex f14">
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
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
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
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
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
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
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
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
                                    <span class="f18 d-text-black">56 </span><span class="mt10 ml5 d-gray"> 个</span>
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
                <div class="h50" style="line-height: 50px;">
                    <i class="iconfont f18 iconxiaoshouloudou ml15" style="color: #E55FD4;"></i>
                    <span class="b ml10">销售漏斗</span><span class="f12 b">( 商机金额 )</span>
                </div>
                <div class="wfull" style="height:200px;">
                   <view class="echartsBox">
                        <!-- 引入的mpvue-echarts组件 -->
                        <!-- <mpvue-echarts :echarts='echarts' canvasId="chat1" @onInit="fn1OnInit" ref='lineChart' class="ec-canvas"/> -->
                    </view>
                </div>
            </div>
            <div style="height: 10px;background: #F1F1F1;"></div>
            <div>
                <div class="h50" style="line-height: 50px;">
                    <i class="iconfont f18 iconpaihangbang ml10" style="color: #FECC00;"></i>
                    <span class="b">排行榜</span><span class="f12 b">( 全公司 )</span>
                </div>
                <div>
                    <div class="d-flex">
                        <div style="width: 70px;" class="ml15"><span class="f12 d-hui">排行榜</span></div>
                        <div style="width: 120px;"><span class="f12 d-hui">前十名</span></div>
                        <div><span class="f12 d-hui">新建成交金额（元）</span></div>
                    </div>

                    <div class="d-flex" v-for='(item,index) in rankingList' :key='index'>
                        <div style="width: 70px;" class="ml15"><span class="d-text-black">{{index+1}}</span></div>
                        <div style="width: 120px;"><span class="d-text-black">{{item.name}}</span></div>
                        <div><span class=" d-text-black">{{item.num}}</span></div>
                    </div>

                </div>
            </div>
            <div class="mt15" style="height: 10px;background: #F1F1F1;"></div>
        </div>

    </div>
</template>

<script>
// import * as echarts from 'echarts'
// import mpvueEcharts from 'mpvue-echarts/src/echarts.vue'
function fn1 (e) {
	let option = {
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
				height: '80%',
				left: '15%',
				top: '5%',
				data: [
					{ value: 60, name: '访问' },
					{ value: 30, name: '咨询' },
					{ value: 10, name: '订单' },
					{ value: 80, name: '点击' },
					{ value: 100, name: '展现' }
				]
			}
		]
	}
	let { width, height } = e
	let canvas = this.$refs.lineChart.canvas
	echarts.setCanvasCreator(() => canvas)
	let lineChart = echarts.init(canvas, null, {
		width: width,
		height: height
	})
	canvas.setChart(lineChart)
	lineChart.setOption(option)
	this.$refs.lineChart.setChart(lineChart)
};
export default {
	data () {
		return {
			// echarts,
			current: 0,
			aweek: ['日', '一', '二', '三', '四', '五', '六'],
			allTime: [],
			timelong: 7,
			clickDay: '',
			TabList: [{ name: '今天' }, { name: '仪表盘' }],
			selected: [{ date: '2019-07-24', info: '签到', data: { custom: '自定义信息', name: '自定义消息头' } }],
			rankingList: [{ name: '王二小', num: 36098 }, { name: '王三小', num: 10025 }, { name: '王四小', num: 10020 }],
			fn1OnInit: fn1
		}
	},
	components: {
		// mpvueEcharts
	},
	computed: {
		todayDate () {
			return (new Date().toLocaleDateString().split('/').join('-'))
		}
	},
	created () {
		this.getDates(7)
		this.getTodayDate()
	},
	onLoad (option) {
	},
	methods: {
		confirm () {

		},
		// 进来默认获取今天日期
		getTodayDate () {
			this.clickDay = new Date().toLocaleDateString().split('/').pop()
		},
		handleChange () {

		},
		getDates () {
			var indexDate = new Date()
			var timesStamp = indexDate.getTime()
			var currenDay = indexDate.getDay()
			var dates = []
			for (var i = 0; i < 7; i++) {
				dates.push((new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日上下午]/g, '')).split('/').pop())
			}
			this.allTime = [...dates]
		},
		// 点击某天
		fclickThisDay (item) {
			this.clickDay = item
		}
	},
	onReady () {
		// console.log(this.$store.state)
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
// .content {
//         text-align: center;
//         height: 400upx;
//     }

    // .logo {
    //     height: 200upx;
    //     width: 200upx;
    //     margin-top: 200upx;
    // }

    // .title {
    //     font-size: 36upx;
    //     color: #8f8f94;
    // }

    .echartsBox {
        width: 100%;
        height: 100%;
    }
    .ec-canvas{width: 100%;height: 200px;}
</style>
