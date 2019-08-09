<!--
/**
* @author 冀猛超
* @name 公海池设置列表
* @date 2019年8月09日
**/
-->
<template>
    <div class='setting-page'>
        <NavBar title='管理客户公海' />
        <i-cell-group>
            <i-cell
                :title="item.name"
                :label='"领取客户上限：" + item.getClientNumMax'
                v-for="item in list"
                :key="item.id"
                is-link
                :url="'./setting-detail?poolId=' + item.id"
            />
        </i-cell-group>
        <div class="footer-fixed-menu d-center d-bg-white">
            <a url='./add-highseas' class='d-cell d-center'>
                <uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建公海池</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {

		}
	},
	computed: {
		list () {
			return this.$store.state.highseas.list
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
  .setting-page{
      height: 100vh;
      background: #f6f6f6;
  }
</style>
