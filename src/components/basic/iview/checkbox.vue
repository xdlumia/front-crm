<template>
<div class="i-class i-cell-group">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'panel',
    components: {},
    props: {
        title: {
            type: String,
            default: ''
        },
        // 标题顶部距离
        hideTop: {
            type: Boolean,
            default: false
        },
        hideBorder: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            show: false
        }
    },
    computed: {},
    methods: {
        updateIsLastCell () {
            let cells = this.getRelationNodes('../cell/index')
            const len = cells.length

            if (len > 0) {
                let lastIndex = len - 1

                cells.forEach((cell, index) => {
                    cell.updateIsLastCell(index === lastIndex)
                })
            }
        }
    }
}
</script>

<style scoped>
.i-panel {
    position: relative;
    overflow: hidden
}

.i-panel-title {
    font-size: 14px;
    line-height: 1;
    color: #1c2438;
    padding: 20px 16px 10px
}

.i-panel-title-hide-top {
    padding-top: 0
}

.i-panel-content {
    position: relative;
    background: #fff;
    overflow: hidden
}

.i-panel-content::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e9eaec;
    border-top-width: 1px;
    border-bottom-width: 1px
}

.i-panel-without-border::after {
    border: 0 none
}
</style>
