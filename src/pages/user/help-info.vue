<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <view class="p15">
            <u-parse v-if='content' :content="content" />
        </view>
		<i-load-more
                :tip=" !loading && !list.length ? '暂无数据' : !loading ? '没有更多了' : '加载中'"
                :loading="loading"
        />
    </div>
</template>

<script>
export default {
	components: {
	},
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
						this.loading = false
					}
					this.content = response.data.entity.content
				} else {
					this.$utils.toast.text(response.msg)
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
