<template>
    <div class="i-row" :class="iClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'iRow',
        components: {},
        props: {
            iClass: {
                type: String,
                default: ''
            }
        },

        computed: {},
        methods: {}
    }
</script>
<style type="less" scoped>
    .i-row:after {
        content: "";
        display: table;
        clear: both
    }
</style>


