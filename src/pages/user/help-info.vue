<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <view class="p15">
            <u-parse v-if='content' :content="content" />
        </view>
    </div>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			content: ''
		}
	},
	onLoad (option) {
		if (option.id) {
			this.$api.systemService.getHandbookInfo({}, option.id).then((response) => {
				if (response.code === 200) {
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
