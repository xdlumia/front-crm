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

}
</script>

<style scoped lang="scss">
</style>
