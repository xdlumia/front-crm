<template>
<div :class="['i-class', 'i-drawer',{'i-drawer-show': visible},'i-drawer-' + mode ]">
    <div v-if="mask" class="i-drawer-mask" @click="handleMaskClick"></div>
    <div class="i-drawer-container">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'drawer',
    components: {},
    props: {
        iClass: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Boolean,
            default: true
        },

        maskClosable: {
            type: Boolean,
            default: true
        },

        mode: {
            type: String,
            default: 'left' // left right
        }
    },
    data () {
        return {}
    },
    mounted () {},
    methods: {
        
        handleMaskClick () {
            if (!this.maskClosable) {
                return
            }
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.i-drawer {
    visibility: hidden
}

.i-drawer-show {
    visibility: visible
}

.i-drawer-show .i-drawer-mask {
    display: block;
    opacity: 1
}

.i-drawer-show .i-drawer-container {
    opacity: 1
}

.i-drawer-show.i-drawer-left .i-drawer-container,
.i-drawer-show.i-drawer-right .i-drawer-container {
    transform: translate3d(0, -50%, 0)
}

.i-drawer-mask {
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(0, 0, 0, .6);
    transition: all .3s ease-in-out
}

.i-drawer-container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center;
    transition: all .3s ease-in-out;
    z-index: 999;
    opacity: 0
}

.i-drawer-left .i-drawer-container {
    left: 0;
    top: 50%;
    transform: translate3d(-100%, -50%, 0)
}

.i-drawer-right .i-drawer-container {
    right: 0;
    top: 50%;
    left: auto;
    transform: translate3d(100%, -50%, 0)
}
</style>
