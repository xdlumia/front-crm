<template>
    <div class="i-class i-message"
         :class="[{'i-message-show': visible},'i-message-' + type]"
    >
        {{ content }}
    </div>
</template>
<script>
let timmer = null
const defaultData = {
    visible: false,
    content: '',
    duration: 2,
    type: 'default' // default || success || warning || error
}

export default {
    name: 'message',
    components: {},
    props: {},
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
    .i-message {
        display: block;
        width: 100%;
        min-height: 32px;
        line-height: 2.3;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #2d8cf0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        z-index: 1010;
        opacity: 0;
        -webkit-transform: translateZ(0) translateY(-100%);
        transition: all .4s ease-in-out
    }

    .i-message-show {
        -webkit-transform: translateZ(0) translateY(0);
        opacity: 1
    }

    .i-message-default {
        background: #2d8cf0
    }

    .i-message-success {
        background: #19be6b
    }

    .i-message-warning {
        background: #f90
    }

    .i-message-error {
        background: #ed3f14
    }
</style>


