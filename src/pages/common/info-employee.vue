/*
 * @Author: web.冀猛超
 * @Date: 2019-08-01 18:13:09
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-18 14:32:55
 * @Description: 团队成员
 */
<template>
    <div>
        <mPanel top="10" title="团队成员" color="#1890FF" @click="click" :isUrl='isUrl'>
            <div class="detail-list ac f12 d-text-gray" v-if="!list.length && !Object.keys(leader).length">暂无数据</div>
			<div class="detail-list d-flex-lr bb" v-if='leader.rmEmployeeEntity'>
				<m-avatar :url='leader.rmEmployeeEntity.avatarUrl' :text='leader.rmEmployeeEntity.employeeName' :width='44' :height='44'></m-avatar>
				<p class="ml5">
					<b class="f16">{{leader.rmEmployeeEntity.employeeName}}</b>
					<span class="f12 d-text-qgray">负责人</span>
				</p>
			</div>
			<div v-for='item in list' :key='item.id' >
				<div class="detail-list d-flex-lr bb">
					<m-avatar :url='item.rmEmployeeEntity.avatarUrl' :text='item.rmEmployeeEntity.employeeName' :width='44' :height='44'></m-avatar>
					<p class="ml5">
						<b class="f16">{{item.rmEmployeeEntity.employeeName}}</b>
						<span class="f12 d-text-qgray">参与人</span>
					</p>
				</div>
			</div>

        </mPanel>
    </div>
</template>

<script>
import mAvatar from '@/components/m-avatar'
export default {
	props: {
		query: {
			type: Object
		},
		isUrl: {
			type: Boolean,
			default: true
		}
	},
	components: {
		mAvatar
	},
	data () {
		return {
			leader: {}, // 负责人
			list: [] // 参与人
		}
	},
	computed: {
		ids () {
			return this.list.filter(item => (item.rmEmployeeEntity && item.partiType === 1)).map(item => {
				return item.rmEmployeeEntity.userId
			}).join(',')
		}
	},
	created () {
		this.getEmployeeList()
	},
	methods: {
		getEmployeeList () {
			let params = {
				...this.query
			}
			params.id = this.query.busId
			params.type = this.query.busType
			delete params.busId
			delete params.busType
			this.$api.seeCrmService.teammemberinfoQueryTeamMemberListById(params).then(res => {
				if (res.code === 200) {
					let list = [];
					(res.data || []).forEach(item => {
						if (+item.partiType === 1) {
							list.push(item)
						} else {
							this.leader = item
						}
					})
					this.list = list
				}
			})

			this.$forceUpdate()
			// 注册 事件
			// uni.$once('colleagueChoose', data => {
			// 	if (+data.query.partiType === 1) {
			// 		this.updateEmployee(data.data.map(item => item.userId))
			// 	} else {
			// 		this.updateLeader(data.data.map(item => item.userId)[0])
			// 	}
			// })
		},

		// 更新参与人
		updateEmployee (leaderId) {
			this.$api.seeCrmService.teammemberinfoBatchUpdate({
				busId: this.query.busId,
				busType: this.query.busType,
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
				busId: this.query.busId,
				busType: this.query.busType,
				leaderId: leaderId,
				partiType: 0
			}).then(res => {
				if (res.code === 200) {
					this.getEmployeeList()
				}
			})
		},
		click () {
			// 注册 事件
			uni.$once('colleagueChoose', data => {
				if (+data.query.partiType === 1) {
					this.updateEmployee(data.employees.map(item => item.userId))
				} else {
					this.updateLeader(data.employees.map(item => item.userId)[0])
				}
			})

			this.$routing.navigateTo(`/pages/organization/index?employeesIds=${this.ids}&isMultiple=1&type=2&employeesKey=userId&partiType=1`)
		}

	}
}
</script>

<style scoped lang="scss">

</style>
