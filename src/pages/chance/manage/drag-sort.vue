<template>
  <movable-area class="drag-sort" :style="{height: currentListLength * height + 'px'}" id="drag">
    <movable-view
    v-for="(item, index) in currentList"
    :key="index"
    :x="0"
    :y="item.y"
    direction="vertical"
    disabled
    damping="40"
    :animation="active !== index"
    class="drag-sort-item"
    style="height:48px"
    :class="{'active': active === index, 'vh-1px-t': item.index > 0}">
<div></div>
    </movable-view>
    <movable-view
    class="touch"
    :x="2000"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    catchtouchstart
    catchtouchmove
    catchtouchend></movable-view>
  </movable-area>
</template>

<script>
export default {
	name: 'drag-sort',
	mixins: [],
	components: {},
	data () {
		return {
			height: 48, // 高度
			currentList: [],
			active: -1, // 当前激活的item
			itemIndex: 0, // 当前激活的item的原index
			topY: 0, // 距离顶部的距离
			deviationY: 0 // 偏移量
		}
	},
	computed: {
		currentListLength () {
			return this.currentList.length
		}
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		props: {
			type: Object,
			default: () => {
				return {
					label: 'label',
					value: 'value'
				}
			}
		}
	},
	watch: {
		list (val) {
			this.onUpdateCurrentList()
		}
	},
	created () {
		this.onUpdateCurrentList()
	},
	mounted () {
	},
	updated () {},
	filters: {},
	methods: {
		onUpdateCurrentList () {
			let arr = []
			for (const key in this.list) {
				arr.push({
					...this.list[key],
					index: Number(key),
					y: key * this.height,
					animation: true
				})
			}
			this.currentList = arr
		},
		touchstart (e) {
			// 计算y轴点击位置
			var query = wx.createSelectorQuery().in(this)
			query.select('#drag').boundingClientRect()
			query.exec((res) => {
				this.topY = res[0].top
				let touchY = e.mp.touches[0].clientY - res[0].top
				this.deviationY = touchY % this.height
				// console.log(touchY)
				for (const key in this.currentList) {
					if ((this.currentList[key].index * this.height < touchY) && ((this.currentList[key].index + 1) * this.height > touchY)) {
						this.active = Number(key)
						this.itemIndex = this.currentList[key].index
						break
					}
				}
			})
		},
		touchmove (e) {
			if (this.active < 0) return
			let touchY = (e.mp.touches[0].clientY - this.topY) - this.deviationY
			// console.log(touchY)
			this.currentList[this.active].y = touchY
			for (const key in this.currentList) {
				// 跳过当前操作的item
				if (this.currentList[key].index !== this.currentList[this.active].index) {
					if (this.currentList[key].index > this.currentList[this.active].index) {
						if (touchY > this.currentList[key].index * this.height - this.height / 2) {
							this.currentList[this.active].index = this.currentList[key].index
							this.currentList[key].index = this.currentList[key].index - 1
							this.currentList[key].y = this.currentList[key].index * this.height
							break
						}
					} else {
						if (touchY < this.currentList[key].index * this.height + this.height / 2) {
							this.currentList[this.active].index = this.currentList[key].index
							this.currentList[key].index = this.currentList[key].index + 1
							this.currentList[key].y = this.currentList[key].index * this.height
							break
						}
					}
				}
			}
		},
		touchend (e) {
			if ((this.itemIndex !== this.currentList[this.active].index) && (this.active > -1)) {
				this.$emit('change', {
					// 操作值
					data: (() => {
						let data = {
							...this.currentList[this.active]
						}
						delete data.index
						delete data.y
						delete data.animation
						return data
					})(),
					// 插队的位置前面的值
					frontData: (() => {
						for (const iterator of this.currentList) {
							if (this.currentList[this.active].index - 1 === iterator.index) {
								let data = {
									...iterator
								}
								delete data.index
								delete data.y
								delete data.animation
								return data
							}
						}
					})()
				})
			}
			this.currentList[this.active].animation = true
			this.currentList[this.active].y = this.currentList[this.active].index * this.height
			this.active = -1
		}
	}
}
</script>

<style lang='less' scoped>
.drag-sort {
  width: 100%;
}
.drag-sort-item {
  width: 100%;
}
.touch {
  height: 100%;
  width: 50px;
}
.active {
  box-shadow: 0 0 40rpx #DDDDDD;
  z-index: 99;
}
.stage-cell{
        position: relative;
        padding: 12px 15px;
        background: #fff;
        height: 48px;
        box-sizing: border-box;
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #f2f2f2;

    }
    .drag-sort{
        .stage-name{
            /deep/ .detail-panel-item{
                padding:0;
                border:none
            }
        }
        /deep/ scoped-slots-default{width:100%}
        background: #f2f2f2;
        height: 100vh;
        color:#666;
        .stage-index{
            text-align: center;
            display: inline-block;
            line-height: 20px;
            color:#fff;
            font-size:12px;
            width:20px;
            height: 20px;
            border-radius:50%;
            background:#4788f4;
        };
        /deep/ .col-class{
            position: relative;
            &::before{
                content:'';
                position: absolute;
                left:-5px;
                top:-12px;
                bottom:-12px;
                border-left:1px solid #efefef
            }
        }
    }
</style>
