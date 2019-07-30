<!-- /**
 * @author 徐贺
 * @param label 关联业务
 */ -->
<template>
    <div>
        <NavBar title="关联业务" />
        <i-cell-group>
            <a url='/pages/client/index' open-type='switchTab'>
                <i-cell title="客户" is-link></i-cell>
            </a>
            <a url='/pages/contact/index'>
                <i-cell title="联系人" is-link></i-cell>
            </a>
            <a url='/pages/chance/index' open-type='switchTab'>
                <i-cell title="销售机会" is-link></i-cell>
            </a>
            <a url='/pages/transaction/index'>
                <i-cell title="成交记录" is-link></i-cell>
            </a>
            <a url='/pages/highseas/index'>
                <i-cell title="客户公海池" is-link></i-cell>
            </a>
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
