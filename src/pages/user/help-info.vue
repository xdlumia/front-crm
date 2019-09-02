/*
 * @Author: web.冀猛超
 * @Date: 2019-08-13 18:58:47
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-02 19:04:46
 * @Description: file content
 */
<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <view class="p15">
            <u-parse v-if='content' :content="content" />
        </view>
		<i-load-more :loading="loading" />
    </div>
</template>

<script>
export default {
	data () {
		return {
			content: '',
			loading: true
		}
	},
	onLoad (option) {
		if (option.id) {
			this.$api.systemService.getHandbookInfo({}, option.id).then((response) => {
				if (response.code === 200) {
					if (response.data.entity.content.indexOf('iframe') !== -1) {
						// 处理 视频问题
						response.data.entity.content = response.data.entity.content.replace(/iframe class="ql-video"/g, 'video')
					}
					this.content = response.data.entity.content
					this.$nextTick(() => {
						this.loading = false
					})
				} else {
					this.$utils.toast.text(response.msg)
					this.loading = false
				}
			})
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
</style>
