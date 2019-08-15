<!--
/**
* @author 冀猛超
* @name 业务属性详情
* @date 2019年8月02日
**/
-->
<template>
    <div class='attr-detail-page'>
        <NavBar />
        <template v-if='!loading'>
            <div class="pl15 pr15 pt15 pb15">
                <div class="title f14 b d-text-black mb10 d-elip">{{detail.headline}}</div>
                <div v-if='detail.masterPicArray && detail.masterPicArray.length'>
					<swiper class="swiper a-img" indicator-dots>
                        <swiper-item v-for='(imgItem, imgIndex) in detail.masterPicArray' :key='imgIndex' >
                            <img class="a-img mb10" mode='aspectFit' :src="imgItem.fileUrl" alt="">
                        </swiper-item>
                    </swiper>
                </div>

                <div v-if='detail.videoArray && detail.videoArray.length'>
                    <video class='attr-img' v-for='(videoItem, videoIndex) in detail.videoArray' :src='videoItem.fileUrl' :key='videoIndex' ></video>
                </div>

				<u-parse v-if='detail.text' :content="detail.text" />

				<div class="d-cell mr10 form-row-item mt15">
					<div class="d-center mb10" v-for='(item, index) in detail.fileArray' :key='index' @click='download(item.fileUrl)'>
						<div class='iconfont iconadjunct f12 d-text-gray mr5'></div>
						<span class="d-cell f12 d-text-gray">{{item.filelName}}</span>
					</div>
				</div>
            </div>
        </template>
		<i-spin fix fullscreen v-else></i-spin>
    </div>
</template>
<script>
export default {
	data () {
		return {
			loading: true,
			detail: {}
		}
	},
	onLoad (data) {
		this.getAttrInfo(data.id)
	},
	onShow () {

	},
	methods: {
		async getAttrInfo (id) {
			try {
				let resulte = await this.$api.seeCrmService.clientinfoInfoClientbusiness(null, id)
				if (resulte.code === 200) {
					this.detail = resulte.data
				}
			} catch (err) {

			} finally {
				this.loading = false
			}
		},

		download (url) {
			uni.downloadFile({
				url: url,
				success: (res) => {
					this.$utils.toast.text('正在保存')
					uni.saveFile({
						tempFilePath: res.tempFilePath,
						success: ({ savedFilePath }) => {
							this.$utils.toast.text('保存到' + savedFilePath)
						},
						fail: () => {
							this.$utils.toast.text('保存失败')
						}
					})
				},
				fail: () => {
					this.$utils.toast.text('保存失败')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
    .a-img{
        width: 100%;
        height: 189px;
    }
</style>
