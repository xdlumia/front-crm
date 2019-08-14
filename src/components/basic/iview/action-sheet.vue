<template>
<div>
    <div :class="['i-as-mask', 'i-class-mask', {'i-as-mask-show': visible }]" @click="handleClickMask"></div>
    <div :class="['i-class', 'i-as', { 'i-as-show' : visible }]">
        <div class="i-as-header i-class-header">
            <slot name="header"></slot>
        </div>
        <div class="i-as-actions">
            <div class="i-as-action-item" v-for="(item, index) in actions" :key="item.name">
                <i-button @click="handleClickItem(index)" :open-type="item.openType" type="ghost" size="large" long>
                    <div class="i-as-btn-loading" v-if="item.loading"></div>
                    <i-icon v-if="item.icon" :type="item.icon" i-class="i-as-btn-icon"></i-icon>
                    <div class="i-as-btn-text" :style="{ 'color' : item.color ? item.color : '' }">{{ item.name }}</div>
                </i-button>
            </div>
        </div>
        <div class="i-as-cancel" v-if="showCancel">
            <i-button i-class="i-as-cancel-btn" type="ghost" size="large" long @click="handleClickCancel">
                {{ cancelText }}
            </i-button>
        </div>
    </div>
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
        visible: {
            type: Boolean,
            default: false
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: false
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        actions: {
            type: Array,
            default: []
        }
    },
    computed:{
    },
    methods: {
        handleClickMask () {
            if (!this.maskClosable) return
            this.handleClickCancel()
        },

        handleClickItem (index) {
            this.$emit('click', {
                target: {
                    index
                }
            })
        },

        handleClickCancel () {
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss" scoped>
.i-as {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f7f7f7;
    transform: translate3d(0, 100%, 0);
    transform-origin: center;
    transition: all .2s ease-in-out;
    z-index: 900;
    visibility: hidden
}

.i-as-show {
    transform: translate3d(0, 0, 0);
    visibility: visible
}
.i-as{max-height: 80%;}
.i-as-actions{
    height: calc(100% - 54px);
    overflow-y: auto
}
.i-as-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 900;
    transition: all .2s ease-in-out;
    opacity: 0;
    height: 100vh;
    visibility: hidden
}

.i-as-mask-show {
    opacity: 1;
    visibility: visible
}

.i-as-action-item {
    position: relative
}

.i-as-action-item::after {
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
    border-bottom-width: 1px
}

.i-as-header {
    background: #fff;
    text-align: center;
    position: relative;
    font-size: 12px;
    color: #80848f
}

.i-as-header::after {
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
    border-bottom-width: 1px
}

.i-as-cancel {
    margin-top: 6px;
}

.i-as-btn-loading {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    background: 0 0;
    border-radius: 50%;
    border: 2px solid #e5e5e5;
    border-color: #666 #e5e5e5 #e5e5e5 #e5e5e5;
    animation: btn-spin .6s linear;
    animation-iteration-count: infinite
}

.i-as-btn-text {
    display: inline-block;
    vertical-align: middle
}

.i-as-btn-icon {
    font-size: 14px !important;
    margin-right: 4px
}

@keyframes btn-spin {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>
