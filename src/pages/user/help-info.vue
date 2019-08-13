<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <div class="d-bg-white">
            <parse :content='content'></parse>
        </div>
    </div>
</template>

<script>
import parse from '@/components/parse/parse'
export default {
	components: {
		parse
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
