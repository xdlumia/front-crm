<template>
    <div>
        <div class="i-toast-mask" v-if="visible && mask" @click="handleHide"></div>
        <div class="i-class i-toast" v-if="visible">
            <div v-if="type !== 'default'">
                <div class="i-toast-type">
                    <i-icon i-class="i-toast-icon" type="success" :size="56" v-if="type === 'success'"></i-icon>
                    <i-icon i-class="i-toast-icon" type="prompt" :size="56" v-else-if="type === 'warning'"></i-icon>
                    <i-icon i-class="i-toast-icon" type="delete" :size="56" v-else-if="type === 'error'"></i-icon>
                    <div class="i-toast-icon i-toast-loading" v-else-if="type === 'loading'"></div>
                </div>
            </div>
            <div v-else>
                <i-icon i-class="i-toast-icon" :type="icon" v-if="icon "></i-icon>
                <img class="i-toast-image" :src="image" v-if="image" mode="aspectFit"/>
            </div>
            <div class="i-toast-content" v-if="content">{{ content }}</div>
        </div>
    </div>
</template>
<script>
    let timmer = null
    const defaultData = {
        visible: false,
        content: '',
        icon: '',
        image: '',
        duration: 2,
        mask: true,
        type: 'default' // default || success || warning || error || loading
    }

    export default {
        name: 'toast',
        components: {},
        props: {
        },
        data () {
            return {
                ...defaultData
            }
        },
        computed: {},
        methods: {
            handleShow (options) {
                const {type = 'default', duration = 2} = options

                Object.assign(this, {
                    ...options,
                    type,
                    duration,
                    visible: true
                })

                const d = this.duration * 1000

                if (timmer) clearTimeout(timmer)
                if (d !== 0) {
                    timmer = setTimeout(() => {
                        this.handleHide()
                        timmer = null
                    }, d)
                }
            },

            handleHide () {
                Object.assign(this, defaultData)
            }
        }
    }
</script>
<style type="less" scoped>
    .i-toast {
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: rgba(0, 0, 0, .7);
        color: #fff;
        font-size: 14px;
        line-height: 1.5em;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 10px 18px;
        text-align: center;
        border-radius: 4px;
        z-index: 1010
    }

    .i-toast-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1010
    }

    .i-toast-icon {
        font-size: 38px !important;
        margin-bottom: 6px
    }

    .i-toast-image {
        max-width: 100px;
        max-height: 100px
    }

    .i-toast-loading {
        display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 28px;
        background: 0 0;
        border-radius: 50%;
        border: 2px solid #fff;
        border-color: #fff #fff #fff #2d8cf0;
        animation: btn-spin .8s linear;
        animation-iteration-count: infinite
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


