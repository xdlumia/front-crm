<template>
  <view>
    <NavBar title="邀请你加入" />
    <!-- 头部 -->
    <i-row class="m10">
        <i-col span="4" i-class="col-class">
            <img class="h20" src="/static/img/index.png" style="border-radius: 5px;" />
        </i-col>
        <i-col span="4" i-class="col-class">
            <span class="b" ref="inviter">
				{{inviter}}
            </span>
        </i-col>
        <i-col span="16" i-class="col-class">
            邀请你加入
        </i-col>
    </i-row>
    <!-- 公司 -->
    <i-row class="m10">
        <i-col span="24" i-class="col-class f16 b ac">
                {{companyName}}
        </i-col>
    </i-row>
    <!-- 表单 -->
    <i-panel :rules="rules">
        <i-input v-model="name" label ="真实姓名" autofocus placeholder="真实姓名" prop="name" />
        <i-input v-model="phone"  type="number" label ="手机号码" placeholder="请输入手机号" prop="phone" maxlength="11" />
        <div class="d-center bb">
            <div class="d-cell"><input class="pt10 pb10 pl20" type="number" v-model="validateCode" prop="validateCode" placeholder="请输入验证码"/></div>
            <div class="pr50"><a class="d-text-blue" @click="getValidateCode">获取验证码</a></div>
        </div>
        <i-input  label ="申请理由" v-model="applyReason" prop="applyReason" placeholder="选填" maxlength="50" />
    </i-panel>
    <!-- 底部 -->
    <!-- 提交按钮 -->
    <i-row class="m10">
        <i-col span="24" i-class="col-class">
            <i-button @click="submitApply" type="primary" >提交申请</i-button>
        </i-col>
    </i-row>
  </view>
</template>
<script>
export default {
	data () {
		return {
			name: '',
			phone: '',
			validateCode: '',
			applyReason: '',
			inviter: '',
			companyName: '',
			companyId: ''
		}
	},
	onLoad (option) {
		this.$local.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaW5nZXIiOiJmZDE1N2Y4NzUwOGZlY2FmNWE3NzAyZGEyNDU3M2NkMCIsImNsaWVudElwIjoiMjIzLjcyLjgwLjI1MiIsImV4cCI6MTU2NDY5Nzg5NywidXNlcm5hbWUiOiJ1c2VyOjQ0MSJ9.74yBnjSSVbVNQFiiOYGFI8npU2xVJCf8EepmC97gkss')
		this.$local.setItem('finger', 'fd157f87508fecaf5a7702da24573cd0')
		if (option.inviter) {
			this.inviter = option.inviter
		}
		if (option.companyName) {
			this.companyName = option.companyName
			this.companyId = option.companyId
		}
	},
	methods: {
		// 提交申请
		submitApply () {
			this.$api.enterpriseManagementService.saveUserapplicationinformation({
				'name': this.name,
				'phone': this.phone,
				'applyReason': this.applyReason,
				'ownerDeptId': this.companyId
			}).then((response) => {

			})
		},
		// 校验验证码validateSmsCode
		checkValidateCode () {
			if (this.phone && this.code) {
				this.$api.enterpriseManagementService.validateSmsCode({ 'phone': this.phone, 'verificationCode': this.validateCode }).then((response) => {

				})
			} else {
				uni.showModal({
					content: '电话号码和验证码不能为空',
					showCancel: false
				})
			}
		},
		// 获取验证码
		getValidateCode () {
			if (this.phone) {
				this.$api.enterpriseManagementService.getSmsCode({}, this.phone).then((response) => {
					if (response.code === 200) {
						uni.showToast({
							title: '验证码发送成功',
							icon: 'success',
							mask: !1
						})
					} else {
						uni.showModal({
							title: '验证码发送失败',
							content: response.msg,
							showCancel: false
						})
					}
				})
			} else {
				uni.showModal({
					title: '电话号码校验失败',
					content: '电话号码不能为空',
					showCancel: false
				})
			}
		}
	}
}
</script>
