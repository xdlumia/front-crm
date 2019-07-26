<template>
    <div @click="setpClick()" class="i-class i-step-item" :class="[stepClass, direction === 'vertical' ? 'i-step-vertical' : 'i-step-horizontal']"  :style="itemStyle">
        <div class="i-step-item-ico">
            <div class="i-step-ico" v-if="stepNoIcon"><slot name="step">{{index+1 }}</slot></div>
            <div class="i-step-ico" v-else>
                <slot name="step"><i-icon i-class="i-step-ico-in" :type="stepIcoClass"></i-icon></slot>
            </div>
            <div class="i-step-line" v-if="index !== len - 1"></div>
        </div>
        <div class="i-step-item-main">
            <div class="i-step-item-title" v-if="title">
                {{title}}
            </div>
            <div class="i-step-item-title" v-else>
                <slot name="title"></slot>
            </div>
            <div class="i-step-item-content" v-if="content">
                {{content}}
            </div>
            <div class="i-step-item-content" v-else>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
const allStatus = ['wait','process','finish','error'];
export default {
    props: {
        iClass: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        content : {
            type : String,
            default : '',
        },
        status : {
            type : String,
            //wait、process、finish、error
            default : ''
        },
        icon : {
            type : String,
            //value has horizontal or vertical 
            default : ''
        }
    },
    data(){
        return {
            len : '',
            index : '',
            current : '',
            direction : ''
        }
    },
    computed: {
        stepClass(){
            return this.getClass()
        },
        itemStyle(){
            return this.getItemStyle()
        },
        stepNoIcon(){
            return this.noIco()
        },
        stepIcoClass(){
            return this.getIcoClass()
        }
    },
    methods: {
        setpClick(){
            this.$emit('step')
        },
        updateDataChange(stepData){
            this.len = stepData.len
            this.index = stepData.index
            this.current = stepData.current
            this.direction = stepData.direction
        },
        noIco( status = this.status , current = this.current , index = this.index, icon = this.icon ){
            var aindex = allStatus.indexOf(status);
            var noIcon = true;
            if( index < current || icon !== '' ){
                noIcon = false;
            }
            return noIcon;
        },
        getIcoClass( status = this.status, ico = this.icon ){
            var className = '';
            if( status === 'error' ){
                className = 'close';
            }else{
                className = 'right';
            }
            if( ico !== '' ){
                className = ico;
            }
            return className;
        },
        getItemStyle(len = this.len , direction = this.direction){
            if( direction === 'horizontal' ){
                return 'width :'+100/len + '%';
            }else{
                return 'width : 100%;';
            }
        },
        getClass( status = this.status, current = this.current, index = this.index ) {
            //wait、process、finish、error
            var startClass = 'i-step-'
            var classes = '';
            var cindex = allStatus.indexOf( status );
            if( cindex !== -1 ){
                classes = startClass + allStatus[cindex];
            }
            if( index < current ){
                classes = startClass + 'finish';
            }else if( index === current ){
                classes = startClass + 'process';
            }
            return classes;
        }
    },
}
</script>

<style lang="scss" scoped>
    .i-step-ico {
	width: 24px;
	height: 100%;
	border-radius: 100%;
	background: #fff;
	position: relative;
	z-index: 2;
	margin: 0 auto;
	border: #dddee1 solid 1px
}

.i-step-ico-in {
	vertical-align: baseline
}

.i-step-line {
	position: absolute;
	left: 50%;
	top: 12px;
	width: 100%;
	height: 1px;
	background: #dddee1
}

.i-step-horizontal .i-step-ico::after {
	position: absolute;
	top: 11px;
	left: 23px;
	z-index: 1;
	content: '';
	height: 1px;
	background: #fff;
	width: 10px
}

.i-step-horizontal .i-step-item-main {
	text-align: center
}

.i-step-horizontal .i-step-ico::before {
	position: absolute;
	top: 11px;
	left: -11px;
	z-index: 1;
	content: '';
	height: 1px;
	background: #fff;
	width: 10px
}

.i-step-ico {
	box-sizing: border-box;
	font-size: 12px
}

.i-step-process .i-step-ico {
	border: #2d8cf0 solid 1px;
	color: #fff;
	background: #2d8cf0
}

.i-step-wait .i-step-ico {
	border: #e9eaec solid 1px;
	color: #e9eaec
}

.i-step-wait .i-step-line {
	background: #2d8cf0
}

.i-step-finish .i-step-ico {
	border: #2d8cf0 solid 1px;
	color: #2d8cf0
}

.i-step-finish .i-step-line {
	background: #2d8cf0
}

.i-step-error .i-step-ico {
	border: #ed3f14 solid 1px;
	color: #ed3f14
}

.i-step-error .i-step-line {
	background: #ed3f14
}

.i-step-item {
	font-size: 12px;
	position: relative;
	display: inline-block;
	box-sizing: border-box;
	vertical-align: top
}

.i-step-item-ico {
	width: 100%;
	height: 24px;
	line-height: 24px;
	text-align: center
}

.i-step-item-main {
	margin-top: 10px;
	clear: both
}

.i-step-item-title {
	font-size: 12px;
	font-weight: 700;
	color: #1c2438
}

.i-step-item-content {
    font-size: 12px;
	// font-weight: 700;
	margin-top: 2px;
	color: #80848f
}

.i-step-vertical {
	padding-bottom: 30px
}

.i-step-vertical .i-step-item-ico {
	width: 24px;
	float: left
}

.i-step-vertical .i-step-item-main {
	margin-left: 40px;
	margin-top: 0;
	clear: inherit
}

.i-step-vertical .i-step-line {
	position: absolute;
	height: 100%;
	top: 0;
	left: 10px;
	margin: 0 0 0 12px;
	width: 1px
}

</style>
