<!--
/**
* @author 王晓冬
* @name 团队成员
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="团队成员" color="#4889f4" :url="'/pages/index/colleagueChoose?isRadio=1&ids=' + ids + '&partiType=0&type=' + query.type">
            <div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
			<div class="detail-list d-flex-lr bb" v-for='item in list' :key='item.id'>
                <image class="detail-list-img" data-name="徐丽丽" src="" alt=""></image>
                <p>
                    <b class="f16">{{item.rmEmployeeEntity.employeeName}}</b>
                    <span class="f12 d-text-qgray">{{ item.partiType == 0 ? '负责人' : '参与人' }}</span>
                </p>
            </div>
        </mPanel>
    </div>
</template>

<script>
export default {
	props: {
		query: {
			type: Object
		}
	},
	data () {
		return {
			list: []
		}
	},
	computed: {
		ids () {
			return this.list.filter(item => item.partiType === 1).map(item => {
				return item.rmEmployeeEntity.id
			}).join(',')
		}
	},
	created () {
		this.getEmployeeList()
		// 注册 事件
		uni.$on('colleagueChoose', data => {
			if (+data.query.partiType === 1) {
				this.updateEmployee(data.data.map(item => item.id))
			} else {
				this.updateLeader(data.data.map(item => item.id)[0])
			}
		})
	},
	methods: {
		getEmployeeList () {
			this.$api.seeCrmService.teammemberinfoQueryTeamMemberListById(this.query).then(res => {
				if (res.code === 200) {
					this.list = res.data || []
				}
			})
		},

		// 更新参与人
		updateEmployee () {
			this.$api.seeCrmService.teammemberinfoBatchUpdate({
				busId: this.query.id,
				busType: this.query.type,
				leaderId: leaderId,
				partiType: 1
			}).then(res => {
				if (res.code === 200) {
					this.getEmployeeList()
				}
			})
		},

		// 更新负责人
		updateLeader (leaderId) {
			this.$api.seeCrmService.teammemberinfoUpdate({
				busId: this.query.id,
				busType: this.query.type,
				leaderId: leaderId,
				partiType: 0
			}).then(res => {
				if (res.code === 200) {
					this.getEmployeeList()
				}
			})
		}

	}
}
</script>

<style scoped lang="scss">

</style>
