<!--
/**
* @author 冀猛超
* @name  管理客户信息
* @date  2019年8月02日
**/
-->
<template>
    <div class='tags-page'>
        <NavBar title='管理客户' />
        <a url='/pages/common/information-set' class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">客户信息管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置客户有哪些基本信息</div>
        <a url='/pages/common/tags-set' class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">客户标签</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以自定义客户标签，比如客户行业、客户来源</div>
        <a url='/pages/common/score-manage?busType=0&title=客户评分' class="tags-box p15 isarrow f13 d-text-black d-bg-white bt bb">评分管理</a>
        <div class="pl15 pr15 d-text-gray f13 pt10 pb10">可以设置客户的评分</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .tags-page{
        background: #f2f2f2;
        height: 100vh;
    }
</style>
