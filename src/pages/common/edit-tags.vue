<!-- 编辑标签-->
<!-- 徐贺 -->
<template>
  <div class="d-bg-white">
    <NavBar :title="`编辑${typeform[busType]}标签`"/>
    <div style="height: 10px;background: #f2f2f2;"></div>
    <div class="toptrasaction wfull">
      <span class="d-text-black fl ml15">标签名称</span>
      <span class="fr mr15">
				<input maxlength="32" v-model="tagName" placeholder="" class="ml5 f13" style="flex: 1;color:#999">
      </span>
    </div>
    <div style="height: 10px;background: #f2f2f2;"></div>

    <div class="moreinfo" style="justify-content: space-between;" v-for="(item,index) in valueList" :key='index'>
      <div style="display:flex;align-items:center;">
        <div class="d-text-black ml15 fl" v-if="!item.ishandel">{{item.content}}</div>
				<div class="ml5 fl" v-if="!item.ishandel" @click="changeHandelStatus(index)">
					<i-icon
            class="ml5 fr"
            type="brush"
            color="#1890FF"
            size="20"
          />
				</div>
				<input maxlength="20" v-model="item.content" class="ml5 fl" style="flex: 1;border:1px solid #F2F2F2;padding-left:10px;" v-if="item.ishandel">
				<div class="ac d-text-blue m5 fl subButton" v-if="item.ishandel" @click="handelTags(item.code,item.content)">
          <span class="f13">确定</span>
        </div>
      </div>
      <div class="fr mr15">
        <!-- <div class="ac d-text-blue m5 fr">
          <uni-icon type="bars" size="18" color="#999"/>
        </div> -->
				<div class="ac d-text-blue m5 fr" v-if="index != 0" @click="farrowthinup(index,item)">
          <uni-icon type="arrowthinup" size="22" color="#999"/>
        </div>
				<div class="ac d-text-blue m5 fr" v-if="index != (valueList.length-1)" @click="farrowthindown(index,item)">
          <uni-icon type="arrowthindown" size="22" color="#999"/>
        </div>
      </div>
    </div>

    <div class="moreinfo d-flex" :key="index" v-if="isAdd">
      <div class="hfull flexcenter">
        <uni-icon
          @click="isAdd = false"
          class="ml15 fr"
          type="minus-filled"
          color="#EB4D3D"
          size="20"
        />
      </div>
      <input maxlength="16" v-model="labelname" placeholder="输入选项名称" class="ml5" style="flex: 1;">
      <div style="calc(100vw - 310px)" class="hfull flexcenter mr15">
        <div class="ac d-text-blue m5 subButton" @click="submitTags">
          <span class="f13">确定</span>
        </div>
      </div>
    </div>

    <div class="moreinfo" @click="isAdd = true,labelname = ''">
      <div class="ml15">
        <uni-icon type="plus-filled" size="18" color="#4889F4"/>
        <span class="d-text-black ml10">添加标签选项</span>
      </div>
    </div>
    <div class="footer-fixed-menu" @click="handelTagName">
      <i-button type="primary" i-class="f16">保 存</i-button>
    </div>
		<!-- <i-spin fix fullscreen></i-spin> -->
  </div>
</template>
<script>
export default {
	components: {},
	data () {
		return {
			tagName: '', // 总标签名称
			labelname: '',
			typeform: {
				'0': '客户',
				'1': '联系人',
				'2': '机会',
				'3': '成交记录'
			},
			loading: false,
			isAdd: false, // 新增框是否显示
			busType: 0,
			dicCode: '', // 当前标签code
			queryform: {
				dicCode: '',
				page: 1,
				limit: 15
			},
			tagId: '',
			valueList: [],
			closure: true
		}
	},
	onLoad (option) {
		this.queryform.dicCode = option.dicCode
		this.dicCode = option.dicCode
		this.busType = option.busType
		this.tagName = option.tagName
		this.tagId = option.id
		this.getValueList()
	},
	methods: {
		// 保存客户管理标签的顺序
		saveDataDictionaryOrder () {
			this.closure = false
			this.$api.seeDataDictionaryService.saveDataDictionaryOrder(this.valueList)
				.then(res => {
					// this.getValueList()
					this.closure = true
				})
		},
		// 向上移动
		farrowthinup (index, item) {
			this.valueList[index] = this.valueList.splice(index - 1, 1, item)[0]
			this.saveDataDictionaryOrder()
		},
		// 向下移动
		farrowthindown (index, item) {
			this.valueList[index] = this.valueList.splice(index + 1, 1, item)[0]
			this.saveDataDictionaryOrder()
		},
		// 获取所有标签项
		getValueList () {
			this.$api.seeDataDictionaryService.valueList(this.queryform)
				.then(res => {
					this.valueList = res.data
					if (this.valueList.length > 0) {
						this.valueList.forEach((item) => {
							item.ishandel = false
						})
					}
				})
			this.$forceUpdate()
		},
		// 删除某个标签项
		deleteMoreList (dicCode) {
			this.$utils.showModal('确定删除当前标签？')
				.then(() => {
					this.$api.seeDataDictionaryService.deleteCode(null, dicCode)
						.then(res => {
							if (res.code === 200) {
								this.$utils.toast.text('删除成功')
								setTimeout(() => {
									this.queryform.page = 1
									this.getValueList()
									// this.$refs.list.reload();
								}, 800)
							}
						})
				})
				.catch(() => {})
		},
		changeHandelStatus (index) {
			this.$forceUpdate()
			this.valueList[index].ishandel = true
		},
		dictionaryEdit (code, content) {
			this.$api.seeDataDictionaryService.dictionaryEdit({
				isEnable: 1,
				dicCode: this.dicCode,
				content: content,
				code: code
			})
				.then(res => {
					this.isAdd = false
					setTimeout(() => {
						this.queryform.page = 1
						this.getValueList()
					}, 800)
				})
		},
		// 新增保存
		submitTags () {
			if (this.labelname) {
				this.dictionaryEdit('', this.labelname)
			} else {
				this.$utils.toast.text('选项名称不能为空')
			}
		},
		// 编辑保存
		handelTags (code, content) {
			this.dictionaryEdit(code, content)
		},
		// 标签总名称保存
		handelTagName () {
			if (this.tagName) {
				this.$api.seeCrmService.dictionaryrelationSave({
					labelName: this.tagName,
					busType: this.busType,
					labelCode: this.dicCode,
					id: this.tagId
				})
					.then(res => {
						this.$routing.navigateBack()
					})
			} else {
				this.$utils.toast.text('标签名称不能为空')
			}
		}
	},
	created () {},
	computed: {}
}
</script>

<style lang="scss" scoped>
.toptrasaction {
  height: 60px;
	// line-height: 60px;
	justify-content: space-between;
	display: flex;
	align-items: center
}
.moreinfo {
  height: 60px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  border-top: 1px solid #f2f2f2;
}
.subButton {
  width: 63px;
  height: 25px;
  line-height: 25px;
  border: 1px dashed #4889f4;
  border-radius: 5px;
}
.flexcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
page {
  background-color: #f2f2f2;
  padding-bottom: 140upx;
}
</style>
