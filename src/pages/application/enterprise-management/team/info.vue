<!--
/**
* @author王艳龙
* @name 详细信息
* @date 2019年8月2日
**/
-->
<template>
    <view>
        <NavBar title="详细信息" />
        <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V uni-flex uni-row bb pt10">
                    <view class="flex-item ml10">
                    <!-- <image class="ba" style="height: 51px;width: 51px;" :src='pic'></image> -->
                    <mAvatar :text='name' :url='pic'></mAvatar>
                    </view>
                    <view class="flex-item ml10">
                        <view class="m5 f14">{{name}}</view>
                        <view class="m5 d-text-qgray">+86-{{phone}}</view>
                    </view>
                    <view class="ml10"></view>
            </view>
            <view class="flex-item flex-item-V bb pl20">
                <view class="pl50 m5 pl10">由<span style="color:#5081F5;">{{inviter}}</span>邀请加入</view>
                <view class="pl50 m5 pl10">由<span style="color:#5081F5;">{{verifier}}</span>同意加入</view>
            </view>
            <view class="flex-item flex-item-V pl20">
                <view class="pl50 m5 pl10 d-text-qgray">申请理由</view>
                <view class="pl50 m5 pl10">{{applyReason}}</view>
            </view>
            <!-- <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view> -->
            <!-- <view class="flex-item flex-item-V"> -->
                <!-- <button class="width90 f15 p5 h30" style="border: none;" plain="true">已同意</button> -->
                <i-button  class="mt30 ba title-font wfull" style="text-align: center;">已同意</i-button>
            <!-- </view> -->
        </view>
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
			id: 0,
			pic: '',
			name: '',
			phone: '',
			inviter: '',
			verifier: '',
			applyReason: ''
		}
	},
	onLoad (option) {
		if (option.item) {
			let item = JSON.parse(option.item)
			this.pic = item.pic
			this.name = item.name
			this.phone = item.phone
			this.inviter = item.inviter
			this.verifier = item.verifier
			this.applyReason = item.applyReason
		}
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
    .width90{
        width: 90%;
    }
</style>
