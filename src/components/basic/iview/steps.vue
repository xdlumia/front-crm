<template>
    <div class="i-steps" :class='iClass'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            iClass: {
                type: String,
                default: ''
            },
            current : {
                type : Number,
                default : -1,
            },
            status : {
                type : String,
                //wait、process、finish、error
                default : ''
            },
            direction : {
                type : String,
                //value has horizontal or vertical 
                default : 'horizontal'
            },
        },
        methods: {
            _updateDataChange() {
                this.$nextTick(() => {
                    let steps = this.$children;
                    const len = steps.length;
                    if (len > 0) {
                        steps.forEach((step, index) => {
                            step.updateDataChange({
                                len : len,
                                index : index,
                                current : this.current,
                                direction : this.direction
                            });
                        });
                    }
                })
            }
        },
        watch: {
            current: {
                immediate: true,
                handler(){
                    this._updateDataChange()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .i-steps{width:100%;}
</style>
