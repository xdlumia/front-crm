<!--
/**
* @author王艳龙
* @name 企业管理
* @date 2019年8月2日
**/
-->
<template>
	<view>
		<NavBar title="企业管理" />
		<i-cell-group>
            <i-cell title="团队申请" is-link url='/pages/application/enterprise-management/team/index'></i-cell>
            <i-cell title="组织架构" is-link url='/pages/application/enterprise-management/organization/index?hierarchy=0'></i-cell>
        </i-cell-group>
	</view>
</template>

<script>
export default {
	onLoad () {
		this.$local.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaW5nZXIiOiJmZDE1N2Y4NzUwOGZlY2FmNWE3NzAyZGEyNDU3M2NkMCIsImNsaWVudElwIjoiMjIzLjcyLjgwLjI1MiIsImV4cCI6MTU2NDc2NDUzNCwidXNlcm5hbWUiOiJ1c2VyOjQ0MSJ9.rJqO0nbyhavZ1VpZnzGM4SG3f_cGZqYwAEuTpEVSJ7I')
		this.$local.setItem('finger', 'fd157f87508fecaf5a7702da24573cd0')
	}
}
</script>

<style scoped lang="scss">
</style>
