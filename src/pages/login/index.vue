<template>
    <div class="login-page">
        <NavBar title="登录" />
        <div class="">
            <img class="logo-img d-block" src="../../assets/img/logo.png" alt="">
            <div class="plr40">
                <button style="padding-left:0;padding-right:0;" ref="getPhoneButton" open-type="getPhoneNumber" @getphonenumber="handlePnoneClick">
                    <i-button type="primary" size="default" i-class="f16 mb15">
                            <uni-icon type='weixin' size='24' color='#fff' />
                            <span class="ml10">
                                微信授权登录
                            </span>
                    </i-button>
                </button>
                <a url="/pages/login/phone">
                    <i-button type="ghost" size="default" i-class="f16 mb15">
                        <i-icon type='mobilephone' size='26' color='#4788F4' /> <span class="ml10 d-text-blue">手机快捷登录</span>
                    </i-button>
                </a>
                <a url="/pages/login/register">
                    <i-button type="ghost" size="default" i-class="f16">
                        <span class="iconfont iconkaihu f16 d-text-gray"></span><span class="ml10 d-text-blue"><span class='d-text-white'>占</span>我要开通<span class='d-text-white'>位</span></span>
                    </i-button>
                </a>
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
				sessionKey: ''
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
		handlePnoneClick ({ mp }) {
			this.form.encryptedData = mp.detail.encryptedData
			this.form.iv = mp.detail.iv
			// 判断是否有绑定，是则直接登录，否则去绑定（成功则直接登录，否则去申请）
			let that = this
			that.$api.systemService.isBindByWx(
				{
					'code': that.form.code,
					'appId': that.$local.fetch('appid')
				}
			).then((response) => {
				let openid = response.data.userKey
				that.form.sessionKey = response.data.sessionKey
				that.$local.save('openid', openid)
				if (response.code === 200) { // 直接登录
					if (response.data.bind) {
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
										'systemCode': that.$local.fetch('syscode'),
										'userKey': that.$local.fetch('openid')
									}
								).then((response) => {
									if (response.code === 200) { // 绑定成功，直接登录
										that.thirdpartyAuthorizationLogin()
									} else {
										this.$utils.toast.text('请申请')
									}
								})
							} else {
								this.$utils.toast.text('请申请')
							}
						})
					}
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
					// 获取用户详细数据
					that.$api.bizSystemService.getUserDetail({}, { 'syscode': that.$local.fetch('syscode') }).then((response) => {
						that.$utils.toast.text(response.msg)
						if (response.code === 200) {
							uni.$emit('setUserInfo', response.data)
							// 跳转到首页
							that.$routing.switchTab('/pages/index/index')
						}
					})
				} else {
					that.$utils.toast.text(response.msg)
				}
			})
		},
		// 微信登录
		loginByWxPhone () {
			this.$lcoal.fetch('wxPhone')
		}
	},
	onReady () {
	}
}
</script>

<style scoped lang="scss">
    .logo-img{
        width: 150px;
        height: 146px;
        margin: 88px auto 100px ;
    }

    .plr40{
        padding: 0 40px;
    }
</style>
