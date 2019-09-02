<!-- /**
 * @author 徐贺
 * @param label 新建日程
 */ -->
<template>
    <div>
        <NavBar :title="handelTypeForm[handelType]" />
        <scroll-view scroll-y style="height:calc(100vh - 115px)">
            <m-form ref="acheduleForm" class="uni-pb100" :model="acheduleForm" :rules="rules">
                <div v-if="isadd" class="d-bg-schedule"></div>
                <div v-else class="d-bg-schedule f14" style="height:40px;line-height:40px;color:rgba(72, 137, 244, 0.776470588235294)">
                    <span class="ml15">该日程于{{acheduleForm.createTime | timeToStr('yy-mm-dd')}}由{{acheduleForm.creatorName}}创建</span>
                </div>
                <i-input :disabled='!isadd && !ishandel' maxlength='10000' v-model="acheduleForm.content" label="日程主题" placeholder="请输入" required />
                <div class="d-bg-schedule"></div>

                <div class="d-bg-white wfull d-flex" style="align-items:center;height: 48px;">
                    <i-input label="位置" :disabled='!isadd && !ishandel' maxlength='45' v-model="acheduleForm.address" placeholder="点击输入" style="flex:1" class='wfull'/>
                    <div v-if="isadd || ishandel" @click="chooseMap" class="ac" style="border-left: 1px solid #F2F2F2;border-bottom: 1px solid #F2F2F2;line-height: 48px;width:100px;">
                        <i-icon type="coordinates" size="22" color="#999" />
                    </div>
                </div>
                <div class="d-bg-schedule"></div>

                 <!-- v-if="!isadd ? acheduleForm.startTimeOnle : true" -->
                <ruiDatePicker
                v-if="acheduleForm.startTimeOnle"
                    :disabled='!isadd && !ishandel'
                    fields="minute"
                    :value='acheduleForm.startTimeOnle'
                    start="2010-00-00 00:00"
                    end="2030-12-30 23:59"
                    @change="startTimeChange"
                >
                    <i-input disabled label="开始" v-model="acheduleForm.startTimeOnle" placeholder=" " required><uni-icon type='forward' size='18' color='#999'/></i-input>
                </ruiDatePicker>

 <!-- v-if="!isadd ? acheduleForm.endTimeOnle : true" -->
                <ruiDatePicker
                    v-if="acheduleForm.endTimeOnle"
                    :disabled='!isadd && !ishandel'
                    fields="minute"
                    :value='acheduleForm.endTimeOnle'
                    start="2010-00-00 00:00"
                    end="2030-12-30 23:59"
                    @change="endTimeChange"
                >
                    <i-input disabled label="结束" v-model="acheduleForm.endTimeOnle" placeholder=" " required><uni-icon type='forward' size='18' color='#999'/></i-input>
                </ruiDatePicker>

                <i-select
                    :disabled='!isadd && !ishandel'
                    v-model="acheduleForm.remindSecond"
                    :props="{label:'name',value:'id'}"
                    label="提醒"
                    placeholder="请选择"
                    required
                    :options="tixData">
                </i-select>

                <a :url="(isadd || ishandel) ? `/pages/index/colleagueChoose?isRadio=0&ids=${acheduleForm.participants}` : ''">
                    <i-input disabled label="参与人" v-model="acheduleForm.particiNames" placeholder=" " required><uni-icon type='forward' size='18' color='#999'/></i-input>
                </a>
                <div class="d-bg-schedule"></div>

                <i-cell-group>
                    <!-- 新增和编辑状态跳转选择页面  回显状态直接跳转各个页面的详情 -->
                    <div @click="getClient" v-if="(isadd || ishandel) || clientData.id" >
                        <i-input disabled label="客户" :class="(isadd || ishandel) ? 'd-text-black' : 'd-text-blue'" v-model="clientData.name" placeholder=" "><uni-icon v-if="isadd || ishandel" type='forward' size='18' color='#999' /></i-input>
                    </div>
                    <div @click="getContact" v-if="(isadd || ishandel) || contactData.id">
                        <i-input disabled label="联系人" :class="(isadd || ishandel) ? 'd-text-black' : 'd-text-blue'" v-model="contactData.name" placeholder=" "><uni-icon v-if="isadd || ishandel" type='forward' size='18' color='#999' /></i-input>
                    </div>
                    <div @click="getChance" v-if="(isadd || ishandel) || chanceData.id">
                        <i-input disabled label="销售机会" :class="(isadd || ishandel) ? 'd-text-black' : 'd-text-blue'" v-model="chanceData.name" placeholder=" "><uni-icon v-if="isadd || ishandel" type='forward' size='18' color='#999' /></i-input>
                    </div>
                    <div @click="getTransaction" v-if="(isadd || ishandel) || transactionData.id">
                        <i-input disabled label="成交记录" :class="(isadd || ishandel) ? 'd-text-black' : 'd-text-blue'" v-model="transactionData.name" placeholder=" "><uni-icon v-if="isadd || ishandel" type='forward' size='18' color='#999' /></i-input>
                    </div>
                    <div @click="getHighseas" v-if="(isadd || ishandel) || highseasData.id">
                        <i-input disabled label="客户公海池" :class="(isadd || ishandel) ? 'd-text-black' : 'd-text-blue'" v-model="highseasData.name" placeholder=" "><uni-icon v-if="isadd || ishandel" type='forward' size='18' color='#999' /></i-input>
                    </div>
                </i-cell-group>

            </m-form>
        </scroll-view>
        <div class="footer-fixed-menu">
            <i-button v-if="ishandel || isadd" @click="fsubmit" type="primary" i-class="f16">确 定</i-button>
            <div class="d-flex" v-else>
                <i-button @click="ishandel = true,handelType = '2'" i-class="f16" style="width:50%">编 辑</i-button>
                <i-button @click="deleteInfo" type="primary" i-class="f16" style="width:50%">删 除</i-button>
            </div>

        </div>

    </div>
