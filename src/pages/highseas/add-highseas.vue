<!--
/**
* @author 冀猛超
* @name 新建公海池
* @date 2019年8月09日
**/
-->
<template>
    <div class="add-highseas-page">
        <NavBar title='新建公海池' />

        <div class="d-bg-white">
            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>公海池名称
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" v-model='name' maxlength='32' class='f12 d-text-gray' placeholder="公海池名称">
                </div>
            </div>

            <div class="footer-fixed-menu" @click='save'>
                <i-button type="primary" i-class="f16">完成</i-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			name: ''
		}
	},
	methods: {
		save () {
			if (!this.name.trim()) {
				return this.$utils.toast.text('请输入公海池名称')
			}

			this.$api.seeCrmService.clientpublicpoolSave({
				name: this.name
			}).then(res => {
				this.$store.dispatch('highseas/getList')
				this.$routing.navigateBack()
			})
		}

	}
}
</script>

<style lang="scss" scoped>
    .add-highseas-page{
        background: #f2f2f2;
        height: 100vh;
        padding-bottom: 75px;
        box-sizing: border-box;
    }

    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        padding-right: 15px;
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }

    .isarrow{
        position: relative;
        &:after{
            content: " ";
            display: inline-block;
            width: 6px;
            height: 6px;
            position: absolute;
            top: 50%;
            right: 15px;
            border-width: 2px 2px 0 0;
            border-color: #dddee1;
            border-style: solid;
            transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
        }
    }

    .sub-btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 26px;
    }

    .check-repeat{
        width: 48px;
        height: 27px;
        border-radius: 3px;
        text-align: center;
        line-height: 27px;
        font-size: 12px;
        background: #6a9ff5;
        color: #fff;
    }
</style>
