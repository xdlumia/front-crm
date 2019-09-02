/*
 * @Author: web.冀猛超
 * @Date: 2019-09-02 11:15:43
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-02 11:32:37
 * @Description: 列表空数据展示
 */
<template>
    <!--暂无日程-->
    <div style="justify-content: center;align-items: center;flex-direction: column;" class="d-flex" :class="className">
        <img src="../assets/img/nothing.png" style="width: 132px;height: 111px;"/>
        <span class="d-text-qgray f12">{{text}}</span>
    </div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: '暂无数据'
		},
		className: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
