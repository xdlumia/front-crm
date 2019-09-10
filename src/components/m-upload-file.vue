/*
 * @Author: web.王晓冬
 * @Date: 2019-09-04 17:55:03
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-06 09:03:45
 * @Description: file content
 */
<!--
 * @description 文件上传
 * 使用：<m-upload v-model="fileList"></m-upload>
 * 注意：v-model绑定的值必须为一个数组
 -->
<template>
    <div @tap="chooseFile">
        <slot><i-button type="primary">上传</i-button></slot>
    </div>
</template>

<script>
import * as OSS from '@/utils/upload/OSSConfig'
import { mapActions, mapState } from 'vuex'

export default {
	props: {
		// 最多允许上传数量
		limit: {
			default: 5
		},
		value: {
			default: []
		}
	},
	data () {
		return {
			// 临时选择的图片列表
			tempImgs: []
		}
	},
	onLoad () {
		this.value = []
	},
	methods: {
		...mapActions(['checkOssTicket']),
		chooseFile () {
			wx.chooseMessageFile({
			// wx.uploadFile({
				count: 1,
				type: 'file',
				success: res => {
					try {
						uni.showLoading({
							title: '文件上传中...',
							mask: true
						})
						this.upload(res.tempFiles, 0)
					} catch (err) {
						uni.hideLoading()
						uni.showToast({
							title: '文件上传失败',
							icon: 'none',
							duration: 2000
						})
					}
				}
			})
		},
		// 上传图片
		async upload (fileList, index) {
			let filePath = fileList[index].path
			// return new Promise(async (resolve, reject) => {
			try {
				await this.checkOssTicket(this)
			} catch (error) {
				console.error(error)
				// return reject(error)
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
                        (this.$store.state.userInfo.companyCode || '1008') +
                        '/pic/' +
                        datePath +
                        fileName // 文件存储路径
				let server = global.g.ApiUrl.ossUrl
				let accessSecret = this.oss.accessKeySecret
				let accessId = this.oss.accessKeyId
				let base64 = OSS.getPolicyBase64()
				let signature = OSS.getSignature(base64, accessSecret)

				wx.uploadFile({
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
							this.value.push({ filePath: imageUrl })
							this.tempImgs.shift()
							this.tempImgs = this.tempImgs.concat([])
							let fileObj = fileList[index]
							fileObj.path = imageUrl
							fileObj.type = suffix.replace('.', '')
							this.$emit('success', fileObj)
							index++
							if (index < fileList.length) {
								this.upload(fileList, index)
							} else {
								this.update()
								uni.hideLoading()
							}

							// resolve()
						} else reject(errMsg)
					}
				})
			} catch (e) {
				console.error(e)
			}
			// })
		},
		// 更新双向绑定
		update () {
			this.$emit('change', this.value)
			this.$emit('input', this.value)
		}
	},
	computed: {
		...mapState(['oss'])
	}
}
</script>

<style scoped lang="scss">
.del-img {
  position: absolute;
  right: -30upx;
  top: -30upx;
  color: #ff0000;
  padding: 10upx;
}
</style>
