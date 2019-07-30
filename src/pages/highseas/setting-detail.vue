<template>
    <div class='setting-page'>
        <NavBar title='公海池设置' />

        <m-form ref="mform" class="uni-pb100">
            <div class='d-bg-white'>
                <mPanel top="10" title="基本信息" color="#4889f4">
                    <i-input label="公海名称" placeholder="请填写销售机会名称" disabled required>
                        <div class="isarrow"></div>
                    </i-input>

                    <a url='/pages/application/enterprise-management/organizational-structure'>
                        <i-input label="管理员" placeholder="添加管理员" disabled required>
                            <div class="isarrow"></div>
                        </i-input>
                    </a>

                    <a url='/pages/application/enterprise-management/organizational-structure'>
                        <i-input label="公海成员" placeholder="添加成员部门" disabled required>
                            <div class="isarrow"></div>
                        </i-input>
                    </a>
                    <div class='pl15 p15'>
                        <div class='uni-h50 uni-lh50'>
                            <label class='d-text-red'>*</label>
                            <label class='d-elip d-text-black'>公海类型</label>
                        </div>
                        <div>

                        </div>
                    </div>
                </mPanel>

            </div>

        </m-form>

        <div class="footer-fixed-menu">
            <uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">保存</span>
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
