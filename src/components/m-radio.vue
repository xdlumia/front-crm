<!-- /**
 * @author 王晓冬
 * @description 选择框
 * @param {string} value v-model
 * @param {string} label value值
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
    <span @click.stop="changeRadio" class='radio-box d-inline' :class="{active:isChecked}"></span>
</template>

<script>
export default {
	props: {
		value: String, // v-model
		label: String,
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {

		}
	},
	onReady () {
	},
	created () {
	},
	computed: {
		isChecked () {
			return this.label === this.value
		}
	},
	methods: {
		changeRadio () {
			if (this.disabled) return
			this.$emit('input', this.label)
			this.$emit('change', this.label)
		}
	}

}
</script>

<style lang="scss" scoped>

.radio-box{
    width: 15px;
    height: 15px;
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    position: relative;
    &.active{
        border-color: #1890ff;
        &::before{
            content: '';
            width: 11px;
            height: 11px;
            background: #1890ff;
            border-radius: 100px;
            position: absolute;
            left: 2px;
            top: 2px;
        }
    }
}
</style>
