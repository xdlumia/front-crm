<template>
<div>
    <button
        @click="onclick"
        class=" i-btn"
        :class="[{'i-btn-long': long, 'i-btn-loading': loading, 'i-btn-disabled': disabled},'i-btn-' + size, 'i-btn-' + type, 'i-btn-' + shape, iClass]"
        :open-type="openType"
        :app-parameter="appParameter"
        :hover-stop-propagation="hoverStopPropagation"
        :hover-start-time="hoverStartTime"
        :hover-stay-time="hoverStayTime"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :plain="true">
        <div class="i-btn-loading-inner" v-if="loading"></div>
        <slot></slot>
    </button>
</div>
</template>

<script>
export default {
    name: 'panel',
    components: {},
    props: {
        // default, primary, ghost, info, success, warning, error
        type: {
            type: String,
            default: ''
        },
        // default, large, small
        size: {
            type: String,
            default: ''
        },
        // circle, square
        shape: {
            type: String,
            default: 'square'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        long: {
            type: Boolean,
            default: false
        },
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            default: 20
        },
        hoverStayTime: {
            type: Number,
            default: 70
        },
        lang: {
            type: String,
            default: 'en'
        },
        sessionFrom: {
            type: String,
            default: ''
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        iClass: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            show: false
        }
    },
    computed: {},
    methods: {
        onclick () {
            !this.disabled && this.$emit('click')
        }
    }
}
</script>

<style scoped>
button {
    width: calc(100% - 20px);
}

.i-btn {
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    user-select: none;
    font-size: 14px;
    border-radius: 2px;
    border: 0 !important;
    position: relative;
    text-decoration: none;
    height: 44px;
    line-height: 44px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
    color: #fff !important;
    background: #f7f7f7 !important;
    color: #495060 !important;
    width: 100%;

}

.i-btn-long {
    border-radius: 0;
    margin: 0;
    box-shadow: none
}

.i-btn-large {
    height: 48px;
    line-height: 48px
}

.i-btn-small {
    height: 40px;
    line-height: 40px
}

.i-btn-primary {
    color: #fff !important;
    background: #2d8cf0 !important
}

.i-btn-ghost {
    color: #fff !important;
    background: #fff !important;
    color: #495060 !important
}

.i-btn-success {
    color: #fff !important;
    background: #19be6b !important
}

.i-btn-warning {
    color: #fff !important;
    background: #f90 !important
}

.i-btn-error {
    color: #fff !important;
    background: #ed3f14 !important
}

.i-btn-info {
    color: #fff !important;
    background: #2db7f5 !important
}

.i-btn-circle {
    border-radius: 44px
}

.i-btn-large.i-btn-circle {
    border-radius: 48px
}

.i-btn-small.i-btn-circle {
    border-radius: 40px
}

.i-btn-loading {
    opacity: .6
}

.i-btn-loading-inner {
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    background: 0 0;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #fff #fff #fff transparent;
    animation: btn-spin .6s linear;
    animation-iteration-count: infinite
}

.i-btn-disabled {
    color: #bbbec4 !important;
    background: #f7f7f7 !important
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
