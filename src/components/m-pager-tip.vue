<template>
    <div>
        <div class="no-data-msg" v-if="pager.isLoaded&&!list.length">暂无数据</div>
        <i-load-more :tip="(pager.noMore&&!pager.loading)?'没有更多了':'加载中'" :loading="pager.loading" v-if="pager.loading||(pager.noMore&&list.length)" />
    </div>
</template>
<script>
export default {
	props: ['pager', 'list']
}
</script>
