<!-- /**
 * @author 徐贺
 * @param label 关联业务
 */ -->
<template>
    <div>
        <NavBar title="关联业务" />
        <i-cell-group>
            <a url='/pages/client/choose-client'>
                <i-cell title="客户" is-link></i-cell>
            </a>
            <a url='/pages/contact/index'>
                <i-cell title="联系人" is-link></i-cell>
            </a>
            <a :url='`/pages/choose-chance?&id=${transactionData.id}`' open-type='switchTab'>
                <i-cell title="销售机会" is-link></i-cell>
            </a>
            <a :url='`/pages/transaction/index?chooseType=1&id=${transactionData.id}`'>
                <i-cell title="成交记录" is-link>{{transactionData.name}}</i-cell>
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
			clientData: {},
			transactionData: {}
		}
	},
	computed: {
	},
	created () {
	},
	onLoad (option) {
		// 客户回调
		uni.$once('chooseClient', data => {
			this.clientData = data
		})
		// 成交记录回调
		uni.$once('chooseTransaction', data => {
			this.transactionData = data
		})
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
