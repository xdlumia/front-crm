<!-- /**
 * @author 王晓冬
 * @param value v-model
 * @param label 选择器标题
 * @param label-width lable 宽度 默认100
 * @param disabled 是否禁用选择器
 * @param value v-model
 * @param props {value: 值, lable:显示的名称}
 * @param required 是否必填
 * <m-input <i-select
             v-model="form.phone"
				:props="{label:'name',value:'id'}"
				label="所属部门"
				placeholder="请选择所属部门"
				required
				:options="upData">
			</i-select>
 */ -->
<template>
    <picker :disabled="disabled" mode="date" :value="currValue" @change="bindDateChange">
		<i-input isSelect disabled v-model="valueName" :labelWidth="labelWidth" :label="label" :placeholder="placeholder" required />
	</picker>
</template>

<script>
import filters from '@/utils/filters'
export default {
	props: {
		value: {
			required: true
		},
		disabled: Boolean,
		label: {
			type: String,
			default: '默认label'
		},
		labelWidth: {
			default: '100'
		},
		required: Boolean,
		placeholder: {
			type: String,
			default: '请选择'
		}
	},
	data () {
		return {
			valueName: ''
		}
	},
	computed: {
		currValue () {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			this.valueName = filters.timeToStr(this.value, 'y-m-d')
			return filters.timeToStr(this.value, 'y-m-d')
		}
	},
	created () {
	},
	methods: {
		bindDateChange (e) {
			this.valueName = e.target.value
			this.$emit('input', new Date(this.valueName).getTime())
		}
	}
}
</script>

<style lang="scss">
.input-icon{
	&:after{
            content: " ";
            display: inline-block;
            width: 6px;
            height: 6px;
            position: absolute;
            top: 50%;
            right: 15px;
            border-width: 2px 2px 0 0;
            border-color: #dddee1;
            border-style: solid;
            transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
        }
}
</style>
