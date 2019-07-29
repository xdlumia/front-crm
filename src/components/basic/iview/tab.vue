<template>
    <div>
        <div v-show='isShow'>
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        components: {},
        props: {
            index: [Number, String]
        },
        data(){
            return {
                isShow: false,
            }
        },
        methods: {
            changeShow(bool){
                this.isShow = bool
            }
        }
    }
</script>
<style type="less" scoped>

</style>


