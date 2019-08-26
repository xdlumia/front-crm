<!--
/**
* @author 冀猛超
* @name 选择客户页面
* @date 2019年8月06日
**/
-->
<template>
    <div>
      <clientIndex isSelect :busId="busId" />
    </div>
</template>

<script>
import clientIndex from './index'

export default {
	components: {
		clientIndex
	},
	data () {
		return {
			busId: ''
		}
	},
	onLoad (option) {
		this.busId = option.id
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">

</style>
