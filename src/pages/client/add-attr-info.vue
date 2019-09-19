/*
 * @Author: web.冀猛超
 * @Date: 2019-07-30 14:50:54
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-18 10:16:55
 * @Description: 添加业务详情
 */
<template>
    <div class='attr-info-page'>
        <NavBar title='添加业务属性' />

        <div class="form-row d-center">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                <span class="d-text-red">*</span>标题:
            </div>
            <div class="d-cell mr10 form-row-item">
                <input type="text" v-model='form.headline' class='f12 d-text-black' placeholder="请填写标题" maxlength='20' style='padding-top:2px'>
            </div>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10">
                视频:
            </div>
            <div class="d-cell mr10 form-row-item" >
                <video v-if='videoArray && videoArray[0]' class='attr-video' :src="videoArray[0].fileUrl" enable-danmu danmu-btn controls></video>
            </div>
            <div class='b' @click='chooseVideo' v-if='!videoArray.length'>
                <uni-icon type='plus' size='16' color='#1890FF' />
            </div>
			<div class='b' @click='delVideo' v-else>
                <uni-icon type='minus' size='16' color='red' />
            </div>
        </div>

        <div class='form-row bb'>
            <div class="f14 d-text-black form-row-item form-row-label mr10 pb10">
                内容:
            </div>
            <div class='d-flex pb10 bb'>
                <div @click='insertImage'>
                    <i-icon i-class='pr20' type="picture_fill" size='26' color='#333' />
                </div>
                <div @click='clear'>
                    <i-icon type="trash" size='26' color='#333' />
                </div>
            </div>
            <editor id="editor" class="ql-container" placeholder="请输入内容" showImgSize showImgToolbar showImgResize @input="changContent" @ready="onEditorReady">
            </editor>
        </div>

        <div class="form-row d-flex">
            <div class="f14 d-text-black form-row-item form-row-label mr10" style='min-width: 35px;'>
                文件:
            </div>
            <div class="d-cell mr10 form-row-item">
                <div class="d-center mb10" v-for='(item, index) in fileArray' :key='index'>
                    <div class='iconfont iconadjunct f12 d-text-gray mr5'></div>
                    <span class="d-cell f12 d-text-gray  d-elip">{{item.filelName}}</span>
                    <div @click='delFile(index)'>
                        <uni-icon type='minus' size='16' color='red' />
                    </div>
                </div>

                <div class="d-center mb10">
                    <div class='iconfont f12 d-text-gray mr5'></div>
                    <span class="d-cell f12 d-text-gray"></span>
                    <div @click='chooseMessageFile'>
                        <uni-icon type='plus' size='16' color='#1890FF' />
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-fixed-menu">
            <i-button type="primary" size="default" i-class="f15" @click='clientinfoSaveClientbusiness'>保存</i-button>
        </div>
    </div>
</template>

<script>
import * as OSS from '@/utils/upload/OSSConfig'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			id: 0,
			form: {
				clientId: 0,
				busId: 0,
				busType: 0, // 0客户，1联系人，2机会，3成交,4业务属性
				headline: ''
			},
			editorCtx: null, // 编辑器对象
			content: {
				delta: {
					ops: []
				}
			},
			fileArray: [], // 文件对象
			videoArray: []
		}
	},

	onLoad (data) {
		this.form.id = this.form.busId = this.form.clientId = data.id
	},
	computed: {
		...mapState(['oss'])
	},
	methods: {
		...mapActions(['checkOssTicket']),
		async clientinfoSaveClientbusiness () {
			if (!this.form.headline) {
				this.$utils.toast.text('请填写标题')
				return
			}

			let params = {}

			// 图片集合
			params.masterPicArray = this.content.delta.ops.filter(item => item.attributes).map(item => ({
				fileUrl: item.insert.image
			}))
			// 文件 集合
			params.fileArray = this.fileArray
			// 富文本 内容
			params.text = this.content.html
			params.videoArray = this.videoArray || []
			try {
				let resulte = await this.$api.seeCrmService.clientinfoSaveClientbusiness({ ...this.form, ...params })
				if (resulte.code === 200) {
					this.$utils.toast.text('保存成功')
					setTimeout(() => {
						uni.$emit('attrBack')
						this.$routing.navigateBack()
					}, 800)
				}
			} catch (err) {

			}
		},

		// 插入视频
		chooseVideo () {
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				success: async (res) => {
					try {
						this.$utils.showLoading('视频上传中')
						let { fileName, filePath } = await this.upload(res.tempFilePath)
						this.videoArray = [{
							filelName: fileName,
							fileUrl: filePath
						}]
					} catch (err) {
						this.$utils.toast.text('视频上传失败')
					} finally {
						this.$utils.hideLoading()
					}
				}
			})
		},

		delVideo () {
			this.videoArray = []
		},

		// 插入图片
		insertImage () {
			uni.chooseImage({
				count: 1,
				success: async (res) => {
					try {
						this.$utils.showLoading('文件上传中')
						let { fileName, filePath } = await this.upload(res.tempFilePaths[0])
						this.editorCtx.insertImage({
							src: filePath,
							data: {
								filelName: fileName
							}
						})
					} catch (err) {
						this.$utils.toast.text('文件上传失败')
					} finally {
						uni.hideLoading()
					}
				}
			})
		},

		// 选择文件
		chooseMessageFile () {
			uni.chooseMessageFile({
				count: 1,
				type: 'file',
				success: async (res) => {
					let { fileName, filePath } = await this.upload(res.tempFiles[0].path, res.tempFiles[0].name)
					this.fileArray.push({
						filelName: fileName,
						fileUrl: filePath
					})
				}
			})
		},

		// 删除文件
		delFile (index) {
			this.fileArray.splice(index, 1)
		},
		// 清除内容
		clear () {
			this.editorCtx.clear()
		},
		// 编辑器内容 变化
		changContent (e) {
			const formats = e.detail
			this.content = formats
		},

		// 初始化编辑器
		onEditorReady () {
			uni.createSelectorQuery().select('#editor').context((res) => {
				this.editorCtx = res.context
				// this.editorCtx.setContents({
				//     html: '<p><img src=\"https://oss-a-develop.oss-cn-beijing.aliyuncs.com/1008/pic/201908/1565579626868CARCjzENWP.jpg\" style=\"\" width=\"181\">123123</p><p>12312</p><p>42<img src=\"https://oss-a-develop.oss-cn-beijing.aliyuncs.com/1008/pic/201908/1565579638753iTN2wmhfAj.jpg\" style=\"cursor: nesw-resize;\" width=\"88\">13</p><p><br></p><p>123</p>'
				// })
			}).exec()
		},

		// 上传文件
		async upload (filePath = '', fileName) {
			try {
				await this.checkOssTicket(this)
			} catch (error) {
				// console.error(error, 2)
			}

			try {
				const myDate = new Date()
				const datePath =
                        myDate.getFullYear() +
                        OSS.addZero(myDate.getMonth() + 1) +
                        '/' // 文件储存路径
				let suffix = filePath.substring(filePath.lastIndexOf('.'))
				fileName = fileName || new Date().getTime() + OSS.randomString(10) + suffix
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

				let [err] = await uni.uploadFile({
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
					}
				})
				if (err) {
					return Promise.reject(err)
				}
				return Promise.resolve({
					fileName: fileName,
					filePath: server + fileStoragePath
				})
			} catch (e) {
				return Promise.reject(e)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
    .attr-info-page{
        padding-bottom:  50px;
    }
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

    .ql-container{
       height: 160px;
	}

	.attr-video{
		width: 230px;
		height: 140px;
	}

</style>
