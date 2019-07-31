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
		label: [String, Number]
	},
	data () {
		return {
			isChecked: false
		}
	},
	onReady () {
	},
	created () {
		this.isChecked = this.value.includes(this.label)
	},
	computed: {
		// isChecked: {
		// 	get () {
		// 		console.log(this.value.includes(this.label))
		// 		return this.value.includes(this.label)
		// 	},
		// 	set (val) {
		// 		console.log(arr)
		// 	}

		// }
	},
	methods: {
		changeChecked () {
			this.isChecked = !this.isChecked
			if (this.isChecked) {
				this.value.push(this.label)
			} else {
				this.value.splice(this.value.indexOf(this.label), 1)
			}
			this.$emit('index', this.value)
			this.$emit('change', this.checked)
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
