<template>
    <div class="user-page">
        <NavBar title="我的" />
        <div class="user-info-box pl15 pr15">
            <div class="user-info d-bg-white p20 pb0">
                <div class="d-center">
                    <div class="d-cell">
                        <div class='f18 b d-text-black mb5'>{{phone}}</div>
                        <a url='/pages/user/user-info' class="f12 d-text-gray">点击查看个人信息 ></a>
                    </div>
                    <img v-if="avatarUrl" :src='avatarUrl' class="avatar-img d-circle">
                    <view v-else>
                        <button open-type="getUserInfo" @getuserinfo="handleUserInfoClick" class="ba d-circle d-bg-blue d-center avatar-img">
                            {{name.substring(name.length -2)}}
                        </button>
                    </view>
                </div>
                <div class="d-center lh35 bt mt15">
                    <div class=' d-flex'>
                        <span class='d-cell d-text-gray'>我的微信名片</span>
                        <span class="pl5">{{name}}</span>
                        <span class="ml5 mr5 d-text-cgray">|</span>
                    </div>
                    <div class='d-cell d-flex'>
                        <span class='d-cell d-text-gray'>{{positionName}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="attention-box pl20 pr20">
            <div class="f14 d-text-black">我的关注</div>
            <div class="d-center attention-item-box ac pl10 pr10 pb10">
                <a url='/pages/contact/index?queryType=2' class="f12 d-text-qgray">
                    <div class="icon-box d-center">
                        <i-icon type="like_fill" color="#ff5533" size="26" />
                    </div>
                    <div>联系人</div>
                </a>
                <a @click="switchTabTo('client')" class="f12 d-text-qgray">
                     <div class="icon-box d-center">
                        <span class="iconfont iconkehuziliao f16" style='color:#00b17b'></span>
                    </div>
                    <div>客户</div>
                </a>
                <a url='/pages/transaction/index?queryType=2' class="f12 d-text-qgray">
                     <div class="icon-box d-center">
                        <span class="iconfont iconshouye_chengjiaoshujurili f20" style='color:#4889f4'></span>
                    </div>
                    <div>成交记录</div>
                </a>
                <a @click="switchTabTo('chance')" class="f12 d-text-qgray">
                     <div class="icon-box d-center">
                        <span class="iconfont iconqian f20" style='color:#4e89f4'></span>
                    </div>
                    <div>销售机会</div>
                </a>
            </div>
        </div>

        <i-cell-group>
            <i-cell title="帮助中心" is-link url='/pages/user/help'></i-cell>
            <i-cell title="意见反馈" is-link url='/pages/user/feedback'></i-cell>
            <button class='al' style='padding:0;' open-type="contact">
                <i-cell title="我的客服" is-link></i-cell>
            </button>
            <i-cell title="推荐给好友" is-link @click='openPop'></i-cell>
            <i-cell title="客服电话" value='010-80755370' @click="callPhone('010-80755370')"></i-cell>
        </i-cell-group>

        <uni-popup ref="popup" type='bottom' custom>
            <div class="d-bg-white">
                <div class="d-center pt10 pb10">
                    <div class="d-cell ac">
                        <button open-type="share">
                            <div class='pop-icon d-center'>
                                <uni-icon type='weixin' size='26' color='#fff' />
                            </div>
                            <div class='f12 mt5' style='color: #07BD13'>微信</div>
                        </button>
                    </div>
                    <a url='/pages/user/poster' class="d-cell ac">
                        <div class='pop-icon d-center' style='background:#3399ff'>
                            <div class='iconfont iconmingpian2 d-text-white f24' ></div>
                        </div>
                        <div class="f12 mt5" style='color:#3399ff'>名片海报</div>
                    </a>
                </div>
                <div class='bt pt5 pb5 f16 d-text-black ac' @click='$refs.popup.close()'>取消</div>
            </div>
        </uni-popup>

    </div>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			phone: '',
			avatarUrl: '',
			name: '',
			positionName: ''
		}
	},
	onLoad (option) {
		let userInfo = this.$local.fetch('userInfo') || {}
		this.phone = userInfo.phone.substring(0, 3) + '****' + userInfo.phone.substring(userInfo.phone.length - 4)
		this.avatarUrl = userInfo.avatarUrl
		this.name = userInfo.name
		this.positionName = userInfo.positionName === null ? '' : userInfo.positionName
	},
	methods: {
		switchTabTo (url) {
			this.$local.setItem('queryType', 2)
			this.$routing.switchTab('/pages/' + url + '/index')
		},
		// 获取并保存用户头像
		handleUserInfoClick ({ mp }) {
			if (mp.detail.encryptedData && mp.detail.iv) {
				// 保存用户头像
				this.$api.seeCrmService.organizationalStructureUpdateAvatar({
					'id': this.$local.fetch('userInfo').employeeId,
					'avatarUrl': mp.detail.userInfo.avatarUrl
				}).then((response) => {
					if (response.code === 200) {
						// 更新用户头像
						this.avatarUrl = mp.detail.userInfo.avatarUrl
						this.$store.commit('setavatarUrl', this.avatarUrl)
					} else {
						this.$utils.toast.text(response.msg)
					}
				})
			}
		},
		openPop () {
			this.$refs.popup.open()
		}
	},
	onHide () {
		try {
			this.$refs.popup.hide()
		} catch (err) {

		}
	},
	onShareAppMessage () {
		return {
			title: 'test title',
			imageUrl: '/static/img/share.jpg',
			path: '' // 这里的 path 是页面 url，而不是小程序路由
		}
	}
}
</script>

<style scoped lang="scss">
    .user-info-box{
        height: 107px;
        background: #3c394b;
        padding-top: 1px;
        .user-info{
            margin-top: 22px;
            border-radius: 8px;
            box-shadow: 1px 1px 3px #f1f1f1;
        }

        .avatar-img{
            border-radius: 100px;
            width: 60px;
            height: 60px;
        }

    }

    .attention-box{
        padding-top: 60px;
        border-bottom: 10px solid #f9f9f9;
        .attention-item-box{
            justify-content: space-between;
        }

        .icon-box{
            display: inline-block;
            width: 22px;
            height: 30px;
        }
    }

    .pop-icon{
        width: 45px;
        height: 45px;
        background: #07BD13;
        margin: 0 auto;
        border-radius: 100px;
    }

</style>
