<!-- /**
 * @author 徐贺
 * @param label 新建日程
 */ -->
<template>
    <div>
        <NavBar title="新建日程" />

        <m-form ref="acheduleForm" class="uni-pb100" :model="acheduleForm" :rules="rules">
            <div class="d-bg-schedule"></div>
                <i-input maxlength='32' v-model="acheduleForm.content" label="日程主题" placeholder="请输入" required />
            <div class="d-bg-schedule"></div>

            <div class="d-bg-white wfull d-flex" style="align-items:center;height: 48px;">
                <i-input label="位置" v-model="acheduleForm.address" placeholder="点击输入" class='wfull'/>
                <div @click="chooseMap" class="ml15 ac" style="border-left: 1px solid #F2F2F2;line-height: 48px;width:100px;">
                    <i-icon type="coordinates" size="22" color="#999" />
                </div>
            </div>
            <div class="d-bg-schedule"></div>

            <picker-date v-model="acheduleForm.startTime" label="开始" placeholder="请选择" required>
            </picker-date>

            <picker-date v-model="acheduleForm.endTime" label="结束" placeholder="请选择" required>
            </picker-date>

            <i-select
                v-model="acheduleForm.remindSecond"
                :props="{label:'name',value:'id'}"
                label="提醒"
                placeholder="请选择"
                required
                :options="tixData">
            </i-select>

            <a url="/pages/index/colleagueChoose">
                <i-select
                    v-model="acheduleForm.participants"
                    disabled
                    :props="{label:'name',value:'id'}"
                    label="参与人"
                    placeholder="请选择"
                    required
                    :options="tixData">
                </i-select>
            </a>
            <div class="d-bg-schedule"></div>
            <!-- <a url='/pages/index/affiliated'>
                <i-select
                    v-model="tixIndex"
                    disabled
                    :props="{label:'name',value:'id'}"
                    label="关联业务"
                    placeholder="请选择"
                    required
                    :options="tixData">
                </i-select>
            </a> -->
            <i-cell-group>
                <a :url='`/pages/client/choose-client?id=${clientData.id}`'>
                    <i-input disabled label="客户" v-model="clientData.name" placeholder=" "><uni-icon type='forward' size='18' color='#999' /></i-input>
                </a>
                <a :url='`/pages/contact/index??select=1&id=${contactData.id}`'>
                    <i-input disabled label="联系人" v-model="contactData.name" placeholder=" "><uni-icon type='forward' size='18' color='#999' /></i-input>
                </a>
                <a :url='`/pages/chance/choose-chance?&id=${chanceData.id}`' open-type='switchTab'>
                    <i-input disabled label="销售机会" v-model="chanceData.name" placeholder=" "><uni-icon type='forward' size='18' color='#999' /></i-input>
                </a>
                <a :url='`/pages/transaction/index?select=1&id=${transactionData.id}`'>
                <!-- {{transactionData.name}} -->
                    <i-input disabled label="成交记录" v-model="transactionData.name" placeholder=" "><uni-icon type='forward' size='18' color='#999' /></i-input>
                </a>
                <a :url='`/pages/highseas/index?select=1&id=${highseasData.id}`'>
                    <i-input disabled label="客户公海池" v-model="highseasData.name" placeholder=" "><uni-icon type='forward' size='18' color='#999' /></i-input>
                </a>
            </i-cell-group>
        </m-form>
        <div class="footer-fixed-menu">
            <i-button @click="fsubmit" type="primary" i-class="f16">确 定</i-button>
        </div>

    </div>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			acheduleForm: {
				content: '', // 日程内容
				address: '', // 详细地址
				lon: '', // 经度
				lat: '', // 纬度
				startTime: '', // 开始时间
				endTime: '', // 结束时间
				remindSecond: '', // 提醒时间（秒）
				remindType: 0, // 提醒方式(0=>提前，1=>推后)
				participants: '', // 参与人(多个)
				clientId: '', // 客户id
				linkId: '', // 联系人id
				salesFunnelId: '', // 销售机会id
				transactionRecordId: '', // 成交记录id
				seaPoolId: ''// 客户公海池id
			},
			rules: {
				content: [{
					required: true,
					message: '请输入主题'
				}],
				linkId: [{
					required: true,
					message: '请选择联系人',
					trigger: 'change'
				}],
				transactionStatus: [{
					required: true,
					message: '请选择成交状态',
					trigger: 'change'
				}],
				startTime: [{
					required: true,
					message: '请选择开始时间',
					trigger: 'change'
				}],
				endTime: [{
					required: true,
					message: '请选择结束时间',
					trigger: 'change'
				}],
				totalAmount: [{
					required: true,
					message: '请输入总金额'
				}],
				phone: [{
					required: true,
					message: '请输入手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}]
			},
			value1: '',
			date: '',
			array: ['中国', '美国', '巴西', '日本'],
			timeIndex: '',
			tixIndex: '',
			tixData: [{ name: '提前十分钟', id: 600 }, { name: '提前30分钟', id: 1800 }, { name: '提前一小时', id: 3600 }, { name: '提前三小时', id: 10800 }],
			clientData: {}, // 关联的客户data
			transactionData: { name: 'hahah' }, // 关联的成交记录data
			chanceData: {}, // 关联的机会data
			contactData: {}, // 联系人的data
			highseasData: {}// 公海池的data
		}
	},
	computed: {
	},
	created () {
	},
	onLoad (option) {
		// 客户回调
		uni.$once('chooseClient', data => {
			this.clientData = data
		})
		// 成交记录回调
		uni.$once('chooseTransaction', data => {
			this.transactionData = data
		})
		// 销售机会回调
		uni.$once('chooseChance', data => {
			this.chanceData = data
		})
		// 联系人回调
		uni.$once('chooseContact', data => {
			this.contactData = data
		})
		// 公海池回调
		uni.$once('chooseHighseas', data => {
			this.highseasData = data
		})
	},
	methods: {
		bindDateChange () {

		},
		tixChange ({ mp: { detail } }, filed) {
			let index = detail.value
			this[filed] = index
		},
		// 保存日程
		async fsubmit () {
			// await this.$refs.acheduleForm.validate()
			// this.$api.seeCrmService.transactionrecordSave(this.acheduleForm)
			// 	.then(res => {
			// 		console.log(res)
			// 		this.$routing.navigateBack()
			// 		uni.$emit('updatetransList', { params: '' })
			// 	})
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
