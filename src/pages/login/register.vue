<template>
    <div class="register-page">
        <NavBar title="申请免费试用" />
        <div class="">
           <div class=''>
               <div class="ml20 mt5 mb5">开通流程：</div>
               <div class="mb20">
                   <i-steps :current="current">
                        <i-step content='填写资料' />
                        <i-step content='客服回电确认' />
                        <i-step content='小程序开通' />
                        <i-step content='登录/管理客户' />
                    </i-steps>
               </div>
           </div>
           <div class="">
               <registerForm v-if='current == 0' />
               <registerSuccess v-else />
           </div>
        </div>
    </div>
</template>

<script>
import registerForm from './components/register-form'
import registerSuccess from './components/register-success'
export default {
	components: {
		registerForm,
		registerSuccess
	},
	data () {
		return {
			form: {
				phone: '',
				code: ''
			},
			current: 0,
			servicePhone: 18910474316
		}
	},
	onLoad (option) {
		let that = this
		uni.$on('backFromRegister', function (data) {
			that.current = 1
		})
	},
	methods: {

	},
	onReady () {
		console.log(this.$store.state)
	}
}
</script>

<style scoped lang="scss">

</style>
