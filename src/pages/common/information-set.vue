<!-- 信息设置 -->
<!-- 徐贺 -->
<template>
<div class="d-bg-white">
    <NavBar :title="`${typeform[busType]}信息设置`"/>

    <div class="inforcollese" @click="iscollapse = !iscollapse">
        <span class="f14 d-text-black">系统内置字段</span>
        <uni-icon v-if="!iscollapse" type="arrowdown" class="pl5 d-text-qgray" color='#999' size="20"/>
        <uni-icon v-if="iscollapse" type="arrowup" class="pl5 d-text-qgray" color='#999' size="20"/>
    </div>
    <div v-if="iscollapse">
        <span v-for="(item,index) in informationList" :key="index">
            <i-cell :title="item.fieldName" v-if="item.isOriginal == 1"></i-cell>
        </span>
        <div style="height:50px;line-height:50px;background:#F9F9F9">
            <span class="f12 ml15" style="color:#999"><i-icon type='prompt_fill' color="#999" size='20' class="mr5"/>系统内置字段不可以选择、删除；</span>
        </div>
    </div>

    <scroll-view style="height:calc(100vh - 178px)" scroll-y>
        <radio-group class="uni-list" @change="onChange">
                <span v-for="(item, index) in informationList" :key="index">
                    <span v-if="item.isOriginal == 0">

                        <div v-if="!item.ishandel" class="setCell d-flex wfull" style="height:50px;height:49px;line-height:49px;align-items: center;justify-content: space-between;">
                            <div style="display:flex;align-items: center;">
                                <span v-if="!item.ishandel" class="d-text-black ml15 fl">{{item.fieldName}}</span>
                                <div class="ml5 fl" v-if="!item.ishandel" @click="changeHandelStatus(index)">
                                    <i-icon
                                        class="ml5 fr"
                                        type="brush"
                                        color="#1890FF"
                                        size="20"
                                    />
                                </div>
                            </div>
                            <div style="display:flex;align-items: center;">
                                <uni-icon @click="fdelete(item.id)" class="mr10" type='minus-filled' color="#EB4D3D" size='20'/>
                                <m-checkbox class="mr15 mt5" v-model="checkList" :label='item.id'/>
                            </div>
                        </div>

						<div class="d-flex mationInfo" v-if="item.ishandel" style="border-top:1px solid #F2F2F2">
							<div class="hfull flexcenter mationInfo-top">
								<!-- <uni-icon @click="isShow = false" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/> -->
								<input maxlength="6" v-model="item.fieldName" placeholder="属性名称" class="ml15"/>
								<uni-icon type='arrowright' size='18' color='#696969' />
							</div>
							<div class="hfull d-flex mationInfo-middle">
								<view class="formType wfull" @click="openPopup(item)">
									<div style="display:flex;justify-content: space-between;align-items: center;width:100%" class="fl hfull">
										<div class="f12 pl5 d-elip ml5" style="color:#999">{{item.fieldType == 3 ? tagForm[item.groupCode] : msgForm[item.fieldType]}}</div>
										<uni-icon type='arrowright' size='16' color='#696969' class="mr5"/>
									</div>
								</view>
							</div>

							<div style="calc(100vw - 310px)" class="hfull flexcenter">
								<div class="ac d-text-blue m5 subButton" @click="handelTags(item)">
									<span class="f13">确定</span>
								</div>
							</div>
						</div>
                    </span>
                </span>
        </radio-group>

        <div class="d-flex mationInfo" v-if="isShow">
            <div class="hfull flexcenter mationInfo-top">
                <uni-icon @click="isShow = false" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
                <input maxlength="6" v-model="listForm.fieldName" placeholder="属性名称" class="ml5"/>
                <uni-icon type='arrowright' size='18' color='#696969' />
            </div>
            <div class="hfull d-flex mationInfo-middle">
                    <view class="formType wfull" @click="openPopup(0)">
                        <!-- <div class="d-text-black f13 ml5 fl hfull" style="width:55px;line-height:60px">表单类型</div> -->
                        <div style="display:flex;justify-content: space-between;align-items: center;width:100%" class="fl hfull">
                            <div class="f12 pl5 d-elip ml5" style="color:#999">{{tagName ? tagName : msgName || '表单类型'}}</div>
                            <uni-icon type='arrowright' size='16' color='#696969' class="mr5"/>
                        </div>
                    </view>
            </div>

            <div style="calc(100vw - 310px)" class="hfull flexcenter">
                <div class="ac d-text-blue m5 subButton" @click="saveformsfieldconfig">
                    <span class="f13">确定</span>
                </div>
            </div>
        </div>

		<div @click="isPopup = false" v-if="isPopup" style="position:absolute;top:0;bottom:0;left:0;right:0;z-index:990;background:rgba(0,0,0,.4)" class="wfull">
		</div>
		<div v-if="isPopup" style="height:303px;z-index:999;position:fixed;bottom:0;width:100%;background:#FFF">
			<div style="width:100%;height:50px;line-height:50px;border-bottom:1px solid #f2f2f2;color:333" class="f13 ac">选择表单类型</div>
			<div style="height:204px;display:flex">
				<div class="hfull d-auto-y" style="flex:1;border-right:1px solid #f2f2f2">
					<div @click="getmsgName(item)" v-for="(item,index) in msgArr" :key='index' class="ac d-text-black" style="line-height:50px;border-bottom:1px solid #f2f2f2;">
						{{item.name}}
					</div>
				</div>
				<div v-if='msgid == 3' class="hfull d-auto-y" style="width:270px">
					<div @click="gettagName(item)" v-for="(item,index) in tagAllList" :key='index' class="ac d-text-black" style="line-height:50px;border-bottom:1px solid #f2f2f2;">
						{{item.labelName}}
					</div>
				</div>
			</div>
			<div @click="closePopup" style="width:100%;height:50px;line-height:50px;border-top:3px solid #E4E4E4;color:333" class="f13 ac">取消</div>
		</div>

        <div class="moreinfo" @click="moreAdd">
            <div class="ml15">
                <uni-icon type='plus-filled' size='18' color='#4889F4' />
                <span class="d-text-black">添加客户属性</span>
            </div>
        </div>

    </scroll-view>
    <!-- 客户 -->
   <div class="footer-fixed-menu">
        <i-button @click="fsubmit" type="primary" i-class="f16">保 存</i-button>
    </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			informationList: [], // 列表所有list
			statusTypes: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			msgArr: [{ name: '文本', type: 0 }, { name: '数字', type: 1 }, { name: '日期', type: 2 }, { name: '标签', type: 3 }],
			msgForm: {
				'0': '文本',
				'1': '数字',
				'2': '日期',
				'3': '标签'
			},
			tagForm: {},
			isPopup: false,
			tagAllList: [], // 所有标签的数组
			msgName: '',
			msgid: '0',
			tagName: '',
			tagId: '',
			status: '',
			userName: '',
			msgIndex: [],
			chooseItem: '', // 当前点击的item
			isChooseHandel: false, // 是否点击的是编辑东西
			listForm: { fieldName: '', fieldType: [] },
			isShow: false,
			iscollapse: false,
			checkList: [],
			typeform: {
				'0': '客户',
				'1': '联系人',
				'2': '机会',
				'3': '成交记录'
			},
			busType: 3 // 区分进来的是哪个页面
		}
	},
	onLoad (option) {
		this.busType = option.busType || ''
		this.getTagList()
		this.getInfosList()
	},
	created () {

	},
	methods: {
		// 获取所有的标签
		getTagList () {
			this.$api.seeCrmService.dictionaryrelationList({ busType: this.busType })
				.then(res => {
					if (res.code === 200) {
						this.tagAllList = res.data
						this.tagAllList.forEach((item) => {
							this.tagForm[item.labelCode] = item.labelName
						})
					}
				})
		},
		// 点击属性
		getmsgName (item) {
			if (item.type !== 3) {
				this.tagName = ''
				this.tagId = ''
				// this.$refs.popup.close()
				this.isPopup = false
			}
			if (this.isChooseHandel) {
				this.chooseItem.fieldType = item.type
				this.msgid = item.type
			} else {
				this.msgName = item.name
				this.msgid = item.type
			}
		},
		// 点击标签
		gettagName (item) {
			if (this.isChooseHandel) {
				this.chooseItem.groupCode = item.labelCode
			} else {
				this.tagName = item.labelName
				this.tagId = item.labelCode
			}
			// this.$refs.popup.close()
			this.isPopup = false
		},
		openPopup (item) {
			if (item) {
				this.chooseItem = item
				this.isChooseHandel = true
			} else {
				this.isChooseHandel = false
			}
			// this.$refs.popup.open()
			this.isPopup = true
		},
		closePopup () {
			this.tagName = ''
			this.tagId = ''
			this.msgName = ''
			this.msgid = '0'
			this.isPopup = false
			// this.$refs.popup.close()
		},
		// 获取所有列表
		getInfosList () {
			this.checkList = []
			this.$api.seeCrmService.formsfieldconfigQueryList({ busType: this.busType, isOriginal: -1 })
				.then(res => {
					if (res.code === 200) {
						this.informationList = res.data || []
					}
					this.informationList.forEach((item) => {
						if (item.isEnabled === 0) {
							this.checkList.push(item.id)
						}
						// item.isHandel = false
					})
				})
		},
		onChange (e) {
			this.status = e.detail.value
		},
		bindPickerChange (e) {
			this.msgIndex = e.target.value
		},
		changeHandelStatus (index) {
			this.$forceUpdate()
			this.informationList[index].ishandel = true
		},
		moreAdd () {
			this.isShow = true
		},
		// 修改属性
		handelTags (item) {
			if (item.fieldName) {
				this.$api.seeCrmService.formsfieldconfigUpdate({
					id: item.id,
					busType: this.busType,
					fieldCode: item.fieldCode,
					groupCode: item.groupCode,
					fieldType: item.fieldType,
					fieldName: item.fieldName
				})
					.then(res => {
						this.isShow = false
						setTimeout(() => {
							this.getInfosList()
						}, 800)
					})
			} else {
				this.$utils.toast.text('选项名称不能为空')
			}
		},
		// 删除属性
		fdelete (id) {
			this.$utils.showModal('确定删除当前标签？')
				.then(() => {
					this.$api.seeCrmService.formsfieldconfigLogicDelete({ id: id })
						.then(res => {
							if (res.code === 200) {
								this.$utils.toast.text('删除成功')
								setTimeout(() => {
									this.getInfosList()
								}, 800)
							}
						})
				})
				.catch(() => {

				})
		},
		// 大保存
		fsubmit () {
			// let arr = []
			// if (this.checkList.length > 0) {
			// 	this.checkList.forEach((item) => {
			// 		arr.push({ busType: this.busType, id: item })
			// 	})
			// } else {
			// 	arr = []
			// }
			this.$api.seeCrmService.formsfieldconfigUpdateBatch({ busType: this.busType, ids: this.checkList })
				.then(res => {
					if (res.code === 200) {
						setTimeout(() => {
							this.getInfosList()
						}, 800)
					}
				})
		},
		// 新增保存
		// else if (!this.msgid && this.msgid != 0) {// eslint-disable-line
		// 		this.$utils.toast.text('表单类型不能为空')
		// 	}
		saveformsfieldconfig () {
			if (!this.listForm.fieldName) {
				this.$utils.toast.text('属性名称不能为空')
			} else {
				let params = {
					busType: this.busType,
					fieldName: this.listForm.fieldName,
					isEnabled: 0,
					fieldType: this.msgid,
					groupCode: this.tagId
				}
				this.$api.seeCrmService.formsfieldconfigSave(params)
					.then(res => {
						if (res.code === 200) {
							setTimeout(() => {
								this.getInfosList()
								this.closePopup()
								this.listForm.fieldName = ''
								this.isShow = false
							}, 800)
						}
					})
			}
		}
	},
	computed: {
	}
}

