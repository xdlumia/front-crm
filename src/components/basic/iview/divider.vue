<template>
<div class="i-divider i-class" :style="computedStyle">
    <div class="i-divider-content" v-if="content !== ''">
        {{content}}
    </div>
    <div class="i-divider-content" wx:else>
        <slot></slot>
    </div>
    <div class="i-divider-line" :style="{'background': lineColor}"></div>
</div>
</template>

<script>
export default {
    components: {

    },
    data () {
        return {

        }
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 48
        },
        color: {
            type: String,
            default: '#80848f'
        },
        lineColor: {
            type: String,
            default: '#e9eaec'
        },
        size: {
            type: Number,
            default: 12
        }
    },
    methods: {},
    computed: {
        computedStyle () {
            return `color: ${this.color};font-size:${this.size}px;height:${this.height}px;`
        }
    }
}
</script>

<style lang="scss" scoped>
.i-divider {
    width: 100%;
    text-align: center;
    font-size: 12px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center
}

.i-divider-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f7f7f7;
    top: 50%
}

.i-divider-content {
    background: #fff;
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0 10px
}
</style>
