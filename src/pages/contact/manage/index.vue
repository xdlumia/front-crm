<template>
    <div class='tags-page'>
        <NavBar title='管理联系人' />
        <a url="/pages/common/information-set?busType=1" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">联系人信息管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置联系人有哪些基本信息</div>

        <a url="/pages/common/tags-set?busType=1" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">联系人标签管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义联系人标签，比如联系人角色</div>

        <a url="/pages/common/score-manage?busType=1" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">联系人评分管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置联系人的评分</div>
    </div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}
</script>

<style lang="scss" scoped>
    .tags-page{
        background: #f2f2f2;
        height: 100vh;
    }
</style>
