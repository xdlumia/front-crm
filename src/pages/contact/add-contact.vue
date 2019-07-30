<!-- 添加机会 -->
<!-- wangxiaodong -->
<template>
<div class="d-bg-white">
    <NavBar title="新建联系人"/>
    <scroll-view scroll-y style="height:calc(100vh - 115px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <i-input v-model="form.userName" label="姓名" placeholder="请填写" required />
            <i-input v-model="form.phone" label="客户名称" placeholder="请填写" required type="number" />
            <i-input v-model="form.userPosition" label="职位" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="电话" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="手机" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="电子邮件" placeholder="请填写"/>
            <i-input v-model="form.userPosition" label="地址" placeholder="请填写"/>
            <i-select v-model="form.phone" :props="{label:'name',value:'id'}" label="所属部门" :options="upData"/>
            <i-select v-model="form.phone" :props="{label:'name',value:'id'}" label="联系人角色" :options="upData"/>
            <i-input v-model="form.personalProfile" label="备注" placeholder="备注" type="textarea" />

        </m-form>
        <a url="/pages/common/more-list" class="ac d-text-gray lh40 d-block"><i-icon type="add" size="18" color="#999" />添加更多条目</a>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <i-button type="primary" i-class="f16">保存</i-button>
    </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			upTypeIndex: '',
			upData: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			form: {
				// 当前名片风格 CARD_BG_WHITE CARD_BG_BLUE CARD_BG_GREY
				currentThemeCode: '',
				// 邮箱
				email: '',
				// 手机号
				phone: '1',
				// 姓名
				userName: '',
				// 个人简介
				personalProfile: 1567209600000,
				// 名片海报文案
				posterDescription: '',
				// 公司
				userCompany: '',
				// 职位
				userPosition: ''
			},
			rules: {
				userName: [{
					required: true,
					message: '请输入姓名'
				}],
				phone: [{
					required: true,
					message: '请输入手机号'
				}, {
					type: 'phone',
					message: '手机号格式不正确'
				}],
				userPosition: [{
					required: true,
					message: '请输入职位'
				}],
				userCompany: [{
					required: true,
					message: '请输入公司'
				}],
				email: [{
					required: false
				}, {
					type: 'email',
					message: '请输入正确的邮箱',
					trigger: 'blur'
				}]

			}
		}
	},
	onLoad (option) {
		this.type = option.type || 'add'
		this.cardCode = option.cardCode || ''
		if (this.type === 'edit') {
			this.getCardInfo()
		}
	},
	methods: {

	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fff;
  padding-bottom: 140upx;
}
</style>
