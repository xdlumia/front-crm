<!-- /**
 * @author 王艳龙
 * @param width 宽度
 * @param height 长度
 * @param url 图片地址
 * @param text 显示文字（自动截取后两位）
 * @example
 */ -->
<template>
    <view style="display:flex;align-items:center">
		<image v-if="url" class="ba  d-circle" :style="{width:width+'px',height:height+'px'}" :src='url'></image>
        <view v-else class="ba d-circle d-bg-blue d-center" :style="{width:width+'px',height:height+'px'}">{{this.text.substring(this.text.length - nameLength)}}</view>
    </view>
</template>

<script>
export default {
	props: {
		url: {
			type: String
		},
		text: {
			type: String
		},
		width: {
			default: '50'
		},
		height: {
			default: '50'
		},
		nameLength: {
			default: 2
		}
	},
	data () {
		return {
		}
	},
	created () {
	},
	methods: {
	}
}
</script>

<style lang="scss">
</style>
