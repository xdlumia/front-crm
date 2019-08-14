<template>
    <div class="user-info-page hfull">
        <NavBar title="海报分享" />
        <div>
            <img @load="imageLoad" :style="{ width: style.width, height: style.height }" :src="imgUrl" alt="">
            <div class='poster-button'>
                <i-button @click="handleClick" type="primary" size="default">保存海报后分享</i-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	data () {
		return {
			style: {},
			imgUrl: 'http://oss-a-develop.oss-cn-beijing.aliyuncs.com/1016/crm/1565774770370/883890ed-c7d2-48b7-9bd5-4768163b8742.jpg'
		}
	},
	onLoad () {
		this.getImg()
	},
	methods: {
		getImg () {
			this.$api.seeCrmService.posterGet().then(res => {
				if (res.code === 200) {
					this.imgUrl = res.data || ''
				}
			})
		},
		handleClick () {
			this.$utils.settingAuth('保存图片', 'writePhotosAlbum', () => {
				uni.downloadFile({
					url: this.imgUrl,
					success: (res) => {
						this.$utils.toast.text('正在保存')
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$utils.toast.text('保存成功')
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
			})
		},
		imageLoad (e) {
			let { screenWidth } = this.$store.state.systemInfo
			let $width = e.detail.width // 获取图片真实宽度
			let $height = e.detail.height
			let ratio = $width / $height // 图片的真实宽高比例
			let viewWidth = screenWidth // 设置图片显示宽度，左右留有16rpx边距
			let viewHeight = screenWidth / ratio // 计算的高度值
			// 将图片的datadata-index作为image对象的key,然后存储图片的宽高值
			this.style = {
				width: viewWidth + 'px',
				height: viewHeight + 'px'
			}
		}
	}
}
</script>

<style scoped lang="scss">
    .phone-help{
        bottom: 120px;
    }

    .poster-button{
        margin-top: 119px;
        padding: 0 40px
    }
</style>
