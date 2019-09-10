/*
 * @Author: web.冀猛超
 * @Date: 2019-07-23 11:54:25
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-05 11:05:59
 * @Description: 登陆页面
 */
<template>
    <div class="login-page">
        <NavBar title="登录" />
        <div class="">
            <img class="logo-img d-block" src="https://fmd-a-oss.oss-cn-beijing.aliyuncs.com/public/crm/logo.png" alt="">
            <div class="plr40">
				<i-button type="primary" size="default" i-class="f16 mb15" @click="skip">
					<uni-icon type='weixin' size='24' color='#fff' />
					<span class="ml10">
						微信授权登录
					</span>
				</i-button>
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
				sessionKey: '',
				avatarUrl: ''
			}
		}
	},
	methods: {
		skip () {
			this.$routing.navigateTo('./auth')
		}
	},
	onReady () {
	}
}
</script>

<style scoped lang="scss">
    .logo-img{
        width: 150px;
        height: 150px;
        margin: 88px auto 100px ;
    }

    .plr40{
        padding: 0 40px;
    }
</style>
