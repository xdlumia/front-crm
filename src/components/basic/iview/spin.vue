<template>
    <div>
        <div
            :class="[iClass, 'i-spin', `i-spin-${size}`, {'i-spin-fix' : fix, 'i-spin-show-text': custom, 'i-spin-fullscreen': fullscreen}]">
            <div class="i-spin-main">
                <div class="i-spin-dot"></div>
                <div class="i-spin-text">
                    <slot></slot>
                </div>
            </div>
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
            // small || default || large
            size: {
                type: String,
                default: 'default'
            },
            fix: {
                type: Boolean,
                default: false
            },
            fullscreen: {
                type: Boolean,
                default: false
            },
            custom: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .i-spin {
        color: #2d8cf0;
        vertical-align: middle;
        text-align: center
    }

    .i-spin-dot {
        position: relative;
        display: block;
        border-radius: 50%;
        background-color: #2d8cf0;
        width: 20px;
        height: 20px;
        animation: ani-spin-bounce 1s 0s ease-in-out infinite
    }

    .i-spin-large .i-spin-dot {
        width: 32px;
        height: 32px
    }

    .i-spin-small .i-spin-dot {
        width: 12px;
        height: 12px
    }

    .i-spin-fix {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .9)
    }

    .i-spin-fullscreen {
        z-index: 2010
    }

    .i-spin-fullscreen-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0
    }

    .i-spin-fix .i-spin-main {
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }

    .i-spin-fix .i-spin-dot {
        display: inline-block
    }

    .i-spin-show-text .i-spin-dot, .i-spin-text {
        display: none
    }

    .i-spin-show-text .i-spin-text {
        display: block;
        font-size: 14px
    }

    @keyframes ani-spin-bounce {
        0% {
            transform: scale(0)
        }
        100% {
            transform: scale(1);
            opacity: 0
        }
    }

</style>
