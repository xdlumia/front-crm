/**
 * @description 通用列表mixin
 * @author 赵伦 2019-6-14
 *
 * 使用例子
 * ```html
 *  <div class="pt10 strap-border" v-for="(item,index) of list" :key="index">
 *      <shopCard :itemData="item" />
 *  </div>
 *  <i-load-more :tip="(pager.noMore&&!pager.loading)?'到底了':'加载中'" :loading="pager.loading" v-if="pager.loading||pager.noMore" />
 * ```
 * 在页面写方法
 * ```js
 * data(){
 *    return {
 *       list:[],// 数据列表固定为list字段
 *       query:{
 *          page:1,// 页吗
 *          limit:10,// 页数
 *       }
 *    }
 * },
 * methods:{
 *    getList(){
 *        return this.$api.seePumaidongCService.houseattentionList(this.query);
 *    }
 * }
 * ```
 */
export default {
	data () {
		return {
			query: {
				// 当前页数
				page: 1,
				// 每页显示记录数
				limit: 10
			},
			pager: {
				init: true,
				searchMapKey: '', // 模糊搜索键名
				querySearchKey: '', // 搜索条件的键名，传入模糊搜索内容
				isLoaded: false, // 是否已经请求过一次了
				loading: false, // 是否正在加载数据
				noMore: false// 是否没有下一页了
			},
			list: []// 数据列表
		}
	},
	mounted () {
		if (!this.newroot().query.search && this.pager.querySearchKey) {
			this.query[this.pager.querySearchKey] = ''
			this.$store.state.searchTextMap[this.pager.searchMapKey] = ''
		}
		if (this.pager.init) {
			this.$startPullDownRefresh()
		}
	},
	// 下拉刷新
	async onPullDownRefresh () {
		this.query.page = 1
		this._getList()
		this.$stopPullDownRefresh()
	},
	onShow () {
		let mapkey = this.pager.searchMapKey
		let key = this.pager.querySearchKey
		if (key && mapkey) {
			let pre = this.query[key]
			this.query[key] = this.$store.state.searchTextMap[mapkey] || ''
			if (this.pager.isLoaded && pre != this.query[key]) {
				this.$startPullDownRefresh()
			}
		}
	},
	// 加载更多
	onReachBottom () {
		if (!this.pager.noMore) {
			this.query.page++
			this._getList()
		}
	},
	methods: {
		// 获取列表数据
		async _getList () {
			if (this.pager.loading) return
			try {
				this.pager.loading = true
				this.$showLoading('加载中')
				if (this.query.page == 1) {
					this.list = []
				}
				let {
					data,
					pagers,
					curr
				} = await this.getList()
				data = data || []
				if (this.query.page == 1) {
					this.list = data
					console.log(111)
				} else {
					this.list = [].concat(this.list, data)
				}
				this.pager.noMore = pagers == curr
				this.pager.loading = false
				this.pager.isLoaded = true
				this.$forceUpdate()
			} catch (error) {
				console.error(error)
			}
			this.$hideLoading()
		},
		refreshList () {
			this.$startPullDownRefresh()
		}
	}
}
