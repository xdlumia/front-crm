<template>
    <div>
        <NavBar title="机会" :isSearch="true" placeholder="输入销售机会客户名称"/>
        <div>
            <circleProgress type="circle" :percentage="0"/>
        </div>
    </div>
</template>

<script>

export default {
	components: {
	},
	data () {
		return {
		}
	},
	onLoad (option) {
	},
	methods: {
	},
	created () {}
}
</script>

<style scoped lang="scss">

</style>
