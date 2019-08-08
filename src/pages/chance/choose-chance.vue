<!--
/**
* @author 冀猛超
* @name 选择客户页面
* @date 2019年8月06日
**/
-->
<template>
    <div>
      <chanceIndex isSelect  :busId="busId"/>
    </div>
</template>

<script>
import chanceIndex from './index'

export default {
	components: {
		chanceIndex
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
