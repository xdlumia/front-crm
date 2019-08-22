<!--
/**
* @author王艳龙
* @name 团队申请
* @date 2019年8月2日
**/
-->
<template>
    <view>
        <NavBar title="团队申请" />
		<scroll-list
				api="seeCrmService.userapplicationinformationList"
				:params="queryForm"
				@getList='getList'
				ref='teamDatas'>
			<view class="uni-flex uni-column" v-for="(item) in teamDatas" :key="item.id">
				<view class="flex-item flex-item-V uni-flex uni-row pt15 pl15 pr15">
					<view class="flex-item width15 p10">
						<!-- <image class="ba d-circle" style="height: 51px;width: 51px;" :src='item.photo'></image> -->
						<mAvatar :text='item.name' :url='item.photo'></mAvatar>
					</view>
					<view class="flex-item width40" @click="info(item)">
						<view class="f14">{{item.name}}</view>
						<view class="d-text-qgray">来源</view>
						<view>由<span style="color:#5081F5;">{{item.inviter}}</span>邀请加入</view>
					</view>
					<view class="flex-item width45 d-center" style="margin: 40px 0;">
						<button v-if="item.isAgree == 1" class="fl ml5 d-text-cgray">
							已同意
						</button>
						<button v-else type="primary"
						size="8px" plain="true"
						class="fl ml5"
						style="color: #4889F4;border-color: #4889F4;"
						@tap="agreeApply(item)">同意</button>
						<button type="warn" size="8px" plain="true" class="fl ml5" @click="deleteApply(item.id)">删除</button>
					</view>
				</view>
				<view class="flex-item flex-item-V bb pb10" style="padding-left: 23%;padding-right: 6%;">
					<view class="d-text-qgray">申请理由</view>
					<view>{{item.applyReason}}</view>
				</view>
			</view>
		</scroll-list>
    </view>
</template>

<script>
import mAvatar from '@/components/m-avatar'
export default {
	components: {
		mAvatar
	},
	data () {
		return {
			queryForm: {
				limit: 30,
				page: 1
			},
			teamDatas: []
		}
	},
	onLoad (option) {},
	onShow () {
		this.$refs.teamDatas.reload(1)
	},
	methods: {
		getList (teamDatas) {
			this.teamDatas = teamDatas
		},
		// 同意
		agreeApply (item) {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/team/editor/index?isEditor=0&isApply=1&apply=' + JSON.stringify(item)
			})
		},
		// 删除
		deleteApply (id) {
			try {
				this.$utils.showModal('确定要删除此申请记录？').then(async () => {
					let resulte = await this.$api.seeCrmService.userapplicationinformationLogicDelete({ 'id': id })
					this.$utils.toast.text(resulte.msg)
					this.$refs.teamDatas.reload(1)
				})
			} catch (err) {
				this.$utils.toast.text('删除失败')
			} finally {

			}
		},
		// 详情
		info (item) {
			if (parseInt(item.isAgree) === 1) {
				uni.navigateTo({
					url: '/pages/application/enterprise-management/team/info?item=' + JSON.stringify(item)
				})
			}
		}
	},
	created () {

	}
}
</script>

<style>
    .width15{
        width: 15%;
    }
    .width40{
        width: 40%;
    }
    .width45{
        width: 45%;
    }
</style>
