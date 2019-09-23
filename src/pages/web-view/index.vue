/*
 * @Author: web.冀猛超
 * @Date: 2019-09-20 09:32:31
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-20 09:35:38
 * @Description: web-view 页面
 */
<template>
    <div>
        <web-view :src="url"  />
    </div>
</template>

<script>
export default {
	data () {
		return {
			url: ''
		}
	},
	onLoad (options) {
		this.url = decodeURIComponent(options.url)
	}
}
</script>
