<!-- /**
 * @author 王晓冬
 * @description 滚动刷新列表
 * @param {boolean} isSearch 是否显示搜索框
 * @param {string} placeholder 搜索框文案 默认为 搜索
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
  <div class="down-search-section-list" :style="{height:height}">
    <div v-for="(item,index) of 5" :key="index">
      <slot v-bind:row="item"></slot>
    </div>
    <div class="no-data-msg" v-if="pager.isLoaded&&!list.length">暂无数据</div>
    <i-load-more
      :tip="(pager.noMore&&!pager.loading)?'没有更多了':'加载中'"
      :loading="pager.loading"
      v-if="pager.loading||(pager.noMore&&list.length)"
    />
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
		},
		height: String
	},
	data () {
		return {
			list: [],
			pager: {
				init: true,
				isScrollView: false, // scroll-view组件模式
				isLoaded: false, // 是否已经请求过一次了
				loading: false, // 是否正在加载数据
				noMore: false // 是否没有下一页了
			}
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
	onLoad (option) {},
	created () {},
	methods: {
		// 初始化接口数据
		_getList (params) {
			this.$api[this.server][this.url](params).then(res => {
				if (this.pager.loading) return
				try {
					this.pager.loading = true
					uni.showLoading('加载中')
					if (this.params.page === 1) {
						this.list = []
					}
					let { data, pagers, curr } = res || []
					data = data || []
					if (this.params.page === 1) {
						this.list = data
					} else {
						this.list = [].concat(this.list, data)
					}
					this.pager.noMore = pagers === curr
					this.pager.loading = false
					this.pager.isLoaded = true
					this.$forceUpdate()
				} catch (error) {
					console.error(error)
				}
				uni.hideLoading()
			})
		},
		// 重新请求
		reload (page) {
			if (this.pager.loading) return
			// 如果页码参数
			this.params.page = page || 1
			// api动态加载完 开始重新请求数据
			this.$nextTick(() => {
				this._getList(this.params)
			})
		},
		// refreshList () {
		// 	this.params.page = 1
		// 	this._getList()
		// },
		getNextPage () {
			if (this.pager.loading) return
			if (!this.pager.noMore) {
				this.params.page++
				this._getList()
			}
		}
	},
	onReady () {
		// this._getList(this.params)
	}
}
</script>

<style scoped lang="scss">
.down-search-section-list {
  position: relative;
  &::before {
    content: "松手刷新";
    position: absolute;
    top: -36px;
    width: 100%;
    left: 0;
    color: #9e9e9e;
    font-size: 12px;
    text-align: center;
  }
}
</style>
