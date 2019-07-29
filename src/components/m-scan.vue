<!-- /**
 * @author 许晋 2019-07-05
 * @description 扫码组件
 */ -->
<template>
  <view class>
    <div class="d-flex">
      <input
        type="text"
        v-model="videoFilepathNew"
        readonly
        disabled
        placeholder="请扫描视频"
        class="d-text-black uni-h50 d-cell uni-lh50"
      />
      <div class="uni-w50 uni-lh50 ar" @click="scan">
        <i-icon type="scan" :size="24" color="#3399ff" />
      </div>
    </div>
  </view>
</template>

<script>
/**
 * @author 许晋 2019-07-27
 * @description 扫码组件
 */
export default {
	props: ['videoFilepath'],
	components: {},
	data () {
		return {
			videoFilepathNew: this.videoFilepath
		}
	},
	computed: {
	},
	watch: {
	},
	created () {
	},
	onReady () {
	},
	onShow () {
	},
	onLoad () {
	},
	methods: {
		// 点击地图定位 扫一扫 调用
		scan () {
			uni.scanCode({
				success: (res) => {
					if ((res).result.includes('v.qq.com')) {
						if ((res).result.includes('cover')) {
							if ((res).result.split('/').slice((res).result.split('/').indexOf('cover')).length > 2) {
								this.videoFilepathNew = (res).result
								this.$emit('getVideoFilepathNew', this.videoFilepathNew)
							} else {
								uni.showToast({
									title: '您访问的似乎是剧集封面链接，由于腾讯视频的限制该视频暂时无法播放。',
									icon: 'none'
								})
							}
						} else {
							// page类型
							this.videoFilepathNew = (res).result

							this.$emit('getVideoFilepathNew', this.videoFilepathNew)
						}
					} else {
						uni.showToast({
							title: '请扫码正确的腾讯视频二维码',
							icon: 'none'
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
