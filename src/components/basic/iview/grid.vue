<template>
<div class="i-grid" :class="iClass">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'grid',
    components: {},
    props: {
        iClass: {
            type: String,
            default: ''
        }
    },
    data () {
        return {}
    },
    mounted () {
        this.setGridItemWidth()
    },
    computed: {},
    methods: {
        setGridItemWidth () {
            let nodes = this.$slots.default

            if (!nodes) {
                return
            }

            nodes = nodes.filter((item) => {
                return item.componentInstance
            })

            const width = 100 / nodes.length
            nodes.forEach(item => {
                item.componentInstance.setWidth(
                    width + '%'
                )
            })
        }
    }
}
</script>

<style scoped>
.i-grid {
    border-top: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
    overflow: hidden
}
</style>
