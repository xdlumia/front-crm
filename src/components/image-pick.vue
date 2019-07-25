
<template>
    <div class="d-flex d-flex-wrap">
        <div class="d-relative" v-for="img in imgs" :key='img'>
            <img class='upload-img d-block' mode='aspectFill' :src="img" alt="">
            <div class='del-icon' @click='removeImg'>
                <i-icon type="delete_fill" size='20' color='#999' />
            </div>
        </div>
        <div class="upload-box d-center" @click="chooseImage" v-if='maxLen > imgs.length'>
            <div>
                <i-icon size="24" type='add' color='#bdbdbd' />
                <div class='wfull ac f12 d-text-gray'>{{placeholder}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import * as OSS from '@/utils/upload/OSSConfig' // oss
export default {
	props: {
		placeholder: {
			type: String,
			default: '图片'
		},
		maxLen: {
			type: Number,
			default: 9
		}
	},
	data () {
		return {
			imgs: []
		}
	},
	methods: {

		isUpload () {
			if (this.imgs.length >= this.maxLen) {
				this.$utils.toast.text(`最多上传${this.maxLen}张`)
				return false
			}
			return true
		},
		// 选择图片
		chooseImage () {
			if (!this.isUpload()) return

			let utils = this.$utils
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera']
			}).then(async ([err, imgData]) => {
				if (err) {
					utils.toast.text('上传失败')
					return
				}
				utils.showLoading('上传中...')
				try {
					let imgUrl = await this.uploadImg(imgData.tempFilePaths[0])
					this.imgs.push(imgUrl)
				} catch (err) {
					utils.toast.text('上传失败')
				}
				utils.hideLoading()
			})
		},

		// 上传图片
		async uploadImg (filePath) {
			return new Promise(async (resolve, reject) => {
				try {
					await this.$store.dispatch('checkOssTicket', this)
				} catch (error) {
					return j(error)
				}

				try {
					const myDate = new Date()
					const datePath =
                        myDate.getFullYear() +
                        OSS.addZero(myDate.getMonth() + 1) +
                        '/' // 文件储存路径
					let suffix = filePath.substring(filePath.lastIndexOf('.'))
					let fileName =
                        new Date().getTime() + OSS.randomString(10) + suffix
					let fileStoragePath =
                        (this.$store.state.userInfo.companyCode || '1001') +
                        '/pic/' +
                        datePath +
                        fileName // 文件存储路径
					let server = global.g.ApiUrl.ossUrl
					let accessSecret = this.oss.accessKeySecret
					let accessId = this.oss.accessKeyId
					let base64 = OSS.getPolicyBase64()
					let signature = OSS.getSignature(base64, accessSecret)

					uni.uploadFile({
						url: server, // 开发者服务器 url
						filePath: filePath, // 要上传文件资源的路径
						name: 'file', // 必须填file
						formData: {
							Filename: fileName,
							key: fileStoragePath,
							policy: base64,
							OSSAccessKeyId: accessId,
							signature: signature,
							success_action_status: '200',
							'x-oss-security-token': this.oss.securityToken
						},
						complete: ({ errMsg }) => {
							if (errMsg === 'uploadFile:ok') {
								let imageUrl = server + fileStoragePath
								r(imageUrl)
							} else j(errMsg)
						}
					})
				} catch (e) {
					j(e)
				}
			})
		}

	}
}
</script>

<style lang='scss' scoped>
.upload-img{
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-bottom: 5px;

}

.upload-box{
    @extend .upload-img;
    border-radius: 3px;
    border: 1px dashed #d9d9d9;
    background: #fafafa;
    box-sizing: border-box;
    &.upload-box:nth-of-type(4n){
        margin-right: 0;
    }
}

.del-icon{
    position: absolute;
    right: 3px;
    top: 3px;
}
</style>
