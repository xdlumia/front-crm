<template>
    <div>
        <NavBar title="新建日程" />
        <div class="d-bg-schedule"></div>
			<i-input v-model="value1" placeholder="日程主题" class='wfull'/>
        <div class="d-bg-schedule"></div>
        <div class="d-bg-white wfull d-flex" style="align-items:center;height: 48px;">
            <div class="ml15 w100">位置</div>
            <i-input v-model="value1" placeholder="点击输入" class='wfull'/>
                <div @click="fChooseMap" class="ml15 ac" style="border-left: 1px solid #F2F2F2;line-height: 48px;width:100px;">
                    <i-icon type="coordinates" size="22" color="#999" />
                </div>
        </div>
        <div class="d-bg-schedule"></div>

        <!-- <picker class="f12 d-flex" mode="date" style="border-bottom:1px solid #ececec;height:50px;align-items:center;" :value="value1">
            <view class="picker ml15">
                开始时间 {{value1}}
            </view>
        </picker> -->
        <view class="uni-list">
            <view class="uni-list-cell" style="height:50px;align-items:center;border-top:none">
                <view class="uni-list-cell-left">
                    开始
                </view>
                <view class="uni-list-cell-db">
                    <picker mode="date" v-model="date" :start="startDate" :end="endDate" @change="bindDateChange">
                        <view class="uni-input">{{date}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <view class="uni-list">
            <view class="uni-list-cell" style="height:50px;align-items:center;border-top:none">
                <view class="uni-list-cell-left">
                    结束
                </view>
                <view class="uni-list-cell-db">
                    <picker mode="date" v-model="date" :start="startDate" :end="endDate" @change="bindDateChange">
                        <view class="uni-input">{{date}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <view class="uni-list">
            <view class="uni-list-cell" style="height:50px;align-items:center;border-top:none">
                <view class="uni-list-cell-left">
                    提醒
                </view>
                <view class="uni-list-cell-db">
                    <picker v-model="date" :range="array" @change="bindDateChange">
                        <view class="uni-input">{{array[index]}}</view>
                    </picker>
                </view>
            </view>
        </view>

        <i-cell-group>
            <i-cell title="参与人"></i-cell>
        </i-cell-group>
        <div class="d-bg-schedule"></div>
        <a url='/pages/index/affiliated'>
            <i-cell title="关联业务"  is-link></i-cell>
        </a>
        <i-button type="primary">确 定</i-button>

    </div>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			value1: '',
			date: '',
			array: ['中国', '美国', '巴西', '日本']
		}
	},
	computed: {
		startDate () {
			return this.getDate('start')
		},
		endDate () {
			return this.getDate('end')
		}
	},
	created () {
	},
	onLoad (option) {
	},
	methods: {
		fChooseMap () {
			uni.chooseLocation({
				success: function (res) {
					// console.log('位置名称：' + res.name)
					// console.log('详细地址：' + res.address)
					// console.log('纬度：' + res.latitude)
					// console.log('经度：' + res.longitude)
				}
			})
		},
		bindDateChange () {

		},
		getDate (type) {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()

			if (type === 'start') {
				year = year - 60
			} else if (type === 'end') {
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			return `${year}-${month}-${day}`
		}
	},

	onReady () {
		// console.log(this.$store.state)
	}
}
</script>

<style scoped lang="scss">
.d-bg-schedule{height:13px;align-items: center;background:#f5f6fa ;}
</style>
