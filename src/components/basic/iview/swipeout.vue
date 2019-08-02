<template>
<div class="i-swipeout-wrap i-class">
    <div class="i-swipeout-item"
        @touchstart="handlerTouchstart"
        @touchmove="handlerTouchmove"
        @touchend="handlerTouchend"
        :style="{'transform': 'translate(' + position.pageX + 'px,0)'}">
        <div class="i-swipeout-content">
            <slot name="content"></slot>
        </div>
        <div class="i-swipeout-button-right-group" v-if="actions.length > 0" @catchtouchend="loop">
            <div class="i-swipeout-button-right-item"
                v-for="(item, index) in actions"
                :style="{
                    'background': item.background ? item.background : defaults ,
                    'color': item.color,
                    'width':item.width + 'px'
                    }"
                :key="index"
                :data-index="index"
                @tap="handlerButton">
                <i-icon v-if="item.icon" :type="item.icon" :size="item.fontsize" :color="item.color">
                </i-icon>
                {{item.name}}
            </div>
        </div>
        <div class="i-swipeout-button-right-group"
            @catchtouchend="loop"
            @tap="handlerParentButton"
            v-if="actions.length === 0"
            :style="{width:operateWidth + 'px', 'right':-operateWidth + 'px'}">
            <slot name="button"></slot>
        </div>
    </div>
</div>
</template>

<script>
/*
 * touch事件判断方式
 * https://github.com/madrobby/zepto/blob/master/src/touch.js#files
 */
function swipeDirection (x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
export default {
    props: {
        actions: {
            value: [],
            default: Array
        },
        unclosable: {
            value: false,
            default: Boolean
        },
        toggle: {
            value: false,
            default: Boolean
        },
        operateWidth: {
            type: Number,
            default: 160
        }
    },
    data () {
        return {
            // touch start position
            tStart: {
                pageX: 0,
                pageY: 0
            },
            // 限制滑动距离
            limitMove: 0,
            // element move position
            position: {
                pageX: 0,
                pageY: 0
            }
        }
    },
    mounted () {
        this._updateButtonSize()
    },
    methods: {
        // 阻止事件冒泡
        loop () {},
        _updateButtonSize () {
            const actions = this.actions
            if (actions.length > 0) {
                let limitMovePosition = 0
                actions.forEach(item => {
                    limitMovePosition += item.width || 0
                })
                this.limitMove = limitMovePosition
            } else {
                this.limitMove = this.operateWidth
            }
        },
        handlerTouchstart (event) {
            const touches = event.touches ? event.touches[0] : {}
            const tStart = this.tStart
            if (touches) {
                for (let i in tStart) {
                    if (touches[i]) {
                        tStart[i] = touches[i]
                    }
                }
            }
        },
        swipper (touches) {
            const start = this.tStart
            const spacing = {
                pageX: touches.pageX - start.pageX,
                pageY: touches.pageY - start.pageY
            }
            if (this.limitMove < Math.abs(spacing.pageX)) {
                spacing.pageX = -this.limitMove
            }
            this.position = spacing
        },
        handlerTouchmove (event) {
            const start = this.tStart
            const touches = event.touches ? event.touches[0] : {}
            if (touches) {
                const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY)
                if (direction === 'Left') {
                    this.swipper(touches)
                }
            }
        },
        handlerTouchend (event) {
            const start = this.tStart
            const touches = event.changedTouches ? event.changedTouches[0] : {}
            if (touches) {
                const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY)
                const spacing = {
                    pageX: touches.pageX - start.pageX,
                    pageY: touches.pageY - start.pageY
                }
                if (Math.abs(spacing.pageX) >= 40 && direction === 'Left') {
                    spacing.pageX = spacing.pageX < 0 ? -this.limitMove : this.limitMove
                } else {
                    spacing.pageX = 0
                }
                this.position = spacing
            }
        },
        handlerButton (event) {
            if (!this.unclosable) {
                this.closeButtonGroup()
            }
            const dataset = event.currentTarget.dataset
           
            this.$emit('change', {index: dataset.index})
        },
        closeButtonGroup () {
            this.position = {pageX: 0, pageY: 0}
        },
        // 控制自定义组件
        handlerParentButton (event) {
            if (!this.unclosable) {
                this.closeButtonGroup()
            }
        }
    },
    watch: {
        properties() {
            this._updateButtonSize
        },
        toggle() {
            this.closeButtonGroup
        }
    }
}
</script>

<style lang="scss" scoped>
.i-swipeout-wrap {
    border-bottom: #dddee1 solid 1px;
    background: #fff;
    position: relative;
    overflow: hidden
}

.i-swipeout-item {
    width: 100%;
    box-sizing: border-box;
    transition: transform .2s ease;
    font-size: 14px
}

.i-swipeout-content {
    white-space: nowrap;
    overflow: hidden
}

.i-swipeout-button-right-group {
    position: absolute;
    right: -100%;
    top: 0;
    height: 100%;
    z-index: 1;
    width: 100%
}

.i-swipeout-button-right-item {
    height: 100%;
    float: left;
    white-space: nowrap;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center
}
</style>
