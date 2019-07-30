<template>
    <div class='setting-page'>
        <NavBar title='选择客户公海池' />

        <i-cell-group>
            <i-cell title="华北一区" label='领取客户上限：16'>
                <div class="d-center" slot='footer'>
                    <span class='radio-box d-inline'></span>
                </div>
            </i-cell>
            <i-cell title="华北一区" label='领取客户上限：16'>
                <div class="d-center" slot='footer'>
                    <span class='radio-box d-inline active'></span>
                </div>
            </i-cell>
        </i-cell-group>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16">确定</i-button>
        </div>

    </div>
</template>
<script>
export default {
	data () {
		return {

		}
	},
	methods: {

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
