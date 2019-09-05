/*
 * @Author: web.冀猛超
 * @Date: 2019-07-23 11:54:25
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-05 11:04:15
 * @Description: 授权页面
 */
<template>
    <div class="login-page">
        <NavBar title="登录" />
        <div class="ac" style="margin-bottom: 32px;">
            <img class="logo-img d-block" src="https://fmd-a-oss.oss-cn-beijing.aliyuncs.com/public/crm/logo.png" alt="">
            <div class="f18 d-text-black b">客户管理</div>
        </div>
        <div class="bt" style="padding: 30px 24px 0">
            <div class="f16 d-text-black b mb20">真客户智客申请获得一下权限:</div>
            <div class="f14 d-text-gray">· 申请获取你微信绑定的手机号</div>
            <div class="mt40 d-center auth-btn">
                <div class="d-cell mr15">
                    <i-button type="primary" @click='skip' shape='circle' size="default" i-class="f16 d-bg-geblc">
                        拒绝
                    </i-button>
                </div>
                <div class="d-cell ml15">
                    <button style="padding-left:0;padding-right:0;" open-type="getPhoneNumber" @getphonenumber="handlePhoneClick">
                        <i-button type="primary" shape='circle' size="default" i-class="f16 d-cell">
                            允许
                        </i-button>
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			form: {
				code: '',
				encryptedData: '',
				iv: '',
				sessionKey: '',
				avatarUrl: ''
			}
		}
	},
	onLoad (option) {
		let that = this
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				that.form.code = loginRes.code
			}
		})
	},

	methods: {
		// 微信手机号授权回调
		handlePhoneClick ({ mp }) {
			if (mp.detail.encryptedData && mp.detail.iv) {
				this.form.encryptedData = mp.detail.encryptedData
				this.form.iv = mp.detail.iv
				// this.form.avatarUrl = mp.detail.userInfo.avatarUrl
				// 判断是否有绑定，是则直接登录，否则去绑定（成功则直接登录，否则去申请）
				let that = this
				that.$api.systemService.isBindByWx(
					{
						'code': that.form.code,
						'appId': that.$local.getItem('appid')
					}
				).then((response) => {
					let openid = response.data.userKey
					that.form.sessionKey = response.data.sessionKey
					that.$local.save('openid', openid)
					if (response.code === 200) {
						if (response.data.bind) { // 直接登录
							// 登录
							that.thirdpartyAuthorizationLogin()
						} else { // 尝试绑定
							// 获取手机号
							that.$api.seeCrmService.wgwGetPhoneNumber(that.form).then((response) => {
								if (response.code === 200) {
									let phoneNum = response.data.phoneNumber
									// 绑定
									that.$api.systemService.userBinding(
										{
											'phone': phoneNum,
											'systemCode': 'crm',
											'userKey': openid
										}
									).then((response) => {
										if (response.code === 200) { // 绑定成功，直接登录
											that.thirdpartyAuthorizationLogin()
										} else {
											that.reGetCode()
											that.$utils.toast.text('请前往申请开通页面')
										}
									}).catch(() => {
										that.reGetCode()
									})
								} else {
									that.reGetCode()
									that.$utils.toast.text('请前往申请开通页面')
								}
							})
						}
					} else {
						that.reGetCode()
						that.$utils.toast.text(response.msg)
					}
				}).catch(() => {
					this.reGetCode()
				})
			} else {
				this.skip()
			}
		},
		// 重新获取code
		reGetCode () {
			let that = this
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					that.form.code = loginRes.code
				}
			})
		},
		// 直接登录
		thirdpartyAuthorizationLogin () {
			let that = this
			that.$api.systemService.thirdpartyAuthorizationLogin({ 'userKey': that.$local.fetch('openid') }).then((response2) => {
				if (response2.code === 200) {
					that.$local.setItem('token', response2.data.token)
					that.$local.setItem('finger', response2.data.finger)
					// 调用角色权限列表，刷新后端缓存
					this.$api.bizSystemService.getUserResource({}, 'crm').then((response) => {
						if (response.code === 200) {
							that.$local.save('sourceList', response.data)
						} else {
							that.$utils.toast.text(response.msg)
							that.reGetCode()
						}
					})
					// 获取用户详细数据
					that.$api.bizSystemService.getUserDetail({ 'sysCode': 'crm' }).then((response) => {
						that.$utils.toast.text(response.msg)
						if (response.code === 200) {
							that.reGetCode()
							uni.$emit('setUserInfo', response.data)
							// 跳转到首页
							that.$routing.switchTab('/pages/chance/index')
						} else {
							that.reGetCode()
						}
					})
				} else {
					that.$utils.toast.text(response.msg)
					that.reGetCode()
				}
			})
		},
		skip () {
			this.$routing.navigateBack()
		}
	},
	onReady () {
	}
}
</script>

<style scoped lang="scss">
    .logo-img{
        width: 72px;
        height: 72px;
        margin: 70px auto 20px ;
    }

    .auth-btn{
        letter-spacing: 1px;
        .bg-gray{
            background: #888  !important;
        }
    }

</style>
