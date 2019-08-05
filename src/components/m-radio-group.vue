<!-- /**
 * @author 王晓冬
 * @description 暂无完成
 * @param {boolean} isSearch 是否显示搜索框
 * @param {string} placeholder 搜索框文案 默认为 搜索
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
    <div><slot></slot></div>
</template>

<script>
export default {
	props: {
		value: {
			type: String
		}
	},
	data () {
		return {

		}
	},
	watch: {
		value: {
			immediate: true,
			handler () {
				this.$nextTick(() => {
					this.changeCurrent()
				})
			}
		}
	},
	methods: {
		changeCurrent (val = this.value) {
			const len = items.length
			if (len > 0) {
				items.forEach(item => {
					item.changeShow(item.index === val)
				})
			}
		},
		handleClickItem (index) {
			this.$emit('change', { index })
		}
	},
	onReady () {
	},
	computed: {
	}

}
</script>

<style lang="scss" scoped>

.radio-box{
    width: 15px;
    height: 15px;
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    position: relative;
    &.active{
        border-color: #1890ff;
        &::before{
            content: '';
            width: 11px;
            height: 11px;
            background: #1890ff;
            border-radius: 100px;
            position: absolute;
            left: 2px;
            top: 2px;
        }
    }
}
</style>
