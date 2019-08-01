<template>
    <view>
        <NavBar title="团队申请" />
		<scroll-list
				class="d-absolute wfull"
				:style="{top:`calc(${navH} + 39px + 65px + 35px)`}"
				height="`calc(100vh - ${navH} - 39px - 65px + 35px)`"
				api="userApplicationInformationService.getUserapplicationinformationList"
				:params="queryForm"
				v-slot="{ row }">
			<a url='./info'>
				<view class="uni-flex uni-column">
					<view class="flex-item flex-item-V bb uni-flex uni-row p15" v-for="(item) in teamDatas" :key="item.id">
						<view class="flex-item width20 p10">
							<image class="ba" style="height: 51px;width: 51px;" src="/static/img/index.png"></image>
						</view>
						<view class="flex-item width32" @click="info(item)">
							<view class="f14">{{item.name}}</view>
							<view class="d-text-qgray">来源</view>
							<view>由<span style="color:#5081F5;">{{item.inviter}}</span>邀请加入</view>
							<view class="d-text-qgray">申请理由</view>
							<view>{{item.applyReason}}</view>
						</view>
						<view class="flex-item width48" style="margin: 40px 0;">
							<button type="primary"
							size="8px" plain="true"
							style="float: left;margin-left: 4px;color: #4889F4;border-color: #4889F4;"
							@tap="toEditor">同意</button>
							<button type="warn" size="8px" plain="true" style="float: left;margin-left: 4px;">删除</button>
						</view>
					</view>
				</view>
			</a>
		</scroll-list>
    </view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			queryForm: {
				limit: 10,
				page: 1
			},
			teamDatas: [
				{
					id: 0,
					pic: '../../../../../dist/dev/mp-weixin/static/img/index.png',
					name: '付建达',
					phone: '16619941016',
					inviter: '方胜利',
					verifier: 'lili',
					applyReason: 'aaaaaaaaaaaaaaaaaaaaa'
				},
				{
					id: 1,
					pic: '../../../../../dist/dev/mp-weixin/static/img/index.png',
					name: '高阳',
					phone: '16619941016',
					inviter: '高德勇',
					verifier: 'lili',
					applyReason: 'bbbbbbbbbbbbbbbbbbbbb'
				},
				{
					id: 2,
					pic: '../../../../../dist/dev/mp-weixin/static/img/index.png',
					name: '梵高先生',
					phone: '16619941016',
					inviter: '李丽兰',
					verifier: 'lili',
					applyReason: 'cccccccccccccccccccccccccccccccc'
				}
			]
		}
	},
	onLoad (option) {
		this.$local.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaW5nZXIiOiJmZDE1N2Y4NzUwOGZlY2FmNWE3NzAyZGEyNDU3M2NkMCIsImNsaWVudElwIjoiMjIzLjcyLjgwLjI1MiIsImV4cCI6MTU2NDY5NTY0MCwidXNlcm5hbWUiOiJ1c2VyOjQ0MSJ9.fjkJIbLLMY_2MQp_yRmgfjz8NQgwjG5f_d3GONa6RDY')
		this.$local.setItem('finger', 'fd157f87508fecaf5a7702da24573cd0')
	},
	methods: {
		// 编辑
		toEditor () {
			uni.navigateTo({
				url: 'editor/index?isEditor=1'
			})
		},
		// 详情
		info (item) {
			uni.navigateTo({
				url: 'info?item=' + JSON.stringify(item)
			})
		}
	},
	created () {

	}
}
</script>

<style>
    .width20{
        width: 20%;
    }
    .width32{
        width: 32%;
    }
    .width48{
        width: 48%;
    }
</style>
