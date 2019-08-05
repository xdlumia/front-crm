<!--
/**
* @author 王晓冬
* @name 联系人
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel title="联系人" color="#7765cc" url="/pages/contact/index?select=1">
            <div class="detail-list" v-for="(item,index) of contactList" :key="index">
                <div class="list-title">
                    <title>{{item.linkkanName}}</title> <span class="d-text-qgray">{{item.position}}</span>
                    <span @click="callPhone(item.mobile)" class="fr iconfont iconcall f18 d-text-gray" ></span>
                </div>
                <p class="f12 d-elip d-text-qgray">{{item.clientName}}</p>
            </div>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: ['query'],
	components: {
		// mPager
	},
	data () {
		return {
			contactList: []
		}
	},
	onLoad (option) {
	},
	created () {
		this.linkmanQueryList(this.query)
	},
	methods: {
		// 获取联系人列表
		linkmanQueryList (params) {
			this.$api.seeCrmService.linkmanQueryList(params)
				.then(res => {
					this.contactList = res.data || []
				})
		}
	}

}
</script>

<style scoped lang="scss">

</style>