</script>

<style lang="scss">
.flexcenter{display: flex;justify-content: center;align-items: center;}
.formType .uni-list-cell-left{padding: 0}
.moreinfo{height: 60px;border-bottom:1px solid #f2f2f2;display: flex;align-items: center}
.mationInfo{ height: 60px;border-bottom:1px solid #f2f2f2;}
.mationInfo-top{width: 155px;border-right: 1px solid #f2f2f2;}
.mationInfo-middle{ width: 155px;border-right: 1px solid #f2f2f2;justify-content: space-between;}
.subButton{width: 63px;height: 25px;line-height: 25px;border: 1px dashed #4889F4;border-radius: 5px;}
radio-group label, checkbox-group label{
	padding-right:0upx;
}
.uni-collapse-cell__title-text{font-size: 28rpx !important;color: #333 !important;}
.uni-collapse{position: static !important;}
.uni-collapse-cell{position: static !important;}
.uni-collapse-cell__title{border-bottom:1px solid #F1F1F1;}
.inforcollese{height:48px;padding-left:15px;padding-right:15px;line-height: 48px;display: flex;justify-content: space-between;border-bottom:1px solid #f2f2f2;background: #F9F9F9}
.subButton {
  width: 63px;
  height: 25px;
  line-height: 25px;
  border: 1px dashed #4889f4;
  border-radius: 5px;
}
.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box{padding:0 !important;}
</style>
