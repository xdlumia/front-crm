|<template>
	<view>
		<NavBar title="企业管理" />
		<view class="uni-flex uni-column">
			<view class="flex-item flex-item-V mt15">
				<view class="this-font fl pl15">通过微信邀请</view>
				<view class="fr pr15">
					<button plain="true" open-type="share" style="border-color: #FFFFFF;" class="this-font">></button>
				</view>
			</view>
			<view class="flex-item flex-item-V tip-font pl15 pr15 pb15 bb">发送链接给微信好友，微信群</view>
			<view class="flex-item flex-item-V pl15 mt15">
				<view class="fl width60">
					<input class="ba" placeholder="链接" :value="link" />
				</view>
				<view class="fl width30 ml10">
					<button type="primary" plain="true" class="ba" style="color:#0080FF ; border-color: #0080FF;" @tap="copyToClip">复制链接</button>
				</view>
			</view>
			<view class="flex-item flex-item-V tip-font pl15 pr15 pb15">通过链接邀请，点击复制链接，发送给企业成员</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			link: 'https://wx.dingtalk.com/invite-page/weix'
		}
	},
	onShareAppMessage () {
		return {
			title: this.shareText ? this.shareText : '欢迎体验uni-app',
			path: '/pages/tabBar/component/component',
			imageUrl: this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
		}
	},
	methods: {
		copyToClip () {
			var data = this.link
			if (data.length === 0) {
				uni.showModal({
					title: '设置剪贴板失败',
					content: '内容不能为空',
					showCancel: false
				})
			} else {
				uni.setClipboardData({
					data: data,
					success: () => {
						// 成功处理
						// #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
						uni.showToast({
							title: '设置剪贴板成功',
							icon: 'success',
							mask: !1
						})
						// #endif
					},
					fail: () => {
						// 失败处理
						// #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
						uni.showToast({
							title: '储存数据失败!',
							icon: 'none',
							mask: !1
						})
						// #endif
					}
				})
			}
		}
	}
}
</script>

<style>
	.this-font{
		font-family: '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 13px;
	}
	.tip-font{
		font-size: 10px;
		color: #999999;
	}
	.width60{
		width: 60%;
	}
	.width30{
		width: 30%;
	}
</style>
