<!--
/**
* @author王艳龙
* @name 邀请你加入
* @date 2019年8月2日
**/
-->
<template>
  <view>
    <NavBar title="邀请你加入" />
	<view class="pl10 pr20 pt10">
		<!-- 头部 -->
		<i-row class="m10">
			<i-col span="4" i-class="col-class">
				<mAvatar :text='inviter' :url='avatarUrl' height="30" width="30"></mAvatar>
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
		<div style="border: 0.3px solid #f2f2f2;height:0"></div>
		<!-- 表单 -->
		<i-panel>
			<i-input v-model="name" label ="真实姓名" placeholder="真实姓名" prop="name" />
			<i-input v-model="phone"  type="number" label ="手机号码" placeholder="请输入手机号" prop="phone" maxlength="11" />
			<div class="d-center bb">
				<div class="d-cell"><input class="pt10 pb10 pl20" type="number" v-model="validateCode" prop="validateCode" placeholder="请输入验证码" @blur="checkValidateCode"/></div>
				<div v-if="show" class="pr50"><a class="d-text-blue" @click="getValidateCode">获取验证码</a></div>
				<div v-if="!show" class="pr50"><span class="d-text-blue">{{count}} s后可重新获取</span></div>
			</div>
			<i-input  label ="申请理由" v-model="applyReason" prop="applyReason" placeholder="选填" maxlength="50" />
		</i-panel>
		<!-- 底部 -->
		<!-- 提交按钮 -->
		<i-row class="m10">
			<i-col span="24" i-class="col-class">
				<button  class="wfull ac f16 h40 d-bg-blue" style="line-height: 40px"  @click="submitApply">提交申请</button>
			</i-col>
		</i-row>
	</view>
  </view>
</template>
<script>
import mAvatar from '@/components/m-avatar'
export default {
	components: {
		mAvatar
	},
	data () {
		return {
			name: '',
			phone: '',
			validateCode: '',
			applyReason: '',
			inviter: '',
			companyName: '',
			companyCode: '',
			validateOk: false,
			avatarUrl: '',

			show: true,
			count: '',
			timer: null
		}
	},
	onLoad (option) {
		this.inviter = option.inviter || '无邀请人'

		this.companyName = option.companyName || '无邀请公司'
		this.companyCode = option.companyCode

		this.avatarUrl = option.avatarUrl
	},
	methods: {
		// 提交申请
		submitApply () {
			if (!this.name) {
				this.$utils.toast.text('请填写真实姓名')
				return false
			}
			if (!this.phone) {
				this.$utils.toast.text('请填写手机号')
				return false
			}
			if (!this.validateCode) {
				this.$utils.toast.text('请填写验证码')
				return false
			}

			if (this.validateOk) {
				this.$api.seeCrmService.userapplicationinformationSave({
					'name': this.name,
					'phone': this.phone,
					'applyReason': this.applyReason,
					'companyCode': this.companyCode,
					'inviter': this.inviter
				}).then((response) => {
					if (response.code === 200) {
						uni.redirectTo({
							url: '/pages/application/enterprise-management/organization/invite/ok'
						})
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
			if (this.phone !== '' && this.validateCode !== '') {
				this.$api.seeCrmService.userapplicationinformationValidateSmsCode({ 'phone': this.phone, 'verificationCode': this.validateCode }).then((response) => {
					this.$utils.toast.text(response.msg)
					if (response.code === 200) {
						this.validateOk = true
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
			if (this.phone) {
				this.$api.seeCrmService.userapplicationinformationGetSmsCode({}, this.phone).then((response) => {
					if (response.code === 200) {
						this.$utils.toast.text('验证码发送成功')
						this.timeGo()
					} else {
						this.$utils.toast.text('验证码发送失败')
					}
				})
			} else {
				this.$utils.toast.text('电话号码不能为空')
			}
		}
	}
}
</script>
<style scoped>
.avatar-img{
	border-radius: 70px;
	width: 30px;
	height: 30px;
}
</style>
