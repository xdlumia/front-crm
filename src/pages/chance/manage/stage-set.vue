<template>
    <div class='tags-page'>
        <NavBar title='编辑销售阶段' />
        <i-cell-group>
            <i-cell v-for="(item, index) in 30" :key="index" :title="`测试${index}`">
                <radio slot="footer" value="32" :checked="item.checked" />
            </i-cell>
        </i-cell-group>
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
