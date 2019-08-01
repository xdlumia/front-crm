<template>
    <div class='setting-page'>
        <NavBar title='公海池设置' />
        <div class='d-bg-white setting-title d-flex pl15' :style='"top:"+ navH +""'>
            <div class="tit-item mr20 f14 d-text-black" :class='{active: scrollTop == 0}' @click='handleScroll(0)'>基本信息</div>
            <div class="tit-item ml20 f14 d-text-black" :class='{active: scrollTop > 0}' @click='handleScroll(500)'>规则设置</div>
        </div>
        <scroll-view :scroll-top='scrollTop' scroll-y :style="'height:calc(100vh - '+ navH +' - 46px);margin-top:40px;'">
            <m-form ref="mform" class="uni-pb100">
                <div class='d-bg-white'>
                    <mPanel title="基本信息" color="#4889f4">
                        <i-input label="公海名称" placeholder="北海一区公海" disabled required />

                        <a url='/pages/index/colleagueChoose'>
                            <i-input label="管理员" placeholder="添加管理员" disabled required>
                                <div class="isarrow"></div>
                            </i-input>
                        </a>

                        <a url='/pages/application/enterprise-management/organizational-structure'>
                            <i-input label="公海成员" placeholder="添加成员部门" disabled required>
                                <div class="isarrow"></div>
                            </i-input>
                        </a>
                        <div class='pl15 p15'>
                            <div class='uni-h50 uni-lh50'>
                                <label class='d-text-red'>*</label>
                                <label class='d-elip d-text-black'>公海类型</label>
                            </div>
                            <div class='pl15'>
                                <div class="bb d-center pb15 pt15">
                                    <span class='radio-box d-inline active'></span><div class='ml15 d-cell f13'>成员可见可领取，管理员可分配</div>
                                </div>
                                <div class="d-center pt15">
                                    <span class='radio-box d-inline'></span><div class='ml15 d-cell f13'>成员不可见，管理员可分配</div>
                                </div>
                            </div>
                        </div>
                    </mPanel>
                </div>

                <div class="d-bg-white mt10">
                    <mPanel top="10" title="规则设置" color="#4889f4">
                        <div class='bb pl15 pr15 pt10 pb10'>
                            <div class='uni-h50 uni-lh50'>
                                <label class='d-elip d-text-black  f13'>查看客户数量限制</label>
                            </div>
                            <div class='pl15 pr15'>
                                <div class="d-center pb15 pt15">
                                    <span class='radio-box d-inline active'></span><div class='ml15 d-cell f13'>无限制</div>
                                </div>
                                <div class='d-center'>
                                    <span class='radio-box d-inline active'></span>
                                    <input type="number" class="input-box ml15 mr10 ac">
                                    <div class="d-cell">
                                        个
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='d-center bb  pl15 pr15 pt10 pb10'>
                            <div class='uni-h50 uni-lh50'>
                                <label class='d-elip d-text-black  f13'>领取客户上限</label>
                            </div>
                            <div class='pl15 pr15 d-cell'>
                                <div class='d-center'>
                                    <input type="number" class="input-box ml15 mr10 ac" style='width: 100px;'>
                                    <div class="d-cell">
                                        人
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='d-center pl15 pr15 bb pt10 pb10'>
                            <div class='uni-h50 uni-lh50'>
                                <label class='d-elip d-text-black f13'>连续领取规则</label>
                            </div>
                            <div class='pl15 pr15 d-cell'>
                                <div class='d-center'>
                                    <input type="number" class="input-box ml15 mr10 ac" style='width: 100px;'>
                                    <div class="d-cell">
                                        天
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='pl15 pr15 pt10 pb10 d-center'>
                            <div class='uni-h50 uni-lh50 d-cell'>
                                <label class='d-elip d-text-black f13'>客户自动回收</label>
                            </div>
                            <div>
                                <i-switch slot="footer" :value='switch1' @change='handleChange'>
                                    <view slot="open">开</view>
                                    <view slot="close">关</view>
                                </i-switch>
                            </div>
                        </div>

                        <div class='pl15' v-show='switch1'>
                            <div class='pl15 pr15 pb10'>
                                <div class='d-center'>
                                    <span class='radio-box d-inline active'></span>
                                    <input type="number" class="input-box ml15 mr10 ac">
                                    <div class="d-cell">
                                        天 未跟进，则回收
                                    </div>
                                </div>
                            </div>
                            <div class='pl15 pr15 pb10'>

                                <div class='d-center'>
                                    <span class='radio-box d-inline active'></span>
                                    <input type="number" class="input-box ml15 mr10 ac">
                                    <div class="d-cell">
                                        天 未成交，则回收
                                    </div>
                                </div>
                            </div>
                        </div>

                    </mPanel>
                </div>

            </m-form>
        </scroll-view>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16">保存</i-button>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			switch1: false,
			scrollTop: 0
		}
	},
	methods: {
		handleChange (val) {
			this.switch1 = !this.switch1
		},
		handleScroll (top) {
			this.scrollTop = top || 0
		}
	}
}
</script>

<style lang="scss" scoped>

    .setting-page{
        height: 100vh;
        background: #f6f6f6;
    }

    .setting-title{
        position: fixed;
        left: 0;
        right: 0;
        height: 37px;
        border-bottom: 2px solid #dcdfe6;
        .tit-item{
            line-height: 37px;
            position: relative;
            &.active{
                border-bottom: 2px solid #1890ff;
            }
        }
    }

    .radio-box{
        width: 15px;
        height: 15px;
        border-radius: 100px;
        border: 1px solid #d9d9d9;
        position: relative;
        &.active{
        border-color: #1890ff;
            &::before{
                content: '';
                width: 11px;
                height: 11px;
                background: #1890ff;
                border-radius: 100px;
                position: absolute;
                left: 2px;
                top: 2px;
            }
        }
    }

    .input-box{
        height: 33px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        padding:0 5px;
        color: #c0c0c0;
        width: 44px;
    }

</style>
