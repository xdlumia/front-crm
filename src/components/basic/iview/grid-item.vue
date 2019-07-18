<template>
<div class="i-grid-item" :class="iClass" :style="{width: width} ">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'gridItem',
    components: {},
    props: {
        iClass: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            width: '33.33%'
        }
    },
    computed: {},
    methods: {
        setWidth (width) {
            this.width = width
        }
    }
}
</script>

<style scoped>
.i-grid-item {
    position: relative;
    float: left;
    padding: 20px 10px;
    width: 33.33333333%;
    box-sizing: border-box;
    border-right: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec
}
</style>
