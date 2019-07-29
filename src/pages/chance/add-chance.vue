<!-- 名片新建/编辑 -->
<!-- tianjiaojiao -->
<template>
<div class="d-bg-white">
    <NavBar title="新建机会"/>
    <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
        <i-input v-model="form.userName" label="机会名称" placeholder="请填写销售机会名称" required />
        <i-input v-model="form.phone" label="客户名称" placeholder="请填写客户名称" required type="number" />
        <i-select
        v-model="form.phone"
        :props="{label:'name',value:'id'}"
        label="所属部门"
        placeholder="请选择所属部门"
        required
        :options="upData">
        </i-select>
        <!-- <picker :value="upTypeIndex" :range="upData" @change='change($event, "upTypeIndex")'>
            <i-input v-model="form.userPosition" label="所属部门" placeholder="请选择所属部门" required />
        </picker> -->
        <i-input v-model="form.userPosition" label="所属部门" placeholder="请选择所属部门" required />
        <i-input v-model="form.userCompany" label="详细地址" placeholder="请填写详细地址" required />
        <i-input v-model="form.email" label="邮箱" placeholder="请输入邮箱" />
        <i-input v-model="form.personalProfile" label="个人简介" placeholder="请输入个人简介" type="textarea" />
    </m-form>
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
				phone: '2',
				// 姓名
				userName: '',
				// 个人简介
				personalProfile: '',
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
		change ({ mp: { detail } }, filed) {
			let index = detail.value
			this[filed] = index
			console.log(detail)
		}
	},
	created () {},
	computed: {
		defaultCardInfo () {
			return {
				avatarUrl: this.form.avatarUrl,
				// 当前名片风格 CARD_BG_WHITE CARD_BG_BLUE CARD_BG_GREY
				currentThemeCode: this.form.currentThemeCode || 'CARD_BG_WHITE',
				email: this.form.email || '您的邮箱',
				phone: this.form.phone || '您的电话',
				userName: this.form.userName || '您的姓名',
				userCompany: this.form.userCompany || '您的公司',
				userPosition: this.form.userPosition || '您的职位'
			}
		},
		selectCradList () {
			const CARD_THEME = [
				'CARD_BG_WHITE',
				'CARD_BG_BLUE',
				'CARD_BG_GREY'
			]
			let list = []
			CARD_THEME.forEach(theme => {
				list.push({
					...this.defaultCardInfo,
					currentThemeCode: theme
				})
			})
			return list
		}
	}
}
</script>

<style lang="scss" scoped>
.select-card {
  background-color: #fff;
  width: calc(100vw - 28upx);
  border-radius: 20upx;

  .select-title {
    border-bottom: 1px solid #f2f2f2;
  }

  .icon-close {
    right: 30upx;
    top: 24upx;
    border-radius: 100%;
  }

  .card {
    padding: 40upx 16upx;
  }
}

.avatar-wrapper {
  height: 170upx;
  box-sizing: border-box;

  .upload-avatar {
    margin: 0 auto;
    position: relative;
    top: -120upx;
    opacity: 0;
  }
}

.my-pic,
.my-video {
  border-bottom: 1px solid #f2f2f2;
}

.save-btn {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;
  button {
    color: #fff;
    line-height: 45px;
    height: 45px;
    background-color: #3399ff;
    border-radius: 45px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style><style lang="scss">
page {
  background-color: #f2f2f2;
  padding-bottom: 140upx;
}
</style>
