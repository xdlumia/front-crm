<template>
    <div class="phone-page">
        <NavBar title="登录" />
        <div class="">
           <div class='phone-title f20 d-text-black b'>手机快捷登录</div>
           <div class="">

               <div class="form-row d-center">
                   <div class="f14 d-text-black form-row-item form-row-label">
                       <label class="d-text-red">*</label>手机号
                   </div>
                   <div class="d-cell mr10 form-row-item">
                       <input type="number" maxlength='11' class='f12 d-text-gray' placeholder="请填写手机号">
                   </div>
                   <div class="pr10 form-row-item hfull d-center pl10 bl">
                       <div class='phone-code-btn d-text-blue f14 ac'>获取验证码</div>
                   </div>
               </div>
               <div class="form-row d-center">
                   <div class="f14 d-text-black form-row-item form-row-label">
                       <label class="d-text-red">*</label>验证码
                   </div>
                   <div class="d-cell mr10 form-row-item">
                       <input type="number" class='f12 d-text-gray' placeholder="请填写短信验证码">
                   </div>
               </div>

                <div class="login-btn">
                    <i-button type="primary" size="default" i-class="f16">登录</i-button>
                </div>

           </div>
        </div>
    </div>
</template>

<script>

export default {
	data () {
		return {
			form: {
				phone: '',
				code: ''
			}
		}
	},
	onLoad (option) {
	},
	methods: {

	},
	onReady () {
		console.log(this.$store.state)
	}
}
</script>

<style scoped lang="scss">
    .phone-title{
        line-height: 1;
        margin: 50px 30px 30px
    }

    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        // .form-row-item{
        //     height: 100%;
        // }
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }

    .phone-code-btn{
        width: 104px;
        height: 25px;
        border-radius: 5px;
        border: 1px dashed #4889F4;
        line-height: 25px;
    }

    .login-btn {
        padding: 80px 40px 0
    }

</style>
