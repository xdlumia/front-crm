<template>
    <div class="user-info-page hfull">
        <NavBar title="我的个人信息" />
        <div class="d-bg-white">
            <i-cell-group>
                <i-cell title="手机号"  value='180****7962'></i-cell>
                <i-cell title="姓名"  value='黄玉莉'></i-cell>
                <i-cell title="公司名称"  value='华为技术有限公司'></i-cell>
                <i-cell title="职位"  value='总经理'></i-cell>
            </i-cell-group>
        </div>

        <div class="login-btn">
            <i-button type="primary" size="default" i-class="f16">退出登录</i-button>
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
	created () {

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
