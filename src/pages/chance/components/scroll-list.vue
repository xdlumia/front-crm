<template>
  <div>
    <div v-for="(item,index) of list" :key="index">
        <slot v-bind:row="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
	components: {},
	props: {
		// 请求接口
		api: {
			required: true
		},
		// 参数
		params: {
			type: [Object, String, Number],
			default: function () {
				return { page: 1, limit: 15 }
			}
		}
	},
	data () {
		return {
			user: { name: 'name' },
			list: [{ name: 1 }, { name: 2 }, { name: 3 }]
		}
	},
	computed: {
		// 实时更新server
		server: function () {
			return this.api.split('.')[0]
		},
		// 实时更新url
		url: function () {
			return this.api.split('.')[1]
		}
	},
	onLoad (option) {

	},
	methods: {
		init (params) {
			this.list = [{ name: 1 }, { name: 2 }, { name: 3 }]
			// this.$api[this.server][this.url](params)
			// 	.then(res => {
			// 		this.list = res.data || []
			// 	})
		},
		// 重新请求
		reload (page) {
			// 如果有分页
			if (this.paging && page) {
				this.params.page = page
			}
			// api动态加载完 开始重新请求数据
			this.$nextTick(() => {
				this.init(this.params)
			})
		}
	},
	created () {
		this.init(this.params)
	}
}
</script>

<style scoped lang="scss">
</style>
