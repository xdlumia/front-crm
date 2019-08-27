<template>
    <div class="pl15 pr15 mb10 d-bg-white">
        <div class="f13 d-text-qgray pt10 pb10">{{title}}</div>
        <div class="d-flex d-flex-wrap">
            <slot />
            <div
				class="f-tag d-elip"
				@click='tagClick(item)'
				v-for='(item, index) in dataList'
				:key='index'
				:class="{active: isSingle ? ids.toString() === item[valueKey].toString() : [].includes.call(ids, item[valueKey])}"
			>{{item[labelKey]}}</div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
		value: {
			type: [String, Number, Array],
			default () {
				return []
			}
		},
		title: String,
		valueKey: {
			type: String,
			default: 'code'
		},
		labelKey: {
			type: String,
			default: 'content'
		},
		dataList: {
			type: Array,
			default () {
				return []
			}
		},
		isSingle: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			ids: []
		}
	},
	watch: {
		value: {
			immediate: true,
			handler (value) {
				this.ids = value
			}
		},
		ids: {
			deep: true,
			handler (value) {
				this.$emit('input', this.ids)
			}
		}
	},
	methods: {
		tagClick (item) {
			if (!this.isSingle) {
				if (!this.ids.includes(item[this.valueKey])) {
					this.ids.push(item[this.valueKey])
					return
				}

				let index = this.ids.indexOf(item[this.valueKey])
				index !== -1 && this.ids.splice(index, 1)
			} else {
				if (this.ids === item[this.valueKey]) {
					this.ids = ''
					return
				}
				this.ids = item[this.valueKey]
			}
			this.$forceUpdate()
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
