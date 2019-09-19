/*
 * @Author: web.组织架构
 * @Date: 2019-09-10 15:28:34
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-19 11:22:06
 * @Description: file content
 */
<template>
    <organization
		:type="query.type"
		:isMultiple="query.isMultiple"
		:deptKey="query.deptKey"
		:employeesKey="query.employeesKey"
		:deptIds="query.deptIds"
		:employeesIds="query.employeesIds"
		:isRequire="query.isRequire"
		@submit="submit"
	/>
</template>
<script>
import organization from './organization'
export default {
	components: {
		organization
	},
	data () {
		return {
			query: {
				type: 0,
				isMultiple: 1,
				deptKey: 'id',
				employeesKey: 'id',
				deptIds: '',
				employeesIds: '',
				callback: 'colleagueChoose',
				isRequire: 0
			}

		}
	},
	onLoad (options) {
		if (options && Object.keys(options).length) {
			for (let item in options) {
				this.$set(this.query, item, options[item])
				// this[item] = options[item]
			}
		}
	},
	methods: {
		submit (data) {
			this.$routing.navigateBack()
			uni.$emit(this.query.callback, { ...data, query: this.$data.query })
		}
	}
}
</script>

<style lang="scss" >

</style>
