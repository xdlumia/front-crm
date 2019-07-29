<!-- 信息设置 -->
<!-- 徐贺 -->
<template>
<div class="d-bg-white">
    <NavBar title="成交记录信息设置"/>
    <scroll-view style="height:calc(100vh - 133px)" scroll-y>
        <radio-group class="uni-list" @change="onChange">
            <i-cell-group>
                <i-cell v-for="(item, index) in 5" :key="index" :title="`测试${index}`" style="position:relative;">
                    <uni-icon class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20' style="position:absolute;right:55px;top:13px"/>
                    <radio style="transform:scale(0.7)" slot="footer" value="32" :checked="item.checked" />
                </i-cell>
            </i-cell-group>
        </radio-group>
        <div class="d-flex mationInfo" v-for="(item,index) in listArr" :key="index">

            <div class="hfull flexcenter mationInfo-top">
                <uni-icon @click="deleteMoreList(index)" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
                <input v-model="userName" placeholder="属性名称" class="ml5"/>
                <uni-icon type='arrowright' size='18' color='#696969' />
            </div>
            <div class="hfull d-flex mationInfo-middle">
                <view class="uni-list class='formType flexcenter'">
                    <view class="uni-list-cell">
                            <view class="uni-list-cell-left d-text-black">
                                    表单类型
                            </view>
                            <view class="uni-list-cell-db flexcenter">
                                    <picker @change="bindPickerChange" :value="msgIndex" :range="msgArr">
                                            <view class="uni-input f12"  style="color: #999;">{{msgArr[msgIndex] || '请选择'}}<uni-icon type='arrowright' size='16' color='#696969' /></view>
                                    </picker>
                            </view>
                    </view>
            </view>
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
    <i-button @click="handleClick" type="primary">保 存</i-button>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			statusTypes: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			msgArr: ['文字', '数字', '日期', '标签'],
			status: '',
			userName: '',
			msgIndex: 0,
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
			this.msgIndex = e.target.value
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
</style>
