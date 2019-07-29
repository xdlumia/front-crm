<!-- /**
 * 表单验证
 * @author 赵伦
 * @date 2019-05-05
 * @param rules 验证规则，参见 https://github.com/yiminghe/async-validator
 * @param model 表单数据
 * @param mode 模式，可选参数， inline-text 行内文字，默认；border 边框模式；border-text 文字下方显示；
 * @example 如下例子
 *
 * ```html
 * <m-form ref="mform" :model="formData" :rules="rules">
 *      <m-form-tip prop="email">这里将会显示表单验证错误文字</m-form-tip>
 * </m-form>
 *
 * export default{
 *   data(){
 *     formData:{
 *        email:"",
 *     },
 *     rules:{
 *        email:[{required:true,message:"邮箱必填"}]
 *     }
 *   },
 *   methods:{
 *     async save(){
 *        await this.$refs.mform.validate();
 *        console.log("表单验证通过了");
 *     }
 *   }
 * }
 * ```
 */ -->
<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
/* eslint-disable */
import AsyncValidator from 'async-validator'
import Verify from '@/utils/verify'
Object.keys(Verify).map(key => AsyncValidator.register(key, Verify[key]))
/**
 * 表单验证
 * @author 赵伦
 * @date 2019-05-05
 * @param rules 验证规则，参见 https://github.com/yiminghe/async-validator
 * @param model 表单数据
 * @param mode 模式，可选参数， inline-text 行内文字，默认；border 边框模式；border-text 文字下方显示；
 * @example 如下例子
 *
 * ```html
 * <m-form ref="mform" :model="formData" :rules="rules">
 *      <m-form-tip prop="email">这里将会显示表单验证错误文字</m-form-tip>
 * </m-form>
 *
 * export default{
 *   data(){
 *     formData:{
 *        email:"",
 *     },
 *     rules:{
 *        email:[{required:true,message:"邮箱必填"}]
 *     }
 *   },
 *   methods:{
 *     async save(){
 *        await this.$refs.mform.validate();
 *        console.log("表单验证通过了");
 *     }
 *   }
 * }
 * ```
 */
export default {
	props: ['rules', 'model', 'mode'],
	data () {
		return {}
	},
	mounted () {
		this.getFieldChildren()
	},
	watch: {
		mode () {
			this.getFieldChildren()
		}
	},
	onShow(){
		this.getFieldChildren();
	},
	methods: {
		getTipChildren () {
			return this.$children.filter(
				item => item.formTipParent__ === 'm-form'
			)
		},
		/** 清除mpvue脏数据 */
		deleteMpvueHookValue (data) {
			if (data instanceof Array) {
				data.map(item => this.deleteMpvueHookValue(item))
			}
			if (typeof data === 'object') {
				if (typeof data.__newReference !== 'undefined') {
					delete data.__newReference
				}
				// for(let key in data){
				// 	if(typeof data[key]=="string"){
				// 		data[key] = String(data[key]).trim();
				// 	}
				// }
			}
			return data
		},
		/** 表单验证器 */
		validate (model, rules) {
			model = model || this.model
			model = this.deleteMpvueHookValue(model)
			rules = rules || this.rules
			let av = new AsyncValidator(rules)
			return new Promise((r, j) => {
				this.getFieldChildren()
				av.validate(model, (errors, fields) => {
					if (errors) {
						j(errors)
						return this.outputErrors(errors)
					} else r()
				})
			})
		},
		/** 输出错误信息 */
		outputErrors (errors) {
			// [
			//   { "message": "describes is required", "field": "describes" }
			// ]
			let fieldChildren = this.getFieldChildren();
			(errors || []).map(err => {
				if (fieldChildren[err.field]) {
					fieldChildren[err.field].setTip(err.message)
				}
			})
		},
		/** 获取子节点信息 */
		getFieldChildren () {
			let children = {}
			this.getTipChildren().map(item => {
				if (item.prop) {
					children[item.prop] = item
					item.setTip('')
					item.setMode(this.mode)
				}
			})
			return children
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
