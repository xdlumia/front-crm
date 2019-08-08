<template>
    <div class='setting-page'>
        <NavBar title='公海池选择' />

        <i-cell-group>
             <i-cell :title="item.name" v-for="item in list" :key="item.id" @click='choosePool(item)'>
                <div class="d-center" slot='footer'>
                    <m-radio :label='item.id' v-model="id" />
                </div>
            </i-cell>
        </i-cell-group>

        <div class="footer-fixed-menu d-center d-bg-white">
            <div class="d-cell ac" @click='returnPool(-1)'>
                <span class="iconfont iconfanhui1 f16 d-text-gray"></span><span class="ml5 f13  d-text-gray">直接退回</span>
            </div>
            <div  class="d-cell ac" @click='returnPool(1)'>
                <span class="iconfont iconleijixunhuan f16 d-text-gray"></span><span class="ml5 f13  d-text-gray">保留退回</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			clientId: 0,
			leaderId: 0,
			id: 0,
			pool: {}
		}
	},
	onLoad (option) {
		this.clientId = option.clientId
		this.leaderId = option.leaderId
	},
	computed: {
		list () {
			return this.$store.state.highseas.list
		}
	},
	methods: {
		choosePool (item) {
			this.pool = item
			this.id = item.id
		},
		// 退回公海
		returnPool (sendBackType) {
			this.$api.seeCrmService.clientinfoSendBackPool({
				clientId: this.clientId,
				poolId: this.id,
				sendBackType: sendBackType,
				leaderId: this.leaderId
			}).then(res => {
				if (res.code === 200) {
					console.log(res)
					// this.$routing.navigateBack()
				}
			})
		}

		// submit () {
		// 	Object.keys(this.pool).length && this.$store.commit('highseas/setPool', this.pool)
		// 	this.$routing.navigateBack()
		// }
	}
}
</script>

<style lang="scss" scoped>
.setting-page{
    height: 100vh;
    background: #f6f6f6;
}
</style>
