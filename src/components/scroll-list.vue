<!-- /**
 * @author 王晓冬
 * @description 滚动刷新列表
 * @param {boolean} isSearch 是否显示搜索框
 * @param {string} placeholder 搜索框文案 默认为 搜索
 * @param {string} title 标题
 * @param  select 判断当前是否是选择

    <NavBar title="首页"  />
 */ -->
<template>
      <scroll-view
        scroll-y
        @scrolltolower="getNextPage"
        @touchstart="touchstart"
        @touchend="touchend"
        @scroll="scroll"
        class="down-search-section-list"
        :style="{height:height}"
    >
    <div v-show="topLoading">
        <i-load-more :loading="topLoading" tip="加载中" />
    </div>
    <slot />
    <div class="no-data-msg" v-if="pager.isLoaded&&!list.length">暂无数据</div>
    <i-load-more
      :tip="(pager.noMore&&!pager.loading)?'没有更多了':'加载中'"
      :loading="pager.loading"
      v-if="pager.loading||(pager.noMore&&list.length)"
    />
  </scroll-view>
</template>

<script>
export default {
	components: {},
	props: {
		select: {
			default: 0
		},
		// 请求接口
		api: {
			required: true
		},
		// 参数
		params: {
			default: function () {
				return { page: 1, limit: 15 }
			}
		},
		height: String
	},
	data () {
		return {
			topLoading: false,
			isRefresh: true,
			startPageY: 0,
			list: [],
			queryParams: { page: 1, limit: 15 },
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

	methods: {
		scroll ({ mp }) {
			let scrollTop = mp.detail.scrollTop
			if (scrollTop > 15) {
				this.isRefresh = false
			} else {
				this.isRefresh = true
			}
		},

		touchstart ({ mp }) {
			if (!this.isRefresh) return
			this.startPageY = mp.changedTouches[0].pageY
		},

		touchend ({ mp }) {
			if (!this.isRefresh || !this.startPageY) return
			let endPageY = mp.changedTouches[0].pageY
			if (endPageY - this.startPageY >= 100) {
				this.topLoading = true
				this.reload()
			}
		},
		// 初始化接口数据
		_getList () {
			let params = Object.assign({}, this.queryParams, this.params)
			this.$api[this.server][this.url](params).then(res => {
				if (this.pager.loading) return
				try {
					this.pager.loading = true
					// uni.showLoading('加载中')
					if (params.page === 1) {
						this.list = []
					}
					let { data, pagers, curr } = res || []
					data = data || []
					if (params.page === 1) {
						this.list = data
					} else {
						this.list = [].concat(this.list, data)
					}
					this.pager.noMore = pagers === curr
					this.pager.loading = false
					this.pager.isLoaded = true
					this.topLoading = false
					this.$forceUpdate()
					this.$emit('getList', this.list)
				} catch (error) {
					this.topLoading = false
				}
				// uni.hideLoading()
			})
		},
		// 重新请求
		reload (page) {
			if (this.pager.loading) return
			// 如果页码参数
			this.queryParams.page = page || 1
			// api动态加载完 开始重新请求数据
			this.$nextTick(() => {
				this._getList()
			})
		},
		getNextPage () {
			if (this.pager.loading) return
			if (!this.pager.noMore) {
				this.queryParams.page++
				this._getList()
			}
		}
	},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh  () {
		this.reload()
		wx.vibrateShort()
		wx.stopPullDownRefresh()
	},
	// 页面上拉触底事件的处理函数
	onReachBottom () {
		this.getNextPage()
	},
	onReady () {
		this._getList()
	}
}
</script>

<style scoped lang="scss">
// .down-search-section-list {
// 	position: relative;
// 	&::before {
// 		content: "松手刷新";
// 		position: absolute;
// 		top: -36px;
// 		width: 100%;
// 		left: 0;
// 		color: #9e9e9e;
// 		font-size: 12px;
// 		text-align: center;
// 	}
// }

/* 无数据提示样式 */
.no-data-msg {
    text-align: center;
    padding: 36px 0 0;
    color: #ccc;
    font-size: 14px;
}
</style>
