<!--
/**
* @author 王晓冬
* @name 联系人
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel title="联系人" color="#7765cc" :url="url">
			<div class="detail-list ac f12 d-text-gray" v-if="!contactList.length">暂无数据</div>
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
			contactList: [],
			form: {
				linkmanId: '' // 客户id
			}
		}
	},
	computed: {
		url () {
			return +this.query.busType === 0 ? '/pages/contact/add-contact?clientId=' + this.query.id : '/pages/contact/index?select=1'
		}
	},
	onLoad (option) {
		// 客户回调
		uni.$on('chooseContact', data => {
			this.form.linkmanId = data.id
			// 业务与联系人关系保存
			this.saveContact()
		})
	},
	created () {
	},
	methods: {
		// 业务与联系人关系保存
		saveContact () {
			this.$api.seeCrmService.linkmanrelationSave(Object.assign({}, this.query, this.form))
				.then(res => {
					if (res.code !== 200) return
					// console.log('保存成功')
					this.linkmanQueryList()
				})
		},
		// 获取联系人列表
		linkmanQueryList () {
			this.$api.seeCrmService.linkmanQueryList({ busId: this.query.busId, busType: this.query.busType })
				.then(res => {
					if (res.code !== 200) return
					this.contactList = res.data || []
				})
		}
	},
	watch: {
		'query.busId': {
			handler (val) {
				this.linkmanQueryList()
			},
			deep: true
		}
	}

}
</script>

<style scoped lang="scss">

</style>
