<template>
    <div class='setting-page'>
        <NavBar title='管理客户公海' />
        <i-cell-group>
            <i-cell title="华北一区公海" label='领取客户上限：16' is-link></i-cell>
            <i-cell title="华北二区公海" label='领取客户上限：11' is-link></i-cell>
            <i-cell title="华北三区公海" label='领取客户上限：13' is-link></i-cell>
        </i-cell-group>
        <div class="footer-fixed-menu d-center d-bg-white">
            <a url='./add-highseas'>
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
