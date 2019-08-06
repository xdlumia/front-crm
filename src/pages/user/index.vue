<template>
    <div class="user-page">
        <NavBar title="我的" />
        <div class="user-info-box pl15 pr15">
            <div class="user-info d-bg-white p20 pb0">
                <div class="d-center">
                    <div class="d-cell">
                        <div class='f18 b d-text-black mb5'>189****1456</div>
                        <a url='/pages/user/user-info' class="f12 d-text-gray">点击查看个人信息 ></a>
                    </div>
                    <img class="avatar-img" src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="">
                </div>
                <div class="d-center lh35 bt mt15">
                    <a class='d-cell d-flex'>
                        <span class='d-cell d-text-gray'>我的微信名片</span>
                        <span>黄玉莉</span>
                    </a>
                    <a class='d-cell d-flex'>
                        <span class='d-cell d-text-gray'>总经理</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="attention-box pl20 pr20">
            <div class="f14 d-text-black">我的关注</div>
            <div class="d-center attention-item-box ac pl10 pr10 pb10">
                <a url='/pages/contact/index' class="f12 d-text-qgray">
                    <div class="icon-box">
                        <i-icon type="like_fill" color="#ff5533" size="26" />
                    </div>
                    <div>联系人</div>
                </a>
                <a url='/pages/client/index' open-type='switchTab' class="f12 d-text-qgray">
                     <div class="icon-box">
                        <span class="iconfont iconkehuziliao f16" style='color:#00b17b'></span>
                    </div>
                    <div>客户</div>
                </a>
                <a url='/pages/transaction/index' class="f12 d-text-qgray">
                     <div class="icon-box">
                        <span class="iconfont iconshouye_chengjiaoshujurili f20" style='color:#4889f4'></span>
                    </div>
                    <div>成交记录</div>
                </a>
                <a url='/pages/chance/index' open-type='switchTab' class="f12 d-text-qgray">
                     <div class="icon-box">
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
                <i-cell title="在线咨询" is-link></i-cell>
            </button>
            <i-cell title="推荐给好友" is-link @click='openPop'></i-cell>
            <i-cell title="客服电话" value='1810474315' @click="callPhone('181811111111')"></i-cell>
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
                    <a class="d-cell ac">
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

		}
	},
	onLoad (option) {

	},
	methods: {
		openPop () {
			this.$refs.popup.open()
		}
	},
	created () {

	},
	onShareAppMessage () {

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
            height: 22px;
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
