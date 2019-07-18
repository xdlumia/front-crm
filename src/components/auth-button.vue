<!-- /**
 * @author 冀猛超
 * @description 授权按钮
 */ -->
<template>
    <div :class="[className, 'd-relative']">
        <div class="wfull">
            <div @click="handleClick">
                <slot />
            </div>
            <button v-if='isUserInfo && !userBinding' open-type="getUserInfo" @getuserinfo="handleUserInfoClick" class="b-use"></button>
            <button v-else-if='isPhone && !phone' open-type="getPhoneNumber" @getphonenumber="handlePnoneClick" class="b-use"></button>
        </div>
    </div>
</template>

<script>
import JIM from '@/utils/im'
import { mapState } from 'vuex'
export default {
	props: {
		className: String, // class 名字
		isUserInfo: { // 是否需要授权用户信息
			type: Boolean,
			default: true
		},
		isPhone: { // 是否需要授权手机号
			type: Boolean,
			default: false
		}
	},
	computed: {
		...mapState(['userInfo']),
		userBinding () {
			return (this.$store.state.userInfo.userBinding && this.$store.state.userInfo.nickName) || ''
		},
		phone () {
			return this.$store.state.userInfo.phone || ''
		}
	},
	methods: {
		// 点击方法
		handleClick () {
			this.$emit('handleClick')
		},

		// 获取用户信息的逻辑
		handleUserInfoClick ({ mp }) {
			this.$utils.settingAuth('用户', 'userInfo', () => {
				this.saveUserInfo(mp.detail)
			})
		},

		// 处理手机号的逻辑
		handlePnoneClick ({ mp }) {
			if (mp.detail.errMsg !== 'getPhoneNumber:ok') return
			this.saveUserPhone(mp.detail)
		},

		// 保存用户
		async saveUserInfo (data) {
			let { data: res } = await this.$api.cSystemService.wxLoginUserBinding({
				iv: data.iv,
				encryptedData: data.encryptedData,
				userInfo: data.userInfo
			})
			// 登录成功后 初始化 即时通讯im
			JIM.init().then(_ => {
				JIM.register({
					id: res.openid,
					password: res.openid,
					nickName: res.nickName,
					avatar: res.avatarUrl
				})
			})

			// 重新登录则清除出价审核
			this.$local.remove('isCheckBid')

			this.$local.save('userInfo', { ...this.userInfo, ...res })
			this.$store.commit('setUserInfo', { ...this.userInfo, ...res })
			this.$local.setItem('token', res.token)
			this.$local.setItem('finger', res.finger)
			this.$emit('success')
		},

		// 手机号绑定
		async saveUserPhone (data) {
			try {
				let { data: res } = await this.$api.cSystemService.wxLoginPhoneBinding({
					encryptedData: data.encryptedData,
					iv: data.iv
				})

				this.handleClick()

				this.$local.save('userInfo', { ...this.userInfo, ...res })
				this.$store.commit('setUserInfo', { ...this.userInfo, ...res })
			} catch (err) {
				// console.log(err)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.b-use {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
