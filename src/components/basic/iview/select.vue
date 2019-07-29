<!-- /**
 * @author 王晓冬
 * @param label 标题
 * @param label-width lable 宽度 默认80
 * @param disabled 是否禁用输入框
 * @param value v-model
 * @example 如下例子，在visible为true的时候，内容将会从 #tab-bar 显示区域底部弹出
 * <m-input label="姓名" disabled="true" v-model="contractInfo.name"></m-input>
 */ -->
<template>
    <picker :value="valueIndex" :range="range" @change='change($event, "upTypeIndex")'>
		<i-input v-model="valueName" :labelWidth="labelWidth" :label="label" :placeholder="placeholder" required />
	</picker>
</template>

<script>
export default {
	props: {
		value:'',
		options:{
			required: true,
			type:Array,
		},
		label: {
			type: String,
			default:'默认label'
		},
		labelWidth: {
			default: '100'
		},
		required:Boolean,
		placeholder:{
			type:String,
			default:'请选择'
		},
		props:{
			default:{value:'id',lable:'label'}
		}

	},
	data () {
		return {
			valueName:'',
		}
	},
	computed:{
		range(){
			let label = this.props.label || 'lable'
			if(typeof this.options[0] == 'string'){
				return this.options.map(item=>item)
			}else{
				return this.options.map(item=>item[label])
			}
		},
		valueIndex:{
			get(val) {
				let label = this.props.label || 'lable'
				let value = this.props.value || 'value'
				let index = ''
				if(typeof this.options[0] === 'string'){
					index = this.options.findIndex(item=>item === this.value)
					let currData = this.options[index] || ''
					this.valueName = currData || ''
				}else{
					index = this.options.findIndex(item=>item[value] === this.value)
					let currData = this.options[index] || {}
					this.valueName = currData[label] || ''
				}
				return index
			},
			set(val) {
			}
		}
	},
	created () {
	},
	methods: {
		change ({ mp: { detail } }, filed) {
			let index = detail.value
			this.valueIndex = index
			let currData = this.options[index]
			let label = this.props.label || 'lable'
			let value = this.props.value || 'value'
			if(typeof this.options[0] === 'string'){
				this.valueName = currData
				this.$emit('input',currData)
			}else{
				this.valueName = currData[label]
				this.$emit('input',currData[value])
			}
		}
	}
}
</script>

<style lang="scss">
.detail-panel-item{
    padding:0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom:1px solid #e4e4e4;
    display: flex;
    font-size:14px;
    label{color:#a0a0a0;}
    .detail-panel-content{height: 50px;
      color:#333;
      line-height: 50px;
      width: 100%;
    }
}
</style>