</template>

<script>
import ruiDatePicker from '@/components/basic/uni/rattenking-dtpicker/rattenking-dtpicker.vue'
import Vue from 'vue'
let timeToStr = Vue.filter('timeToStr')
export default {
	components: {
		ruiDatePicker
	},
	data () {
		return {
			acheduleForm: {
				content: '', // 日程内容
				address: '', // 详细地址
				lon: '', // 经度
				lat: '', // 纬度
				startTimeOnle: '',
				endTimeOnle: '',
				startTime: '', // 开始时间
				endTime: '', // 结束时间
				remindSecond: '', // 提醒时间（秒）
				remindType: 0, // 提醒方式(0=>提前，1=>推后)
				particiNames: '', // 选择的人名称
				participants: '', // 参与人(多个)
				clientId: '', // 客户id
				linkId: '', // 联系人id
				salesFunnelId: '', // 销售机会id
				transactionRecordId: '', // 成交记录id
				seaPoolId: ''// 客户公海池id
			},
			value: '',
			rules: {
				content: [{
					required: true,
					message: '请输入主题'
				}],
				startTimeOnle: [{
					required: true,
					message: '请选择开始时间'
				}],
				endTimeOnle: [{
					required: true,
					message: '请选择结束时间'
				}],
				remindSecond: [{
					required: true,
					message: '请选择提醒时间'
				}],
				particiNames: [{
					required: true,
					message: '请选择参与人'
				}]
			},
			value1: '',
			date: '',
			scheId: '', // 日程id
			timeIndex: '',
			isadd: true, // 是新增还是编辑
			ishandel: false, // 切换编辑和回显状态
			tixIndex: '',
			userInfo: {},
			nowDate: '',
			handelTypeForm: {
				'0': '新建日程',
				'1': '日程详情',
				'2': '编辑日程'
			},
			typeform: {
				'0': 'clientData',
				'1': 'contactData',
				'2': 'chanceData',
				'3': 'transactionData',
				'4': 'highseasData'
			},
			handelType: '0',
			tixData: [{ name: '提前十分钟', id: 600 }, { name: '提前30分钟', id: 1800 }, { name: '提前一小时', id: 3600 }, { name: '提前三小时', id: 10800 }],
			clientData: {}, // 关联的客户data
			transactionData: {}, // 关联的成交记录data
			chanceData: {}, // 关联的机会data
			contactData: {}, // 联系人的data
			highseasData: {}// 公海池的data
		}
	},
	computed: {
	},
	created () {
		this.userInfo = this.$local.fetch('userInfo') || {}
		this.acheduleForm.participants = this.userInfo.id
		this.acheduleForm.particiNames = this.userInfo.name
	},
	onLoad (option) {
		this.nowDate = timeToStr(new Date().getTime(), 'yyyy-mm-dd hh:ii')// 当前时间
		if (option.scheId) { // 详情
			this.handelType = '1'
			this.scheId = option.scheId
			this.getScheduleInfo(option.scheId)
			this.ishandel = false
			this.isadd = false
		} else { // 新增，给开始时间和结束时间一个默认值
			this.acheduleForm.startTimeOnle = timeToStr(new Date().getTime(), 'yyyy-mm-dd hh:ii')// 当前时间
			this.acheduleForm.endTimeOnle = timeToStr((new Date().getTime() + 0.5 * 60 * 60 * 1000), 'yyyy-mm-dd hh:ii')// 当前时间推半个小时
		}
		if (option.busType) {
			this[this.typeform[option.busType]].name = option.name || ''
			this[this.typeform[option.busType]].id = option.id || ''
		}
	},
	onShow () {
		// 客户回调
		uni.$on('chooseClient', data => {
			this.clientData = data
		})
		// 成交记录回调
		uni.$on('chooseTransaction', data => {
			this.transactionData = data
		})
		// 销售机会回调
		uni.$on('chooseChance', data => {
			this.chanceData = data
			this.chanceData.name = data.chanceName
		})
		// 联系人回调
		uni.$on('chooseContact', data => {
			this.contactData = data
			this.contactData.name = data.linkmanName
		})
		// 公海池回调
		uni.$on('choosePool', data => {
			this.highseasData = data
		})

		// 选择的参与人
		uni.$on('colleagueChoose', data => {
			// this.highseasData = data
			let idsArr = []
			let namesArr = []
			if (data.data) {
				data.data.forEach((item) => {
					idsArr.push(item.userId)
					namesArr.push(item.employeeName)
				})
			}
			this.acheduleForm.participants = idsArr.join(',')
			this.acheduleForm.particiNames = namesArr.join(',')
		})
	},
	methods: {
		// 查询日程详情
		getScheduleInfo (id) {
			this.acheduleForm.startTimeOnle = ''
			this.acheduleForm.endTimeOnle = ''
			this.$api.seeCrmService.scheduleInfo(null, id)
				.then(res => {
					// this.acheduleForm = res.data || {};
					res.data.particiNames = res.data.participantNames ? res.data.participantNames.join(',') : ''
					res.data.startTimeOnle = timeToStr(res.data.startTime, 'yyyy-mm-dd hh:ii')
					res.data.endTimeOnle = timeToStr(res.data.endTime, 'yyyy-mm-dd hh:ii')
					this.clientData = { name: res.data.clientName || '', id: res.data.clientId || '' }// 客户，
					this.contactData = { name: res.data.linkName || '', id: res.data.linkId || '' }// 联系人
					this.transactionData = { name: res.data.transactionRecordName || '', id: res.data.transactionRecordId || '' }// 成交记录
					this.chanceData = { name: res.data.salesFunnelName || '', id: res.data.salesFunnelId || '' }// 销售机会
					this.highseasData = { name: res.data.seaPoolName || '', id: res.data.seaPoolId || '' }// 公海池
					this.acheduleForm = res.data || {}
				})
		},
		changeTime (time) {
			return new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate() + ' ' + new Date(time).getHours() + ':' + new Date(time).getMinutes()
		},
		// 点击客户
		getClient () {
			let url = (this.isadd || this.ishandel) ? `/pages/client/choose-client?id=${this.clientData.id}` : `/pages/client/detail?id=${this.clientData.id}`
            if(this.acheduleForm.clientIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该客户已删除！')
			}
		},
		// 点击联系人
		getContact () {
			let url = (this.isadd || this.ishandel) ? `/pages/contact/index?select=1&id=${this.contactData.id}` : `/pages/contact/detail/index?id=${this.contactData.id}`
            if(this.acheduleForm.linkIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该联系人已删除！')
			}
		},
		// 点击机会
		getChance () {
			let url = (this.isadd || this.ishandel) ? `/pages/chance/choose-chance?&id=${this.chanceData.id}` : `/pages/chance/detail/index?id=${this.chanceData.id}`
            if(this.acheduleForm.salesFunnelIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该机会已删除！')
			}
		},
		// 点击成交记录
		getTransaction () {
			let url = (this.isadd || this.ishandel) ? `/pages/transaction/index?select=1&id=${this.transactionData.id}` : `/pages/transaction/detail?id=${this.transactionData.id}`
            if(this.acheduleForm.transactionIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该成交记录已删除！')
			}
		},
		// 点击公海池
		getHighseas () {
			let url = (this.isadd || this.ishandel) ? `/pages/highseas/index?select=1&id=${this.highseasData.id}` : `/pages/client/detail?id=${this.highseasData.id}`
            if(this.acheduleForm.seaPoolIsDelete != 1){// eslint-disable-line
				this.$routing.navigateTo(url)
			} else {
				this.$utils.toast.text('该公海池已删除！')
			}
		},
		// 删除
		deleteInfo () {
			this.$utils.showModal('确定删除当前日程？')
				.then(() => {
					this.$api.seeCrmService.scheduleLogicDelete({ id: this.scheId })
						.then(res => {
							this.$routing.navigateBack()
						})
				})
		},
		bindDateChange () {

		},
		startTimeChange (val) {
			this.acheduleForm.startTimeOnle = val
		},
		endTimeChange (val) {
			if (val.split(' ')[0] !== this.acheduleForm.startTimeOnle.split(' ')[0]) {
				this.$utils.toast.text('结束时间与开始时间只能是同一天！')
				return
			}
			if (Date.parse((this.acheduleForm.startTimeOnle).replace(/-/g, '/')) > Date.parse(val.replace(/-/g, '/'))) {
				this.$utils.toast.text('结束时间必须大于开始时间！')
				return
			}
			this.acheduleForm.endTimeOnle = val
		},
		tixChange ({ mp: { detail } }, filed) {
			let index = detail.value
			this[filed] = index
		},
		// 保存日程
		async fsubmit () {
			await this.$refs.acheduleForm.validate()
			if (Date.parse((this.acheduleForm.startTimeOnle).replace(/-/g, '/')) > Date.parse((this.acheduleForm.endTimeOnle).replace(/-/g, '/'))) {
				this.$utils.toast.text('结束时间必须大于开始时间！')
				return
			}
			this.acheduleForm.clientId = this.clientData.id || ''
			this.acheduleForm.linkId = this.contactData.id || ''
			this.acheduleForm.salesFunnelId = this.chanceData.id || ''
			this.acheduleForm.transactionRecordId = this.transactionData.id || ''
			this.acheduleForm.seaPoolId = this.highseasData.id || ''
			this.acheduleForm.startTime = Date.parse((this.acheduleForm.startTimeOnle).replace(/-/g, '/'))
			this.acheduleForm.endTime = Date.parse((this.acheduleForm.endTimeOnle).replace(/-/g, '/'))
			if (this.isadd) {
				this.$api.seeCrmService.scheduleSave(this.acheduleForm)
					.then(res => {
						this.$routing.navigateBack()
						uni.$emit('updateIndexList', { params: '' })
					})
			} else {
				this.$api.seeCrmService.scheduleUpdate(this.acheduleForm)
					.then(res => {
						this.$routing.navigateBack()
						uni.$emit('updateIndexList', { params: '' })
					})
			}
		},
		// 选择地图
		chooseMap () {
			let that = this
			uni.chooseLocation({
				success (data) {
					that.acheduleForm.address = data.address
					that.acheduleForm.lon = data.longitude
					that.acheduleForm.lat = data.latitude
				}
			})
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
