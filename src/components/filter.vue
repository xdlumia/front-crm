<template>
	<div>
		<div class='filter-box d-bg-white' :style="top ? 'top:' + top :'top:' + navH" >
			<div class="d-flex filter-title pl15 pr15 f13 bb d-text-black">
				<div
					v-for='(item, index) in filterData'
					:key='item.prop'
					@click.stop="openFilter(item.prop, index)"
				>
					<span class='iconfont iconpaixu f12 d-text-black b' v-if='index == filterData.length - 1'></span>
					<span class='ml5 mr5 f13'>{{filterSelect[item.prop].name}}</span>
					<span class='iconfont iconxiala f12 d-text-gray jt d-inline' :class='{active: filterProp === item.prop && filterShow}'></span>
				</div>

				<div @click.stop="openFilter('diy')"><span class='iconfont iconshaixuan f13 d-text-black mr5 b'></span><span class='f13'>筛选</span></div>
			</div>
			<div class="filter-con" v-show='filterShow'>
				<!-- 列表筛选 -->
				<div class='filter-list-view d-bg-white d-relative' v-show='filterProp !== "diy"'>
					<span
						class="filter-list-item f13  pl15 pr15 bb d-block"
						:class='filterSelect[filterProp].id == item.id ? "d-text-blue" : "d-text-black"'
						v-for='item in fitlerList'
						:key="item.id"
						@click.stop="selectItem(item)"
					>{{item.name}}</span>
				</div>
				<!-- 自定义筛选 -->
				<div class="filter-list-view d-bg-white d-relative" v-show="filterProp === 'diy'">
					<slot />
				</div>

				<div class="filter-box hfull" @click='hide'></div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'filter',
	props: {
		top: {
			type: String,
			default: ''
		},
		filterData: {
			type: Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			fitlerList: [],
			filterShow: false,
			filterSelect: {}, // 已选择的项
			filterProp: '',
			filterIndex: 0
		}
	},
	onReady () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
		})
		this.filterSelect = selects
	},
	methods: {
		show () {
			this.filterShow = true
		},
		hide () {
			this.filterShow = false
		},
		openFilter (prop, index) {
			if (this.filterProp === prop) {
				this.filterShow = !this.filterShow
				return
			}
			this.filterProp = prop
			this.show()
			if (prop !== 'diy') {
				this.fitlerList = this.filterData[index].list
			}
		},

		selectItem (item) {
			if (this.filterSelect[this.filterProp].id === item.id) return
			this.$set(this.filterSelect, this.filterProp, item)
			this.filterShow = false
			this.$emit('filterSubmit', { ...item, prop: this.filterProp })
		}
	}
}
</script>

<style scoped lang="scss">
	.filter-box{
		position: fixed;
		left: 0;
		width: 100%;
		z-index: 2;
	}
	.filter-title{
		justify-content: space-between;
		align-items: center;
		height: 38px;
		line-height: 38px;
	}

	.filter-con{
		height: calc(100vh - 128rpx - 40px);
		background: #f2f2f2;
	}

	.jt{
		&.active{
			transform: rotate(-180deg);
		}
	}

	.filter-list-item{
		height: 51px;
		line-height: 51px;
	}
</style>
