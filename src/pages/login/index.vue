<template>
    <div class="login-page">
        <NavBar title="登录" />
        <div class="">
            <img class="logo-img d-block" src="../../assets/img/logo.png" alt="">
            <div class="plr40">
                <i-button type="primary" size="default" i-class="f16 mb15">
                    <uni-icon type='weixin' size='24' color='#fff' /> <span class="ml10">微信授权登录</span>
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

		}
	},
	onLoad (option) {
	},
	methods: {

	},
	onReady () {
		console.log(this.$store.state)
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
