<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <div class="d-bg-white">
            <i-cell-group>
                <i-cell title="客户管理 v1904"  is-link></i-cell>
                <i-cell title="注册登录类"  is-link></i-cell>
                <i-cell title="应用类"  is-link></i-cell>
                <i-cell title="企业管理"  is-link></i-cell>
            </i-cell-group>
        </div>

        <div class="f12 d-text-qgray d-fixed phone-help ac wfull">
            有问题请拨打客户热线<span class='d-text-blue ml5' @click="callPhone(phone)">{{phone}}</span>
        </div>
    </div>
</template>

<script>

export default {
	components: {

	},
	data () {
		return {
			phone: '4001869000'
		}
	},
	methods: {
		loginOut () {
			this.$routing.redirectTo('/pages/login/index')
		}
	}
}
</script>

<style scoped lang="scss">
    .phone-help{
        bottom: 120px;
    }
</style>
