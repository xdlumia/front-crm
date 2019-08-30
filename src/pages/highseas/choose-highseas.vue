<!--
/**
* @author 冀猛超
* @name 选择客户公海池
* @date 2019年8月09日
**/
-->
<template>
    <div class='setting-page'>
        <NavBar title='选择客户公海池' />

        <i-cell-group>
            <i-cell :title="item.name" :label='"领取客户上限：" + (item.getClientNumMax || 0)' v-for="item in list" :key="item.id" @click='choosePool(item)'>
                <div class="d-center" slot='footer'>
                    <m-radio :label='item.id' v-model="id" />
                </div>
            </i-cell>
        </i-cell-group>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16" @click='submit'>确定</i-button>
        </div>

    </div>
</template>
<script>
export default {
	data () {
		return {
			id: 0,
			pool: {}
		}
	},
	onLoad (option) {
		this.id = option.poolId
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
		submit () {
			if (this.id && !Object.keys(this.pool).length) {
				this.pool = this.list.filter(item => +item.id === +this.id)[0] || {}
			}
			Object.keys(this.pool).length && this.$store.commit('highseas/setPool', this.pool)
			this.$routing.navigateBack()
		}
	}
}
</script>

<style lang="scss" scoped>
.setting-page{
    height: 100vh;
    background: #f6f6f6;
}

.radio-box{
    width: 15px;
    height: 15px;
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    position: relative;
    &.active{
        border-color: #1890ff;
        &::before{
            content: '';
            width: 11px;
            height: 11px;
            background: #1890ff;
            border-radius: 100px;
            position: absolute;
            left: 2px;
            top: 2px;
        }
    }
}
</style>
