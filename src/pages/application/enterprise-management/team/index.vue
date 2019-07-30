<template>
    <view>
        <NavBar title="团队申请" />
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V bb uni-flex uni-row p15" v-for="(item) in teamDatas" :key="item.id">
                 <view class="flex-item width20 p10">
                    <image class="ba" style="height: 51px;width: 51px;" src="/static/img/my-default.png"></image>
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
    </view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			teamDatas: [
				{
					id: 0,
					pic: '../../../../../dist/dev/mp-weixin/static/img/my-default.png',
					name: '付建达',
					phone: '16619941016',
					inviter: '方胜利',
					verifier: 'lili',
					applyReason: 'aaaaaaaaaaaaaaaaaaaaa'
				},
				{
					id: 1,
					pic: '../../../../../dist/dev/mp-weixin/static/img/my-default.png',
					name: '高阳',
					phone: '16619941016',
					inviter: '高德勇',
					verifier: 'lili',
					applyReason: 'bbbbbbbbbbbbbbbbbbbbb'
				},
				{
					id: 2,
					pic: '../../../../../dist/dev/mp-weixin/static/img/my-default.png',
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
