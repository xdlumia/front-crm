<template>
    <div>
        <scroll-view v-if="scroll" scroll-x :class="[iClass,  fixed ? 'i-tabs-fixed' : '']" class="i-tabs i-tabs-scroll" >
           <div 
                :class="[iTabClass, 'i-tabs-tab' , scroll ? 'i-tabs-tab-scroll' : '', current == index ? 'i-tabs-tab-current' : '']"
                v-for='(item, index) in tabList'
                :key='index'
                @click="handleClickItem(index)"
            >
                <div class='i-tabs-tab-item'>
                    <div :class="['i-tabs-tab-title', current == index ? 'i-tabs-tab-title-current' : '' ]" v-if=" current == index && currentColor" :style="{color: currentColor }">{{ item.title }}</div>
                    <div :class="['i-tabs-tab-title', current == index ? 'i-tabs-tab-title-current' : '' ]" v-else>{{ item.title }}</div>
                    <div class="i-tabs-tab-bar" v-if="current == index" :style="{background: currentColor }"></div>
                </div>
            </div>
        </scroll-view>

        <div v-else :class="[iClass, 'i-tabs' , fixed ? 'i-tabs-fixed' : '',]">
            <div 
                :class="[iTabClass, 'i-tabs-tab' , scroll ? 'i-tabs-tab-scroll' : '', current == index ? 'i-tabs-tab-current' : '']"
                v-for='(item, index) in tabList'
                :key='index'
                @click="handleClickItem(index)"
            >
                <div class='i-tabs-tab-item'>
                    <div :class="['i-tabs-tab-title', current == index ? 'i-tabs-tab-title-current' : '' ]" v-if=" current == index && currentColor" :style="{color: currentColor }">{{ item.title }}</div>
                    <div :class="['i-tabs-tab-title', current == index ? 'i-tabs-tab-title-current' : '' ]" v-else>{{ item.title }}</div>
                    <div class="i-tabs-tab-bar" v-if="current == index" :style="{background: currentColor }"></div>
                </div>
            </div>
        </div>

        <div>
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tabs',
        components: {},
        props: {
            tabList: {
                type: Array
            },
            iTabClass: {
                type: String,
                default: ''
            },
            iClass: {
                type: String,
                default: ''
            },
            current: {
                type: String,
                default: '',
            },
            color: {
                type: String,
                default: ''
            },
            scroll: {
                type: Boolean,
                default: false
            },
            fixed: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                currentColor: '',
            }
        },
        methods: {
            changeCurrent (val = this.current) {
                let items = this.$children
                const len = items.length;
                if (len > 0) {
                    items.forEach(item => {
                        item.changeShow(item.index == val);
                    });
                }
            },
            handleClickItem (index) {
                this.$emit('change', { index });
            }
        },
        watch: {
            current: {
                immediate: true,
                handler(){
                    this.$nextTick(() => {
                        this.changeCurrent();
                    })
                }
            }
        }
    }
</script>
<style type="less" scoped>
    .i-tabs{display:flex;width:100%;height:42px;line-height:42px;box-sizing:border-box;position:relative;justify-content:space-around;align-items:center;-webkit-box-align:center;background:#fff}.i-tabs::after{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-bottom-width:1px}.i-tabs-scroll{display:block;overflow-x:auto;white-space:nowrap}.i-tabs-fixed{position:fixed;top:0;z-index:2}
    .i-tabs-tab{flex:1;height:100%;display:flex;width:100%;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;text-align:center;position:relative}.i-tabs-tab-bar{display:block;width:100%;height:2px;background:0 0;position:absolute;bottom:0;left:0;background:#2d8cf0}.i-tabs-tab-title{font-size:14px;text-align:center;box-sizing:border-box;color:#80848f;line-height: 42px;}.i-tabs-tab-title-current{color:#2d8cf0}.i-tabs-tab-scroll{display:inline-block;width:60px}
    .i-tabs-tab-item{
        display: inline-block;
        height: 100%;
        position: relative;
    }
</style>


