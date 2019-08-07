<template>
    <div class='tags-page'>
        <NavBar title='管理客户' />
        <a url="/pages/common/information-set" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">机会信息管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置商机有哪些基本信息</div>

        <a url="./stage-set" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">销售阶段设置</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义销售阶段，比如初步沟通、方案/报价...</div>

        <a url="/pages/common/tags-set?busType=2" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">销售机会标签管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义销售机会标签，比如销售机会来源</div>

        <a url="/pages/common/score-manage" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">销售机会评分管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置销售机会的评分</div>
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
