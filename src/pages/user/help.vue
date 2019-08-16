<template>
    <div class="user-info-page hfull">
        <NavBar title="帮助中心" />
        <div class="d-bg-white">
            <i-cell-group v-for="(item) in helps" :key="item.id">
                <i-cell :title='item.title'  is-link @click="toInfo(item.id)"></i-cell>
            </i-cell-group>
        </div>

        <div class="f12 d-text-qgray d-fixed phone-help ac wfull">
            有问题请拨打客户热线<span class='d-text-blue ml5' @click="callPhone(phone)">{{phone}}</span>
        </div>
    </div>
</template>

<script>

export default {
	components: {

	},
	data () {
		return {
			phone: '4001869000',
			helps: []
		}
	},
	onLoad () {
		// 获取意见反馈列表
		let sysCode = this.$local.fetch('sysCode')
		this.$api.systemService.getHandbookMenuListPublish({ 'sysCode': sysCode }).then((response) => {
			if (response.code === 200) {
				this.helps = response.data
			} else {
				this.$utils.toast.text(response.msg)
			}
		})
	},
	methods: {
		toInfo (id) {
			let url = '/pages/user/help-info?id=' + id
			this.$routing.navigateTo(url)
		}
	}
}
</script>

<style scoped lang="scss">
    .phone-help{
        bottom: 120px;
    }
</style>
