<!-- /**
 * @author 徐贺
 * @param label 新建日程
 */ -->
<template>
    <div>
        <NavBar title="新建日程" />

        <div class="d-bg-schedule"></div>
			<i-input label="日程主题" v-model="value1" class='wfull'/>
        <div class="d-bg-schedule"></div>

        <div class="d-bg-white wfull d-flex" style="align-items:center;height: 48px;">
            <i-input label="位置" v-model="value1" placeholder="点击输入" class='wfull'/>
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

        <picker mode="date" :value="timeIndex" @change='bindDateChange($event, "upTypeIndex")'>
            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>开始
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" class='f12 d-text-gray' placeholder="">
                </div>
            </div>
        </picker>

        <picker mode="date" :value="timeIndex" @change='bindDateChange($event, "upTypeIndex")'>
            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>结束
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" class='f12 d-text-gray' placeholder="">
                </div>
            </div>
        </picker>

        <picker mode="date" :value="timeIndex" @change='bindDateChange($event, "upTypeIndex")'>
            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>提醒
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" class='f12 d-text-gray' placeholder="">
                </div>
            </div>
        </picker>

        <div class="form-row d-center">
            <div class="f13 d-text-black form-row-item form-row-label">
                <span class='d-text-red'>*</span>参与人
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" disabled class='f12 d-text-gray' placeholder="">
            </div>
        </div>

        <div class="d-bg-schedule"></div>

        <a url='/pages/index/affiliated'>
            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>关联业务
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" disabled class='f12 d-text-gray' placeholder="">
                </div>
            </div>
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
			array: ['中国', '美国', '巴西', '日本'],
			timeIndex: []
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
.form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        position: relative;
        &:after{
            content: " ";
            display: inline-block;
            width: 6px;
            height: 6px;
            position: absolute;
            top: 50%;
            right: 15px;
            border-width: 2px 2px 0 0;
            border-color: #dddee1;
            border-style: solid;
            transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
        }
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }
</style>
