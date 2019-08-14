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
                    <title>{{item.linkmanName}}</title> <span class="d-text-qgray">{{item.position}}</span>
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
				linkmanRelationSaveVoList: [] // 客户ids
			}
		}
	},
	onReady (option) {
		// 联系人回掉
		uni.$on('chooseContact', data => {
			this.form.linkmanRelationSaveVoList = data.map(item => {
				return {
					busId: Number(this.query.busId),
					busType: this.query.busType,
					clientId: this.query.clientId,
					linkmanId: item.id
				}
			})
			// 业务与联系人关系保存
			this.linkmanrelationSaveBatch()
		})
	},
	computed: {
		url () {
			let linkIds = JSON.stringify(this.contactList.map(item => item.id))
			return +this.query.busType === 0
				? '/pages/contact/add-contact?clientName=' + this.query.name + '&clientId=' + this.query.busId
				: '/pages/contact/index?select=1&add=1&multiple=1&linkIds=' + linkIds + ''
		}
	},
	created () {
		this.linkmanQueryBusList()
	},
	methods: {
		// 业务与联系人关系保存
		linkmanrelationSaveBatch () {
			this.$api.seeCrmService.linkmanrelationSaveBatch(Object.assign({}, { busId: this.query.busId, busType: this.query.busType, clientId: this.query.clientId }, this.form))
				.then(res => {
					// console.log('保存成功')
					this.linkmanQueryBusList()
				})
		},
		// 获取联系人列表
		linkmanQueryBusList () {
			this.$api.seeCrmService.linkmanQueryBusList({ busId: this.query.busId, busType: this.query.busType, time: '' })
				.then(res => {
					this.contactList = res.data || []
				})
		}
	},
	watch: {
		// 'query.busId': {
		// 	handler (val) {
		// 		this.linkmanQueryBusList()
		// 	},
		// 	deep: true
		// }
	}

}
</script>

<style scoped lang="scss">

</style>
