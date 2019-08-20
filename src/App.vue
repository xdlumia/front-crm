<script>
export default {
	/** 以下是应用生命周期 */
	// 当uni-app 初始化完成时触发（全局只触发一次）
	onLaunch: function () {
		let userInfo = this.$local.fetch('userInfo')
		userInfo && this.$store.commit('setUserInfo', userInfo)

		this.$local.setItem('appid', 'wx19ee978ff0ef382f')
		this.$local.setItem('sysCode', 'crm')
		// 1.获取用户openid
		// 用户已经存在则获取token，finger再getUserDetail
		// 用户不存在则跳转到登录页面
		let that = this
		// 进入小程序获取用户openid
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				let code = loginRes.code
				// 查看当前微信用户是否绑定账号
				that.$api.systemService.isBindByWx(
					{
						'code': code,
						'appId': that.$local.getItem('appid')
					}
				).then((response) => {
					if (response.code === 200) {
						if (response.data.bind) {
							that.$api.systemService.thirdpartyAuthorizationLogin({ 'userKey': response.data.userKey }).then((response2) => {
								if (response2.code === 200) {
									that.$local.setItem('token', response2.data.token)
									that.$local.setItem('finger', response2.data.finger)
									// 获取用户详细数据
									that.$api.bizSystemService.getUserDetail({}, { 'sysCode': that.$local.getItem('sysCode') }).then((response) => {
										that.$utils.toast.text(response.msg)
										if (response.code === 200) {
											uni.$emit('setUserInfo', response.data)
											that.$routing.switchTab('/pages/index/index')
										}
									})
								} else {
									that.$utils.toast.text(response.msg)
								}
							})
						} else {
							// uni.$emit('loginout')
						}
					}
				})
			}
		})
	},
	// 当 uni-app 启动，或从后台进入前台显示
	onShow: function () {
		console.log(this.$store.state)
	},
	// 当 uni-app 从前台进入后台
	onHide: function () {
	}
}
</script>

<style lang="scss">
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './assets/css/uni.css';
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
/* 底部浮动菜单*/
.footer-fixed-menu{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 3;
    .d-cell{
        padding: 10px 15px;
    }
}
.twowrap{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.isarrow{
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
}
</style>
