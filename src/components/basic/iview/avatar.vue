<template>
<div class="i-avatar i-avatar-circle" :class="[{'i-avatar-image': src}, 'i-avatar-' + size, iClass]">
    <img :src="src" v-if="src !== ''" class="image"/>
    <div class="i-avatar-string" v-else>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        iClass: {
            type: String,
            default: ''
        },
        // circle || square
        shape: {
            type: String,
            default: 'circle'
        },
        // small || large || default
        size: {
            type: String,
            default: 'default'
        },
        src: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.i-avatar {
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    font-size: 18px
}

.i-avatar .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.i-avatar .ivu-avatar-string {
    line-height: 32px
}

.i-avatar-big-large {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    font-size: 28px
}

.i-avatar-large {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 24px
}

.i-avatar-large .ivu-avatar-string {
    line-height: 40px
}

.i-avatar-small {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    font-size: 14px
}

.i-avatar-small .ivu-avatar-string {
    line-height: 24px
}

.i-avatar-image {
    background: 0 0
}

.i-avatar-square {
    border-radius: 4px
}

.i-avatar>image {
    width: 100%;
    height: 100%
}
</style>
