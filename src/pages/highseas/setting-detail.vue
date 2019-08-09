<!--
/**
* @author 冀猛超
* @name 公海池详情
* @date 2019年8月09日
**/
-->
<template>
    <div class='setting-page'>
        <NavBar title='公海池设置' />
        <div class='d-bg-white setting-title d-flex pl15' :style='"top:"+ navH +""'>
            <div class="tit-item mr20 f14 d-text-black" :class='{active: scrollTop == 0}' @click='handleScroll(0)'>基本信息</div>
            <div class="tit-item ml20 f14 d-text-black" :class='{active: scrollTop > 0}' @click='handleScroll(500)'>规则设置</div>
        </div>
        <scroll-view :scroll-top='scrollTop' scroll-y :style="'height:calc(100vh - '+ navH +' - 46px - 50px);margin-top:40px;'">
            <m-form ref="mform" :model="info" :rules="rules" class="uni-pb100">
                <div class='d-bg-white'>
                    <mPanel title="基本信息" color="#4889f4">
                        <i-input label="公海名称" v-model='info.name' disabled required />

                        <a url='/pages/index/colleagueChoose'>
                            <i-input label="管理员" v-model='administratorName' placeholder="添加管理员" disabled required>
                                <div class="d-center hfull">
                                    <div class="isarrow"></div>
                                </div>
                            </i-input>
                        </a>

                        <a url='/pages/application/enterprise-management/organizational-structure'>
                            <i-input label="公海成员" placeholder="添加成员部门" disabled required>
                                <div class="d-center hfull">
                                    <div class="isarrow"></div>
                                </div>
                            </i-input>
                        </a>

                        <div class='pl15 p15'>
                            <div class='uni-h50 uni-lh50'>
                                <label class='d-text-red'>*</label>
                                <label class='d-elip d-text-black'>公海类型</label>
                            </div>
                            <div class='pl15'>
                                <div class="d-center pt15" :class="{bb: index === 0, pb15: index===0}" v-for='(item, index) in CRM_GHLX' :key='item.id'>
                                    <m-radio :label='item.code' v-model='info.type' /><div class='ml15 d-cell f13'>{{item.content}}</div>
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
                                    <m-radio :label='0' v-model='viewClientId' @change='changeViewClient(0)' /><div class='ml15 d-cell f13'>无限制</div>
                                </div>
                                <div class='d-center'>
                                    <m-radio :label='1' v-model='viewClientId' @change='changeViewClient(1)' />
                                    <input type="number" v-model='info.viewClientNum' :disabled='viewClientId !== 1' maxlength='32' class="input-box ml15 mr10 ac">
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
                                    <input type="number" v-model='info.getClientNumMax' maxlength='32' class="input-box ml15 mr10 ac" style='width: 100px;'>
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
                                    <input type="number" v-model='info.getClientType' maxlength='32' class="input-box ml15 mr10 ac" style='width: 100px;'>
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
                                <i-switch slot="footer" :value='info.recycleType' @change='handleChange'>
                                    <view slot="open">开</view>
                                    <view slot="close">关</view>
                                </i-switch>
                            </div>
                        </div>

                        <div class='pl15' v-show='isRetrieve'>
                            <div class='pl15 pr15 pb10'>
                                <div class='d-center'>
                                    <m-radio :label='0' v-model='retrieveId' @change='changeRetrieve(0)' />
                                    <input type="number" maxlength='32' v-model='info.followRecycleDaysNum' class="input-box ml15 mr10 ac">
                                    <div class="d-cell">
                                        天 未跟进，则回收
                                    </div>
                                </div>
                            </div>
                            <div class='pl15 pr15 pb10'>

                                <div class='d-center'>
                                    <m-radio :label='1' v-model='retrieveId' @change='changeRetrieve(1)'  />
                                    <input type="number" maxlength='32' v-model='info.bargainRecycleDaysNum' class="input-box ml15 mr10 ac">
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
            <i-button type="primary" i-class="f16" @click='submit'>保存</i-button>
        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			isRetrieve: false, // 是否自动回收客户
			retrieveId: 0,
			scrollTop: 0,
			id: 0, // 公海池 id
			administratorName: '', // 管理员回显名称
			viewClientId: 0, // 数量名称 id
			info: {
				id: '',
				name: '',
				recycleType: '', // 客户自动回收(0-关闭,1-打开)
				administratorId: '', // 管理员
				getClientType: '', // 连续领取规则
				getClientNumMax: '', // 领取客户上限
				memberDeptCode: '', // 公海部门成员
				bargainRecycleDaysNum: '', // 未成交自动回收天数
				followRecycleDaysNum: '', // 未跟进自动回收天数
				type: 'CRM_GHLX-1', // 公海类型
				viewClientNum: '' // 查看客户数量限制
			},
			rules: {
				name: [{
					required: true,
					message: '请输入客户名称'
				}],
				administratorId: [{
					required: true,
					message: '请选择管理员'
				}],
				memberDeptCode: [{
					required: true,
					message: '请选择公海成员'
				}],
				type: [{
					required: true,
					message: '请选择公海类型'
				}]
			}
		}
	},
	onLoad (data) {
		this.info.id = data.poolId
		this.getDetailInfo(data.poolId)
		uni.$on('colleagueChoose', data => {
			this.info.administratorId = data.data[0].id
			this.administratorName = data.data[0].employeeName
		})
	},
	onShow () {
		// let pages = getCurrentPages()
		// let currPage = pages[pages.length - 1]
		// // 从“选择部门”页面返回的数据
		// if (currPage.data.backFromOrg) {
		//     this.info.deptId = currPage.data.deptId
		//     this.info.deptName = currPage.data.deptName
		// }
	},
	computed: {
		CRM_GHLX () {
			return this.dictionaryOptions('CRM_GHLX')
		}
	},
	methods: {
		getDetailInfo (id) {
			this.$api.seeCrmService.clientpublicpoolInfo(null, id).then(res => {
				//
				this.retrieveId = res.data.followRecycleDaysNum ? 0 : 1
				// 客户是否自动回收
				this.isRetrieve = !!res.data.recycleType

				// 客户数量限制
				this.viewClientId = res.data.viewClientNum === -1 ? 0 : 1

				this.info = res.data || {}
			})
		},
		// 是否开启自动回收
		handleChange (val) {
			this.isRetrieve = !this.isRetrieve
			// 设置 form 值
			this.info.recycleType = +this.isRetrieve

			// 如果为关闭 则默认为 空
			if (!this.isRetrieve) {
				this.info.bargainRecycleDaysNum = ''
				this.info.followRecycleDaysNum = ''
			}
		},
		handleScroll (top) {
			this.scrollTop = top || 0
		},

		changeViewClient (id) {
			this.viewClientId = id
			//
			if (id === 0) {
				this.info.viewClientNum = 0
			}
		},

		changeRetrieve (id) {
			if (id === 0) {
				this.info.bargainRecycleDaysNum = 0
			} else {
				this.info.followRecycleDaysNum = 0
			}
		},

		//
		async submit () {
			await this.$refs.mform.validate()
			this.$api.seeCrmService.clientpublicpoolUpdate(this.info).then(res => {
				this.$routing.navigateBack()
			})
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

    .input-box{
        height: 33px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        padding:0 5px;
        color: #c0c0c0;
        width: 44px;
    }

</style>
