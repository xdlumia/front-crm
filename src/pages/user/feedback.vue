<template>
    <div class="feedback-page hfull">
        <NavBar title="意见反馈" />
        <div class="d-bg-white pl20 pr20 pt15 mb10">
            <div class="f13 d-text-black pb10">请输入您对产品功能建议或发现的系统问题，我们将不断优化您的使用体验，么么哒！</div>
            <div class="textarea-box pb20">
                <div class="detail-placeholder f13 d-text-gray" v-show='!isHidePlaceholder'>产品使用问题，请您按照如下方式填写：<br /> 1.在哪个界面，操作了什么功能，遇到了什么问题？<br />2.问题发生的频率（偶尔、频繁等描述）<br />3.请上传问题截图，便于我们理解您的问题。（最多只能上传9张图片）</div>
                <textarea class="textarea-item wfull f13 d-text-gray" @focus='getTextareaInput' v-model='feedbackForm.contents' :maxlength='500' :show-confirm-bar="false" />
                <div class="f13 d-text-gray ar">{{feedbackForm.contents.length}}/500</div>
            </div>
        </div>

        <div class="d-bg-white pl20 pr20 pt10">
            <div class="d-text-black f13 pb15">添加图片[最多只能上传9张图片]</div>
            <m-upload v-model="feedbackForm.picUrls" limit='9'></m-upload>
        </div>

        <div class='footer-fixed-menu'>
            <i-button type="primary" @click="submitFeedBack" i-class="f16">提交反馈</i-button>
        </div>
    </div>
</template>

<script>
import mUpload from '@/components/m-upload'
export default {
	components: {
		mUpload
	},
	data () {
		return {
			isHidePlaceholder: false,
			feedCon: '',
			feedbackForm: {
				account: '',
				companyCode: '',
				companyName: '',
				contents: '',
				isRead: 0,
				picUrls: [],
				sysCode: ''
			}
		}
	},
	methods: {
		// 提交反馈
		submitFeedBack () {
			let userInfo = this.$local.fetch('userInfo')
			let companyInfo = this.$local.fetch('companyInfo')
			let sysCode = this.$local.getItem('sysCode')
			this.feedbackForm.account = userInfo.account
			this.feedbackForm.sysCode = sysCode
			this.feedbackForm.companyName = companyInfo.companyName
			this.feedbackForm.companyCode = companyInfo.companyCode
			this.handPicUrls()
			this.$api.systemService.saveCustomerFeedback(this.feedbackForm).then((response) => {
				if (response.code === 200) {
					this.$utils.toast.text('反馈成功')
					setTimeout(() => {
						this.$routing.navigateBack()
					}, 800)
				} else {
					this.$utils.toast.text('反馈失败')
				}
			})
		},
		// 处理图片列表
		handPicUrls () {
			let data = this.feedbackForm.picUrls || []
			this.feedbackForm.picUrls = []
			data.forEach((item) => {
				this.feedbackForm.picUrls.push(item.filePath)
			})
		},
		loginOut () {
			this.$routing.redirectTo('/pages/login/index')
		},
		getTextareaInput (e) {
			this.isHidePlaceholder = true//= e.detail.cursor > 0
		}
	}
}
</script>

<style scoped lang="scss">
    .feedback-page{
        background: #f2f2f2;
    }

    .textarea-box{
        position: relative;
        .detail-placeholder {
            position: absolute;
            min-height: 100%;
        }
        .textarea-item {
            height: 120px;
        }
    }

</style>
