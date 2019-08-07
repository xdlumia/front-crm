<!-- 信息设置 -->
<!-- 徐贺 -->
<template>
<div class="d-bg-white">
    <NavBar title="成交记录信息设置"/>
    <!-- <uni-list>
        <uni-list-item  title="hahah"  :show-extra-icon="true" :extra-icon="true">
        </uni-collapse-item>
    </uni-list> -->

    <uni-collapse ref="add" class="warp">
        <uni-collapse-item :show-animation="true" title="系统内置字段">
            <template>
                 <i-cell title="嗯哼"></i-cell>
                 <div style="height:50px;line-height:50px;background:#F9F9F9">
                     <span class="f12 ml15" style="color:#999"><i-icon type='prompt_fill' color="#999" size='20' class="mr5"/>系统内置字段不可以选择、删除；</span>
                  </div>
                 <!-- <i-cell style="background:#F1F1F1 !important;color:#999"><span class="f12"><i-icon type='prompt_fill' color="#999" size='20' class="mr5"/>系统内置字段不可以选择、删除；</span></i-cell> -->
            </template>
        </uni-collapse-item>
    </uni-collapse>

    <scroll-view style="height:calc(100vh - 133px)" scroll-y>
        <radio-group class="uni-list" @change="onChange">
            <i-cell-group>
                <i-cell v-for="(item, index) in 5" :key="index" class="setCell" :title="`测试${index}`" style="position:relative;">
                    <div>
                        <uni-icon class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20' style="position:absolute;right:55px;top:13px"/>
                        <!-- <div class="hfull fr" slot='footer' style="display:flex;align-items:center"> -->
                            <m-checkbox class="fr" v-model="checkList" :label="item" style="position:absolute;right:15px;top:16px"/>
                        <!-- </div> -->
                    </div>
                </i-cell>
            </i-cell-group>
        </radio-group>
        <div class="d-flex mationInfo" v-for="(item,index) in listArr" :key="index">

            <div class="hfull flexcenter mationInfo-top">
                <uni-icon @click="deleteMoreList(index)" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
                <input maxlength="6" v-model="userName" placeholder="属性名称" class="ml5"/>
                <uni-icon type='arrowright' size='18' color='#696969' />
            </div>
            <div class="hfull d-flex mationInfo-middle">
                <picker mode='multiSelector' class="flexcenter" @change="bindPickerChange" @columnchange='bindColumnChange' :value="msgIndex" :range="msgArr">
                    <view class="class='formType flexcenter'">
                        <view class="flexcenter wfull hfull">
                                <view class="uni-list-cell-left d-text-black ml10">
                                        表单类型
                                </view>
                                <view class="uni-list-cell-db flexcenter">
                                    <view class="uni-input f12"  style="color: #999;min-width:58px">
                                        {{msgArr[0][msgIndex[0]]|| '请选择'}}
                                        <uni-icon type='arrowright' size='16' color='#696969' />
                                    </view>
                                </view>
                        </view>
                    </view>
                </picker>
            </div>

            <div style="calc(100vw - 310px)" class="hfull flexcenter">
                <div class="ac d-text-blue m5 subButton">
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
        <i-button type="primary" i-class="f16">保 存</i-button>
    </div>
</div>
</template>
<script>
import uniCollapse from '@/components/basic/uni/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/basic/uni/uni-collapse-item/uni-collapse-item.vue'
// import uniList from '@/components/basic/uni/uni-list/uni-list.vue'
// import uniListItem from '@/components/basic/uni/uni-list-item/uni-list-item.vue'
export default {
	components: {
		uniCollapse,
		uniCollapseItem
		// uniList,
		// uniListItem
	},
	data () {
		return {
			statusTypes: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			msgArr: [['文字', '数字', '日期', '标签']],
			status: '',
			userName: '',
			msgIndex: [],
			listArr: [{ name: '', meg: [] }]
		}
	},
	onLoad (option) {
	},
	methods: {
		onChange (e) {
			this.status = e.detail.value
		},
		handleClick () {

		},
		bindPickerChange (e) {
			// console.log(e)
			this.msgIndex = e.target.value
		},
		bindColumnChange (e) {
			// console.log(e)
			if (e.detail.value === 3) {
				this.msgArr.push(['成交记录'])
				this.msgIndex = [3, 0]
			} else {
				this.msgArr.splice(1, 1)
				this.msgIndex = [0]
			}
			// console.log(this.msgArr)
		},
		moreAdd () {
			this.listArr.push({ name: '', meg: [] })
		},
		deleteMoreList (index) {
			this.listArr.splice(index, 1)
		}
	},
	created () {},
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
</style>
