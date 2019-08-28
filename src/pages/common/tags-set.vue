<!-- 标签设置-->
<!-- 徐贺 -->
<template>
  <div class="d-bg-white">
    <NavBar :title="`${typeform[queryForm.busType]}标签管理`"/>
    <!-- :height="'calc(100vh - ' + navH +' - 230px)'" -->
    <scroll-list
      api="seeCrmService.dictionaryrelationList"
      @getList="getTagsList"
      :params="queryForm"
      ref="list"
    >
      <a
        :url="`/pages/common/edit-tags?dicCode=${item.labelCode}&busType=${queryForm.busType}&tagName=${item.labelName}&id=${item.id}`"
        class="toptrasaction"
        v-for="(item,index) in tagsList"
        :key="index"
      >
        <!-- <div @click.stop="deleteTag(item.id)" class="hfull flexcenter ml15 fl">
          <uni-icon class="fl" type="minus-filled" color="#EB4D3D" size="20"/>
        </div> -->
        <span class="d-text-black fl ml15">{{item.labelName}}</span>
        <span class="fr mr15">
          <span>{{`（${item.childValueNum}）`}}</span>
          <uni-icon type="arrowright" size="16" color="#696969"/>
        </span>
      </a>
    </scroll-list>

    <div class="moreinfo d-flex" v-if="isAdd">
      <div class="hfull flexcenter">
        <uni-icon
          @click="deleteMoreList()"
          class="ml15 fr"
          type="minus-filled"
          color="#EB4D3D"
          size="20"
        />
      </div>
      <input maxlength="6" v-model="labelName" placeholder="标签名称" class="ml5" style="flex: 1;">
      <div style="calc(100vw - 310px)" class="hfull flexcenter mr15">
        <div class="ac d-text-blue m5 subButton" @click="addTagsList">
          <span class="f13">确定</span>
        </div>
      </div>
    </div>

    <div class="moreinfo" @click="moreAdd">
      <div class="ml15">
        <uni-icon type="plus-filled" size="18" color="#4889F4"/>
        <span class="d-text-black ml10">添加{{typeform[queryForm.busType]}}标签</span>
      </div>
    </div>
    <!-- <div class="footer-fixed-menu">
      <i-button type="primary" i-class="f16">保 存</i-button>
    </div> -->
  </div>
</template>
<script>
export default {
	components: {},
	data () {
		return {
			labelName: '',
			queryForm: {
				// 列表form
				busType: 3 // 业务类型 0客户，1联系人，2机会，3成交
			},
			typeform: {
				'0': '客户',
				'1': '联系人',
				'2': '机会',
				'3': '成交记录'
			},
			isAdd: false, // 新增框是否显示
			tagsList: [] // 所有标签项
		}
	},
	onShow () {
		this.$refs.list.reload()
	},
	onLoad (option) {
		this.queryForm.busType = option.busType
	},
	methods: {
		// 所有标签项
		getTagsList (list) {
			this.tagsList = list
		},
		moreAdd () {
			this.labelName = ''
			this.isAdd = true
		},
		// 隐藏新增模块
		deleteMoreList () {
			this.isAdd = false
		},
		// // 删除某个标签
		// deleteTag (id) {
		// 	this.$utils.showModal('确定删除当前标签？')
		// 		.then(() => {
		// 			this.$api.seeCrmService.dictionaryrelationDelete({id:id})
		// 				.then(res => {
		// 					if (res.code === 200) {
		// 						this.$utils.toast.text('删除成功')
		// 						setTimeout(() => {
		// 							this.$refs.list.reload()
		// 						}, 800)
		// 					}
		// 				})
		// 		})
		// 		.catch(() => {})
		// },
		// 点击确定
		addTagsList () {
			if (this.labelName) {
				this.$api.seeCrmService
					.dictionaryrelationSave({
						labelName: this.labelName,
						busType: this.queryForm.busType
					})
					.then(res => {
						this.isAdd = false
						setTimeout(() => {
							this.$refs.list.reload()
						}, 800)
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
  line-height: 60px;
  border-bottom: 1px solid #f2f2f2;
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
