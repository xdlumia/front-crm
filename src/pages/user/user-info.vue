<template>
    <div class="user-info-page hfull">
        <NavBar title="我的个人信息" />
        <div class="d-bg-white">
            <i-cell-group>
                <i-cell title="手机号"  :value='phone'></i-cell>
                <i-cell title="姓名"  :value='name'></i-cell>
                <i-cell title="公司名称"  :value='companyName'></i-cell>
                <i-cell title="职位"  :value='positionName'></i-cell>
            </i-cell-group>
        </div>

        <div class="login-btn">
            <i-button type="primary" size="default" i-class="f16" @click='loginOut'>退出登录</i-button>
        </div>
    </div>
</template>

<script>

export default {
	components: {

	},
	data () {
		return {
			phone: '',
			name: '',
			companyName: '',
			positionName: ''
		}
	},
	onLoad (option) {
		let userInfo = this.$local.fetch('userInfo') || {}
		this.phone = userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(userInfo.phone.length - 4)
		let companyInfo = this.$local.fetch('companyInfo') || {}
		this.companyName = companyInfo.companyName
		this.name = userInfo.name
		this.positionName = userInfo.positionName
	},
	methods: {
		loginOut () {
			uni.$emit('loginout')
		}
	}
}
</script>

<style scoped lang="scss">
    .user-info-page{
        background: #f9f9f9;
    }
    .login-btn {
        padding: 61px 40px 0
    }

</style>
