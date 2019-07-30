<template>
    <div>
        <NavBar title='添加业务属性' />

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                标题:
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" v-model='form.title' class='f12 d-text-black' placeholder="请填写标题" maxlength='20'>
            </div>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                主图:
            </div>
            <div class="d-cell mr10 form-row-item">
                <img class='attr-img' src='http://file.515md.com:8888/%E4%BA%A7%E5%93%81/%E6%96%B0%E4%BA%A7%E5%93%81%E6%96%B9%E5%90%91/%E5%AE%A2%E6%88%B7%E7%AE%A1%E7%90%86v1.0.7/images/2_5_3_0添加业务属性效果/u15380.png' />
            </div>
            <div class='b'>
                <uni-icon type='plus' size='16' color='#1890FF' />
            </div>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                视频:
            </div>
            <div class="d-cell mr10 form-row-item">
                <video class='attr-img' id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" enable-danmu danmu-btn controls></video>
            </div>
            <div class='b'>
                <uni-icon type='plus' size='16' color='#1890FF' />
            </div>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black hfull form-row-item form-row-label mr10">
                <div style='line-height: 1'>文字:</div>
            </div>
            <div class="d-cell mr10 form-row-item">
                <textarea v-model='form.content' class='wfull f12 d-text-gray' placeholder="请填写文字"></textarea>
            </div>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                文件:
            </div>
            <div class="d-cell mr10 form-row-item">
                <div class="d-center mb10">
                    <div class='iconfont iconadjunct f12 d-text-gray mr5'></div>
                    <span class="d-cell f12 d-text-gray">xxxxxxxx.jpg</span>
                    <uni-icon type='minus' size='16' color='red' />
                </div>
                <div class="d-center mb10">
                    <div class='iconfont iconadjunct f12 d-text-gray mr5'></div>
                    <span class="d-cell f12 d-text-gray">xxxxxxxx.jpg</span>
                    <uni-icon type='minus' size='16' color='red' />
                </div>
                <div class="d-center mb10">
                    <div class='iconfont f12 d-text-gray mr5'></div>
                    <span class="d-cell f12 d-text-gray"></span>
                    <uni-icon type='plus' size='16' color='#1890FF' />
                </div>
            </div>
        </div>

        <div class="footer-fixed-menu">
            <i-button type="primary" size="default" i-class="f15">保存</i-button>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				img: '',
				video: '',
				title: '',
				content: '',
				file: []
			}
		}
	}
}
</script>

<style lang="scss" scoped>
    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        padding: 15px;
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

    .attr-img{
        width: 135px;
        height: 75px;
    }

</style>
