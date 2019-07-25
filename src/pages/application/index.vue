<template>
    <div>
        <NavBar title="应用" />
        <div class="hfull wfull">
            <div class="flexcenter hfull wfull pt20" style='background: #FFF;'>
                <div class="flexalone flexcenter flexconm d-text-black">
                    <i class="iconfont icontongyekehuguanli" style="color: #FF9A26;"></i>
                    <span>客户管理</span>
                </div>
                <div class="flexalone flexcenter flexconm d-text-black">
                    <i class="iconfont iconqian" style="color: #4889F4;"></i>
                    <span>销售机会</span>
                </div>
                <div class="flexalone flexcenter flexconm d-text-black">
                    <i class="iconfont f20 icongengduo1" style="color: #00CA8D;"></i>
                    <span>客户公海池</span>
                </div>
            </div>
            <div class="mt20" style="height: 10px;background: #F9F9F9;"></div>
            <div class="d-flex flexconm" style="height: 190px;">
                <div class="flexalone borbottom flexcenter">
                    <div class="flexalone flexcenter">
                        <div style='width: 100px;'>
                            <i class="iconfont f20 iconjiaoyijilu" style="color: #81A4F8;"></i>
                            <span class="ml15">成交记录</span>
                        </div>
                    </div>
                    <div class="flexalone flexcenter">
                        <div style='width: 100px;'>
                            <i class="iconfont f20 iconlianxiren" style="color: #00CA8D;"></i>
                            <span class="ml15">联系人</span>
                        </div>
                    </div>
                </div>
                <div class="flexalone borbottom flexcenter">
                    <div class="flexalone flexcenter">
                        <div style='width: 100px;'>
                            <i class="iconfont f20 iconsaoyisaojianjieban" style="color: #8E54ED;"></i>
                            <span class="ml15">扫名片</span>
                        </div>
                    </div>
                    <div class="flexalone flexcenter">
                        <div style='width: 100px;'>
                            <i class="iconfont f20 iconmingpian" style="color: #9bb7F9;"></i>
                            <span class="ml15">智能名片</span>
                        </div>
                    </div>
                </div>
                <div class="flexalone borbottom flexcenter">
                    <div class="flexalone flexcenter">
                        <div style='width: 100px;'>
                            <i class="iconfont f20 iconhaofangtuoiconfont_wodepeixun" style="color: #FF9A26;"></i>
                            <span class="ml15">培训助手</span>
                        </div>
                    </div>
                    <div class="flexalone flexcenter">
                        <a url='/pages/application/enterprise-management/index' style='width: 100px;'>
                            <i class="iconfont f20 iconduoren" style="color: #4D7FF5;"></i>
                            <span class="ml15">企业管理</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt20" style="height: 10px;background: #F9F9F9;"></div>
        </div>
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

	},
	created () {}
}
</script>

<style scoped lang="scss">
.flexcenter{display: flex;justify-content: center;align-items: center;}
.flexalone{flex: 1;}
.flexconm{flex-direction: column;}
.borbottom{border-bottom: 1px solid #F9F9F9;}
</style>
