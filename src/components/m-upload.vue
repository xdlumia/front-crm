<!--
 * @description 文件上传
 * 使用：<m-upload v-model="fileList"></m-upload>
 * 注意：v-model绑定的值必须为一个数组
 -->
<template>
    <div class="uni-uploader-body uni-mt0">
        <div class="uni-uploader__files">
            <!--用户默认回显图像-->
            <div class="uni-uploader__file d-relative" v-for="(item,index) in showUploadedImgs" :key="index">
                <image class="uni-uploader__img" :src="item.filePath" :data-src="item.filePath" @click="previewImage(item.filePath)" mode="aspectFill" />
                <div class="absolute del-img" @click="remove(index, value)" v-if="showDelete">
                    <i-icon type="delete_fill" :size="24" />
                </div>
            </div>
            <!--临时上传图片-->
            <div class="uni-uploader__file d-relative" v-for="(image,index) in showTempImgs" :key="index">
                <image class="uni-uploader__img" :src="image" :data-src="image" @click="previewImage(image)" mode="aspectFill" />
                <div class="absolute del-img" @click="remove(index, tempImgs)" v-if="showDelete">
                    <i-icon type="delete_fill" :size="24" />
                </div>
            </div>
            <div class="uni-uploader__input-box" v-if="(tempImgs.length + value.length < limit) || limit == 0">
                <div class="uni-uploader__input" @tap="chooseImage"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as OSS from '@/utils/upload/OSSConfig'
import { mapActions, mapState } from 'vuex'

// 图片来源
const sourceType = [
	// 拍照
	['camera'],
	// 相册
	['album'],
	// 拍照或相册
	['camera', 'album']
]
// 图片质量
const sizeType = [
	// 压缩
	['compressed'],
	// 原图
	['original'],
	// 压缩或原图
	['compressed', 'original']
]
export default {
	props: {
		// 最多允许上传数量
		limit: {
			default: 5
		},
		// 0 => 拍照；1 => 相册； 2 => 拍照或相册
		sourceType: {
			default: 2
		},
		// 0 => 压缩；1 => 原图；2 => 压缩或原图
		sizeType: {
			default: 0
		},
		value: {
			default: []
		},
		// 是否可以删除
		showDelete: {
			default: true,
			type: Boolean
		},
		// 描述
		description: {
			default: ''
		},
		// 是否预览
		preview: {
			default: true
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
		chooseImage () {
			uni.chooseImage({
				sourceType: sourceType[this.sourceType],
				sizeType: sizeType[this.sizeType],
				count: this.limit - this.showTempImgs.length - this.showUploadedImgs.length,
				success: res => {
					this.tempImgs = this.tempImgs.concat(res.tempFilePaths)
					try {
						uni.showLoading({
							title: '文件上传中...',
							mask: true
						})

						this.upload(res.tempFilePaths, 0)

						// 上传图片
						// res.tempFilePaths.forEach(async (item, index) => {
						// 	let url = await this.upload(item)
						// 	this.value.push({ filePath: url })
						// 	this.tempImgs.shift()
						// 	this.tempImgs = this.tempImgs.concat([])
						// 	this.$emit('success', url)
						// 	this.update()
						// 	uni.hideLoading()
						// })
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
			let filePath = fileList[index]
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
							this.$emit('success', imageUrl)
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
		previewImage (url) {
			uni.previewImage({
				current: url,
				urls: [this.value.map(item => {
					return item.filePath
				}), this.tempImgs]
			})
		},
		// 更新双向绑定
		update () {
			this.$emit('change', this.value)
			this.$emit('input', this.value)
		},
		// 删除图片
		del (i, arr) {
			arr.splice(i, 1)
			this.update()
		},
		remove (i, arr) {
			uni.showActionSheet({
				itemList: ['删除'],
				success: ({ tapIndex }) => {
					if (+tapIndex === 0) {
						this.del(i, arr)
					}
				},
				complete: () => {}
			})
		}
	},
	computed: {
		...mapState(['oss']),
		showTempImgs () {
			return this.preview ? this.tempImgs : []
		},
		showUploadedImgs () {
			return this.preview && this.value ? this.value : []
		}
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
