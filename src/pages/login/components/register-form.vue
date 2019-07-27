<template>
    <div>
        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>姓名
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" class='f12 d-text-gray' placeholder="请填写正确姓名">
            </div>
        </div>

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

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                <label class="d-text-red">*</label>企业名称
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" class='f12 d-text-gray' placeholder="请填写正确的企业名称">
            </div>
        </div>

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label">
                企业规模
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" class='f12 d-text-gray' placeholder="请填写正确的企业规模">
            </div>
        </div>

        <div class="f12 d-text-gray p5 mt20">
            <i-icon size="18" color="#999" type='prompt_fill' />请完善信息，我们会尽快核实信息，为您开通3天免费试用账号
        </div>

        <div class="phone-fixed d-text-white d-fixed d-center" @click="callPhone(servicePhone)">
            <span class="iconfont icondadianhua f22"></span>
        </div>

        <div class="login-btn">
            <i-button type="primary" size="default" i-class="f16">立即获取</i-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
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
