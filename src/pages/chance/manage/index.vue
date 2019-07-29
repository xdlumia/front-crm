<template>
    <div class='tags-page'>
        <NavBar title='管理客户' />
        <a class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">机会信息管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置商机有哪些基本信息</div>

        <a url="./stage-set" class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">销售阶段设置</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义销售阶段，比如初步沟通、方案/报价...</div>

        <a class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">客户标签</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置客户的评分</div>
        <a class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">评分管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义客户标签，比如客户行业、客户来源</div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			upData: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }]
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
