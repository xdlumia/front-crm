<template>
    <div>
        <NavBar title="首页" />

        <!-- <Tabs
            :TabList="TabList"
            :currentTab="current"
            @tabs="tabsChange"
        >
            <TabPane>
                <view>1</view>
            </TabPane>
            <TabPane>
                <view>2</view>
            </TabPane>
            <TabPane>
                <view>3</view>
            </TabPane>
        </Tabs> -->

        <div class="f16 d-text-black b ml10">今天</div>
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
                    <i style="height: 5px;" :class="item == 24 ? 'cirle-blue' : ''"></i>
                </div>
            </div>
        </div>
        <!--日历插件-->
        <div style="position: relative;" v-if="timelong == 30">
            <uni-calendar ref="calendar" :insert="false" :selected='selected' @confirm="confirm" />
            <uni-icon @click='timelong = 7' type="arrowup" class="pl5 d-pointer" size="18" style='position: absolute;top: 8px;left: 85px;'/>
        </div>

        <!--暂无日程-->
        <div v-if="clickDay != 24" style="justify-content: center;align-items: center;flex-direction: column;" class="d-flex p10 mt15">
            <img src="../../assets/img/schedule.png" style="width: 132px;height: 111px;"/>
            <span class="d-text-qgray">今天还没有安排日程哦</span>
        </div>

        <!--日程列表-->
        <div v-if="clickDay == 24" style="border: 1px solid #e4e4e4;border-left: none;border-right: none;">
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
        </div>

        <!--新建日程-->
        <div class="d-flex mt10" style="justify-content: center;">
            <a url="/pages/index/scheduleAdd">
                <div class="ac" style="width: 131px;height: 37px;border: 1px solid #457FF5;line-height: 37px;border-radius: 50px;color: #457FF5;">
                    <span>新建日程</span>
                </div>
            </a>
        </div>

    </div>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			current: 0,
			aweek: ['日', '一', '二', '三', '四', '五', '六'],
			allTime: [],
			timelong: 7,
			clickDay: '',
			TabList: [
				{ title: '商品介绍' },
				{ title: '规格参数' },
				{ title: '售后保障' }
			],
			selected: [{ date: '2019-07-24', info: '签到', data: { custom: '自定义信息', name: '自定义消息头' } }]
		}
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
		// 选项卡切换
		tabsChange () {

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
</style>
