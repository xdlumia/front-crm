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
    <picker :disabled="disabled" :value="valueIndex" :range="range" @change='change($event, "upTypeIndex")'>
		<i-input disabled v-model="valueName" :iClass="iClass" :labelWidth="labelWidth" @handleLableClick='handleLableClick' :labelIcon='labelIcon' :label="label" :placeholder="placeholder" :required='required'>
			<i-icon type="enter" size="16" color="#999" />
		</i-input>
	</picker>
</template>

<script>
export default {
	props: {
		iClass: {
			type: String,
			default: ''
		},
		value: {
			required: true
		},
		options: {
			required: true,
			type: Array
		},
		disabled: Boolean,
		label: {
			type: String,
			default: '默认label'
		},
		labelWidth: {
			default: '100'
		},
		required: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: '请选择'
		},
		props: {
			default: { value: 'id', lable: 'label' }
		},
		labelIcon: {
			type: Object
		}
	},
	data () {
		return {
			valueName: '',
			index: ''
		}
	},
	computed: {
		range () {
			let label = this.props.label || 'lable'
			if (typeof this.options[0] === 'string') {
				return this.options.map(item => item)
			} else {
				return this.options.map(item => item[label])
			}
		},
		valueIndex: {
			get (val) {
				let label = this.props.label || 'lable'
				let value = this.props.value || 'value'
				let index = ''
				// 如果是数组
				if (typeof this.options[0] === 'string') {
					index = this.options.findIndex(item => item === this.value)
					let currData = this.options[index] || ''
					// eslint-disable-next-line vue/no-side-effects-in-computed-properties
					this.valueName = currData || ''
				} else {
					// 如果是数组对象
					index = this.options.findIndex(item => item[value] === this.value)
					let currData = this.options[index] || {}
					// eslint-disable-next-line vue/no-side-effects-in-computed-properties
					this.valueName = currData[label] || ''
				}
				return index === -1 ? 0 : index
			},
			set (val) {
				this.index = val
			}
		}
	},
	created () {
	},
	methods: {
		change ({ mp: { detail } }, filed) {
			let index = detail.value
			if (index === this.index) return
			this.valueIndex = index
			let currData = this.options[index]
			let label = this.props.label || 'lable'
			let value = this.props.value || 'value'
			if (typeof this.options[0] === 'string') {
				this.valueName = currData
				this.$emit('input', currData)
				// 如果name值没有获取到可能是删除了当前value对应的name值 那么也清空value值重新选择
				if (!this.valueName) {
					this.$emit('input', '')
				}
			} else {
				this.valueName = currData[label]
				this.$emit('input', currData[value])
				if (!this.valueName) {
					this.$emit('input', '')
				}
			}
		},
		handleLableClick () {
			this.$emit('handleLableClick')
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
