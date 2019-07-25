<template>
    <view class="uni-flex uni-column">
        <view class="flex-item flex-item-V bb uni-flex uni-row p15" v-for="(item) in teamDatas" :key="item.is">
             <view class="flex-item width20 p10">
                <image class="ba" style="height: 51px;width: 51px;" src="../../../../../dist/dev/mp-weixin/static/img/my-default.png"></image>
            </view>
            <view class="flex-item width30">
                <view class="name-font">{{item.name}}</view>
                <view class="tip-font">来源</view>
                <view>由<span style="color:#5081F5;">{{item.inviter}}</span>邀请加入</view>
                <view class="tip-font">申请理由</view>
                <view>{{item.applyReason}}</view>
            </view>
            <view class="flex-item width50" style="margin: 40px 0;">
                <button type="primary"
                size="8px" plain="true"
                style="float: left;margin-left: 4px;color: #4889F4;border-color: #4889F4;"
                @tap="toEditor">同意</button>
                <button type="warn" size="8px" plain="true" style="float: left;margin-left: 4px;">删除</button>
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
					inviter: '方胜利',
					applyReason: 'aaaaaaaaaaaaaaaaaaaaa'
				},
				{
					id: 0,
					pic: '../../../../../dist/dev/mp-weixin/static/img/my-default.png',
					name: '高阳',
					inviter: '高德勇',
					applyReason: 'bbbbbbbbbbbbbbbbbbbbb'
				},
				{
					id: 0,
					pic: '../../../../../dist/dev/mp-weixin/static/img/my-default.png',
					name: '梵高先生',
					inviter: '李丽兰',
					applyReason: 'cccccccccccccccccccccccccccccccc'
				}
			]
		}
	},
	onLoad (option) {

	},
	methods: {
		toEditor () {
			uni.navigateTo({
				url: 'editor/index?isEditor=1'
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
    .width30{
        width: 30%;
    }
    .width50{
        width: 50%;
    }
    .name-font{
        font-family: 'PingFangSC-Regular', 'PingFang SC';
        font-weight: 400;
        font-style: normal;
        font-size: 16px;
        text-align: left;
    }
    .tip-font{
        font-size: 10px;
        color: #999999;
    }
</style>
