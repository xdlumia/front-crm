<template>
    <div class="pl15 pr15 mb10 d-bg-white">
        <div class="f13 d-text-qgray pt10 pb10">{{title}}</div>
        <div class="d-flex d-flex-wrap">
            <slot />
            <div class="f-tag" @click='tagClick(item)' v-for='(item, index) in dataList' :key='index' :class="{active: id === item[valueKey]}">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
		title: String,
		current: [Number, String],
		valueKey: {
			type: String,
			default: 'id'
		},
		dataList: {
			type: Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			id: 0
		}
	},
	watch: {
		current (val) {
			this.id = val
		}
	},
	methods: {
		tagClick (item) {
			if (this.id === item[this.valueKey]) {
				this.id = null
				this.$emit('click', {})
			} else {
				this.id = item[this.valueKey]
				this.$emit('click', item)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.f-tag{
    width: calc((100vw - 30px - 66px) / 3);
    height: 31px;
    background: #f5f6fa;
    border-radius: 3px;
    color: #333;
    line-height: 31px;
    text-align: center;
    font-size: 12px;
    margin-bottom: 20px;
    margin-right: 33px;
    &:nth-of-type(3n){
        margin-right: 0;
    }
    &.active{
        color: #fff;
        background: #4788f4;
    }
}
</style>
