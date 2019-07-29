<template>
    <div class="form-tip" :class="[{block:(mode=='border'||mode=='border-text')},mClass,((mode==='text'&&tip)||mode!=='text')?'':'hidden']">
        <div v-if="mode=='border'||mode=='border-text'">
            <slot></slot>
        </div>
        <span class="error" v-if="mode=='text'||mode=='border-text'">{{tip}}</span>
    </div>
</template>
<script>
export default {
	data () {
		return {
			formTipParent__: 'm-form',
			tip: '',
			// 模式 inline-text 行内文字，默认；border 边框模式；border-text 文字下方显示；
			mode: 'text'
		}
	},
	props: ['prop', 'mClass'],
	methods: {
		setTip (tip) {
			this.tip = tip || ''
		},
		setMode (mode) {
			this.mode = mode || 'text'
		}
	}
}
</script>
<style lang="scss" scoped>
.form-tip {
    display: inline;
    .error {
        color: #ed3f14;
    }
	&.hidden{
		display: none;
	}
}
</style>
