<!--
/**
* @author 冀猛超
* @name 新建客户
* @date 2019年8月02日
**/
-->
<template>
    <div class='add-follow-page'>
        <NavBar :title='title' />
        <scroll-view scroll-y class="ipx" :style="'height:calc(100vh - ' + navH +' - 50px)'">

            <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">

                <div class="d-bg-white">

                    <i-input v-model="form.name" label="客户名称" @input='changePhone' maxlength='32' placeholder="请填写客户名称" required type="text" />

                    <i-input v-model="form.phone" label="手机号" @input='changePhone' placeholder="请填写" required type="number" maxlength='11'>
                        <div class="check-repeat" v-if='isRepeatShow' @click='checkRepeat'>{{ isRepeat ? '已查重' : '查重' }}</div>
                    </i-input>

                    <i-input label="所属部门" v-model="deptInfo.deptName" disabled required />

                    <i-input v-model="form.address" label="详细地址" maxlength='100' placeholder="请填写详细地址">
                        <div @click="chooseMap" class="ml15 ac hfull pl15 d-center" style="border-left: 1px solid #F2F2F2;">
                            <i-icon type="coordinates" size="22" color="#999" />
                        </div>
                    </i-input>

                    <i-select
                        v-model="form.gradeCode"
                        :props="{label:'content',value:'code'}"
                        label="客户级别"
                        placeholder="请选择客户级别"
                        :options="dictionaryOptions('CRM_KHJB')"
                    />

                    <i-select
                        v-model="form.tradeCode"
                        :props="{label:'content',value:'code'}"
                        label="行业"
                        placeholder="请选择行业"
                        :options="dictionaryOptions('CRM_KH_HY')"
                    />

                    <i-select
                        v-model="form.sourceCode"
                        :props="{label:'content',value:'code'}"
                        label="来源"
                        placeholder="请选择来源"
                        :options="dictionaryOptions('CRM_LY')"
                    />

                    <a :url="'/pages/common/more-tags?busType=0&ids=' + ids">
                        <i-input disabled v-model="labelNames" label="标签" placeholder="请选择">
                            <i-icon type="enter" size="16" color="#999" />
                        </i-input>
                    </a>

                    <div v-for="(item,index) of form.formsFieldValueSaveVos" :key='index'>
                        <i-input v-if='item.fieldType == 0' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
                        <i-input v-if='item.fieldType == 1' type='number' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName" placeholder="点击填写" />
                        <picker-date v-if='item.fieldType == 2' v-model="form.formsFieldValueSaveVos[index].fieldValue" :label="item.fieldName"  placeholder="请选择日期" />
                        <i-select
                            v-if='item.fieldType == 3'
                            v-model="form.formsFieldValueSaveVos[index].fieldValue"
                            :props="{label:'content',value:'code'}"
                            :label="item.fieldName"
                            placeholder="请选择"
                            :options="dictionaryOptions(item.groupCode || '')"
                        />
                    </div>

                </div>
                <!-- <div class='d-bg-white pb10'>

                </div> -->

                <div class="pt10 pl15 pr15 d-bg-white bb">
                    <div class='f13 mb10 d-text-black'>备注</div>
                    <textarea rows="5" v-model="form.note" class="f12 d-text-gray" maxlength="300" style='width: auto; height:60px' placeholder="点击填写"></textarea>
                </div>

            </m-form>

            <div class="d-center pl15 pr15 mt5">
                <div class='d-cell'>
                    <i-icon size="18" color="#999" type='prompt_fill' />
                    <span class=" ml10 f12 d-text-black">提交之后同时新建联系人</span>
                </div>

                <i-switch :value="isSkipContact" @change='handleChange' slot="footer">
                    <i-icon type="right" slot="open"></i-icon>
                    <i-icon type="close" slot="close"></i-icon>
                </i-switch>
            </div>

            <a url='/pages/common/more-list?busType=0&isEnabled=-1' class='d-center d-text-gray mt10 pb10'>
                <i-icon type='add' size="20" color='#333' /> <span class='ml15'>添加更多条目</span>
            </a>
        </scroll-view>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16" @click='submit'>保存</i-button>
        </div>

    </div>
