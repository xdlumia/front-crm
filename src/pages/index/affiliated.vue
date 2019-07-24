<template>
    <div>
        <NavBar title="关联业务" />
        <i-cell-group>
            <i-cell title="客户" is-link></i-cell>
            <i-cell title="联系人" is-link></i-cell>
            <i-cell title="销售机会" is-link></i-cell>
            <i-cell title="成交记录" is-link></i-cell>
            <i-cell title="客户公海池" is-link></i-cell>
        </i-cell-group>
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
	computed: {
	},
	created () {
	},
	onLoad (option) {
	},
	methods: {
	},

	onReady () {
		// console.log(this.$store.state)
	}
}
</script>

<style scoped lang="scss">
.d-bg-schedule{height:13px;align-items: center;background:#f5f6fa ;}
</style>
