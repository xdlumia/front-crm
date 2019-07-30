<!-- /**
 * @author 王晓冬
 * @description 选择框
 * @param {string} value v-model
 * @param {string} label value值
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
    <span @click="changeRadio" class='radio-box d-inline' :class="{active:isChecked}"></span>
</template>

<script>
export default {
	props: {
		value: String, // v-model
		label: String
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
			this.$emit('input', this.label)
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
