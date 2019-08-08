<!-- /**
 * @author 徐贺
 * @param label 新建日程
 */ -->
<template>
    <div>
        <NavBar title="新建日程" />

        <div class="d-bg-schedule"></div>
            <i-input v-model="value1" label="日程主题" placeholder="请输入" required />
        <div class="d-bg-schedule"></div>

        <div class="d-bg-white wfull d-flex" style="align-items:center;height: 48px;">
            <i-input label="位置" v-model="value1" placeholder="点击输入" class='wfull'/>
            <div @click="chooseMap" class="ml15 ac" style="border-left: 1px solid #F2F2F2;line-height: 48px;width:100px;">
                <i-icon type="coordinates" size="22" color="#999" />
            </div>
        </div>
        <div class="d-bg-schedule"></div>

        <picker-date v-model="timeIndex" label="开始" placeholder="请选择" required>
        </picker-date>

        <picker-date v-model="timeIndex" label="结束" placeholder="请选择" required>
        </picker-date>

        <i-select
            v-model="tixIndex"
            :props="{label:'name',value:'id'}"
            label="提醒"
            placeholder="请选择"
            required
            :options="tixData">
        </i-select>

        <a url="/pages/index/colleagueChoose">
            <i-select
                v-model="tixIndex"
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
                <i-cell title="客户" is-link></i-cell>
            </a>
            <a :url='`/pages/contact/index??select=1&id=${contactData.id}`'>
                <i-cell title="联系人" is-link></i-cell>
            </a>
            <a :url='`/pages/chance/choose-chance?&id=${chanceData.id}`' open-type='switchTab'>
                <i-cell title="销售机会" is-link></i-cell>
            </a>
            <a :url='`/pages/transaction/index?select=1&id=${transactionData.id}`'>
            <!-- {{transactionData.name}} -->
                <i-cell title="成交记录" is-link><span>{{transactionData.name}}</span></i-cell>
            </a>
            <a :url='`/pages/highseas/index?select=1&id=${highseasData.id}`'>
                <i-cell title="客户公海池" is-link></i-cell>
            </a>
        </i-cell-group>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16">确 定</i-button>
        </div>

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
			timeIndex: '',
			tixIndex: '',
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
