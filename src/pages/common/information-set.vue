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

                        <div class="setCell d-flex wfull" style="height:50px;height:49px;line-height:49px;align-items: center;justify-content: space-between;">
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
                                <input v-if="item.ishandel" maxlength="6" v-model="item.fieldName" class="ml5 fl" style="flex: 1;border:1px solid #F2F2F2;padding-left:10px;">
                                <div class="ac d-text-blue m5 fl subButton" v-if="item.ishandel" @click="handelTags(item.id,item.fieldName)">
                                    <span class="f13">确定</span>
                                </div>
                            </div>
                            <div style="display:flex;align-items: center;">
                                <uni-icon @click="fdelete(item.id)" class="mr10" type='minus-filled' color="#EB4D3D" size='20'/>
                                <m-checkbox class="mr15 mt5" v-model="checkList" :label='item.id'/>
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
                    <view class="formType wfull" @click="openPopup">
                        <div class="d-text-black f13 ml5 fl hfull" style="width:52px;line-height:60px">表单类型</div>
                        <div style="display:flex;justify-content: space-between;align-items: center;width:92px;" class="fl hfull">
                            <div class="f12 pl5 d-elip" style="color:#999">{{tagName ? (msgName+'/'+tagName) : msgName || '请选择'}}</div>
                            <uni-icon type='arrowright' size='16' color='#696969' />
                        </div>
                    </view>
                    <uni-popup ref="popup" type="bottom" style="height:303px">
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
                    </uni-popup>

            </div>

            <div style="calc(100vw - 310px)" class="hfull flexcenter">
                <div class="ac d-text-blue m5 subButton" @click="saveformsfieldconfig">
                    <span class="f13">确定</span>
                </div>
            </div>
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
			tagAllList: [], // 所有标签的数组
			msgName: '文本',
			msgid: '0',
			tagName: '',
			tagId: '',
			status: '',
			userName: '',
			msgIndex: [],
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
		console.log(option)
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
					}
				})
		},
		// 点击属性
		getmsgName (item) {
			if (item.type !== 3) {
				this.tagName = ''
				this.tagId = ''
				this.$refs.popup.close()
			}
			this.msgName = item.name
			this.msgid = item.type
		},
		// 点击标签
		gettagName (item) {
			this.tagName = item.labelName
			this.tagId = item.labelCode
			this.$refs.popup.close()
		},
		openPopup () {
			this.$refs.popup.open()
		},
		closePopup () {
			this.tagName = ''
			this.tagId = ''
			this.msgName = '文本'
			this.msgid = '0'
			this.$refs.popup.close()
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
		handelTags (id, fieldName) {
			if (fieldName) {
				this.$api.seeCrmService.formsfieldconfigUpdate({
					id: id,
					busType: this.busType,
					fieldName: fieldName
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
