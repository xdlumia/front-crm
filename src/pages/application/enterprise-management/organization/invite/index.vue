<!--
/**
* @author王艳龙
* @name 邀请成员加入团队
* @date 2019年8月2日
**/
-->
<template>
    <view>
        <NavBar title="邀请成员加入团队" />
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V mt10">
                <button open-type="share" class="wfull" style="padding-left:0">
                    <i-cell class="fl wfull al" title="通过微信邀请" is-link></i-cell>
                </button>
            </view>
            <!-- <view>
                <button class="wfull" style="padding-left:0" @click="share">
                    <i-cell class="fl wfull al" title="测试分享页面" is-link></i-cell>
                </button>
            </view> -->
            <view class="flex-item flex-item-V h10 d-bg-gray pl15 pt5 pb5" style="color: #999999;">发送链接给微信好友，微信群</view>
            <view class="flex-item flex-item-V pl15 mt15 mb15">
                <view class="fl width60">
                    <input class="ba p1 h10 f12" placeholder="链接" :value="link" />
                </view>
                <view class="fl width30 ml10" style="padding-top:3px">
                    <button type="primary" plain="true" style="color:#0080FF ; border-color: #0080FF;border-style: solid; " @tap="copyToClip">复制链接</button>
                </view>
            </view>
            <view class="flex-item flex-item-V h10 d-bg-gray pl15 pt5 pb5" style="color: #999999;">通过链接邀请，点击复制链接，发送给企业成员</view>
        </view>
    </view>
</template>
<script>
export default {
	data () {
		return {
			link: 'https://crm.zhenkehu.com:1443/index.html',
			image: '',
			shareText: '团队邀请',
			avatarUrl: '',
			company: {},
			user: {}
		}
	},
	onShareAppMessage () {
		return {
			title: this.shareText ? this.shareText : '欢迎体验',
			path: '/pages/application/enterprise-management/organization/invite/invite?inviter=' + this.user.name + '&companyName=' + this.company.companyName + '&companyCode=' + this.company.companyCode + '&avatarUrl=' + this.avatarUrl,
			imageUrl: 'https://fmd-a-oss.oss-cn-beijing.aliyuncs.com/public/crm/join_crm.jpg',
			desc: this.user.name + '邀请你加入' + this.company.companyName
		}
	},
	onLoad (option) {
		this.company = this.$local.fetch('companyInfo')
		this.user = this.$local.fetch('userInfo')
		this.avatarUrl = option.avatarUrl || ''
		this.link = this.link + '?inviter=' + this.user.name + '&companyName=' + this.company.companyName + '&companyCode=' + this.company.companyCode + '&avatarUrl=' + this.avatarUrl
	},
	methods: {
		share () {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/organization/invite/invite?inviter=' + this.user.name + '&companyName=' + this.company.companyName + '&companyCode=' + this.company.companyCode + '&avatarUrl=' + this.avatarUrl
			})
		},
		copyToClip () {
			var data = encodeURI(this.link)
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
    .width60{
        width: 60%;
    }
    .width30{
        width: 30%;
    }
</style>
