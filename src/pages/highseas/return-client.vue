<template>
    <div class='setting-page'>
        <NavBar title='公海池选择' />

        <i-cell-group>
            <i-cell title="华北一区">
                <div class="d-center" slot='footer'>
                    <span class='radio-box d-inline'></span>
                </div>
            </i-cell>
            <i-cell title="华北一区">
                <div class="d-center" slot='footer'>
                    <span class='radio-box d-inline active'></span>
                </div>
            </i-cell>
        </i-cell-group>

        <div class="footer-fixed-menu d-center d-bg-white">
            <div class="d-cell ac">
                <span class="iconfont iconfanhui1 f16 d-text-gray"></span><span class="ml5 f13  d-text-gray">直接退回</span>
            </div>
            <div  class="d-cell ac">
                <span class="iconfont iconleijixunhuan f16 d-text-gray"></span><span class="ml5 f13  d-text-gray">保留退回</span>
            </div>
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
