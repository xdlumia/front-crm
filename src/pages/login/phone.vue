<template>
    <div class="phone-page">
        <NavBar title="登录" />
        <div class="">
           <div class='phone-title f20 d-text-black b'>手机快捷登录</div>
           <div class="">

               <div class="form-row d-center">
                   <div class="f14 d-text-black form-row-item form-row-label">
                       <label class="d-text-red">*</label>手机号
                   </div>
                   <div class="d-cell mr10 form-row-item">
                       <input type="number" maxlength='11' v-model="form.phone" class='f12 d-text-gray' placeholder="请填写手机号">
                   </div>
                   <div class="pr10 form-row-item hfull d-center pl10 bl">
                       <div v-if="show" class='phone-code-btn d-text-blue f14 ac' @click="getValidateCode">获取验证码</div>
                       <div v-if="!show" class='d-text-blue f14 ac'>{{count}}s后可重新获取</div>
                   </div>
               </div>
               <div class="form-row d-center">
                   <div class="f14 d-text-black form-row-item form-row-label">
                       <label class="d-text-red">*</label>验证码
                   </div>
                   <div class="d-cell mr10 form-row-item">
                       <input type="number" class='f12 d-text-gray' v-model="form.code" placeholder="请填写短信验证码">
                   </div>
               </div>

                <div class="login-btn">
                    <i-button type="primary" size="default" i-class="f16" @click="login">登录</i-button>
                </div>

           </div>
        </div>
    </div>
</template>
<script>
import uuid from 'uuid'
import local from '@/utils/localStorage'
export default {
	data () {
		return {
			form: {
				phone: '',
				code: ''
			},
			// 短信验证码倒计时相关的参数
			show: true,
			count: '',
			timer: null
		}
	},
	onLoad (option) {
	},
	methods: {
		// 登录
		login () {
			// 校验
			if (!this.form.phone || !this.form.code) {
				this.$utils.toast.text('请填写完整数据')
			} else {
				this.$api.systemService.businessSmsLogin({
					'account': this.form.phone,
					'finger': uuid(),
					'sysCode': 'crm',
					'verifyCode': this.form.code
				}).then((response) => {
					this.$utils.toast.text(response.msg)
					if (response.code === 200) {
						// 保存数据到本地
						this.getUserDetail(response.data.sysCode)
						// 跳转到首页
						this.$routing.switchTab('/pages/index/index')
						// this.$routing.switchTab('/pages/application/enterprise-management/index')
					}
				})
			}
		},
		// 初始化用户详细数据
		getUserDetail (syscode) {
			this.$api.bizSystemService.getUserDetail({ 'syscode': syscode }).then((response) => {
				console.log(response)
			})
		},
		// 保存数据到本地
		setUserDataToLocal (data) {
			local.save('userInfo', data)
			local.save('companyInfo', data.companyEntity)
			local.save('deptInfo', data.rmDeptEntity)
			local.save('roleInfo', data.rmRoleEntities)
			local.save('sourceList', data.sourceList)
			local.setItem('token', data.token)
			local.setItem('finger', data.finger)
			local.setItem('sysCode', data.sysCode)
			this.$store.commit('setUserInfo', data)
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
			if (this.form.phone) {
				this.$api.seeCrmService.userapplicationinformationGetSmsCode(null, this.form.phone).then((response) => {
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
	},
	onReady () {
	}
}
</script>

<style scoped lang="scss">
    .phone-title{
        line-height: 1;
        margin: 50px 30px 30px
    }

    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        // .form-row-item{
        //     height: 100%;
        // }
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

</style>
