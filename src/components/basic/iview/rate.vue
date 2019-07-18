<template>
<div class="i-class i-rate"
    @touchmove="handleTouchMove">
    <input type="text" :name="name" v-model="rate" class="i-rate-hide-input" />
    <div
        v-for="(item, index) in count"
        :key="item"
        :class="['i-rate-star', {'i-rate-current': index < rate}]"
        :data-index="index"
        @click="handleClick(index)">
        <i-icon type="collection_fill" :size="size"></i-icon>
    </div>
    <div class="i-rate-text" v-if="rate !== 0"><slot></slot></div>
</div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 5
        },
        value: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 20
        },
        name: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            touchesStart: {
                pageX: 0
            },
            rate: 0
        }
    },
    methods: {

        handleClick (index) {
            if (this.disabled) {
                return
            }

            // 兼容小程序传参暂时写法
            this.$emit('change', {
                target: {
                    index: index + 1
                }
            })
        },
        handleTouchMove (e) {
            if (this.disabled) {
                return
            }
            if (!e.changedTouches[0]) {
                return
            }
            const movePageX = e.changedTouches[0].pageX
            const space = movePageX - this.touchesStart.pageX

            if (space <= 0) {
                return
            }
            let setIndex = Math.ceil(space / this.size)
            setIndex = setIndex > this.count ? this.count : setIndex

            // 兼容小程序传参暂时写法
            this.$emit('change', {
                target: {
                    index: setIndex
                }
            })
        }
    },
    watch: {
        value(val) {
            this.rate = val
        }
    }
}
</script>

<style lang="scss" scoped>
.i-rate {
    margin: 0;
    padding: 0;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
    font-style: normal
}

.i-rate-hide-input {
    display: none
}

.i-rate-star {
    display: inline-block;
    color: #e9e9e9
}

.i-rate-current {
    color: #f5a623
}

.i-rate-text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 6px;
    font-size: 14px
}
</style>
