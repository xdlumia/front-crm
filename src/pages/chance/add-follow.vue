<!-- 添加跟进 -->
<!-- wangxiaodong -->
<template>
<div style="background-color:#f9f9f9">
    <NavBar title="添加跟进"/>
    <scroll-view scroll-y style="height:calc(100vh - 115px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <div class="d-bg-white">
                <i-select
                    v-model="form.phone"
                    :props="{label:'name',value:'id'}"
                    label="跟进类型"
                    placeholder="请选择跟进类型"
                    required
                    :options="upData">
                </i-select>
                <picker-date v-model="form.personalProfile" label="预计成交日期" placeholder="请选择日期">
                </picker-date>
            </div>
            <div class="d-bg-white mt10">
                <i-input v-model="form.personalProfile" label="跟进内容" placeholder="备注" type="textarea" required/>
                <div class="pl15 pr15 mt5"><imagePick /></div>
            </div>
        </m-form>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <!-- <div class="d-cell ac d-bg-blue f15 d-text-white">保存</div> -->
      <i-button type="primary" i-class="f16">保存</i-button>
    </div>
</div>
</template>
<script>
import imagePick from '@/components/image-pick'
export default {
	components: {
		imagePick
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
</style>