</template>
<script>
export default {
	data () {
		return {
			title: '新建客户信息',
			isCopy: 0,
			id: 0,
			isRepeat: false,
			isRepeatShow: true,
			isSkipContact: false, // 是否新建联系人
			labelNames: '', // 标签名称组合
			form: {
				id: '',
				name: '', // 姓名
				phone: '', // 手机
				address: '', // 地址
				lat: '', // 维度
				lon: '', // 经度
				note: '', // 备注
				poolId: '', // 公海池id
				// score: '', // 评分
				sourceCode: '', // 来源
				tradeCode: '', // 行业
				gradeCode: '', // 客户级别
				clientStatus: '', // 客户状态
				formsFieldValueSaveVos: [],
				lableBusinessSaveVo: {
					busId: this.id || '', // 100000,
					busType: 0, // 业务类型(0客户，1联系人，2机会，3成交,4业务属性)
					labelIdArray: []
				}
			},
			rules: {
				name: [{
					required: true,
					message: '请输入客户名称'
				}],
				phone: [{
					required: true,
					message: '请输入手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}]
			}
		}
	},
	computed: {
		ids () {
			let ids = this.form.lableBusinessSaveVo.labelIdArray
			return JSON.stringify(ids)
		}
	},
	onLoad (params) {
		this.id = params.id || 0
		this.isCopy = params.isCopy || 0

		this.id && (this.isRepeatShow = false)

		if (this.id || this.isCopy) {
			this.title = (this.id ? '编辑' : '复制') + '客户信息'
			this.getDetailInfo()
		} else {
			this.getMoreField()
		}

		// 公海池 id
		this.form.poolId = params.poolId || ''

		uni.$on('moreTags', data => {
			this.labelNames = data.map(item => item.labelName).join(',')
			this.form.lableBusinessSaveVo.labelIdArray = data.map(item => item.id)
			this.form.lableBusinessSaveVo.busId = this.id
		})

		// 更多条目回掉
		uni.$on('moreList', data => {
			// 获取字段列表
			this.getMoreField()
		})
	},

	onUnload () {
		this.id = 0
		this.$store.commit('client/setClientInfo', {})
		uni.$off('moreList')
	},
	methods: {
		getDetailInfo () {
			let info = JSON.parse(JSON.stringify(this.$store.state.client.clientInfo || {}))
			for (let key in this.form) {
				if (key === 'formsFieldValueSaveVos') {
					this.form.formsFieldValueSaveVos = info.formsFieldValueEntities
				} else if (key === 'lableBusinessSaveVo') {
					this.labelNames = info.lableBusinessEntityList.map(item => item.labelName).join(',')
					this.form.lableBusinessSaveVo.labelIdArray = info.lableBusinessEntityList.map(item => item.labelId)
					this.form.lableBusinessSaveVo.busId = this.id
				} else {
					this.form[key] = info[key]
				}
			}
		},
		handleChange ({ value }) {
			this.isSkipContact = value
		},

		changePhone (e) {
			this.isRepeatShow = true
			this.isRepeat = false
		},
		// 获取已选中的更多条目
		getMoreField () {
			this.$api.seeCrmService.formsfieldconfigQueryList({
				busType: 0,
				isEnabled: 0,
				isOriginal: 0
			}).then(res => {
				if (res.code === 200) {
					let data = res.data || []
					data.forEach(item => {
						this.form.formsFieldValueSaveVos = this.form.formsFieldValueSaveVos || []
						let i = this.form.formsFieldValueSaveVos.findIndex(v => item.id === v.fieldConfigId)
						if (i !== -1) {
							item.fieldValue = this.form.formsFieldValueSaveVos[i].fieldValue
						}
					})

					this.form.formsFieldValueSaveVos = data
				}
			})
		},

		// 选择地图
		chooseMap () {
			uni.chooseLocation({
				success: (data) => {
					this.form.address = data.address
					this.form.lon = data.longitude
					this.form.lat = data.latitude
				}
			})
		},

		// 查重
		async checkRepeat () {
			if (this.isRepeat) return
			await this.$refs.mform.validate()
			try {
				let resulte = await this.$api.seeCrmService.clientinfoPagelist({
					phone: this.form.phone,
					precisionName: this.form.name,
					page: 1,
					limit: 1
				})
				if (resulte.code === 200 && !resulte.data.length) {
					this.isRepeat = true
				} else {
					this.$utils.toast.text('此客户已存在')
				}
			} catch (err) {
				this.$utils.toast.text('此客户已存在')
			}
		},

		// 保存
		async submit () {
			await this.$refs.mform.validate()

			if (!this.isRepeat && this.isRepeatShow) {
				return this.$utils.toast.text('请先查重')
			}

			try {
				let params = {
					...this.form
				}

				params.formsFieldValueSaveVos = params.formsFieldValueSaveVos.map(item => {
					return { busId: this.busId, busType: 0, fieldConfigId: item.fieldConfigId || item.id, fieldValue: item.fieldValue }
				})

				// 判断是 公海池新建 还是 客户列表新建
				params.belongType = +this.form.poolId ? 1 : 0

				// this.id 为 false 则是新增
				let resulte = await this.$api.seeCrmService[!this.id ? 'clientinfoSave' : 'clientinfoUpdate'](params)

				// 是否同时新建联系人
				if (this.isSkipContact) {
					this.$routing.redirectTo(`/pages/contact/add-contact?buyType=0&clientId=${this.id || (resulte.data && resulte.data.id) || 0}&clientName=${this.form.name}`)
				} else {
					this.$routing.navigateBack()
				}
			} catch (err) {
				console.log(err)
			}
		}

	}
}
</script>

<style lang="scss" scoped>
    .add-follow-page{
        background: #f2f2f2;
        height: 100vh;
        padding-bottom: 75px;
        box-sizing: border-box;
    }
    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        padding-right: 15px;
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }

    .sub-btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 26px;
    }

    .check-repeat{
        width: 48px;
        height: 27px;
        border-radius: 3px;
        text-align: center;
        line-height: 27px;
        font-size: 12px;
        background: #6a9ff5;
        color: #fff;
    }
</style>
