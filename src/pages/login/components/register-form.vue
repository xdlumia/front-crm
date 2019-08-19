<template>
    <div>
        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>姓名
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" v-model="form.linkmanName" class='f12 d-text-gray' placeholder="请填写正确姓名">
            </div>
        </div>

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>手机号
            </div>
            <div class="d-cell pr10 form-row-item">
                <input type="number" maxlength='11' v-model="form.linkmanPhone" class='f12 d-text-gray' placeholder="请填写手机号">
            </div>
            <div class="mr10 form-row-item hfull d-center ml10 bl">
                <div v-if="show" class='phone-code-btn d-text-blue f14 ac' @click="getValidateCode">获取验证码</div>
                <div v-if="!show" class='d-text-blue f14 ac'>{{count}} s后可重新获取</div>
            </div>
        </div>
        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>验证码
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="number" class='f12 d-text-gray' v-model="vilidateCode" placeholder="请填写短信验证码" @blur="checkValidateCode">
            </div>
        </div>

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>企业名称
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" class='f12 d-text-gray' v-model="form.companyName" placeholder="请填写正确的企业名称">
            </div>
        </div>

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                企业规模
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" class='f12 d-text-gray' v-model="form.scale" placeholder="请填写正确的企业规模">
            </div>
        </div>

        <div class="f12 d-text-gray p5 mt20">
            <i-icon size="18" color="#999" type='prompt_fill' />请完善信息，我们会尽快核实信息，为您开通30天免费试用账号
        </div>

        <div class="phone-fixed d-text-white d-fixed d-center" @click="callPhone(servicePhone)">
            <span class="iconfont iconcall f22"></span>
        </div>

        <div class="login-btn">
            <i-button type="primary" size="default" i-class="f16" @click="submitApply">立即获取</i-button>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				linkmanName: '', // 联系人姓名
				linkmanPhone: '', // 联系人电话
				companyName: '', // 公司名称
				scale: '', // 公司规模
				setStartTime: 0, // 服务开始时间
				setName: '不是真实套餐', // 开通套餐名称
				setEndTime: '', // 服务结束时间（开始时间加上30天）
				applyFromCode: 'crm', // 服务申请来源
				sysCode: 'crm', // 系统编码
				applicantName: ''// 申请人名称码
			},
			vilidateCode: '', // 验证码
			validateOk: false,
			show: true,
			count: 60,
			timer: null
		}
	},
	methods: {
		// 提交申请
		submitApply () {
			// 转换时间
			let now = new Date()
			this.form.setStartTime = now.getTime()
			this.form.setEndTime = new Date(this.form.setStartTime)
			this.form.setEndTime = parseInt(this.form.setStartTime) + 30 * 24 * 60 * 60 * 1000
			this.form.applicantName = this.form.linkmanName

			if (this.validateOk) {
				this.$api.systemService.applyCompany(this.form).then((response) => {
					if (response.code === 200) {
						uni.$emit('backFromRegister', {})
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			} else {
				this.$utils.toast.text('验证码校验失败')
			}
		},
		// 校验验证码validateSmsCode
		checkValidateCode () {
			if (this.form.linkmanPhone !== '' && this.vilidateCode !== '') {
				this.$api.seeCrmService.userapplicationinformationValidateSmsCode({ 'phone': this.form.linkmanPhone, 'verificationCode': this.vilidateCode }).then((response) => {
					if (response.code === 200) {
						this.validateOk = true
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			} else {
				this.$utils.toast.text('电话号码和验证码不能为空')
			}
		},
		// 验证码发送后的倒计时
		timeGo () {
			const TIME_COUNT = 60
			if (!this.timer) {
				this.count = TIME_COUNT
				this.show = false
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--
					} else {
						this.show = true
						clearInterval(this.timer)
						this.timer = null
					}
				}, 1000)
			}
		},
		// 获取验证码
		getValidateCode () {
			if (this.form.linkmanPhone) {
				this.$api.seeCrmService.userapplicationinformationGetSmsCode({}, this.form.linkmanPhone).then((response) => {
					if (response.code === 200) {
						this.$utils.toast.text('验证码发送成功')
						this.timeGo()
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			} else {
				this.$utils.toast.text('电话号码不能为空')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }

    .phone-code-btn{
        width: 104px;
        height: 25px;
        border-radius: 5px;
        border: 1px dashed #4889F4;
        line-height: 25px;
    }

    .login-btn {
        padding: 80px 40px 0
    }

    .phone-fixed{
        width: 40px;
        height: 40px;
        border-radius: 100px;
        background: #4889F4;
        right: 30px;
    }

</style>
