<template>
    <view>
		<NavBar title="企业管理" />
        <view class="uni-padding-wrap uni-common-mt">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <label class="title-font width30">部门名称</label>
                    <input class="width70" name="name" placeholder="部门名称" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <view class="title-font width30">上级部门</view>
                    <input class="width70" name="phone" :value="superDeptName" disabled="true" placeholder="上级部门" />
                </view>
            </form>
        </view>
        <!-- <view class="mt30 ba title-font" style="text-align: center;" v-if="isEditor == 1">
            删除部门
        </view> -->
        <i-button  v-if="isEditor == 1" class="mt30 ba title-font wfull" style="text-align: center;">删除部门</i-button>
        <!-- <view style="position: fixed;bottom: 0;width: 100%;padding-top: 10px;">
            <button type="primary" class="title-font" style="background-color: #007AFF;">完成</button>
        </view> -->
        <i-button style="position: fixed;bottom: 0;" class="wfull" type="primary">完成</i-button>
    </view>
</template>
<script>
export default {
	onLoad: function (option) {
		this.superDeptName = option.name
		this.isEditor = option.isEditor
	},
	data () {
		return {
			isEditor: 0,
			superDeptName: ''
		}
	},
	methods: {

	}
}
</script>

<style>
    .width30{
        width: 30%;
    }
    .width70{
        width: 70%;
    }
    .title-font{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
    }
</style>
