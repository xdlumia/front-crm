<!-- /**
 * @author 王晓冬
 * @description 选择框
 * @param {string} value v-model
 * @param {string} label value值
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
    <span @click="changeChecked" class='radio-box d-inline' :class="{active:isChecked}"></span>
</template>

<script>
export default {
	props: {
		value: Array, // v-model
		label: [String, Number],
		max: Number
	},
	data () {
		return {
			// isChecked: false
		}
	},
	onReady () {
	},
	created () {
		// this.isChecked = this.value.includes(this.label)
	},
	computed: {
		isChecked: {
			get () {
				return this.value.includes(this.label)
			},
			set (val) {
				// console.log(arr)
			}

		}
	},
	methods: {
		changeChecked () {
			if (!this.value.includes(this.label) && this.max && this.value.length >= this.max) {
				return
			}
			this.isChecked = !this.isChecked
			if (this.isChecked) {
				this.value.push(this.label)
			} else {
				this.value.splice(this.value.indexOf(this.label), 1)
			}
			this.$emit('input', this.value)
			this.$emit('change', this.value)
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
		background-color: #1890ff;
        &::before{
            content: '';
            width: 9px;
			height: 6px;
			border:1px solid #fff;
			border-left:none;
			border-bottom:none;
			position: absolute;
			transform: rotate(135deg);
            left: 3px;
			top: 2px;
        }
    }
}
</style>
